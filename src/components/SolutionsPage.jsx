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
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-8">
      <section className="mx-auto w-full max-w-[1220px]">
        <div className="max-w-[820px] space-y-4">
          <h1 className="text-[34px] leading-tight text-[#2e415f] sm:text-[42px] md:text-[48px]">
            精选 AI 方案
          </h1>
          <p className="text-[16px] leading-relaxed text-[#627896]">
            面向企业 AI 落地与个体 AI 成长，以 Web Deck 形式呈现可浏览、可讨论、可行动的方案。
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1220px]">
        <div className="grid gap-4 lg:grid-cols-2">
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

      <section className="mx-auto mt-12 w-full max-w-[1220px]">
        <div className="grid gap-4 lg:grid-cols-2">
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
