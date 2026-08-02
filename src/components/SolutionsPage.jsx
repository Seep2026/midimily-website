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
    <main className="editorial-production-page editorial-solutions-page">
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
      <section className="editorial-production-page__wide">
        <header className="editorial-solutions-page__header">
          <h1>
            AI 落地与成长方案库
          </h1>
          <p>
            每个方案都有详情页、FAQ、相关服务方向和案例对比。你可以先看详情，也可以进入 Web Deck 做演示阅读。
          </p>
          <nav className="editorial-solutions-page__related" aria-label="相关内容入口">
            {topicPages.slice(0, 5).map((topic) => (
              <a
                key={topic.slug}
                href={topic.path}
              >
                {topic.title}
              </a>
            ))}
            <a
              href="/evidence"
            >
              案例与对比
            </a>
          </nav>
        </header>

        <div className="editorial-solution-filters editorial-solution-filters--mobile">
          {mobileFilters.map((filter) => {
            const isSelected = activeFilter === filter.type;

            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => handleSelectMobileFilter(filter.type)}
                aria-label={filter.type ? `筛选${filter.label}方案` : '显示全部方案'}
                className={isSelected ? 'is-selected' : undefined}
                aria-pressed={isSelected}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="editorial-solution-filters editorial-solution-filters--desktop">
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

      <section className="editorial-solutions-page__list editorial-production-page__wide">
        <div>
          {filteredSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>

        {filteredSolutions.length === 0 ? (
          <div className="editorial-solutions-page__empty">
            暂无该方向方案，后续将由 Codex 持续生成并发布。
          </div>
        ) : null}
      </section>
    </main>
  );
}
