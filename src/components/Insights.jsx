import { insightCards } from '../data/homeV2Data';

export function Insights() {
  return (
    <section id="insights" className="px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[780px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">
            持续记录 AI 时代的企业与个体变化
          </h2>
          <p className="text-[16px] text-[#627896]">从企业落地、工具使用到职业成长，记录 AI 时代的真实问题与方法。</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {insightCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[16px] border border-[#d6e1ee] bg-[#fcfeff] p-5 shadow-[0_8px_18px_rgba(110,134,168,0.10)]"
            >
              <span className="inline-flex rounded-full border border-[#cfe0f4] bg-[#f0f6fd] px-3 py-1 text-[12px] text-[#6284af]">
                {card.category}
              </span>
              <h3 className="mt-3 text-[21px] leading-tight text-[#304864]">{card.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5f7593]">{card.body}</p>
            </article>
          ))}
        </div>

        <a
          href="#insights"
          className="mt-8 inline-flex min-h-11 items-center rounded-[12px] border border-[#d1dff0] bg-white/86 px-4 text-[14px] text-[#4e709a] transition hover:border-[#b6cde9] hover:bg-white"
        >
          查看全部观点
        </a>
      </div>
    </section>
  );
}
