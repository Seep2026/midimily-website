import { getDeckBySlug, solutionTypeLabels } from '../../data/solutionsData';

function SolutionDeckPreview({ solution }) {
  const deck = getDeckBySlug(solution.slug);
  const coverSlide = deck?.slides?.[0];
  const isEnterprise = solution.type === 'enterprise';
  const previewTitle = coverSlide?.title || solution.title;

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-[18px] border ${
        isEnterprise ? 'border-[#d7e1f3] bg-[#f4f7ff]' : 'border-[#d1e5df] bg-[#f2fbf8]'
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isEnterprise ? 'from-[#f8faff] via-[#eef4ff] to-[#f3f0ff]' : 'from-[#f7fffc] via-[#edf9ff] to-[#eef8f4]'
        }`}
      />
      <div
        className={`absolute right-[-18%] top-[-26%] h-[72%] w-[50%] rounded-full border ${
          isEnterprise ? 'border-[#c8d4f0]/70 bg-[#e8edff]/42' : 'border-[#c6e3dd]/70 bg-[#e4f8f2]/48'
        }`}
      />
      <div className="absolute bottom-[18%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#c8d4e5]/70 to-transparent" />
      <div className="absolute left-[12%] top-[28%] h-2 w-2 rounded-full bg-[#89a5cd]/72" />
      <div className="absolute left-[21%] top-[47%] h-1.5 w-1.5 rounded-full bg-[#9fc7c1]/72" />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
        <span className="h-2 w-2 rounded-full bg-[#8fa9cf]/70" aria-hidden="true" />
        <div className="max-w-[88%]">
          <h4 className="text-[20px] leading-tight text-[#2f4867] sm:text-[25px]">{previewTitle}</h4>
        </div>
        <span className="h-px w-24 bg-gradient-to-r from-[#c6d5e8]/70 to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}

export function SolutionCard({ solution }) {
  const href = `/solutions/${solution.slug}/deck/`;
  const typeLabel = solutionTypeLabels[solution.type] || solution.category;

  return (
    <a
      href={href}
      aria-label={`打开《${solution.title}》Web Deck`}
      className="block cursor-pointer rounded-[24px] border border-[#d8e3f1] bg-white/70 p-2.5 shadow-[0_12px_30px_rgba(90,115,150,0.07)] transition duration-200 hover:-translate-y-[3px] hover:border-[#b9cbe4] hover:bg-white/86 hover:shadow-[0_16px_36px_rgba(90,115,150,0.10)] focus:outline-none focus:ring-2 focus:ring-[#9bb1d4] focus:ring-offset-2 focus:ring-offset-[#fcf8f2]"
    >
      <SolutionDeckPreview solution={solution} />
      <div className="px-2 pb-2 pt-4 sm:px-3">
        <h3 className="text-[18px] leading-tight text-[#304763] sm:text-[20px]">{solution.title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#d4e1ef] bg-[#f4f8fd] px-2.5 py-1 text-[11px] text-[#6682a5]">
            {typeLabel}
          </span>
          <span className="rounded-full border border-[#d4e1ef] bg-[#f8fbff] px-2.5 py-1 text-[11px] text-[#6682a5]">
            {solution.pageCount} 页
          </span>
        </div>
      </div>
    </a>
  );
}
