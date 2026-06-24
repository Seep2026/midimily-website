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
    <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
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
      <article className="mx-auto w-full max-w-[1120px]">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: '方案库', path: '/solutions' },
            { name: solution.title, path: `/solutions/${solution.slug}/` },
          ]}
        />

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#d3e0f0] bg-[#f4f8fd] px-3 py-1 text-[12px] text-[#5f7da5]">
                {typeLabel}
              </span>
              {versionDate ? (
                <span className="rounded-full border border-[#d3e0f0] bg-white/78 px-3 py-1 text-[12px] text-[#6b84a4]">
                  更新于 {versionDate}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
              {solution.title}
            </h1>
            {solution.subtitle ? (
              <p className="mt-4 text-[22px] leading-relaxed text-[#4f6d90]">{solution.subtitle}</p>
            ) : null}
            <p className="mt-5 max-w-[760px] text-[18px] leading-relaxed text-[#5b7393]">
              {solution.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={deckUrl}
                className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
              >
                查看 Web Deck
              </a>
              <a
                href={solution.cta?.href || '/#contact'}
                className="inline-flex min-h-11 items-center rounded-[12px] border border-[#c9d8eb] bg-white/78 px-4 text-[14px] font-medium text-[#55769d] transition hover:bg-white"
              >
                {solution.cta?.label || '预约交流'}
              </a>
            </div>
          </div>
          <ShortAnswer>{solution.description}</ShortAnswer>
        </header>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[20px] border border-[#d7e3f0] bg-white/74 p-6">
            <h2 className="text-[24px] text-[#2e415f]">适合谁</h2>
            <div className="mt-4">
              <PillList items={solution.fitFor || solution.audience || []} />
            </div>
          </div>
          <div className="rounded-[20px] border border-[#d7e3f0] bg-white/74 p-6">
            <h2 className="text-[24px] text-[#2e415f]">关键词</h2>
            <div className="mt-4">
              <PillList items={solution.tags || []} tone="green" />
            </div>
          </div>
        </section>

        {solution.problems?.length ? (
          <section className="mt-12">
            <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">正在解决的问题</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {solution.problems.map((problem) => (
                <li key={problem} className="rounded-[16px] border border-[#d7e3f0] bg-white/74 p-4 text-[#587291]">
                  {problem}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {solution.outline?.length ? (
          <section className="mt-12">
            <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">方法与阅读路径</h2>
            <ol className="mt-5 grid gap-3">
              {solution.outline.map((item) => (
                <li key={item} className="rounded-[16px] border border-[#d7e3f0] bg-white/74 p-4 text-[#587291]">
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {slideSummary.length ? (
          <section className="mt-12">
            <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">Deck 内容提要</h2>
            <div className="mt-5 grid gap-4">
              {slideSummary.map((slide, index) => (
                <section key={`${slide.title}-${index}`} className="rounded-[18px] border border-[#d7e3f0] bg-white/76 p-6">
                  <h3 className="text-[22px] leading-tight text-[#314a68]">{slide.title}</h3>
                  {slide.subtitle ? (
                    <p className="mt-3 text-[16px] leading-relaxed text-[#5f7898]">{slide.subtitle}</p>
                  ) : null}
                  {slide.points?.length ? (
                    <ul className="mt-4 grid gap-2">
                      {slide.points.map((point) => (
                        <li key={point} className="text-[15px] leading-relaxed text-[#667f9e]">
                          {point}
                        </li>
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
