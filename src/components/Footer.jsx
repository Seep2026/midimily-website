import { footerResourceLinks, navItems } from '../data/homeV2Data';

export function Footer() {
  return (
    <footer className="editorial-site-footer">
      <div className="editorial-site-footer__inner">
        <section className="editorial-site-footer__identity">
          <h2>深圳市米地咨询有限公司</h2>
          <p>
            深圳市宝安区新安街道顺丰路安乐物业大厦 512
            <br />
            粤ICP备2026099384号
          </p>
        </section>

        <nav className="editorial-site-footer__nav" aria-label="页脚导航">
          <h3>导航</h3>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="editorial-site-footer__nav" aria-label="延伸阅读">
          <h3>延伸阅读</h3>
          <ul>
            {footerResourceLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="editorial-site-footer__social">
          <h3>社交媒体</h3>
          <ul>
            <li>视频号：米立AI</li>
            <li>
              <span>小红书：</span>
              <a
                href="https://xhslink.com/m/7J4H4sQL4yB"
                target="_blank"
                rel="noreferrer"
                aria-label="访问米地米立小红书主页"
                className="editorial-site-footer__social-link"
              >
                米立 AI
              </a>
            </li>
          </ul>
        </section>
      </div>

    </footer>
  );
}
