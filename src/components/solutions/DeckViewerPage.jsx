import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDeckBySlug, getSolutionBySlug } from '../../data/solutionsData';

function normalizeDeckPath(pathname) {
  if (!pathname) {
    return '/';
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function getRequestedSlideFromUrl() {
  const search = new URLSearchParams(window.location.search);
  const raw = search.get('slide');
  return raw && /^\d+$/.test(raw) ? Number(raw) : 1;
}

function buildSlidevEmbedUrl(basePath, page) {
  const normalizedBasePath = normalizeDeckPath(basePath);
  const url = new URL(`${normalizedBasePath}${page}`, window.location.origin);
  url.searchParams.set('embedded', '1');
  url.searchParams.set('embed', '1');
  return `${url.pathname}${url.search}`;
}

function isSlidevHtml(htmlText) {
  if (!htmlText || typeof htmlText !== 'string') {
    return false;
  }

  return htmlText.includes('property="slidev:version"') && htmlText.includes('id="app"');
}

function DeckSlide({ slide, onAdvance, isLast }) {
  const isCta = slide.layout === 'cta';

  return (
    <section
      onClick={() => {
        if (!isLast) {
          onAdvance();
        }
      }}
      className={`mx-auto flex min-h-[460px] w-full max-w-[1220px] flex-col rounded-[24px] bg-[#f9fcff]/95 p-6 shadow-[0_8px_18px_rgba(96,120,160,0.08)] transition duration-300 sm:p-8 md:min-h-[680px] md:p-12 ${
        isLast ? 'cursor-default' : 'cursor-pointer'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !isLast) {
          event.preventDefault();
          onAdvance();
        }
      }}
      aria-label={isLast ? '当前为最后一页' : '点击翻到下一页'}
    >
      <div className="w-full max-w-[980px]">
        <h1 className="text-[32px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[72px]">{slide.title}</h1>
      </div>

      <div className="flex min-h-0 flex-1 items-center">
        <div className="w-full max-w-[980px]">
          {slide.subtitle ? (
            <p className="max-w-[860px] text-[20px] leading-relaxed text-[#5a7295] sm:text-[28px]">{slide.subtitle}</p>
          ) : null}

          {slide.points.length > 0 ? (
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {slide.points.map((point) => (
                <li key={point} className="rounded-[16px] bg-white/72 px-4 py-4 text-[18px] text-[#4f6788] sm:text-[22px]">
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          {isCta ? (
            <a
              href={slide.href}
              onClick={(event) => event.stopPropagation()}
              className="mt-8 inline-flex min-h-11 w-fit items-center rounded-[12px] bg-[#7c92bb] px-5 text-[14px] font-medium text-white transition hover:bg-[#6f86b0]"
            >
              {slide.button}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function DeckViewerPage({ slug }) {
  const solution = getSolutionBySlug(slug);
  const deck = getDeckBySlug(slug);
  const totalSlides = solution?.pageCount ?? deck?.slides?.length ?? 0;
  const [currentPage, setCurrentPage] = useState(() =>
    Math.min(Math.max(getRequestedSlideFromUrl(), 1), Math.max(totalSlides, 1)),
  );
  const [showPagePicker, setShowPagePicker] = useState(false);
  const [renderMode, setRenderMode] = useState('checking');

  const currentSlide = deck?.slides?.[currentPage - 1];
  const pageNumbers = useMemo(() => Array.from({ length: totalSlides }, (_, index) => index + 1), [totalSlides]);
  const slidevBasePath = solution?.slidevUrl || `/solutions/${slug}/slidev/`;
  const slidevEmbedUrl = useMemo(() => buildSlidevEmbedUrl(slidevBasePath, currentPage), [slidevBasePath, currentPage]);

  const goNext = useCallback(() => {
    setCurrentPage((page) => Math.min(totalSlides, page + 1));
  }, [totalSlides]);

  const goPrevious = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const goToPage = useCallback(
    (page) => {
      const pageNumber = Math.min(Math.max(1, page), totalSlides);
      setCurrentPage(pageNumber);
    },
    [totalSlides],
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(Math.max(page, 1), Math.max(totalSlides, 1)));
  }, [totalSlides]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', String(currentPage));
    window.history.replaceState({}, '', `${url.pathname}${url.search}`);
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        goNext();
      }
      if (event.key === 'ArrowLeft') {
        goPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious]);

  useEffect(() => {
    let disposed = false;

    async function detectSlidevBuild() {
      if (!solution) {
        setRenderMode('fallback');
        return;
      }

      const indexUrl = `${normalizeDeckPath(slidevBasePath)}index.html`;

      try {
        const response = await fetch(indexUrl, { cache: 'no-store' });
        const html = await response.text();
        if (!disposed) {
          setRenderMode(response.ok && isSlidevHtml(html) ? 'slidev' : 'fallback');
        }
      } catch {
        if (!disposed) {
          setRenderMode('fallback');
        }
      }
    }

    setRenderMode('checking');
    detectSlidevBuild();

    return () => {
      disposed = true;
    };
  }, [slidevBasePath, solution]);

  if (!solution) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-4 py-10 text-[#324967]">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">方案不存在</h1>
          <p className="mt-3 text-[#627896]">这个方案可能还没有发布，或路径有误。</p>
          <a href="/solutions" className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white">
            返回方案库
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f7f9fc] px-4 pb-16 pt-24 text-[#324967] sm:px-6 md:px-8 md:pb-20 md:pt-28">
      <div className="mx-auto flex w-full max-w-[1220px] flex-wrap items-center gap-3 py-3">
        <a href="/solutions" className="inline-flex min-h-11 items-center rounded-[12px] border border-[#d1dff0] bg-white/88 px-4 text-[14px] text-[#5f7da5] transition hover:text-[#496b95]">
          返回
        </a>
        <div className="ml-auto flex items-center gap-2">
          {showPagePicker
            ? pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[11px] border px-3 text-[14px] transition ${
                    currentPage === page
                      ? 'border-[#7c92bb] bg-[#7c92bb] text-white'
                      : 'border-[#d1dff0] bg-white/88 text-[#4e709a] hover:bg-white'
                  }`}
                >
                  {page}
                </button>
              ))
            : null}
          <button
            type="button"
            onClick={() => setShowPagePicker((value) => !value)}
            className="inline-flex min-h-11 items-center rounded-[12px] border border-[#d1dff0] bg-white/88 px-4 text-[14px] text-[#4e709a] transition hover:bg-white"
          >
            页
          </button>
        </div>
      </div>

      {renderMode === 'slidev' ? (
        <section className="relative mx-auto min-h-[460px] w-full max-w-[1220px] overflow-hidden rounded-[24px] bg-[#f9fcff]/94 md:min-h-[680px]">
          <iframe
            title={`${solution.title} Slidev`}
            src={slidevEmbedUrl}
            className="h-full min-h-[460px] w-full border-0 md:min-h-[680px]"
            loading="lazy"
          />
          {currentPage < totalSlides ? (
            <button
              type="button"
              onClick={goNext}
              className="absolute inset-0 z-10 cursor-pointer bg-transparent"
              aria-label="点击翻到下一页"
            />
          ) : null}
        </section>
      ) : renderMode === 'fallback' && deck && currentSlide ? (
        <DeckSlide slide={currentSlide} onAdvance={goNext} isLast={currentPage >= totalSlides} />
      ) : (
        <section className="mx-auto flex min-h-[460px] w-full max-w-[1220px] items-center justify-center rounded-[24px] border border-[#d7e3f0] bg-[#fbfdff]/92 md:min-h-[680px]">
          <p className="text-[15px] text-[#6b81a0]">正在加载方案内容...</p>
        </section>
      )}
    </main>
  );
}
