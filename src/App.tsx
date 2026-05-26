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
import Grainient from './components/Grainient';

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
          <Grainient
            color1="#f5caf4"
            color2="#acc5fd"
            color3="#acc5fd"
            timeSpeed={0.15}
            grainAmount={0.03}
          />
          <div className="relative z-10">
            <CloudIntro />
            <div className="h-24 xl:h-32 2xl:h-40" />
            <MarqueeSection />
            <div className="h-24 xl:h-32 2xl:h-40" />
            <BentoGrid />
            <Explorations />
            <div className="h-24 xl:h-32 2xl:h-40" />
          </div>
          <Contact />
        </main>
      )}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
