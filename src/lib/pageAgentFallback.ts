import { PageAgentCore, tool } from '@page-agent/core';
import { PageController } from '@page-agent/page-controller';
import * as z from 'zod/v4';
import { navigateInApp } from './appNavigation';
import type { PetNavigationAction } from './petNavigator';

let pageAgent: PageAgentCore | null = null;

function assignPath(path: string) {
  navigateInApp(path);
}

function scrollToSection(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) {
    assignPath(`/#${targetId}`);
    return `正在打开首页的 ${targetId} 区域。`;
  }

  const headerOffset = 88;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  window.history.replaceState(null, '', `/#${targetId}`);
  return `已滚动到 ${targetId} 区域。`;
}

const midimilyNavigationTool = tool({
  description:
    'Navigate within the midimily official website. Prefer this tool for user requests about home, solutions, enterprise AI, personal AI growth, practice samples, contact, consultation, or cooperation.',
  inputSchema: z.object({
    destination: z.enum(['home', 'solutions', 'enterprise', 'individual', 'practice', 'contact']),
    audience: z.enum(['enterprise', 'individual', 'all']).optional().default('all'),
  }),
  execute: async ({ destination, audience }) => {
    if (destination === 'home') {
      assignPath('/#hero');
      return '正在打开首页。';
    }

    if (destination === 'solutions') {
      const query = audience && audience !== 'all' ? `?audience=${audience}` : '';
      assignPath(`/solutions${query}`);
      return '正在打开方案页。';
    }

    if (destination === 'enterprise') {
      return scrollToSection('business');
    }

    if (destination === 'individual') {
      return scrollToSection('individual');
    }

    if (destination === 'practice') {
      return scrollToSection('practice');
    }

    return scrollToSection('contact');
  },
});

function getPageAgentConfig() {
  const env = import.meta.env;

  return {
    apiKey: env.VITE_AI_NAVIGATOR_API_KEY,
    baseURL: env.VITE_AI_NAVIGATOR_BASE_URL || '',
    model: env.VITE_AI_NAVIGATOR_MODEL || 'glm-5.1',
    language: 'zh-CN' as const,
    maxSteps: 6,
    stepDelay: 0.15,
    experimentalScriptExecutionTool: false,
    customTools: {
      navigate_midimily: midimilyNavigationTool,
      ask_user: null,
      input_text: null,
      select_dropdown_option: null,
      execute_javascript: null,
    },
    instructions: {
      system: [
        '你是 midimily 官网的页面导航代理，只负责帮助用户在当前官网内导航。',
        '如果用户请求能映射到首页、方案、企业 AI、个人成长、实践、联系，请优先调用 navigate_midimily 工具。',
        '优先通过点击页面已有链接、按钮或滚动来完成任务。',
        '不要填写表单，不要提交表单，不要发送联系方式，不要处理登录、支付、删除、授权或外部网站任务。',
        '如果用户要预约、咨询、联系，只能打开联系区或相关入口，并提醒用户提交前自己确认。',
        '如果页面已经到达用户想看的区域或页面，调用 done。',
      ].join('\n'),
      getPageInstructions: () => [
        'midimily 首页常见目标：企业 AI 落地路径、个体 AI 成长路径、实践样本、方案、联系。',
        '如果用户说方案、全部方案、看看你们能做什么，点击或打开“方案”。',
        '如果用户说企业 AI、企业服务、AI 咨询，打开或滚动到企业服务/企业 AI 落地路径。',
        '如果用户说个人成长、AI 学习、学生 AI、职场 AI，打开或滚动到个体成长路径。',
        '如果用户说联系、预约、咨询、合作，打开或滚动到联系区。',
      ].join('\n'),
    },
    transformPageContent: (content: string) =>
      content
        .replace(/<[^>]*米立 AI 向导[^>]*>[\s\S]*?<\/[^>]+>/g, '')
        .slice(0, 14000),
  };
}

function getIgnoredPetElements() {
  return Array.from(
    document.querySelectorAll(
      [
        '[aria-label="米立 AI 向导"]',
        '[aria-label="米地米立 AI 引导助手"]',
        '[data-page-agent-ignore="true"]',
      ].join(','),
    ),
  );
}

function getPageAgent() {
  if (pageAgent && !pageAgent.disposed) {
    return pageAgent;
  }

  const pageController = new PageController({
    enableMask: false,
    viewportExpansion: -1,
    interactiveBlacklist: [() => document.querySelector('[aria-label="米立 AI 向导"]') as Element],
  });

  pageAgent = new PageAgentCore({
    ...getPageAgentConfig(),
    pageController,
    onBeforeStep: async (agent) => {
      getIgnoredPetElements().forEach((element) => {
        element.setAttribute('data-page-agent-ignore', 'true');
      });
      agent.pushObservation(
        '宠物对话面板是控制入口，不要点击或操作它。只操作 midimily 官网主体内容。',
      );
    },
  });

  return pageAgent;
}

function canRunPageAgent() {
  return Boolean(import.meta.env.VITE_AI_NAVIGATOR_API_KEY && import.meta.env.VITE_AI_NAVIGATOR_BASE_URL);
}

export async function executeWithPageAgent(action: PetNavigationAction): Promise<boolean> {
  if (action.type !== 'fallback_page_agent' || !action.task || !canRunPageAgent()) {
    return false;
  }

  const safeTask = [
    `用户请求：${action.task}`,
    '请通过 PageAgent 的页面观察和工具调用完成该导航任务。',
    '只允许站内导航、站内点击和滚动。禁止执行 JavaScript，禁止填表或提交。',
  ].join('\n');

  try {
    const agent = getPageAgent();
    if (agent.status === 'running') {
      await agent.stop();
    }

    const result = await agent.execute(safeTask);
    return result.success !== false;
  } catch (error) {
    console.warn('[PetNavigator] PageAgent navigation failed.', error);
    return false;
  }
}
