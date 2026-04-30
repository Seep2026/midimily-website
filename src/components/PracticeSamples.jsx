import { practiceCards } from '../data/homeV2Data';

export function PracticeSamples() {
  return (
    <section id="practice" className="bg-[#f9fbff] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">正在实践的 AI 样本</h2>
          <p className="text-[16px] text-[#627896]">保留专业深度，但不把复杂概念放在第一屏。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {practiceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[18px] border border-[#d5e1ef] bg-[#fdfefe] p-5 shadow-[0_8px_18px_rgba(113,134,165,0.10)] transition hover:-translate-y-[2px]"
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-[#8aaacc]" />
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
