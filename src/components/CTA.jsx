import milyQq from '../styles/mily-qq.png';
import milyWx from '../styles/mily-wx.png';

function HoverContactButton({ label, imageSrc, imageAlt }) {
  return (
    <div className="group relative mt-5 inline-flex">
      <a
        href="#contact"
        className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
      >
        {label}
      </a>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 hidden w-[168px] -translate-x-1/2 translate-y-1 rounded-[14px] border border-[#d8e3f0] bg-white/95 p-2 shadow-[0_12px_24px_rgba(99,122,158,0.18)] opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block">
        <img src={imageSrc} alt={imageAlt} className="h-auto w-full rounded-[10px] object-cover" />
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1220px] rounded-[24px] border border-[#d7e3f0] bg-gradient-to-br from-[#eef5ff] via-[#eff9ff] to-[#f2f7f9] p-6 shadow-[0_12px_28px_rgba(105,130,166,0.16)] sm:p-8 md:p-10">
        <h2 className="text-[30px] leading-tight text-[#2d415f] sm:text-[36px] md:text-[42px]">企业在适应 AI，个体也在适应 AI</h2>
        <p className="mt-4 max-w-[780px] text-[16px] text-[#5c7393]">
          如果你正在思考 AI 如何进入业务，或如何提升个人竞争力，可以先从一次交流开始。
        </p>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[18px] border border-[#d1def0] bg-white/86 p-5">
            <h3 className="text-[22px] text-[#314a67]">企业 AI 落地交流</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[#607896]">
              一起梳理 AI 应用场景，判断适合切入的业务流程。
            </p>
            <HoverContactButton label="添加微信" imageSrc={milyWx} imageAlt="微信二维码" />
          </article>

          <article className="rounded-[18px] border border-[#d1def0] bg-white/86 p-5">
            <h3 className="text-[22px] text-[#314a67]">个人 AI 成长交流</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[#607896]">
              一起梳理你的学习、工作与职业发展中的 AI 使用路径。
            </p>
            <HoverContactButton label="添加QQ" imageSrc={milyQq} imageAlt="QQ二维码" />
          </article>
        </div>
      </div>
    </section>
  );
}
