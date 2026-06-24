import {
  getEvidenceBySlugs,
  getTopicBySlug,
} from '../../data/geoContent';
import { solutions } from '../../data/solutionsData';
import { SeoMetadata } from '../SeoMetadata';
import { Breadcrumbs, FaqList, LinkGrid, PillList, ShortAnswer } from './GeoBlocks';
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
} from '../../lib/seo';

function getSolutionsBySlugs(slugs = []) {
  return slugs.map((slug) => solutions.find((solution) => solution.slug === slug)).filter(Boolean);
}

export function TopicPage({ slug }) {
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-28 text-[#324967] sm:px-6 md:px-8">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">主题不存在</h1>
          <p className="mt-3 text-[#627896]">这个主题可能还没有发布，或路径有误。</p>
          <a
            href="/topics"
            className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white"
          >
            返回 AI 服务地图
          </a>
        </section>
      </main>
    );
  }

  const relatedSolutions = getSolutionsBySlugs(topic.relatedSolutionSlugs);
  const relatedEvidence = getEvidenceBySlugs(topic.relatedEvidenceSlugs);
  const solutionLinks = relatedSolutions.map((solution) => ({
    href: `/solutions/${solution.slug}/`,
    title: solution.title,
    description: solution.description,
  }));
  const evidenceLinks = relatedEvidence.map((item) => ({
    href: item.path,
    title: item.title,
    description: item.summary,
  }));

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <SeoMetadata
        title={topic.seoTitle}
        description={topic.description}
        canonicalPath={topic.path}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          serviceSchema({
            name: topic.title,
            description: topic.description,
            path: topic.path,
            audience: topic.targetUsers,
          }),
          faqSchema(topic.faq),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
            { name: topic.title, path: topic.path },
          ]),
        ]}
      />
      <article className="mx-auto w-full max-w-[1120px]">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
            { name: topic.title, path: topic.path },
          ]}
        />

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <h1 className="text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
              {topic.title}
            </h1>
            <p className="mt-5 max-w-[760px] text-[18px] leading-relaxed text-[#5b7393]">
              {topic.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={topic.cta.href}
                className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
              >
                {topic.cta.label}
              </a>
              <a
                href="/evidence"
                className="inline-flex min-h-11 items-center rounded-[12px] border border-[#c9d8eb] bg-white/78 px-4 text-[14px] font-medium text-[#55769d] transition hover:bg-white"
              >
                查看案例与对比
              </a>
            </div>
          </div>
          <ShortAnswer>{topic.shortAnswer}</ShortAnswer>
        </header>

        <section className="mt-12 rounded-[20px] border border-[#d7e3f0] bg-white/74 p-6">
          <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">一句话定义</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#536f92]">{topic.definition}</p>
        </section>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[20px] border border-[#d7e3f0] bg-white/74 p-6">
            <h2 className="text-[24px] text-[#2e415f]">适合谁</h2>
            <div className="mt-4">
              <PillList items={topic.targetUsers} />
            </div>
          </section>
          <section className="rounded-[20px] border border-[#d7e3f0] bg-white/74 p-6">
            <h2 className="text-[24px] text-[#2e415f]">交付内容</h2>
            <div className="mt-4">
              <PillList items={topic.deliverables} tone="green" />
            </div>
          </section>
        </div>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div>
            <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">常见痛点</h2>
            <ul className="mt-5 grid gap-3">
              {topic.painPoints.map((point) => (
                <li key={point} className="rounded-[16px] border border-[#d7e3f0] bg-white/74 p-4 text-[#587291]">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">方法路径</h2>
            <ol className="mt-5 grid gap-3">
              {topic.method.map((step, index) => (
                <li key={step} className="rounded-[16px] border border-[#d7e3f0] bg-white/74 p-4 text-[#587291]">
                  <span className="mr-2 text-[#7c92bb]">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <LinkGrid title="相关方案" links={solutionLinks} />
        <LinkGrid title="案例、复盘与对比" links={evidenceLinks} />
        <FaqList items={topic.faq} />
      </article>
    </main>
  );
}
