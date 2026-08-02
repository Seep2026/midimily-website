import { getEvidenceBySlug } from '../data/geoContent';

export const homeHeroContent = {
  title: ['企业的 AI 落地伙伴', '个体的 AI 成长顾问'],
  summary: '米地米立持续观察 AI 如何进入真实工作与个人成长，并把复杂变化转化为可以开始、验证和复用的具体行动。',
  editorialNote: '先让一件具体的事情跑通，再讨论更大的智能化。',
  paths: [
    {
      role: 'primary',
      name: '企业 AI 落地',
      description: '从一个高频任务开始，看见 AI 如何真正进入流程、协作与交付。',
      href: '/topics/enterprise-ai-landing',
    },
    {
      role: 'secondary',
      name: '个体 AI 成长',
      description: '从会使用工具，到形成自己的稳定工作流与交付能力。',
      href: '/topics/personal-ai-growth',
    },
  ],
};

const homeEditorialConfig = [
  {
    slug: 'enterprise-ai-workflow-pilot',
    role: 'primary',
    shortDescription: '与其讨论全面智能化，不如先找到一个重复、高频、结果可衡量的任务。',
    editorialNote: '第一个试点的价值，不是证明 AI 无所不能，而是确认一条流程能够稳定跑通。',
    displayOrder: 1,
  },
  {
    slug: 'personal-ai-workflow-30-days',
    role: 'secondary',
    shortDescription: '把零散使用变成一套可以重复的工作方式。',
    displayOrder: 2,
  },
  {
    slug: 'ai-consulting-vs-ai-training',
    role: 'tertiary',
    shortDescription: '先判断问题属于认知、流程，还是组织落地。',
    displayOrder: 3,
  },
];

function getContentPath(evidence, role) {
  if (role === 'tertiary' && evidence.type === 'comparison') {
    return '企业 AI 判断';
  }

  if (evidence.relatedTopicSlugs?.includes('personal-ai-growth')) {
    return '个体 AI 成长';
  }

  if (evidence.relatedTopicSlugs?.includes('enterprise-ai-landing')) {
    return '企业 AI 落地';
  }

  return evidence.typeLabel;
}

export function getHomeEditorialStories() {
  return homeEditorialConfig
    .map((entry) => {
      const evidence = getEvidenceBySlug(entry.slug);

      if (!evidence) {
        return null;
      }

      return {
        ...evidence,
        role: entry.role,
        displayOrder: entry.displayOrder,
        shortDescription: entry.shortDescription || evidence.description,
        editorialNote: entry.editorialNote,
        contentPath: getContentPath(evidence, entry.role),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
