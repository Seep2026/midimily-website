import { navItems } from '../data/homeV2Data';
import brandLogo from '../styles/LogoScandina.png';

export function Header() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  const isItemActive = (href) => {
    if (href.startsWith('/#')) {
      return currentPath === '/' && currentHash === href.slice(1);
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <header className="editorial-site-header">
      <div className="editorial-site-header__inner">
        <a href="/#hero" className="editorial-site-header__brand" aria-label="米地米立首页">
          <span className="editorial-site-header__mark">
            <img
              src={brandLogo}
              alt=""
              aria-hidden="true"
              className="editorial-site-header__logo"
            />
          </span>
          <span className="editorial-site-header__identity">
            <span className="editorial-site-header__name">米地米立</span>
            <span className="editorial-site-header__descriptor">
              企业 AI 落地 · 个体 AI 成长
            </span>
          </span>
        </a>

        <nav className="editorial-site-header__nav" aria-label="主导航">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="editorial-site-header__mobile">
          <details className="editorial-site-header__menu">
            <summary>
              菜单
            </summary>
            <nav className="editorial-site-header__menu-panel" aria-label="移动端导航">
              {navItems.map((item) => {
                const isActive = isItemActive(item.href);

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
