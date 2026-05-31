export function SolutionCategoryCard({ category, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.type)}
      className={`group min-h-11 rounded-[22px] border bg-gradient-to-br p-4 text-left shadow-[0_10px_28px_rgba(86,111,148,0.06)] transition duration-200 hover:-translate-y-[2px] sm:p-5 ${
        isSelected
          ? `${category.selectedBorder} ${category.selectedGradient} shadow-[0_14px_32px_rgba(86,111,148,0.09)]`
          : `${category.border} ${category.gradient} hover:border-[#bccde5] hover:bg-white/70`
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-white/70 bg-white/72 px-2.5 py-1 text-[11px] text-[#607c9e]">
          {category.type === 'enterprise' ? '企业方向' : '个体方向'}
        </span>
        <span
          className={`h-2.5 w-2.5 rounded-full transition duration-200 ${
            isSelected
              ? `${category.selectedDot} animate-[pulse_1.6s_ease-in-out_infinite] shadow-[0_0_0_4px_rgba(124,146,187,0.16)]`
              : 'bg-[#c9d7e9] group-hover:bg-[#aebfda]'
          }`}
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-3 text-[21px] leading-tight text-[#304763] sm:text-[22px]">{category.title}</h2>
      <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-[#5f7493]">{category.description}</p>
      <div className="mt-4 flex items-center gap-3">
        <span className="h-1.5 min-w-[120px] flex-1 rounded-full bg-white/74">
          <span
            className={`block h-full rounded-full ${
              category.type === 'enterprise'
                ? 'w-[72%] bg-gradient-to-r from-[#7c92bb] to-[#cbd7ee]'
                : 'w-[72%] bg-gradient-to-r from-[#8cc7bd] to-[#d5ece8]'
            }`}
          />
        </span>
        <span className="hidden rounded-full border border-white/70 bg-white/68 px-2.5 py-1 text-[11px] text-[#6682a5] sm:inline-flex">
          {category.keywords}
        </span>
      </div>
    </button>
  );
}
