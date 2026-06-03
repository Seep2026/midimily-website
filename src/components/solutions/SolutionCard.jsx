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
  const href = solution.fallbackDeckUrl || `/solutions/${solution.slug}/deck/`;
  const hasDeckSource = Boolean(solution.deckUrl || solution.slidevUrl || solution.fallbackDeckUrl);
  const isAvailable = solution.status === 'published' && hasDeckSource;
  const typeLabel = solutionTypeLabels[solution.type] || solution.category;
  const shortTypeLabel = solution.type === 'enterprise' ? '企业方案' : '个体方案';
  const baseClass =
    'block rounded-[20px] border border-[#d8e3f1] bg-white/70 p-2 shadow-[0_12px_30px_rgba(90,115,150,0.07)] sm:rounded-[24px] sm:p-2.5';
  const metaContent = (
    <div className="px-1.5 pb-1.5 pt-2 sm:px-3 sm:pb-2 sm:pt-3">
      <div className="flex flex-wrap gap-2 max-sm:text-[10px]">
        <span className="rounded-full border border-[#d4e1ef] bg-[#f4f8fd] px-2.5 py-1 text-[11px] text-[#6682a5]">
          <span className="sm:hidden">{shortTypeLabel} · {solution.pageCount} 页</span>
          <span className="max-sm:hidden">{typeLabel}</span>
        </span>
        <span className="rounded-full border border-[#d4e1ef] bg-[#f8fbff] px-2.5 py-1 text-[11px] text-[#6682a5] max-sm:hidden">
          {solution.pageCount} 页
        </span>
        {!isAvailable ? (
          <span className="rounded-full border border-[#d8e3ef] bg-[#f7fafd] px-2.5 py-1 text-[11px] text-[#8a9bb2]">
            即将开放
          </span>
        ) : null}
      </div>
      {!isAvailable ? <p className="mt-2 text-[12px] text-[#8a9bb2]">内容整理中</p> : null}
    </div>
  );

  if (!isAvailable) {
    return (
      <article className={`${baseClass} cursor-default opacity-80`} aria-label={`《${solution.title}》方案正在整理中`}>
        <SolutionDeckPreview solution={solution} />
        {metaContent}
      </article>
    );
  }

  return (
    <a
      href={href}
      aria-label={`打开《${solution.title}》Web Deck`}
      className={`${baseClass} cursor-pointer transition duration-200 active:translate-y-[1px] hover:-translate-y-[3px] hover:border-[#b9cbe4] hover:bg-white/86 hover:shadow-[0_16px_36px_rgba(90,115,150,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb1d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf8f2]`}
    >
      <SolutionDeckPreview solution={solution} />
      {metaContent}
    </a>
  );
}
