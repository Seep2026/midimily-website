import { useMemo, useState } from 'react';
import { solutions, solutionCategoryCards } from '../data/solutionsData';
import { SolutionCard } from './solutions/SolutionCard';
import { SolutionCategoryCard } from './solutions/SolutionCategoryCard';

function getInitialAudienceFilter() {
  const audience = new URLSearchParams(window.location.search).get('audience');

  if (audience === 'enterprise' || audience === 'individual') {
    return audience;
  }

  return null;
}

export function SolutionsPage() {
  const [activeFilter, setActiveFilter] = useState(getInitialAudienceFilter);
  const mobileFilters = [
    { type: null, label: '全部' },
    { type: 'enterprise', label: '企业' },
    { type: 'individual', label: '个体' },
  ];
  const filteredSolutions = useMemo(() => {
    if (!activeFilter) {
      return solutions;
    }

    return solutions.filter((solution) => solution.type === activeFilter);
  }, [activeFilter]);

  const handleSelectFilter = (type) => {
    const nextFilter = activeFilter === type ? null : type;
    setActiveFilter(nextFilter);
    const query = nextFilter ? `?audience=${nextFilter}` : '';
    window.history.replaceState(null, '', `/solutions${query}`);
  };

  const handleSelectMobileFilter = (type) => {
    setActiveFilter(type);
    const query = type ? `?audience=${type}` : '';
    window.history.replaceState(null, '', `/solutions${query}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcf8f2] px-4 pb-20 pt-24 text-[#324967] sm:px-6 md:px-8 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_18%_10%,rgba(124,146,187,0.08),transparent_30%),radial-gradient(circle_at_82%_4%,rgba(140,199,189,0.08),transparent_28%),linear-gradient(180deg,rgba(247,250,255,0.60),rgba(252,248,242,0))]" />

      <section className="relative mx-auto w-full max-w-[1220px]">
        <div className="flex rounded-full border border-[#d6e2f0] bg-white/66 p-1 shadow-[0_10px_26px_rgba(88,112,148,0.06)] md:hidden">
          {mobileFilters.map((filter) => {
            const isSelected = activeFilter === filter.type;

            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => handleSelectMobileFilter(filter.type)}
                aria-label={filter.type ? `筛选${filter.label}方案` : '显示全部方案'}
                className={`min-h-10 flex-1 cursor-pointer rounded-full px-3 text-[13px] font-medium transition active:translate-y-[1px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9db3d7] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isSelected
                    ? 'bg-[#7c92bb] text-white shadow-[0_8px_18px_rgba(124,146,187,0.18)]'
                    : 'text-[#60799b] hover:bg-white/72'
                }`}
                aria-pressed={isSelected}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-2">
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

      <section className="relative mx-auto mt-4 w-full max-w-[1220px] md:mt-8">
        <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
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
