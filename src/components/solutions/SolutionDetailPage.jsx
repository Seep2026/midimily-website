import { useEffect } from 'react';
import { getSolutionBySlug } from '../../data/solutionsData';

export function SolutionDetailPage({ slug }) {
  const solution = getSolutionBySlug(slug);
  const targetUrl = `/solutions/${slug}/deck/`;

  useEffect(() => {
    if (targetUrl) {
      window.location.replace(targetUrl);
    }
  }, [targetUrl]);

  if (!solution) {
    return (
      <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-8 md:pt-32">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">方案不存在</h1>
          <p className="mt-3 text-[#627896]">这个方案可能还没有发布，或路径有误。</p>
          <a href="/solutions" className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white">
            返回方案库
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-8 md:pt-32">
      <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
        <span className="inline-flex rounded-full border border-[#cfe0f4] bg-[#f0f6fd] px-3 py-1 text-[12px] text-[#6284af]">
          正在打开 Web Deck
        </span>
        <h1 className="mt-4 text-[32px] leading-tight text-[#2e415f]">{solution.title}</h1>
        <p className="mt-3 text-[#627896]">{solution.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={targetUrl}
            className="inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white"
          >
            打开 Web Deck
          </a>
          <a
            href="/solutions"
            className="inline-flex min-h-11 items-center rounded-[12px] border border-[#d1dff0] bg-white/86 px-4 text-[14px] text-[#4e709a]"
          >
            返回方案库
          </a>
        </div>
      </section>
    </main>
  );
}
