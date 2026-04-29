import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyMe } from './components/WhyMe';
import { WhoFor } from './components/WhoFor';
import { Methodology } from './components/Methodology';
import { Collaboration } from './components/Collaboration';
import { Insights } from './components/Insights';
import { About } from './components/About';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyMe />
        <WhoFor />
        <Methodology />
        <Collaboration />
        <Insights />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
