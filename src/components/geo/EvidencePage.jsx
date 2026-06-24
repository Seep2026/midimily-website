import { evidenceItems } from '../../data/geoContent';
import { SeoMetadata } from '../SeoMetadata';
import { Breadcrumbs, ShortAnswer } from './GeoBlocks';
import { breadcrumbSchema, collectionPageSchema, organizationSchema, websiteSchema } from '../../lib/seo';

export function EvidencePage() {
  const description =
    '米地米立案例与对比页面收集企业 AI 落地复盘、个人 AI 成长复盘和 AI 咨询选择对比。';

  return (
    <main className="min-h-screen bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
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
      <section className="mx-auto w-full max-w-[1120px]">
        <Breadcrumbs
          items={[
            { name: '首页', path: '/' },
            { name: '案例与对比', path: '/evidence' },
          ]}
        />
        <div className="mt-8 max-w-[820px]">
          <h1 className="text-[36px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[56px]">
            AI 落地案例、复盘与对比
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-[#5d7594]">
            这些页面整理真实问题、复盘结论和选择判断，方便你从服务方向继续看具体做法。
          </p>
        </div>

        <div className="mt-8">
          <ShortAnswer>
            这里不是新闻列表，而是把真实问题、方法选择、对比判断和复盘结论整理成可继续阅读的内容。
          </ShortAnswer>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {evidenceItems.map((item) => (
            <a
              key={item.slug}
              href={item.path}
              className="rounded-[20px] border border-[#d7e3f0] bg-white/76 p-6 transition hover:border-[#b8cce6] hover:bg-white"
            >
              <span className="rounded-full border border-[#d3e0f0] bg-[#f4f8fd] px-3 py-1 text-[12px] text-[#5f7da5]">
                {item.typeLabel}
              </span>
              <h2 className="mt-4 text-[24px] leading-tight text-[#304965]">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#617b9b]">{item.summary}</p>
              <span className="mt-5 inline-flex text-[14px] font-medium text-[#5477a4]">
                阅读全文
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
