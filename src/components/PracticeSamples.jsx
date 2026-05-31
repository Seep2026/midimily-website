import { practiceCards } from '../data/homeV2Data';

export function PracticeSamples() {
  return (
    <section id="practice" className="bg-[#f9fbff] px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">正在实践的 AI 样本</h2>
          <p className="text-[16px] leading-relaxed text-[#627896]">不是只讲趋势，而是把 AI 放进真实任务里。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[20px] border border-[#d5e1ef] bg-[#fdfefe]/88 p-5 shadow-[0_10px_26px_rgba(113,134,165,0.06)] transition duration-200 hover:-translate-y-[2px] hover:border-[#bdcfe7] hover:bg-white"
            >
              <span className="inline-flex rounded-full border border-[#d6e4f2] bg-[#f2f7fc] px-2.5 py-1 text-[11px] text-[#6684aa]">
                Project Lab
              </span>
              <h3 className="mt-3 text-[22px] leading-tight text-[#304864]">{card.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5f7593]">{card.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#d2deef] bg-[#f2f7fc] px-3 py-1 text-[12px] text-[#6281a7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
