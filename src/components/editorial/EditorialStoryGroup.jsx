import { getHomeEditorialStories } from '../../content/homeEditorial';
import './EditorialStoryGroup.css';

export function EditorialStoryGroup() {
  const stories = getHomeEditorialStories();
  const primary = stories.find((story) => story.role === 'primary');
  const secondary = stories.find((story) => story.role === 'secondary');
  const tertiary = stories.find((story) => story.role === 'tertiary');

  // The pattern needs a real primary story to express editorial hierarchy safely.
  if (!primary) {
    return null;
  }

  return (
    <section
      id="solutions-preview"
      className="editorial-story-group"
      aria-labelledby="editorial-story-group-title"
    >
      <div className="editorial-story-group__shell">
        <div className="editorial-story-group__layout">
          <article className="editorial-story-group__primary">
            <p className="editorial-story-group__content-path">{primary.contentPath}</p>
            <h2 id="editorial-story-group-title" className="editorial-story-group__primary-title">
              <a href={primary.path}>{primary.title}</a>
            </h2>
            {primary.shortDescription ? (
              <p className="editorial-story-group__primary-summary">{primary.shortDescription}</p>
            ) : null}
            {primary.editorialNote ? (
              <aside className="editorial-story-group__annotation" aria-label="编辑批注">
                <p>{primary.editorialNote}</p>
              </aside>
            ) : null}
          </article>

          {secondary ? (
            <article className="editorial-story-group__secondary">
              <p className="editorial-story-group__content-path">{secondary.contentPath}</p>
              <h3 className="editorial-story-group__secondary-title">
                <a href={secondary.path}>{secondary.title}</a>
              </h3>
              {secondary.shortDescription ? (
                <p className="editorial-story-group__secondary-summary">{secondary.shortDescription}</p>
              ) : null}
            </article>
          ) : null}
        </div>

        {tertiary ? (
          <article className="editorial-story-group__tertiary">
            <p className="editorial-story-group__content-path">{tertiary.contentPath}</p>
            <h3 className="editorial-story-group__tertiary-title">
              <a href={tertiary.path}>{tertiary.title}</a>
            </h3>
            {tertiary.shortDescription ? (
              <p className="editorial-story-group__tertiary-summary">{tertiary.shortDescription}</p>
            ) : null}
          </article>
        ) : null}
      </div>
    </section>
  );
}
