import { homeHeroContent } from '../../content/homeEditorial';
import './HomeHero.css';

export function HomeHero() {
  const primaryPath = homeHeroContent.paths.find((path) => path.role === 'primary');
  const secondaryPath = homeHeroContent.paths.find((path) => path.role === 'secondary');

  return (
    <section id="hero" className="editorial-home-hero" aria-labelledby="editorial-home-hero-title">
      <div className="editorial-home-hero__shell">
        <div className="editorial-home-hero__statement">
          <h1 id="editorial-home-hero-title" className="editorial-home-hero__title">
            {homeHeroContent.title.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </h1>
          <p className="editorial-home-hero__summary">{homeHeroContent.summary}</p>
          <a className="editorial-home-hero__appointment" href="#appointment">开始一次交流</a>
        </div>

        <div className="editorial-home-hero__paths">
          {primaryPath ? (
            <a className="editorial-home-hero__primary-path" href={primaryPath.href}>
              <span className="editorial-home-hero__primary-name">{primaryPath.name}</span>
              <span className="editorial-home-hero__primary-description">{primaryPath.description}</span>
            </a>
          ) : null}

          {secondaryPath ? (
            <a className="editorial-home-hero__secondary-path" href={secondaryPath.href}>
              <span className="editorial-home-hero__secondary-name">{secondaryPath.name}</span>
              <span className="editorial-home-hero__secondary-description">{secondaryPath.description}</span>
            </a>
          ) : null}

          <aside className="editorial-home-hero__annotation" aria-label="编辑批注">
            <p>{homeHeroContent.editorialNote}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
