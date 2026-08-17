import { getEvidenceBySlug } from '../data/geoContent';

export const homeHeroContent = {
  title: ['不只看趋势。', '先跑一个小闭环。'],
  summary: '米地咨询从真实业务与真实任务出发，陪企业落地 AI，陪个体建立可复用的学习与工作方法。',
  editorialNote: 'AI 的价值，不在于替代所有人，而在于让熟悉业务的人更快做出更好的判断。',
  paths: [
    {
      role: 'primary',
      name: '企业 AI 落地',
      description: '从一个真实流程开始，验证 AI 如何进入协作与交付。',
      href: '/enterprise',
    },
    {
      role: 'secondary',
      name: '个体 AI 成长',
      description: '从会用工具，到形成可复用的学习与工作方法。',
      href: '/individual',
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
