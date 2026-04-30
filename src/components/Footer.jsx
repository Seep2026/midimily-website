import { navItems } from '../data/homeV2Data';
import redbookMily from '../styles/redbook_mily.png';

export function Footer() {
  return (
    <footer className="border-t border-[#d8e3f0] bg-[#f5f8fd] px-4 pt-14 sm:px-6 md:px-8">
      <div className="mx-auto grid w-full max-w-[1220px] gap-10 pb-10 md:grid-cols-3">
        <section>
          <h3 className="text-[24px] text-[#304864]">米地米立</h3>
          <p className="mt-2 text-[13px] text-[#5f7a9d]">企业 AI 落地 · 个体 AI 成长</p>
        </section>

        <nav>
          <h4 className="text-[15px] text-[#324b68]">导航</h4>
          <ul className="mt-3 grid gap-2 text-[14px] text-[#627b9b]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-[#597fae]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section>
          <h4 className="text-[15px] text-[#324b68]">社交媒体</h4>
          <ul className="mt-3 grid gap-2 text-[14px] text-[#627b9b]">
            <li>视频号：米立AI</li>
            <li className="flex items-center gap-2">
              <span>小红书：</span>
              <a
                href="https://xhslink.com/m/7J4H4sQL4yB"
                target="_blank"
                rel="noreferrer"
                aria-label="访问米地米立小红书主页"
                className="inline-flex rounded-md transition-opacity hover:opacity-85"
              >
                <img src={redbookMily} alt="小红书" className="h-8 w-auto object-contain" />
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-[#d8e3f0] py-4 text-center text-[13px] text-[#7591b4]">
        © 2026 米地米立 Midimily. All rights reserved.
      </div>
    </footer>
  );
}
