import { individualSteps } from '../data/homeV2Data';

export function IndividualGrowth() {
  return (
    <section id="individual" className="bg-[#f9fbff] px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h2 className="text-[30px] leading-tight text-[#2e415f] sm:text-[36px] md:text-[40px]">个体 AI 成长：把 AI 用成自己的能力</h2>
          <p className="text-[16px] text-[#627896]">面向职场人和学生，建立 AI 时代的学习、工作与职业竞争力。</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {individualSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[16px] border border-[#d7e3ef] bg-[#fffdfb] p-5 shadow-[0_8px_18px_rgba(119,135,163,0.10)]"
            >
              <span className="inline-flex rounded-full border border-[#cae0f3] bg-[#eef7ff] px-3 py-1 text-[12px] text-[#688ab5]">
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
