import { heroEntryCards, heroStats } from '../data/homeV2Data';
import { HeroNetworkEffect } from './HeroNetworkEffect';

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-14 pt-28 sm:px-6 md:px-8 md:pt-[8.5rem] lg:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_18%_20%,rgba(124,146,187,0.11),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(140,199,189,0.12),transparent_28%),radial-gradient(circle_at_50%_86%,rgba(235,205,126,0.10),transparent_28%),linear-gradient(180deg,rgba(247,250,255,0.74),rgba(252,248,242,0))]" />
      <div className="relative mx-auto grid w-full max-w-[1220px] items-center gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
        <div className="max-w-[680px] space-y-6">
          <span className="inline-flex rounded-full border border-[#d5e3f4] bg-white/70 px-3 py-1 text-[12px] text-[#6684aa] shadow-[0_8px_18px_rgba(86,111,148,0.06)]">
            不只看趋势，先跑一个小闭环。
          </span>
          <h1 className="text-[34px] leading-[1.16] tracking-tight text-[#2d3f5d] sm:text-[42px] md:text-[54px]">
            企业的 AI 落地伙伴
            <br />
            个体的 AI 成长顾问
          </h1>
          <p className="max-w-[620px] text-[16px] leading-relaxed text-[#607795] sm:text-[17px]">
            让 AI 进入真实业务，也进入真实成长。
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="/solutions"
              className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-5 text-[14px] font-medium text-white transition active:translate-y-[1px] hover:bg-[#6f86b0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf8f2]"
            >
              查看精选方案
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center rounded-[12px] border border-[#d2dff0] bg-white/90 px-5 text-[14px] text-[#4f6f97] transition active:translate-y-[1px] hover:border-[#b4cae6] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf8f2]"
            >
              预约一次交流
            </a>
          </div>

          <div className="hidden flex-wrap gap-2.5 pt-1 md:flex">
            {heroStats.map((item) => (
              <span
                key={item.value}
                className="inline-flex items-center gap-2 rounded-[12px] border border-[#d9e3f2] bg-white/52 px-3 py-2 text-[12px] text-[#6f819b]"
              >
                <strong className="font-medium text-[#415a7a]">{item.value}</strong>
                {item.label ? <span>{item.label}</span> : null}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[460px] lg:max-w-none">
          <HeroNetworkEffect />
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid w-full max-w-[1220px] gap-3 md:grid-cols-3 lg:mt-10">
        {heroEntryCards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            aria-label={`${card.cta}：${card.title}`}
            className="group cursor-pointer rounded-[22px] border border-[#d8e4f2] bg-white/64 p-4 shadow-[0_12px_30px_rgba(85,111,148,0.07)] backdrop-blur transition duration-200 active:translate-y-[1px] hover:-translate-y-[3px] hover:border-[#bfd0e8] hover:bg-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf8f2] sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-white/70 bg-white/76 px-2.5 py-1 text-[11px] text-[#607c9e]">
                {card.tag}
              </span>
              <span className="font-mono text-[12px] text-[#9ba9bb]">{card.progress}</span>
            </div>
            <h2 className="mt-4 text-[21px] leading-tight text-[#304763]">{card.title}</h2>
            <p className="mt-2 min-h-[44px] text-[14px] leading-relaxed text-[#607795]">{card.summary}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={`h-1.5 flex-1 rounded-full ${
                  card.tone === 'individual'
                    ? 'bg-gradient-to-r from-[#8cc7bd] to-[#d8eee9]'
                    : card.tone === 'library'
                      ? 'bg-gradient-to-r from-[#8f9cd6] to-[#e7e8f7]'
                      : 'bg-gradient-to-r from-[#7c92bb] to-[#dce7f6]'
                }`}
              />
              <span className="text-[13px] font-medium text-[#55769f] transition group-hover:text-[#405f88]">
                {card.cta}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
