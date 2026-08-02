export function EditorialListItem({ contentPath, title, summary, meta, href, headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <article className={`editorial-list-item${contentPath ? '' : ' editorial-list-item--without-path'}`}>
      {contentPath ? <p className="editorial-list-item__path">{contentPath}</p> : null}
      <div className="editorial-list-item__body">
        <Heading className="editorial-list-item__title">
          <a href={href}>{title}</a>
        </Heading>
        {summary ? <p className="editorial-list-item__summary">{summary}</p> : null}
      </div>
      {meta ? <p className="editorial-list-item__meta">{meta}</p> : null}
    </article>
  );
}
