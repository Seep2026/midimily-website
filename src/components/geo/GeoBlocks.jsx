export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="面包屑" className="text-[13px] text-[#6e86a5]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {index === items.length - 1 ? (
              <span className="text-[#3f5f87]">{item.name}</span>
            ) : (
              <a href={item.path} className="transition hover:text-[#496f9d]">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PillList({ items, tone = 'blue' }) {
  const toneClass =
    tone === 'green'
      ? 'border-[#cce5df] bg-[#f0fbf7] text-[#5c8f86]'
      : 'border-[#d3e0f0] bg-[#f4f8fd] text-[#5f7da5]';

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={`rounded-full border px-3 py-1.5 text-[13px] ${toneClass}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function ShortAnswer({ children }) {
  return (
    <aside className="rounded-[18px] border border-[#cfdff0] bg-[#f7fbff] p-5">
      <h2 className="text-[20px] text-[#2f4968]">短答案</h2>
      <p className="mt-3 text-[16px] leading-relaxed text-[#536f92]">{children}</p>
    </aside>
  );
}

export function FaqList({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section id="faq" className="mt-12">
      <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">常见问题</h2>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-[16px] border border-[#d5e2f0] bg-white/78 p-5">
            <summary className="cursor-pointer text-[17px] font-medium text-[#314a68]">
              {item.question}
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5f7898]">{item.answer}</p>
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
    <section className="mt-12">
      <h2 className="text-[28px] leading-tight text-[#2e415f] md:text-[34px]">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-[18px] border border-[#d7e3f0] bg-white/78 p-5 transition hover:border-[#b9cce4] hover:bg-white"
          >
            <h3 className="text-[20px] text-[#314a68]">{link.title}</h3>
            {link.description ? (
              <p className="mt-2 text-[14px] leading-relaxed text-[#627c9b]">{link.description}</p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
