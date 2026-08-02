import {
  getDeckBySlug,
  getSolutionBySlug,
  getSolutionVersionDateLabel,
  solutions,
  solutionTypeLabels,
} from '../../data/solutionsData';
import {
  getEvidenceForSolution,
  getTopicForSolution,
  solutionFaqBySlug,
} from '../../data/geoContent';
import { SeoMetadata } from '../SeoMetadata';
import { Breadcrumbs, FaqList, LinkGrid, PillList, ShortAnswer } from '../geo/GeoBlocks';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from '../../lib/seo';

function getRelatedSolutions(solution) {
  return solutions
    .filter((item) => item.slug !== solution.slug && item.type === solution.type)
    .slice(0, 2)
    .map((item) => ({
      href: `/solutions/${item.slug}/`,
      title: item.title,
      description: item.description,
    }));
}

function getSlideSummary(deck) {
  return deck?.slides?.filter((slide) => slide.layout !== 'cta') ?? [];
}

export function SolutionDetailPage({ slug }) {
  const solution = getSolutionBySlug(slug);
  const deck = getDeckBySlug(slug);

  if (!solution) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-28 text-[#324967] sm:px-6 md:px-8">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">方案不存在</h1>
          <p className="mt-3 text-[#627896]">这个方案可能还没有发布，或路径有误。</p>
          <a
            href="/solutions"
            className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white"
          >
            返回方案库
          </a>
        </section>
      </main>
    );
  }

  const topic = getTopicForSolution(solution);
  const evidence = getEvidenceForSolution(solution);
  const faq = solutionFaqBySlug[solution.slug] ?? [];
  const typeLabel = solutionTypeLabels[solution.type] || solution.category;
  const versionDate = getSolutionVersionDateLabel(solution);
  const deckUrl = solution.fallbackDeckUrl || `/solutions/${solution.slug}/deck/`;
  const slideSummary = getSlideSummary(deck);
  const relatedLinks = [
    ...(topic
      ? [
          {
            href: topic.path,
            title: topic.title,
            description: topic.shortAnswer,
          },
        ]
      : []),
    ...evidence.map((item) => ({
      href: item.path,
      title: item.title,
      description: item.summary,
    })),
  ];

  return (
    <main className="editorial-production-page editorial-solution-detail">
      <SeoMetadata
        title={`${solution.title}｜${solution.category}｜米地米立`}
        description={solution.description}
        canonicalPath={`/solutions/${solution.slug}/`}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema({
            name: solution.title,
            description: solution.description,
            path: `/solutions/${solution.slug}/`,
            audience: solution.audience,
          }),
          articleSchema({
            title: solution.title,
            description: solution.description,
            path: `/solutions/${solution.slug}/`,
            datePublished: solution.publishedAt,
            dateModified: solution.updatedAt || solution.publishedAt,
          }),
          faqSchema(faq),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: '方案库', path: '/solutions' },
            { name: solution.title, path: `/solutions/${solution.slug}/` },
          ]),
        ]}
      />
      <article className="editorial-production-page__wide">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: '方案库', path: '/solutions' },
            { name: solution.title, path: `/solutions/${solution.slug}/` },
          ]}
        />

        <header className="editorial-solution-detail__header">
          <div className="editorial-solution-detail__main">
            <p className="editorial-solution-detail__meta">
              <span>{typeLabel}</span>
              {versionDate ? (
                <span>更新于 {versionDate}</span>
              ) : null}
            </p>
            <h1>
              {solution.title}
            </h1>
            {solution.subtitle ? (
              <p className="editorial-solution-detail__subtitle">{solution.subtitle}</p>
            ) : null}
            <p className="editorial-solution-detail__description">
              {solution.description}
            </p>
            <div className="editorial-solution-detail__links">
              <a href={deckUrl}>查看 Web Deck</a>
              <a href={solution.cta?.href || '/#contact'}>{solution.cta?.label || '预约交流'}</a>
            </div>
          </div>
          <ShortAnswer>{solution.description}</ShortAnswer>
        </header>

        <section className="editorial-solution-detail__facts">
          <div>
            <h2>适合谁</h2>
            <PillList items={solution.fitFor || solution.audience || []} />
          </div>
          <div>
            <h2>关键词</h2>
            <PillList items={solution.tags || []} tone="green" />
          </div>
        </section>

        {solution.problems?.length ? (
          <section className="editorial-solution-detail__section">
            <h2>正在解决的问题</h2>
            <ul>
              {solution.problems.map((problem) => (
                <li key={problem}>{problem}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {solution.outline?.length ? (
          <section className="editorial-solution-detail__section">
            <h2>方法与阅读路径</h2>
            <ol>
              {solution.outline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {slideSummary.length ? (
          <section className="editorial-solution-detail__section editorial-solution-detail__deck-summary">
            <h2>Deck 内容提要</h2>
            <div>
              {slideSummary.map((slide, index) => (
                <section key={`${slide.title}-${index}`}>
                  <h3>{slide.title}</h3>
                  {slide.subtitle ? (
                    <p>{slide.subtitle}</p>
                  ) : null}
                  {slide.points?.length ? (
                    <ul>
                      {slide.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </section>
        ) : null}

        <LinkGrid title="相关服务与案例" links={relatedLinks} />
        <LinkGrid title="同类方案" links={getRelatedSolutions(solution)} />
        <FaqList items={faq} />
      </article>
    </main>
  );
}
