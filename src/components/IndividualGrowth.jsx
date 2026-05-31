import { individualSteps } from '../data/homeV2Data';

export function IndividualGrowth() {
  return (
    <section id="individual" className="relative overflow-hidden bg-[#f9fbff] px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(140,199,189,0.10),transparent_26%),radial-gradient(circle_at_88%_70%,rgba(143,156,214,0.07),transparent_30%)]" />
      <div className="relative mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <span className="inline-flex rounded-full border border-[#d2e8e3] bg-[#effbf8] px-3 py-1 text-[12px] text-[#5f8f87]">
            个体成长路径
          </span>
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">从会用 AI，到用 AI 做出结果</h2>
          <p className="text-[16px] leading-relaxed text-[#627896]">建立自己的 AI 工作流，把工具变成能力。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {individualSteps.map((step, index) => (
            <article
              key={step.title}
              className="relative overflow-hidden rounded-[20px] border border-[#d7e7e4] bg-[#fffdfb]/84 p-5 shadow-[0_10px_26px_rgba(104,132,153,0.07)] transition duration-200 hover:-translate-y-[2px] hover:border-[#bddbd5] hover:bg-white/92"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-[#e7f2f2]" />
              <div className="absolute left-0 top-0 h-1 bg-gradient-to-r from-[#8cc7bd] to-[#8f9cd6]" style={{ width: step.progress }} />
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full border border-[#cae3df] bg-[#effaf7] px-3 py-1 text-[12px] text-[#628f88]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[12px] text-[#91a8b4]">{step.progress}</span>
              </div>
              <h3 className="mt-3 text-[20px] text-[#314966]">{step.title}</h3>
              <p className="mt-2 min-h-[64px] text-[14px] leading-relaxed text-[#5f7493]">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
