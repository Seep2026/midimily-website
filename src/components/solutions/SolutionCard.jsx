import { solutionTypeLabels } from '../../data/solutionsData';

export function SolutionCard({ solution }) {
  const href = `/solutions/${solution.slug}/`;
  const hasDeckSource = Boolean(solution.deckUrl || solution.slidevUrl || solution.fallbackDeckUrl);
  const isAvailable = solution.status === 'published' && hasDeckSource;
  const typeLabel = solutionTypeLabels[solution.type] || solution.category;
  const metaContent = (
    <div className="editorial-solution-row__body">
      <p className="editorial-solution-row__path">{typeLabel} · {solution.pageCount} 页{!isAvailable ? ' · 即将开放' : ''}</p>
      <h3>{solution.title}</h3>
      <p>{solution.description}</p>
      {solution.audience?.length ? (
        <p className="editorial-solution-row__audience">
          适合：{solution.audience.slice(0, 3).join('、')}
        </p>
      ) : null}
    </div>
  );

  if (!isAvailable) {
    return (
      <article className="editorial-solution-row is-unavailable" aria-label={`《${solution.title}》方案正在整理中`}>
        {metaContent}
      </article>
    );
  }

  return (
    <a
      href={href}
      aria-label={`查看《${solution.title}》方案详情`}
      className="editorial-solution-row"
    >
      {metaContent}
    </a>
  );
}
