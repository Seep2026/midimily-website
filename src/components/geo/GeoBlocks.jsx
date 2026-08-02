import './GeoBlocks.css';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="面包屑" className="editorial-breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index > 0 ? <span className="editorial-breadcrumbs__separator" aria-hidden="true">/</span> : null}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <a href={item.path}>{item.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PillList({ items, tone = 'blue' }) {
  return (
    <ul className={`editorial-plain-list editorial-plain-list--${tone}`}>
      {items.map((item) => (
        <li key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ShortAnswer({ children }) {
  return (
    <aside className="editorial-short-answer" aria-label="短答案">
      <h2>短答案</h2>
      <p>{children}</p>
    </aside>
  );
}

export function FaqList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section id="faq" className="editorial-faq">
      <h2>常见问题</h2>
      <div className="editorial-faq__items">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LinkGrid({ title, links }) {
  if (!links?.length) {
    return null;
  }

  return (
    <section className="editorial-link-list">
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href}>
              <h3>{link.title}</h3>
              {link.description ? <p>{link.description}</p> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
