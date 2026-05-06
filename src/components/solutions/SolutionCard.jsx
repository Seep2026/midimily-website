import { getDeckBySlug, getSolutionVersionLabel } from '../../data/solutionsData';

function SolutionDeckPreview({ solution }) {
  const deck = getDeckBySlug(solution.slug);
  const coverSlide = deck?.slides?.[0];
  const isEnterprise = solution.type === 'enterprise';
  const previewTitle = coverSlide?.title || solution.title;
  const previewSubtitle = coverSlide?.subtitle || solution.subtitle;
  const previewEyebrow = coverSlide?.eyebrow || solution.category;
  const versionLabel = getSolutionVersionLabel(solution);

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-[15px] border ${
        isEnterprise ? 'border-[#d6e0f4] bg-[#f4f7ff]' : 'border-[#d1e5df] bg-[#f2fbf8]'
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isEnterprise ? 'from-[#f8faff] via-[#eef4ff] to-[#f3f0ff]' : 'from-[#f7fffc] via-[#edf9ff] to-[#eef8f4]'
        }`}
      />
      <div
        className={`absolute right-[-16%] top-[-24%] h-[70%] w-[48%] rounded-full border ${
          isEnterprise ? 'border-[#c8d4f0] bg-[#e8edff]/58' : 'border-[#c6e3dd] bg-[#e4f8f2]/62'
        }`}
      />
      <div className="absolute bottom-[18%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#becde1] to-transparent" />
      <div className="absolute left-[11%] top-[27%] h-2 w-2 rounded-full bg-[#89a5cd]" />
      <div className="absolute left-[20%] top-[46%] h-1.5 w-1.5 rounded-full bg-[#9fc7c1]" />

      <div className="relative flex h-full flex-col justify-between p-4 sm:p-6">
        <span className="inline-flex w-fit rounded-full border border-white/78 bg-white/72 px-3 py-1 text-[11px] text-[#5f7da5]">
          {previewEyebrow}
        </span>
        <div className="max-w-[86%]">
          <h4 className="text-[20px] leading-tight text-[#2f4867] sm:text-[24px]">{previewTitle}</h4>
          <p className="mt-2 text-[13px] leading-relaxed text-[#647c9d] sm:text-[15px]">{previewSubtitle}</p>
        </div>
        {versionLabel ? (
          <span className="absolute bottom-3 right-4 text-[11px] text-[#8a96a8] sm:bottom-4 sm:right-5 sm:text-[12px]">
            更新于 {versionLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function SolutionCard({ solution }) {
  const href = `/solutions/${solution.slug}/deck/`;

  return (
    <a
      href={href}
      aria-label={`打开《${solution.title}》Web Deck`}
      className="block cursor-pointer rounded-[18px] border border-[#d5e1ef] bg-[#fdfefe] p-3 shadow-[0_8px_18px_rgba(113,134,165,0.08)] transition hover:-translate-y-[2px] hover:border-[#b7c9e3] hover:shadow-[0_12px_24px_rgba(113,134,165,0.12)] focus:outline-none focus:ring-2 focus:ring-[#9bb1d4] focus:ring-offset-2 focus:ring-offset-[#fcf8f2]"
    >
      <SolutionDeckPreview solution={solution} />
    </a>
  );
}
