export function SolutionCategoryCard({ category, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.type)}
      aria-label={`筛选${category.title}`}
      className={`editorial-solution-filter${isSelected ? ' is-selected' : ''}`}
      aria-pressed={isSelected}
    >
      <div>
        <span>
          {category.type === 'enterprise' ? '企业方向' : '个体方向'}
        </span>
      </div>
      <h2>{category.title}</h2>
      <p>{category.description}</p>
      <small>{category.keywords}</small>
    </button>
  );
}
