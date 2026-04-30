import { whyMetrics } from '../data/homeV2Data';

export function WhyMidimily() {
  return (
    <section className="px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1220px] items-start gap-7 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-4">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[42px]">为什么是米地米立</h2>
          <p className="text-[16px] text-[#627896]">我们不只讨论 AI 趋势，更关注 AI 如何进入真实业务和日常工作。</p>
          <p className="text-[15px] leading-relaxed text-[#5a7295]">
            米地米立由一位拥有 26 年技术、产品、运营与创业经验的 AI 实践者发起。我们相信，AI 的价值不在于概念有多热，而在于能否真正被企业和个体使用起来。
          </p>
          <p className="text-[15px] leading-relaxed text-[#5a7295]">
            对企业，AI 应该变成业务能力。对个体，AI 应该变成成长能力。
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {whyMetrics.map((item) => (
            <article
              key={item.value}
              className="rounded-[14px] border border-[#d7e4f2] bg-[#fbfdff] p-4 shadow-[0_8px_18px_rgba(107,132,166,0.10)]"
            >
              <strong className="block text-[16px] text-[#304965]">{item.value}</strong>
              <span className="mt-1 block text-[13px] text-[#607896]">{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
