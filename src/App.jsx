import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { BusinessService } from './components/BusinessService';
import { IndividualGrowth } from './components/IndividualGrowth';
import { PracticeSamples } from './components/PracticeSamples';
import { Insights } from './components/Insights';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { SolutionsPage } from './components/SolutionsPage';
import { DeckViewerPage } from './components/solutions/DeckViewerPage';
import { SolutionDetailPage } from './components/solutions/SolutionDetailPage';
import { SitePet } from './components/pet/SitePet';

function SlidevRedirectPage({ slug, restPath }) {
  const cleanPath = restPath?.replace(/^\/+|\/+$/g, '') || '';
  const pageSuffix = /^\d+$/.test(cleanPath) ? `#/${cleanPath}` : '';
  const target = `/solutions/${slug}/slidev/${pageSuffix}`;

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <main className="min-h-screen px-4 pb-20 pt-28 sm:px-6 md:px-8 md:pt-32">
      <section className="mx-auto max-w-[900px] rounded-[20px] border border-[#d7e3f0] bg-white/80 p-8">
        <span className="inline-flex rounded-full border border-[#cfe0f4] bg-[#f0f6fd] px-3 py-1 text-[12px] text-[#6284af]">
          正在打开 Slidev
        </span>
        <h1 className="mt-4 text-[32px] leading-tight text-[#2e415f]">正在进入方案 Deck</h1>
        <p className="mt-3 text-[#627896]">如果没有自动跳转，请点击下方按钮继续。</p>
        <a href={target} className="mt-6 inline-flex min-h-11 items-center rounded-[12px] bg-[#7c92bb] px-4 text-[14px] font-medium text-white">
          打开 Web Deck
        </a>
      </section>
    </main>
  );
}

export default function App() {
  const path = window.location.pathname;
  const isSolutionsPage = path === '/solutions' || path === '/solutions/';
  const deckMatch = path.match(/^\/solutions\/([^/]+)\/deck\/?$/);
  const slidevPathMatch = path.match(/^\/solutions\/([^/]+)\/slidev\/?(.*)$/);
  const solutionMatch = path.match(/^\/solutions\/([^/]+)\/?$/);

  useEffect(() => {
    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash || hash.length <= 1) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) {
        return;
      }

      const headerOffset = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    };

    const timer = window.setTimeout(scrollToHashTarget, 0);
    window.addEventListener('hashchange', scrollToHashTarget);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHashTarget);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcf8f2] text-[#324967]">
      <Header />
      {isSolutionsPage ? (
        <SolutionsPage />
      ) : slidevPathMatch ? (
        <SlidevRedirectPage slug={slidevPathMatch[1]} restPath={slidevPathMatch[2]} />
      ) : deckMatch ? (
        <DeckViewerPage slug={deckMatch[1]} />
      ) : solutionMatch ? (
        <SolutionDetailPage slug={solutionMatch[1]} />
      ) : (
        <main>
          <Hero />
          <ServicesOverview />
          <BusinessService />
          <IndividualGrowth />
          <PracticeSamples />
          <Insights />
          <CTA />
        </main>
      )}
      {!deckMatch ? <SitePet /> : null}
      <Footer />
    </div>
  );
}
