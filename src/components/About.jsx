export function About() {
  return (
    <section id="about" className="bg-[#f9fbff] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="rounded-[20px] border border-[#d7e3f0] bg-gradient-to-br from-[#fdfefe] via-[#f9fcff] to-[#f8f5ef] p-7 shadow-[0_10px_24px_rgba(114,137,169,0.12)] md:p-10">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">
            米地米立：从真实场景出发，让 AI 变成可用的能力
          </h2>

          <div className="mt-6 max-w-[840px] space-y-5 text-[15px] leading-relaxed text-[#5c7393]">
            <p>米地米立，关注 AI 时代下企业和个体的真实变化。</p>
            <p>
              “米地”，代表真实场景。AI 只有进入具体业务和日常工作，才真正产生价值。
            </p>
            <p>
              “米立”，代表个体成长。每个人都需要重新理解工具、能力与竞争力。
            </p>
            <p className="text-[#42638b]">我们做两件事：帮企业落地 AI。帮个体用好 AI。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
