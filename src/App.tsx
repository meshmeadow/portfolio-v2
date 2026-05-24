import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import LoadingScreen from './components/LoadingScreen';
import CloudIntro from './components/CloudIntro';
import MarqueeSection from './components/MarqueeSection';
import BentoGrid from './components/BentoGrid';
import Explorations from './components/Explorations';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main>
          <a href="#work" className="skip-link">Skip to main content</a>
          <CloudIntro />
          <div className="h-24 xl:h-32 2xl:h-40 bg-cream" />
          <MarqueeSection />
          <div className="h-24 xl:h-32 2xl:h-40 bg-cream" />
          <BentoGrid />
          {/* <div className="h-16 md:h-24 xl:h-32 bg-white" /> */}
          <Explorations />
          <div className="h-24 xl:h-32 2xl:h-40 bg-white" />
          <Contact />
        </main>
      )}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
