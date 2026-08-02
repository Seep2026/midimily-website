import { evidenceItems } from '../../data/geoContent';
import { EditorialList } from '../editorial/EditorialList';
import { EditorialListingHeader } from '../editorial/EditorialListingHeader';
import { SeoMetadata } from '../SeoMetadata';
import { breadcrumbSchema, collectionPageSchema, organizationSchema, websiteSchema } from '../../lib/seo';

export function EvidencePage() {
  const description =
    '米地米立案例与对比页面收集企业 AI 落地复盘、个人 AI 成长复盘和 AI 咨询选择对比。';
  const listingItems = evidenceItems.map((item) => ({
    href: item.path,
    contentPath: item.typeLabel,
    title: item.title,
    summary: item.summary,
  }));

  return (
    <main className="editorial-token-scope min-h-screen bg-[#fcf8f2] px-5 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <SeoMetadata
        title="AI 落地案例、复盘与对比｜米地米立"
        description={description}
        canonicalPath="/evidence"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          collectionPageSchema({ name: '米地米立案例与对比', description, path: '/evidence' }),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: '案例与对比', path: '/evidence' },
          ]),
        ]}
      />
      <section className="mx-auto w-full max-w-[1180px]">
        <EditorialListingHeader
          breadcrumbs={[
            { name: '首页', path: '/' },
            { name: '案例与对比', path: '/evidence' },
          ]}
          title="AI 落地案例、复盘与对比"
          description="这些页面整理真实问题、复盘结论和选择判断，方便你从服务方向继续看具体做法。"
          editorialNote="这里不是新闻列表，而是把真实问题、方法选择、对比判断和复盘结论整理成可继续阅读的内容。"
        />

        <div className="mt-4">
          <EditorialList
            items={listingItems}
            emptyMessage="目前还没有已发布的案例、复盘或对比内容。"
          />
        </div>
      </section>
    </main>
  );
}
