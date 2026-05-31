import { businessSteps } from '../data/homeV2Data';

export function BusinessService() {
  return (
    <section id="business" className="px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <span className="inline-flex rounded-full border border-[#d5e3f4] bg-[#f3f8ff] px-3 py-1 text-[12px] text-[#6684aa]">
            企业服务路径
          </span>
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">企业 AI 落地路径</h2>
          <p className="text-[16px] leading-relaxed text-[#627896]">从一个真实流程开始，跑通可验证的小闭环。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessSteps.map((step, index) => (
            <article
              key={step.title}
              className="group relative overflow-hidden rounded-[20px] border border-[#d6e2f2] bg-[#fcfeff]/88 p-5 shadow-[0_10px_26px_rgba(95,119,154,0.07)] transition duration-200 hover:-translate-y-[2px] hover:border-[#bdcfe7] hover:bg-white"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#e8eefc]/62 transition group-hover:scale-110" />
              <span className="relative inline-flex rounded-full border border-[#c9daef] bg-[#eff5fc] px-3 py-1 text-[12px] text-[#6687b1]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="relative mt-3 text-[20px] text-[#314966]">{step.title}</h3>
              <p className="relative mt-2 min-h-[48px] text-[14px] leading-relaxed text-[#5f7493]">{step.body}</p>
              <div className="relative mt-5 flex items-center gap-3">
                <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-[#7c92bb] to-[#dbe7f7]" />
                <span className="rounded-full border border-[#d5e2f2] bg-white/74 px-2.5 py-1 text-[11px] text-[#6684aa]">
                  {step.output}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
