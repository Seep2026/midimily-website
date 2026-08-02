import './EditorialListingHeader.css';

export function EditorialListingHeader({ breadcrumbs, title, description, editorialNote }) {
  return (
    <header className="editorial-listing-header">
      {breadcrumbs?.length ? (
        <nav className="editorial-listing-header__breadcrumbs" aria-label="面包屑">
          <ol>
            {breadcrumbs.map((item, index) => {
              const isCurrent = index === breadcrumbs.length - 1;

              return (
                <li key={item.path} className={isCurrent ? 'is-current' : undefined}>
                  {index > 0 ? <span className="editorial-listing-header__separator" aria-hidden="true">/</span> : null}
                  {isCurrent ? <span aria-current="page">{item.name}</span> : <a href={item.path}>{item.name}</a>}
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}

      <div className={`editorial-listing-header__layout${editorialNote ? ' has-note' : ''}`}>
        <div className="editorial-listing-header__reading-axis">
          <h1 className="editorial-listing-header__title">{title}</h1>
          {description ? <p className="editorial-listing-header__description">{description}</p> : null}
        </div>

        {editorialNote ? (
          <aside className="editorial-listing-header__note" aria-label="编辑说明">
            <p>{editorialNote}</p>
          </aside>
        ) : null}
      </div>
    </header>
  );
}
