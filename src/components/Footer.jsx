import { useState } from 'react';
import { footerResourceLinks } from '../data/homeV2Data';
import milyWx from '../styles/mily-wx.png';

function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.69 4C4.46 4 1 6.94 1 10.6c0 2.05 1.1 3.86 2.87 5.08L3.1 18.2l2.74-1.39c.83.24 1.7.39 2.6.43-.13-.5-.2-1.02-.2-1.55 0-3.37 3.2-6.04 7.13-6.04.27 0 .54.02.8.05C15.5 6.46 12.42 4 8.69 4Zm-2.6 4.06c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm5.2 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z" />
      <path d="M23 15.43c0-3.07-2.92-5.56-6.52-5.56-3.69 0-6.52 2.49-6.52 5.56s2.83 5.56 6.52 5.56c.77 0 1.51-.12 2.2-.35L20.9 22l-.6-1.85C21.86 19.13 23 17.4 23 15.43Zm-8.7-1.1c-.42 0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76-.34.76-.76.76Zm4.36 0c-.42 0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76-.34.76-.76.76Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.4v-1.8c-2.5.5-3-.9-3-.9-.4-1-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.3-.4-1.2.1-2.4 0 0 .8-.3 2.5.9a8.8 8.8 0 0 1 4.6 0c1.8-1.2 2.6-.9 2.6-.9.5 1.2.2 2.1.1 2.4.6.6 1 1.4 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

export function Footer() {
  const [isWechatCodeOpen, setIsWechatCodeOpen] = useState(false);

  return (
    <footer id="about" className="editorial-site-footer" tabIndex="-1">
      <div className="editorial-site-footer__inner">
        <section className="editorial-site-footer__identity">
          <p>关于</p>
          <h2>米地咨询</h2>
          <p className="editorial-site-footer__statement">
            <span>企业的 AI 落地顾问</span>
            <span>个体的 AI 成长伙伴</span>
          </p>
          <p>
            深圳市宝安区新安街道顺丰路安乐物业大厦 512
            <br />
            粤ICP备2026099384号-2
          </p>
        </section>

        <nav className="editorial-site-footer__nav" aria-label="页脚导航">
          <h3>服务</h3>
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
          <h3>关注</h3>
          <div className="editorial-site-footer__social-links">
            <div className="editorial-site-footer__wechat">
              <button
                className="editorial-site-footer__wechat-trigger"
                type="button"
                aria-label={isWechatCodeOpen ? '收起米地咨询微信二维码' : '查看米地咨询微信二维码'}
                aria-expanded={isWechatCodeOpen}
                aria-controls="footer-wechat-code"
                onClick={() => setIsWechatCodeOpen((isOpen) => !isOpen)}
              >
                <WeChatIcon />
              </button>
              {isWechatCodeOpen ? (
                <div id="footer-wechat-code" className="editorial-site-footer__wechat-code">
                  <img src={milyWx} alt="米地咨询企业微信二维码" />
                  <p>微信扫码交流</p>
                </div>
              ) : null}
            </div>
            <a href="https://xhslink.com/m/7J4H4sQL4yB" target="_blank" rel="noopener noreferrer" aria-label="访问米地咨询小红书主页">
              <img src="https://idoubi.ai/imgs/logos/xhs.png" alt="" aria-hidden="true" />
            </a>
            <a href="https://github.com/midimily" target="_blank" rel="noopener noreferrer" aria-label="访问米地咨询 GitHub"><GitHubIcon /></a>
          </div>
        </section>
      </div>
    </footer>
  );
}
