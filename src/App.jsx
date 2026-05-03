import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { BusinessService } from './components/BusinessService';
import { IndividualGrowth } from './components/IndividualGrowth';
import { WhyMidimily } from './components/WhyMidimily';
import { PracticeSamples } from './components/PracticeSamples';
import { Insights } from './components/Insights';
import { About } from './components/About';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { SitePet } from './components/pet/SitePet';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fcf8f2] text-[#324967]">
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <BusinessService />
        <IndividualGrowth />
        <WhyMidimily />
        <PracticeSamples />
        <Insights />
        <About />
        <CTA />
      </main>
      <SitePet />
      <Footer />
    </div>
  );
}
