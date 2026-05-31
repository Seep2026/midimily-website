import { useMemo, useState } from 'react';
import { solutions, solutionCategoryCards } from '../data/solutionsData';
import { SolutionCard } from './solutions/SolutionCard';
import { SolutionCategoryCard } from './solutions/SolutionCategoryCard';

export function SolutionsPage() {
  const [activeFilter, setActiveFilter] = useState(null);
  const filteredSolutions = useMemo(() => {
    if (!activeFilter) {
      return solutions;
    }

    return solutions.filter((solution) => solution.type === activeFilter);
  }, [activeFilter]);

  const handleSelectFilter = (type) => {
    setActiveFilter((current) => (current === type ? null : type));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcf8f2] px-4 pb-20 pt-28 text-[#324967] sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_18%_18%,rgba(124,146,187,0.10),transparent_30%),radial-gradient(circle_at_82%_10%,rgba(140,199,189,0.11),transparent_28%),linear-gradient(180deg,rgba(247,250,255,0.78),rgba(252,248,242,0))]" />
      <div className="pointer-events-none absolute left-0 right-0 top-[280px] mx-auto h-px max-w-[1220px] bg-gradient-to-r from-transparent via-[#d9e5f3]/55 to-transparent" />

      <section className="relative mx-auto w-full max-w-[1220px]">
        <div className="max-w-[760px] space-y-3">
          <h1 className="text-[34px] leading-tight text-[#2e415f] sm:text-[42px] md:text-[48px]">
            精选 AI 方案
          </h1>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-[#617895] sm:text-[16px]">
            一页页读懂 AI 落地、成长与实践方法。
          </p>
          <p className="text-[12px] text-[#8a9bb1]">Web Deck = 可在线阅读的方案简报</p>
        </div>
      </section>

      <section className="relative mx-auto mt-7 w-full max-w-[1220px]">
        <div className="grid gap-3 md:grid-cols-2">
          {solutionCategoryCards.map((category) => (
            <SolutionCategoryCard
              key={category.type}
              category={category}
              isSelected={activeFilter === category.type}
              onSelect={handleSelectFilter}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-10 w-full max-w-[1220px]">
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredSolutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>

        {filteredSolutions.length === 0 ? (
          <div className="mt-6 rounded-[18px] border border-dashed border-[#cfdbea] bg-white/68 p-6 text-[14px] text-[#6a819f]">
            暂无该方向方案，后续将由 Codex 持续生成并发布。
          </div>
        ) : null}
      </section>
    </main>
  );
}
