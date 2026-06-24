import { useMemo, useState } from 'react';
import { solutions, solutionCategoryCards } from '../data/solutionsData';
import { topicPages } from '../data/geoContent';
import { SeoMetadata } from './SeoMetadata';
import { SolutionCard } from './solutions/SolutionCard';
import { SolutionCategoryCard } from './solutions/SolutionCategoryCard';
import { breadcrumbSchema, collectionPageSchema, organizationSchema, websiteSchema } from '../lib/seo';

function getInitialAudienceFilter() {
  const audience = new URLSearchParams(window.location.search).get('audience');

  if (audience === 'enterprise' || audience === 'individual') {
    return audience;
  }

  return null;
}

export function SolutionsPage() {
  const [activeFilter, setActiveFilter] = useState(getInitialAudienceFilter);
  const pageTitle =
    activeFilter === 'enterprise'
      ? '企业 AI 落地方案库｜米地米立'
      : activeFilter === 'individual'
        ? '个体 AI 成长方案库｜米地米立'
        : 'AI 落地与成长方案库｜米地米立';
  const pageDescription =
    activeFilter === 'enterprise'
      ? '米地米立企业 AI 落地方案库，覆盖业务流程、组织转型、OPC 项目模式和企业家 AI 认知。'
      : activeFilter === 'individual'
        ? '米地米立个体 AI 成长方案库，覆盖个人 AI 工作流、程序员成长、AI Agent 理解和作品沉淀。'
        : '米地米立方案库整理企业 AI 落地和个体 AI 成长的 Web Deck、方法说明、FAQ 与相关案例对比。';
  const canonicalPath = activeFilter ? `/solutions?audience=${activeFilter}` : '/solutions';
  const mobileFilters = [
    { type: null, label: '全部' },
    { type: 'enterprise', label: '企业' },
    { type: 'individual', label: '个体' },
  ];
  const filteredSolutions = useMemo(() => {
    if (!activeFilter) {
      return solutions;
    }

    return solutions.filter((solution) => solution.type === activeFilter);
  }, [activeFilter]);

  const handleSelectFilter = (type) => {
    const nextFilter = activeFilter === type ? null : type;
    setActiveFilter(nextFilter);
    const query = nextFilter ? `?audience=${nextFilter}` : '';
    window.history.replaceState(null, '', `/solutions${query}`);
  };

  const handleSelectMobileFilter = (type) => {
    setActiveFilter(type);
    const query = type ? `?audience=${type}` : '';
    window.history.replaceState(null, '', `/solutions${query}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <SeoMetadata
        title={pageTitle}
        description={pageDescription}
        canonicalPath={canonicalPath}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          collectionPageSchema({ name: pageTitle.replace('｜米地米立', ''), description: pageDescription, path: canonicalPath }),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: '方案库', path: canonicalPath },
          ]),
        ]}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_18%_10%,rgba(124,146,187,0.08),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(140,199,189,0.08),transparent_28%),linear-gradient(180deg,rgba(247,250,255,0.60),rgba(252,248,242,0))]" />

      <section className="relative mx-auto w-full max-w-[1220px]">
        <div className="mb-8 max-w-[860px]">
          <h1 className="text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
            AI 落地与成长方案库
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#5d7594] sm:text-[18px]">
            每个方案都有详情页、FAQ、相关服务方向和案例对比。你可以先看详情，也可以进入 Web Deck 做演示阅读。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {topicPages.slice(0, 5).map((topic) => (
              <a
                key={topic.slug}
                href={topic.path}
                className="rounded-full border border-[#d3e0f0] bg-white/72 px-3 py-1.5 text-[13px] text-[#5f7da5] transition hover:bg-white"
              >
                {topic.title}
              </a>
            ))}
            <a
              href="/evidence"
              className="rounded-full border border-[#cce3df] bg-[#f0fbf7] px-3 py-1.5 text-[13px] text-[#5f8f87] transition hover:bg-white"
            >
              案例与对比
            </a>
          </div>
        </div>

        <div className="flex rounded-full border border-[#d6e2f0] bg-white/66 p-1 shadow-[0_10px_26px_rgba(88,112,148,0.06)] md:hidden">
          {mobileFilters.map((filter) => {
            const isSelected = activeFilter === filter.type;

            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => handleSelectMobileFilter(filter.type)}
                aria-label={filter.type ? `筛选${filter.label}方案` : '显示全部方案'}
                className={`min-h-10 flex-1 cursor-pointer rounded-full px-3 text-[13px] font-medium transition active:translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isSelected
                    ? 'bg-[#7c92bb] text-white shadow-[0_8px_18px_rgba(124,146,187,0.18)]'
                    : 'text-[#60799b] hover:bg-white/72'
                }`}
                aria-pressed={isSelected}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-2">
          {solutionCategoryCards.map((category) => (
            <SolutionCategoryCard
              key={category.type}
              category={category}
              isSelected={activeFilter === category.type}
              onSelect={handleSelectFilter}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-4 w-full max-w-[1220px] md:mt-8">
        <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
          {filteredSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>

        {filteredSolutions.length === 0 ? (
          <div className="mt-6 rounded-[18px] border border-dashed border-[#cfdbea] bg-white/68 p-6 text-[14px] text-[#6a819f]">
            暂无该方向方案，后续将由 Codex 持续生成并发布。
          </div>
        ) : null}
      </section>
    </main>
  );
}
