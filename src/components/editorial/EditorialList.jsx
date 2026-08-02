import { EditorialListItem } from './EditorialListItem';
import './EditorialList.css';

export function EditorialList({
  items,
  heading,
  headingLevel = 'h2',
  itemHeadingLevel = 'h2',
  emptyMessage,
  emptyAction,
}) {
  const Heading = headingLevel;
  const hasItems = Boolean(items?.length);

  return (
    <section className={`editorial-list${heading ? ' editorial-list--section' : ''}`} aria-label={heading ? undefined : '内容列表'}>
      {heading ? <Heading className="editorial-list__heading">{heading}</Heading> : null}

      {hasItems ? (
        <ol className="editorial-list__items">
          {items.map((item) => (
            <li key={item.href}>
              <EditorialListItem {...item} headingLevel={itemHeadingLevel} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="editorial-list__empty" role="status">
          <p>{emptyMessage || '目前还没有已发布的内容。'}</p>
          {emptyAction ? <a href={emptyAction.href}>{emptyAction.label}</a> : null}
        </div>
      )}
    </section>
  );
}
