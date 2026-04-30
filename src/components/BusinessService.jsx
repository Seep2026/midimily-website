import { businessSteps } from '../data/homeV2Data';

export function BusinessService() {
  return (
    <section id="business" className="px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">企业 AI 落地：从场景到流程</h2>
          <p className="text-[16px] text-[#627896]">帮企业找到适合自己的 AI 应用入口，并推动它进入真实业务。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[16px] border border-[#d6e2f2] bg-[#fcfeff] p-5 shadow-[0_8px_18px_rgba(109,132,167,0.10)]"
            >
              <span className="inline-flex rounded-full border border-[#c9daef] bg-[#eff5fc] px-3 py-1 text-[12px] text-[#6687b1]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[20px] text-[#314966]">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#5f7493]">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
