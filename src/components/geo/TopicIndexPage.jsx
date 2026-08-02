import { topicPages } from '../../data/geoContent';
import { EditorialList } from '../editorial/EditorialList';
import { EditorialListingHeader } from '../editorial/EditorialListingHeader';
import { SeoMetadata } from '../SeoMetadata';
import { breadcrumbSchema, collectionPageSchema, organizationSchema, websiteSchema } from '../../lib/seo';

export function TopicIndexPage() {
  const description =
    '米地米立 AI 服务地图整理企业 AI 落地、个人 AI 成长和 AI OPC 等服务方向。';
  const listingItems = topicPages.map((topic) => ({
    href: topic.path,
    title: topic.title,
    summary: topic.shortAnswer,
  }));

  return (
    <main className="editorial-token-scope min-h-screen bg-[#fcf8f2] px-5 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <SeoMetadata
        title="AI 服务地图｜米地米立"
        description={description}
        canonicalPath="/topics"
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          collectionPageSchema({ name: '米地米立 AI 服务地图', description, path: '/topics' }),
          breadcrumbSchema([
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
          ]),
        ]}
      />
      <section className="mx-auto w-full max-w-[1180px]">
        <EditorialListingHeader
          breadcrumbs={[
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
          ]}
          title="AI 服务地图"
          description="按服务方向整理米地米立能提供的支持：每个方向都有定义、适合人群、常见问题、交付内容和相关案例。"
          editorialNote="如果你想理解米地米立提供什么服务，可以先从服务方向进入，再继续阅读方案详情、案例复盘和对比页。"
        />

        <div className="mt-4">
          <EditorialList
            items={listingItems}
            emptyMessage="目前还没有已发布的服务方向。"
          />
        </div>
      </section>
    </main>
  );
}
