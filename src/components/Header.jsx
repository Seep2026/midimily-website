import { navItems } from '../data/homeV2Data';

export function Header() {
  const currentPath = window.location.pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d8e2f0] bg-[#fbfcff]/88 backdrop-blur-md">
      <div className="mx-auto flex min-h-[74px] w-full max-w-[1220px] items-center gap-2 px-3 sm:px-4 lg:px-8">
        <a href="/#hero" className="min-w-0 flex-1">
          <span className="block truncate text-[17px] font-semibold tracking-tight text-[#2d3f5d]">米地米立</span>
          <span className="mt-0.5 hidden truncate text-[11px] text-[#6d7f98] sm:block">
            企业 AI 落地 · 个体 AI 成长
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-[14px] text-[#6f809b] lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === '/solutions' && currentPath.startsWith('/solutions');

            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-[#5f82b2] ${
                  isActive ? 'text-[#496b95]' : ''
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <details className="relative">
            <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-[12px] border border-[#d5e0ef] bg-white/88 px-3 text-[12px] text-[#506d92] list-none">
              菜单
            </summary>
            <div className="absolute right-0 mt-2 grid w-[188px] gap-1 rounded-[14px] border border-[#d8e3f2] bg-white p-2 shadow-[0_14px_28px_rgba(96,120,160,0.16)]">
              {navItems.map((item) => {
                const isActive = item.href === '/solutions' && currentPath.startsWith('/solutions');

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`rounded-[10px] px-3 py-2 text-[13px] transition hover:bg-[#f0f5fb] hover:text-[#496b95] ${
                      isActive ? 'bg-[#f0f5fb] text-[#496b95]' : 'text-[#617997]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
