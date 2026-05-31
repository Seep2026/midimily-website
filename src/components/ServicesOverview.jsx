import { serviceOverviewCards } from '../data/homeV2Data';

export function ServicesOverview() {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff] px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(140,199,189,0.08),transparent_26%),radial-gradient(circle_at_86%_72%,rgba(143,156,214,0.08),transparent_28%)]" />
      <div className="relative mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <span className="inline-flex rounded-full border border-[#d5e3f4] bg-white/72 px-3 py-1 text-[12px] text-[#6684aa]">
            不只看趋势，先跑一个小闭环。
          </span>
          <h2 className="text-[29px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">
            两条路径，进入 AI 时代的真实行动
          </h2>
          <p className="text-[16px] leading-relaxed text-[#627896]">
            像浏览课程目录一样理解服务路径，但每一步都指向真实业务、真实学习和真实交付。
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {serviceOverviewCards.map((card) => (
            <article
              key={card.id}
              className={`rounded-[24px] border ${card.border} bg-gradient-to-br ${card.gradient} p-5 shadow-[0_14px_34px_rgba(86,111,148,0.07)] transition duration-200 hover:-translate-y-[3px] hover:border-[#bdcfe7] hover:shadow-[0_18px_40px_rgba(86,111,148,0.10)] sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-white/60 bg-white/68 px-3 py-1 text-[12px] text-[#5f7da5]">
                    {card.tag}
                  </span>
                  <h3 className="mt-4 text-[24px] leading-tight text-[#304763]">{card.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#5f7493]">{card.summary}</p>
                </div>
                <span className="mt-1 hidden h-2.5 w-2.5 rounded-full bg-[#8cc7bd]/80 shadow-[0_0_0_5px_rgba(140,199,189,0.12)] sm:block" />
              </div>

              <div className="mt-5 grid gap-4 rounded-[18px] border border-white/66 bg-white/56 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] md:grid-cols-2">
                <div>
                  <h4 className="text-[13px] font-medium text-[#4b688e]">服务内容</h4>
                  <ul className="mt-2 grid gap-2">
                    {card.bullets.map((item) => (
                      <li key={item} className="relative pl-4 text-[13px] leading-relaxed text-[#4c6485]">
                        <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-[#84a4ce]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[13px] font-medium text-[#4b688e]">适合对象</h4>
                  <ul className="mt-2 grid gap-2">
                    {card.audience.map((item) => (
                      <li key={item} className="relative pl-4 text-[13px] leading-relaxed text-[#4c6485]">
                        <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-[#9ac1d8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-4 rounded-[12px] border border-white/65 bg-white/62 px-3 py-2 text-[13px] text-[#6181a8]">
                {card.keywords}
              </p>

              <a
                href={`#${card.id}`}
                className="mt-5 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
              >
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
