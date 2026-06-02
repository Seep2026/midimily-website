import { useEffect, useMemo } from 'react';
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
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const isEmbedRequest = useMemo(() => {
    const embedValue = params.get('embed');
    const embeddedValue = params.get('embedded');
    return embedValue === '1' || embeddedValue === '1' || embeddedValue === 'true';
  }, [params]);
  const cleanPath = restPath?.replace(/^\/+|\/+$/g, '') || '';
  const pageQuery = /^\d+$/.test(cleanPath) ? `?slide=${cleanPath}` : '';
  const fallbackQuery = pageQuery ? `${pageQuery}&forceFallback=1` : '?forceFallback=1';
  const target = `/solutions/${slug}/deck/${pageQuery}`;
  const embedFallbackTarget = `/solutions/${slug}/deck/${fallbackQuery}`;

  useEffect(() => {
    if (isEmbedRequest && window.top && window.top !== window) {
      window.top.location.replace(embedFallbackTarget);
      return;
    }
    window.location.replace(target);
  }, [embedFallbackTarget, isEmbedRequest, target]);

  return null;
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
      <SitePet />
      <Footer />
    </div>
  );
}
