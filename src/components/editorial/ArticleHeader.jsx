import './ArticleHeader.css';

export function ArticleHeader({ contentType, contentTypeHref, title, summary, meta, editorialNote }) {
  const hasEditorialNote = Boolean(editorialNote);
  const rootClassName = [
    'editorial-token-scope',
    'editorial-article-header',
    hasEditorialNote ? 'editorial-article-header--with-note' : 'editorial-article-header--without-note',
  ].join(' ');

  return (
    <header className={rootClassName}>
      <div className="editorial-article-header__layout">
        <div className="editorial-article-header__reading-axis">
          {contentType ? (
            contentTypeHref ? (
              <a className="editorial-article-header__content-type" href={contentTypeHref}>
                {contentType}
              </a>
            ) : (
              <p className="editorial-article-header__content-type">{contentType}</p>
            )
          ) : null}

          <h1 className="editorial-article-header__title">{title}</h1>

          {summary ? <p className="editorial-article-header__summary">{summary}</p> : null}
          {meta ? <p className="editorial-article-header__meta">{meta}</p> : null}
        </div>

        {hasEditorialNote ? (
          <aside className="editorial-article-header__annotation" aria-label="编辑批注">
            <p>{editorialNote}</p>
          </aside>
        ) : null}
      </div>
    </header>
  );
}
