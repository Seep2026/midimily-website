export function SolutionCategoryCard({ category, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.type)}
      className={`group min-h-11 rounded-[20px] border bg-gradient-to-br p-5 text-left transition sm:p-6 ${
        isSelected
          ? `${category.selectedBorder} ${category.selectedGradient} shadow-[0_10px_22px_rgba(116,139,170,0.12)]`
          : `${category.border} ${category.gradient} hover:border-[#bccde5]`
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[12px] text-[#5f7da5]">
          {category.type === 'enterprise' ? '企业方向' : '个体方向'}
        </span>
        <span
          className={`h-2.5 w-2.5 rounded-full transition ${
            isSelected
              ? `${category.selectedDot} animate-[pulse_1.6s_ease-in-out_infinite] shadow-[0_0_0_4px_rgba(124,146,187,0.16)]`
              : 'bg-[#c9d7e9] group-hover:bg-[#aebfda]'
          }`}
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-4 text-[24px] leading-tight text-[#304763]">{category.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#5f7493]">{category.description}</p>
      <p className="mt-5 rounded-[12px] border border-white/65 bg-white/72 px-3 py-2 text-[13px] text-[#6181a8]">
        {category.keywords}
      </p>
    </button>
  );
}
