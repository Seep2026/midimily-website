import { getEvidenceBySlug, getTopicsBySlugs } from '../../data/geoContent';
import { solutions } from '../../data/solutionsData';
import { SeoMetadata } from '../SeoMetadata';
import { Breadcrumbs, LinkGrid, PillList, ShortAnswer } from './GeoBlocks';
import { articleSchema, breadcrumbSchema, organizationSchema, websiteSchema } from '../../lib/seo';

function getSolutionsBySlugs(slugs = []) {
  return slugs.map((slug) => solutions.find((solution) => solution.slug === slug)).filter(Boolean);
}

export function EvidenceDetailPage({ slug }) {
  const item = getEvidenceBySlug(slug);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-28 text-[#324967] sm:px-6 md:px-8">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">内容不存在</h1>
          <p className="mt-3 text-[#627896]">这个案例或对比页可能还没有发布，或路径有误。</p>
          <a
            href="/evidence"
            className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white"
          >
            返回案例与对比
          </a>
        </section>
      </main>
    );
  }

  const relatedTopics = getTopicsBySlugs(item.relatedTopicSlugs).map((topic) => ({
    href: topic.path,
    title: topic.title,
    description: topic.shortAnswer,
  }));
  const relatedSolutions = getSolutionsBySlugs(item.relatedSolutionSlugs).map((solution) => ({
    href: `/solutions/${solution.slug}/`,
    title: solution.title,
    description: solution.description,
  }));

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <SeoMetadata
        title={item.seoTitle}
        description={item.description}
        canonicalPath={item.path}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          articleSchema({
            title: item.title,
            description: item.description,
            path: item.path,
            datePublished: '2026-06-24',
            dateModified: '2026-06-24',
          }),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: '案例与对比', path: '/evidence' },
            { name: item.title, path: item.path },
          ]),
        ]}
      />
      <article className="mx-auto w-full max-w-[980px]">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: '案例与对比', path: '/evidence' },
            { name: item.title, path: item.path },
          ]}
        />

        <header className="mt-8">
          <span className="rounded-full border border-[#d3e0f0] bg-[#f4f8fd] px-3 py-1 text-[12px] text-[#5f7da5]">
            {item.typeLabel}
          </span>
          <h1 className="mt-5 text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
            {item.title}
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-[#5b7393]">{item.description}</p>
        </header>

        <div className="mt-8">
          <ShortAnswer>{item.summary}</ShortAnswer>
        </div>

        <section className="mt-8 rounded-[20px] border border-[#d7e3f0] bg-white/76 p-6">
          <h2 className="text-[24px] text-[#2e415f]">适合阅读的人</h2>
          <div className="mt-4">
            <PillList items={item.audience} />
          </div>
        </section>

        <section className="mt-8 rounded-[20px] border border-[#cfe0ee] bg-[#f7fbff] p-6">
          <h2 className="text-[24px] text-[#2e415f]">复盘结论</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#536f92]">{item.finding}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">关键内容</h2>
          <div className="mt-5 grid gap-4">
            {item.sections.map((section) => (
              <section key={section.heading} className="rounded-[18px] border border-[#d7e3f0] bg-white/76 p-6">
                <h3 className="text-[22px] text-[#314a68]">{section.heading}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-[#5f7898]">{section.body}</p>
              </section>
            ))}
          </div>
        </section>

        <LinkGrid title="相关主题" links={relatedTopics} />
        <LinkGrid title="相关方案" links={relatedSolutions} />
      </article>
    </main>
  );
}
