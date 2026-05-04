import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDeckBySlug, getSolutionBySlug } from '../../data/solutionsData';

function DeckSlide({ slide, onAdvance, isLast }) {
  const isCta = slide.layout === 'cta';

  return (
    <section
      onClick={() => {
        if (!isLast) {
          onAdvance();
        }
      }}
      className={`mx-auto flex min-h-[460px] w-full max-w-[1220px] flex-col justify-center rounded-[24px] border border-[#d7e3f0] bg-[#fbfdff]/92 p-6 shadow-[0_14px_32px_rgba(96,120,160,0.12)] transition duration-300 sm:p-8 md:min-h-[680px] md:p-12 ${
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
      <h1 className="max-w-[980px] text-[32px] leading-tight text-[#2e415f] sm:text-[44px] md:text-[72px]">{slide.title}</h1>
      {slide.subtitle ? (
        <p className="mt-5 max-w-[860px] text-[20px] leading-relaxed text-[#5a7295] sm:text-[28px]">{slide.subtitle}</p>
      ) : null}

      {slide.points.length > 0 ? (
        <ul className="mt-9 grid gap-3 sm:grid-cols-2">
          {slide.points.map((point) => (
            <li key={point} className="rounded-[16px] border border-[#d6e1ee] bg-white/78 px-4 py-4 text-[18px] text-[#4f6788] sm:text-[22px]">
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
    </section>
  );
}

export function DeckViewerPage({ slug }) {
  const solution = getSolutionBySlug(slug);
  const deck = getDeckBySlug(slug);
  const totalSlides = deck?.slides?.length ?? 0;
  const search = new URLSearchParams(window.location.search);
  const requestedSlideRaw = search.get('slide');
  const requestedSlide = requestedSlideRaw && /^\d+$/.test(requestedSlideRaw) ? Number(requestedSlideRaw) : 1;
  const [currentPage, setCurrentPage] = useState(Math.min(Math.max(requestedSlide, 1), Math.max(totalSlides, 1)));
  const [showPagePicker, setShowPagePicker] = useState(false);

  const currentSlide = deck?.slides?.[currentPage - 1];
  const pageNumbers = useMemo(() => Array.from({ length: totalSlides }, (_, index) => index + 1), [totalSlides]);

  const goNext = useCallback(() => {
    setCurrentPage((page) => Math.min(totalSlides, page + 1));
  }, [totalSlides]);

  const goToPage = useCallback(
    (page) => {
      const pageNumber = Math.min(Math.max(1, page), totalSlides);
      setCurrentPage(pageNumber);
    },
    [totalSlides],
  );

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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext]);

  if (!solution || !deck || !currentSlide) {
    return (
      <main className="min-h-screen bg-[#fcf8f2] px-4 py-10 text-[#324967]">
        <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
          <h1 className="text-[32px] text-[#2e415f]">Deck 不存在</h1>
          <p className="mt-3 text-[#627896]">这个 Web Deck 可能还没有发布，或路径有误。</p>
          <a href="/solutions" className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white">
            返回方案库
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f7f9fc] px-4 pb-16 pt-28 text-[#324967] sm:px-6 md:px-8 md:pb-20 md:pt-32">
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

      <DeckSlide slide={currentSlide} onAdvance={goNext} isLast={currentPage >= totalSlides} />
    </main>
  );
}
