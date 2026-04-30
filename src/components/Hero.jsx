import { heroStats } from '../data/homeV2Data';
import { HeroNetworkEffect } from './HeroNetworkEffect';

export function Hero() {
  return (
    <section id="hero" className="px-4 pb-16 pt-28 sm:px-6 md:px-8 md:pt-36 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid w-full max-w-[1220px] items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="space-y-7">
          <h1 className="text-[34px] leading-[1.18] tracking-tight text-[#2d3f5d] sm:text-[42px] md:text-[54px]">
            企业的 AI 落地伙伴
            <br />
            个体的 AI 成长顾问
          </h1>

          <div className="flex flex-wrap gap-3">
            <a
              href="#business"
              className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-5 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
            >
              了解企业服务
            </a>
            <a
              href="#individual"
              className="inline-flex min-h-11 items-center rounded-[12px] border border-[#d2dff0] bg-white/90 px-5 text-[14px] text-[#4f6f97] transition hover:border-[#b4cae6] hover:bg-white"
            >
              了解个人成长
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {heroStats.map((item) => (
              <article
                key={item.value}
                className="rounded-[14px] border border-[#d9e3f2] bg-[#fbfdff] p-3 sm:p-4 shadow-[0_8px_18px_rgba(112,136,173,0.10)]"
              >
                <strong className="block text-[15px] text-[#304560] sm:text-[16px]">{item.value}</strong>
                <span className="mt-1 block text-[12px] text-[#68809f] sm:text-[13px]">{item.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div>
          <HeroNetworkEffect />
        </div>
      </div>
    </section>
  );
}
