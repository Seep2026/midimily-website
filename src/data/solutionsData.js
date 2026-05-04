import manifest from '../../content/solutions/manifest.json';
import enterpriseAiLanding from '../../decks/enterprise-ai-landing/meta.json';
import enterpriseAiLandingDeck from '../../decks/enterprise-ai-landing/deck.json';
import personalAiGrowth from '../../decks/personal-ai-growth/meta.json';
import personalAiGrowthDeck from '../../decks/personal-ai-growth/deck.json';

const solutionMetaBySlug = {
  'enterprise-ai-landing': enterpriseAiLanding,
  'personal-ai-growth': personalAiGrowth,
};

const solutionDeckBySlug = {
  'enterprise-ai-landing': enterpriseAiLandingDeck,
  'personal-ai-growth': personalAiGrowthDeck,
};

export const solutionManifest = manifest;

export const solutions = manifest.solutions
  .map((item) => solutionMetaBySlug[item.slug])
  .filter(Boolean)
  .filter((item) => item.status === 'published');

export function getSolutionBySlug(slug) {
  const solution = solutionMetaBySlug[slug];

  if (!solution || solution.status !== 'published') {
    return null;
  }

  return solution;
}

export function getDeckBySlug(slug) {
  return solutionDeckBySlug[slug] ?? null;
}

export const solutionTypeLabels = {
  enterprise: '企业 AI 落地方案',
  individual: '个体 AI 成长方案',
};

export const solutionCategoryCards = [
  {
    type: 'enterprise',
    title: '企业 AI 落地方案',
    description: '面向企业团队，关注 AI 如何进入业务流程、团队协作与运营提效。',
    keywords: '场景 · 流程 · 工具 · 培训 · 陪跑',
    gradient: 'from-[#f5f7ff] via-[#f3f8ff] to-[#eef3ff]',
    border: 'border-[#d6e0f4]',
    selectedGradient: 'from-[#eef3ff] via-[#edf5ff] to-[#e8edff]',
    selectedBorder: 'border-[#8ba4d4]',
    selectedDot: 'bg-[#7c92bb]',
  },
  {
    type: 'individual',
    title: '个体 AI 成长方案',
    description: '面向职场人与学生，关注 AI 如何提升学习效率、工作能力与未来竞争力。',
    keywords: '工具 · 学习 · 工作 · 求职 · 成长',
    gradient: 'from-[#f1fbf8] via-[#eff9ff] to-[#edf6fb]',
    border: 'border-[#d1e5df]',
    selectedGradient: 'from-[#e9fbf6] via-[#e9f8ff] to-[#e8f6f2]',
    selectedBorder: 'border-[#78bdae]',
    selectedDot: 'bg-[#65b2a3]',
  },
];
