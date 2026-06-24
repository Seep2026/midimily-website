import { topicPages } from '../../data/geoContent';
import { SeoMetadata } from '../SeoMetadata';
import { Breadcrumbs, ShortAnswer } from './GeoBlocks';
import { breadcrumbSchema, collectionPageSchema, organizationSchema, websiteSchema } from '../../lib/seo';

export function TopicIndexPage() {
  const description =
    '米地米立 AI 服务地图整理企业 AI 落地、个人 AI 成长和 AI OPC 等服务方向。';

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
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
      <section className="mx-auto w-full max-w-[1120px]">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: 'AI 服务地图', path: '/topics' },
          ]}
        />
        <div className="mt-8 max-w-[820px]">
          <h1 className="text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
            AI 服务地图
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-[#5d7594]">
            按服务方向整理米地米立能提供的支持：每个方向都有定义、适合人群、常见问题、交付内容和相关案例。
          </p>
        </div>

        <div className="mt-8">
          <ShortAnswer>
            如果你想理解米地米立提供什么服务，可以先从服务方向进入，再继续阅读方案详情、案例复盘和对比页。
          </ShortAnswer>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {topicPages.map((topic) => (
            <a
              key={topic.slug}
              href={topic.path}
              className="rounded-[20px] border border-[#d7e3f0] bg-white/76 p-6 transition hover:border-[#b8cce6] hover:bg-white"
            >
              <h2 className="text-[24px] leading-tight text-[#304965]">{topic.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#617b9b]">{topic.shortAnswer}</p>
              <span className="mt-5 inline-flex text-[14px] font-medium text-[#5477a4]">
                阅读服务说明
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
