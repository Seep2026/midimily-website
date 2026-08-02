import { getEvidenceBySlug, getTopicsBySlugs } from '../../data/geoContent';
import { solutions } from '../../data/solutionsData';
import { getEvidenceEditorialNote } from '../../content/editorialNotes';
import { ArticleHeader } from '../editorial/ArticleHeader';
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
  const editorialNote = getEvidenceEditorialNote(item.slug);

  return (
    <main className="editorial-production-page editorial-evidence-detail">
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
      <article>
        <div className="editorial-production-page__wide">
          <Breadcrumbs
            items={[
              { name: '首页', path: '/' },
              { name: '案例与对比', path: '/evidence' },
              { name: item.title, path: item.path },
            ]}
          />
        </div>

        <ArticleHeader
          contentType={item.typeLabel}
          contentTypeHref="/evidence"
          title={item.title}
          summary={item.description}
          editorialNote={editorialNote}
        />

        <div className="editorial-article-body">
          <ShortAnswer>{item.summary}</ShortAnswer>

          <section className="editorial-article-body__audience">
            <h2>适合阅读的人</h2>
            <PillList items={item.audience} />
          </section>

          <aside className="editorial-article-body__finding" aria-labelledby="evidence-finding-title">
            <h2 id="evidence-finding-title">复盘结论</h2>
            <p>{item.finding}</p>
          </aside>

          <section className="editorial-article-body__sections">
            <h2>关键内容</h2>
            <div>
              {item.sections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </section>

          <LinkGrid title="相关主题" links={relatedTopics} />
          <LinkGrid title="相关方案" links={relatedSolutions} />
        </div>
      </article>
    </main>
  );
}
