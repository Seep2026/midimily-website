import {
  getEvidenceBySlugs,
  getTopicBySlug,
} from '../../data/geoContent';
import { solutions } from '../../data/solutionsData';
import { EditorialList } from '../editorial/EditorialList';
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
    contentPath: item.typeLabel,
    title: item.title,
    summary: item.summary,
  }));

  return (
    <main className="editorial-production-page editorial-topic-detail">
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
      <article className="editorial-production-page__wide">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
            { name: topic.title, path: topic.path },
          ]}
        />

        <header className="editorial-topic-header">
          <div className="editorial-topic-header__main">
            <h1>
              {topic.title}
            </h1>
            <p>{topic.description}</p>
            <div className="editorial-topic-header__links">
              <a href={topic.cta.href}>{topic.cta.label}</a>
              <a href="/evidence">查看案例与对比</a>
            </div>
          </div>
          <ShortAnswer>{topic.shortAnswer}</ShortAnswer>
        </header>

        <section className="editorial-topic-definition">
          <h2>一句话定义</h2>
          <p>{topic.definition}</p>
        </section>

        <div className="editorial-topic-facts">
          <section>
            <h2>适合谁</h2>
            <PillList items={topic.targetUsers} />
          </section>
          <section>
            <h2>交付内容</h2>
            <PillList items={topic.deliverables} tone="green" />
          </section>
        </div>

        <section className="editorial-topic-methods">
          <div>
            <h2>常见痛点</h2>
            <ul>
              {topic.painPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>方法路径</h2>
            <ol>
              {topic.method.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <LinkGrid title="相关方案" links={solutionLinks} />
        <EditorialList
          heading="案例、复盘与对比"
          items={evidenceLinks}
          itemHeadingLevel="h3"
          emptyMessage="这个方向暂时没有已发布的案例或对比内容。"
          emptyAction={{ href: '/evidence', label: '查看全部案例与对比' }}
        />
        <FaqList items={topic.faq} />
      </article>
    </main>
  );
}
