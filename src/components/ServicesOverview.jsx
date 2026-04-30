import { serviceOverviewCards } from '../data/homeV2Data';

export function ServicesOverview() {
  return (
    <section className="bg-[#f9fbff] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[42px]">
            两类服务，帮助企业和个体适应 AI 时代
          </h2>
          <p className="text-[16px] text-[#627896]">企业需要把 AI 用进业务，个体需要把 AI 用成能力。</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {serviceOverviewCards.map((card) => (
            <article
              key={card.id}
              className={`rounded-[20px] border ${card.border} bg-gradient-to-br ${card.gradient} p-6 shadow-[0_12px_24px_rgba(116,138,172,0.12)] transition hover:-translate-y-[2px] hover:shadow-[0_14px_28px_rgba(116,138,172,0.16)] sm:p-7`}
            >
              <span className="inline-flex rounded-full border border-white/60 bg-white/72 px-3 py-1 text-[12px] text-[#5f7da5]">
                {card.tag}
              </span>
              <h3 className="mt-4 text-[25px] leading-tight text-[#304763]">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5f7493]">{card.summary}</p>

              <h4 className="mt-5 text-[14px] text-[#4b688e]">服务内容</h4>
              <ul className="mt-2 grid gap-2">
                {card.bullets.map((item) => (
                  <li key={item} className="relative pl-5 text-[14px] text-[#4c6485]">
                    <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-[#84a4ce]" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 text-[14px] text-[#4b688e]">适合对象</h4>
              <ul className="mt-2 grid gap-2">
                {card.audience.map((item) => (
                  <li key={item} className="relative pl-5 text-[14px] text-[#4c6485]">
                    <span className="absolute left-0 top-[9px] h-1.5 w-1.5 rounded-full bg-[#9ac1d8]" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-[12px] border border-white/65 bg-white/75 px-3 py-2 text-[13px] text-[#6181a8]">
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
