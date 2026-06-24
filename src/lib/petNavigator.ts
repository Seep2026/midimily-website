import { executeWithPageAgent } from './pageAgentFallback';
import { recognizeIntentWithAi } from './aiIntentClient';
import { navigateInApp } from './appNavigation';
import { logPetNavigatorEvent, type PetNavigatorMatchSource, type PetNavigatorUsage } from './petNavigatorEvents';

export type PetNavigationAction =
  | { type: 'route'; path: string; label?: string }
  | { type: 'scroll'; targetId: string; label?: string }
  | { type: 'open_solution'; slug: string; label?: string }
  | { type: 'filter_solutions'; audience: 'enterprise' | 'individual' | 'all'; label?: string }
  | { type: 'open_contact'; label?: string }
  | { type: 'open_deck'; slug: string; label?: string }
  | { type: 'reply'; message: string }
  | { type: 'fallback_page_agent'; task: string };

export interface PetNavigatorResult {
  action: PetNavigationAction;
  matchedBy: PetNavigatorMatchSource;
  beforeMessage: string;
  afterMessage: string;
  success: boolean;
  usage?: PetNavigatorUsage;
}

const localIntentRules: Array<{
  keywords: string[];
  action: PetNavigationAction;
  beforeMessage: string;
  afterMessage: string;
}> = [
  {
    keywords: ['帮我提交', '直接提交', '自动提交', '帮我发送', '直接发送', '替我发送'],
    action: {
      type: 'reply',
      message: '我可以帮你打开或填写草稿，但提交前需要你自己确认。',
    },
    beforeMessage: '我先帮你守住确认步骤。',
    afterMessage: '我可以带你到联系入口，你确认后再提交。',
  },
  {
    keywords: ['回首页', '去首页', '打开首页', '跳转首页', '切换首页', '首页', '公司介绍', '介绍一下', '米地米立'],
    action: { type: 'route', path: '/#hero', label: '回到首页' },
    beforeMessage: '我带你回到首页。',
    afterMessage: '这里可以快速了解米地米立的企业 AI 落地和个体 AI 成长两条路径。',
  },
  {
    keywords: ['企业 ai', '企业ai', '企业 ai 落地', '公司怎么用 ai', '公司怎么用ai', 'ai 咨询', 'ai咨询', '企业服务', '企业落地', '企业落地路径', '企业怎么落地ai'],
    action: { type: 'scroll', targetId: 'business', label: '企业 AI 落地路径' },
    beforeMessage: '我带你看企业 AI 落地路径。',
    afterMessage: '这里更适合了解企业 AI 咨询、需求分析和落地路径。',
  },
  {
    keywords: ['企业方案', '企业案例', '企业转型', '业务流程', '流程落地'],
    action: { type: 'filter_solutions', audience: 'enterprise', label: '筛选企业方案' },
    beforeMessage: '我帮你筛出企业方向方案。',
    afterMessage: '这些方案更适合看场景诊断、流程拆解和试点落地。',
  },
  {
    keywords: ['个人成长', '个体成长', 'ai 学习', 'ai学习', '学生 ai', '学生ai', '职场 ai', '职场ai', '个人 ai', '个人ai', '个人怎么用ai', '个体路径'],
    action: { type: 'scroll', targetId: 'individual', label: '个体 AI 成长路径' },
    beforeMessage: '我带你看个体 AI 成长路径。',
    afterMessage: '这里更适合了解学习、工作、作品沉淀里的 AI 使用方法。',
  },
  {
    keywords: ['个体方案', '个人方案', '程序员', '职场人', '学生方案'],
    action: { type: 'filter_solutions', audience: 'individual', label: '筛选个体方案' },
    beforeMessage: '我帮你筛出个体成长方案。',
    afterMessage: '这些方案更适合看 AI 学习、职场提效和个人工作流。',
  },
  {
    keywords: ['联系你', '联系', '去联系', '打开联系', '跳转联系', '切换联系', '预约', '咨询', '聊聊', '怎么合作', '合作'],
    action: { type: 'open_contact', label: '打开联系入口' },
    beforeMessage: '我带你到联系入口。',
    afterMessage: '这里可以选择企业 AI 落地交流或个体 AI 成长交流。提交前需要你自己确认。',
  },
  {
    keywords: ['教育机构', '教培', '短视频', '自媒体增长', 'edusocial', '教育增长', '招生增长'],
    action: { type: 'filter_solutions', audience: 'enterprise', label: '教育机构 AI 增长方向' },
    beforeMessage: '我先带你看企业 AI 落地方向。',
    afterMessage: '教育机构和短视频增长适合从内容生产、线索承接、私域运营的小闭环开始。',
  },
  {
    keywords: ['所有方案', '服务方案', '方案库', '去方案', '打开方案', '跳转方案', '切换方案', '看看方案', '方案', '看看你们能做什么', '你们能做什么'],
    action: { type: 'filter_solutions', audience: 'all', label: '查看全部方案' },
    beforeMessage: '我带你看全部方案。',
    afterMessage: '方案库里可以直接打开 Web Deck，看更完整的路径和适用场景。',
  },
];

