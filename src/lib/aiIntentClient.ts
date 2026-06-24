import type { PetNavigationAction } from './petNavigator';
import type { PetNavigatorUsage } from './petNavigatorEvents';

export interface AiIntentResult {
  action: PetNavigationAction;
  confidence: number;
  usage?: PetNavigatorUsage;
}

const allowedActions = new Set([
  'route',
  'scroll',
  'open_solution',
  'filter_solutions',
  'open_contact',
  'open_deck',
  'reply',
  'fallback_page_agent',
]);

function getAiIntentConfig() {
  const env = import.meta.env;
  const apiKey = env.VITE_AI_NAVIGATOR_API_KEY?.trim();

  return {
    apiKey,
    baseURL: (env.VITE_AI_NAVIGATOR_BASE_URL || '').replace(/\/+$/, ''),
    model: env.VITE_AI_NAVIGATOR_MODEL || 'glm-5.1',
  };
}

function extractJsonObject(rawContent: string) {
  const trimmed = rawContent.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
    if (fenced) {
      try {
        return JSON.parse(fenced.trim());
      } catch {
        // Fall through to brace extraction.
      }
    }

    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    }
  }

  return null;
}

function normalizeLlmAction(data: Record<string, unknown>): PetNavigationAction | null {
  const actionType = String(data.action || '');
  if (!allowedActions.has(actionType)) {
    return null;
  }

  if (actionType === 'route') {
    const path = typeof data.path === 'string' ? data.path : '/solutions';
    return { type: 'route', path, label: typeof data.label === 'string' ? data.label : undefined };
  }

  if (actionType === 'scroll') {
    const targetId = typeof data.targetId === 'string' ? data.targetId : '';
    return targetId ? { type: 'scroll', targetId, label: typeof data.label === 'string' ? data.label : undefined } : null;
  }

  if (actionType === 'open_solution') {
    const slug = typeof data.slug === 'string' ? data.slug : '';
    return slug
      ? { type: 'open_solution', slug, label: typeof data.label === 'string' ? data.label : undefined }
      : { type: 'filter_solutions', audience: 'all', label: '查看全部方案' };
  }

  if (actionType === 'filter_solutions') {
    const audience = data.audience === 'enterprise' || data.audience === 'individual' ? data.audience : 'all';
    return { type: 'filter_solutions', audience, label: typeof data.label === 'string' ? data.label : undefined };
  }

  if (actionType === 'open_contact') {
    return { type: 'open_contact', label: typeof data.label === 'string' ? data.label : undefined };
  }

  if (actionType === 'open_deck') {
    const slug = typeof data.slug === 'string' ? data.slug : '';
    return slug
      ? { type: 'open_deck', slug, label: typeof data.label === 'string' ? data.label : undefined }
      : { type: 'filter_solutions', audience: 'all', label: '查看全部方案' };
  }

  if (actionType === 'fallback_page_agent') {
    const task = typeof data.task === 'string' ? data.task : '';
    return task ? { type: 'fallback_page_agent', task } : null;
  }

  const message = typeof data.message === 'string' && data.message.trim()
    ? data.message.trim()
    : '我可以带你看企业 AI 落地、个人 AI 成长、AI OPC 或预约咨询。';
  return { type: 'reply', message };
}

function normalizeConfidence(rawConfidence: unknown, action: PetNavigationAction) {
  const confidence = Number(rawConfidence);
  if (Number.isFinite(confidence)) {
    return confidence;
  }

  if (action.type === 'fallback_page_agent') {
    return 0.58;
  }

  return 0.72;
}

export async function recognizeIntentWithAi(input: string): Promise<AiIntentResult | null> {
  const config = getAiIntentConfig();
  if (!config.apiKey || !config.baseURL) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(`${config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: [
              '你是 midimily 官网的意图路由器，只能返回 JSON，不要输出解释。',
              '允许的 action: route, scroll, open_solution, filter_solutions, open_contact, open_deck, reply, fallback_page_agent。',
              '允许的首页 targetId: hero, business, individual, practice, contact。',
              '允许的 path: /, /#hero, /#business, /#individual, /#practice, /#contact, /solutions, /solutions?audience=enterprise, /solutions?audience=individual。',
              '允许的 slug: enterprise-ai-landing, enterprise-opc-project-model, ai-truth-for-entrepreneurs, personal-ai-growth, programmer-ai-growth-guide, understanding-ai-agent。',
              '必须返回 confidence，0 到 1 之间。',
              '如果用户只是说“方案”“打开方案”“看看你们能做什么”，返回 {"action":"filter_solutions","audience":"all","confidence":0.8}。',
              '预约、联系、提交、发送只允许 open_contact 或 reply，不能自动提交。',
              '如果用户意图不明确，返回 reply，并把 confidence 设为 0.5 以下。',
            ].join('\n'),
          },
          { role: 'user', content: input },
        ],
        temperature: 0.1,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI intent HTTP ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return null;
    }

    const parsed = extractJsonObject(content);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const action = normalizeLlmAction(parsed as Record<string, unknown>);
    if (!action) {
      return null;
    }

    return {
      action,
      confidence: normalizeConfidence((parsed as { confidence?: unknown }).confidence, action),
      usage: data?.usage
        ? {
            prompt_tokens: data.usage.prompt_tokens,
            completion_tokens: data.usage.completion_tokens,
            total_tokens: data.usage.total_tokens,
          }
        : undefined,
    };
  } catch (error) {
    if ((error as { name?: string })?.name !== 'AbortError') {
      console.warn('[PetNavigator] AI intent recognition failed.', error);
    }
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