function includesAny(input: string, keywords: string[]) {
  const compactInput = input.replace(/[\s，。,.！？!?、]/g, '');

  return keywords.some((keyword) => {
    const compactKeyword = keyword.replace(/[\s，。,.！？!?、]/g, '');
    return input.includes(keyword) || compactInput.includes(compactKeyword);
  });
}

export function matchLocalPetIntent(rawInput: string): Omit<PetNavigatorResult, 'matchedBy' | 'success'> | null {
  const input = rawInput.trim().toLowerCase();
  if (!input) {
    return null;
  }

  const rule = localIntentRules.find((item) => includesAny(input, item.keywords));
  if (!rule) {
    return null;
  }

  return {
    action: rule.action,
    beforeMessage: rule.beforeMessage,
    afterMessage: rule.afterMessage,
  };
}

function buildLowConfidenceReply(): PetNavigationAction {
  return {
    type: 'reply',
    message: '我还不太确定你想看哪一块。你可以直接说“企业 AI 落地”“个人 AI 成长”“教育机构增长”或“预约咨询”。',
  };
}

function describeAction(action: PetNavigationAction) {
  if (action.type === 'reply') {
    return action.message;
  }

  if (action.label) {
    return action.label;
  }

  const labels: Record<PetNavigationAction['type'], string> = {
    route: '打开页面',
    scroll: '定位到页面模块',
    open_solution: '打开方案',
    filter_solutions: '筛选方案',
    open_contact: '打开联系入口',
    open_deck: '打开 Web Deck',
    reply: '回复',
    fallback_page_agent: '尝试页面操作',
  };

  return labels[action.type];
}

function goTo(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (current === normalizedPath) {
    if (window.location.hash && normalizedPath.includes('#')) {
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      window.requestAnimationFrame(() => scrollToTarget(targetId));
    }
    return true;
  }

  navigateInApp(normalizedPath);
  return true;
}

function scrollToTarget(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) {
    return false;
  }

  const headerOffset = 88;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  window.history.replaceState(null, '', `/#${targetId}`);
  return true;
}

export async function executePetNavigationAction(action: PetNavigationAction): Promise<boolean> {
  if (action.type === 'reply') {
    return true;
  }

  if (action.type === 'route') {
    return goTo(action.path);
  }

  if (action.type === 'scroll') {
    if (window.location.pathname !== '/') {
      return goTo(`/#${action.targetId}`);
    }
    return scrollToTarget(action.targetId);
  }

  if (action.type === 'filter_solutions') {
    const query = action.audience === 'all' ? '' : `?audience=${action.audience}`;
    return goTo(`/solutions${query}`);
  }

  if (action.type === 'open_solution') {
    return goTo(`/solutions/${action.slug}`);
  }

  if (action.type === 'open_deck') {
    return goTo(`/solutions/${action.slug}/deck/`);
  }

  if (action.type === 'open_contact') {
    if (window.location.pathname !== '/') {
      return goTo('/#contact');
    }
    return scrollToTarget('contact');
  }

  return executeWithPageAgent(action);
}

export async function resolvePetNavigatorInput(input: string): Promise<PetNavigatorResult> {
  const startedAt = performance.now();
  let matchedBy: PetNavigatorMatchSource = 'fallback';
  let action: PetNavigationAction;
  let beforeMessage = '我帮你找一下。';
  let afterMessage = '';
  let usage: PetNavigatorUsage | undefined;

  const localMatch = matchLocalPetIntent(input);
  if (localMatch?.action.type === 'reply') {
    matchedBy = 'local_rule';
    action = localMatch.action;
    beforeMessage = localMatch.beforeMessage;
    afterMessage = localMatch.afterMessage;
  } else {
    const pageAgentAction: PetNavigationAction = { type: 'fallback_page_agent', task: input };
    const pageAgentSuccess = await executePetNavigationAction(pageAgentAction);

    if (pageAgentSuccess) {
      matchedBy = 'page_agent';
      action = pageAgentAction;
      beforeMessage = '我让 PageAgent 帮你操作网页。';
      afterMessage = '已经把网页切到更接近你想看的位置。';
    } else if (localMatch) {
      matchedBy = 'local_rule';
      action = localMatch.action;
      beforeMessage = localMatch.beforeMessage;
      afterMessage = localMatch.afterMessage;
    } else {
      const llmResult = await recognizeIntentWithAi(input);

      if (llmResult && llmResult.confidence >= 0.6) {
        matchedBy = 'llm';
        action = llmResult.action;
        usage = llmResult.usage;
        beforeMessage = `我来处理：${describeAction(action)}。`;
        afterMessage = action.type === 'reply' ? action.message : '我已经帮你定位到更相关的位置。';
      } else {
        action = buildLowConfidenceReply();
        beforeMessage = '我需要再确认一下方向。';
        afterMessage = action.message;
      }
    }
  }

  const success = matchedBy === 'page_agent' ? true : await executePetNavigationAction(action);
  const finalMatchedBy = action.type === 'fallback_page_agent' ? 'page_agent' : matchedBy;

  logPetNavigatorEvent({
    input,
    matchedBy: finalMatchedBy,
    action,
    success,
    latencyMs: Math.round(performance.now() - startedAt),
    tokenUsage: usage,
  });

  return {
    action,
    matchedBy: finalMatchedBy,
    beforeMessage,
    afterMessage: action.type === 'reply' ? action.message : afterMessage,
    success,
    usage,
  };
}
