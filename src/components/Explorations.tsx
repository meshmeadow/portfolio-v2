import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import DotField from './DotField';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: number;
  video: string;
  title: string;
  startY: number;
  endY: number;
  rotation: number;
  column: 'left' | 'right';
  top: string;
  aspectRatio?: number;
}

const explorations: ExplorationItem[] = [
  {
    id: 1,
    video: '/videos/valentines.mp4',
    title: "Valentine's",
    startY: 200,
    endY: -400,
    rotation: 8,
    column: 'left',
    top: '5%',
  },
  {
    id: 2,
    video: '/videos/ipl.mp4',
    title: 'IPL',
    startY: 100,
    endY: -300,
    rotation: -8,
    column: 'right',
    top: '15%',
  },
  {
    id: 3,
    video: '/videos/republic-day.mp4',
    title: 'Republic Day',
    startY: 300,
    endY: -350,
    rotation: 5,
    column: 'left',
    top: '25%',
  },
  {
    id: 4,
    video: '/videos/eternal.mp4',
    title: 'Eternal',
    startY: 150,
    endY: -450,
    rotation: -10,
    column: 'right',
    top: '35%',
  },
  {
    id: 5,
    video: '/videos/t20.mp4',
    title: 'T20 World Cup',
    startY: 250,
    endY: -300,
    rotation: 10,
    column: 'left',
    top: '45%',
  },
  {
    id: 6,
    video: '/videos/ordinary-cgi.mp4',
    title: 'The Ordinary CGI',
    startY: 160,
    endY: -400,
    rotation: -8,
    column: 'right',
    top: '55%',
  },
  {
    id: 7,
    video: '/videos/bubbles.mp4',
    title: 'Bubbles',
    startY: 220,
    endY: -350,
    rotation: 6,
    column: 'left',
    top: '65%',
  },
  {
    id: 8,
    video: '/videos/ordinary-motion.mp4',
    title: 'The Ordinary Motion',
    startY: 280,
    endY: -320,
    rotation: 10,
    column: 'right',
    top: '75%',
  },
  {
    id: 10,
    video: '/videos/juice-ai.mp4',
    title: 'Juice AI',
    startY: 150,
    endY: -350,
    rotation: -8,
    column: 'left',
    top: '85%',
  },
  {
    id: 11,
    video: '/videos/4700bc.mp4',
    title: '4700BC',
    startY: 180,
    endY: -360,
    rotation: 7,
    column: 'right',
    top: '95%',
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
      setIsMuted(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const togglePlay = () => {
    if (modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (modalVideoRef.current && selectedItem) {
      modalVideoRef.current.muted = isMuted;
      if (isPlaying) {
        modalVideoRef.current.play().catch(() => {});
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !contentRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const item = explorations[index];

        gsap.fromTo(
          card,
          {
            y: item.startY,
            rotation: 0,
          },
          {
            y: item.endY,
            rotation: item.rotation,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const floatClasses = ['animate-float-1', 'animate-float-2', 'animate-float-3', 'animate-float-4'];

  const leftItems = explorations.filter((item) => item.column === 'left');
  const rightItems = explorations.filter((item) => item.column === 'right');

  return (
    <section ref={sectionRef} id="process" className="relative min-h-[400vh] overflow-hidden bg-white">
      {/* Dot field background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotField
          dotColor="#a8e4f0"
          dotRadius={2}
          dotSpacing={24}
          glowColor="#5cc4db"
          glowRadius={150}
        />
      </div>
      {/* Gradient fade at top to blend with Projects section */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,252,245,0) 10%, rgba(255,252,245,0) 100%)',
        }}
      />
      <div
        ref={contentRef}
        className="h-screen flex items-center justify-center z-30 relative pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="pointer-events-none"
          style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}
        >
          <h2 style={{ textAlign: 'center' }} className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-display font-semibold text-ink leading-tight">
            Visual playground
          </h2>
          <p style={{ textAlign: 'center' }} className="text-base xl:text-lg 2xl:text-xl text-graphite mt-4 xl:mt-6 leading-relaxed">
            Motion explorations for campaigns and product surfaces.
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-40">
        <div className="relative w-full h-full max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2200px] mx-auto">
          {leftItems.map((item, idx) => {
            const globalIndex = explorations.findIndex((e) => e.id === item.id);
            const floatClass = floatClasses[idx % floatClasses.length];
            const hasCustomAspect = item.aspectRatio && item.aspectRatio !== 1;
            return (
              <div
                key={item.id}
                ref={(el) => { cardsRef.current[globalIndex] = el; }}
                className="absolute left-[2%] md:left-[3%] lg:left-[4%] xl:left-[5%] 2xl:left-[6%] pointer-events-auto"
                style={{ top: item.top }}
              >
                <motion.button
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`${hasCustomAspect ? 'h-[100px] sm:h-[140px] md:h-[180px] lg:h-[220px] xl:h-[260px] 2xl:h-[300px]' : 'w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] 2xl:w-[440px] 2xl:h-[440px]'} rounded-2xl overflow-hidden cursor-interactive ${floatClass}`}
                  style={{
                    backgroundColor: ['var(--color-rose)', 'var(--color-mint)', 'var(--color-coral)', 'var(--color-sky)'][idx % 4],
                    ...(hasCustomAspect && { aspectRatio: item.aspectRatio }),
                  }}
                >
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm font-medium text-paper">{item.title}</span>
                    </div>
                  )}
                </motion.button>
              </div>
            );
          })}

          {rightItems.map((item, idx) => {
            const globalIndex = explorations.findIndex((e) => e.id === item.id);
            const floatClass = floatClasses[(idx + 2) % floatClasses.length];
            const hasCustomAspect = item.aspectRatio && item.aspectRatio !== 1;
            return (
              <div
                key={item.id}
                ref={(el) => { cardsRef.current[globalIndex] = el; }}
                className="absolute right-[2%] md:right-[3%] lg:right-[4%] xl:right-[5%] 2xl:right-[6%] pointer-events-auto"
                style={{ top: item.top }}
              >
                <motion.button
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`${hasCustomAspect ? 'h-[100px] sm:h-[140px] md:h-[180px] lg:h-[220px] xl:h-[260px] 2xl:h-[300px]' : 'w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[380px] xl:h-[380px] 2xl:w-[440px] 2xl:h-[440px]'} rounded-2xl overflow-hidden cursor-interactive ${floatClass}`}
                  style={{
                    backgroundColor: ['var(--color-lavender)', 'var(--color-honey)', 'var(--color-cloud)', 'var(--color-sky)'][idx % 4],
                    ...(hasCustomAspect && { aspectRatio: item.aspectRatio }),
                  }}
                >
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm font-medium" style={{ color: idx % 4 === 1 ? 'var(--color-ink)' : 'var(--color-paper)' }}>{item.title}</span>
                    </div>
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden shadow-2xl rounded-2xl max-w-[90vw] max-h-[80vh] group"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={selectedItem.id}
                ref={modalVideoRef}
                src={selectedItem.video}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="max-w-[90vw] max-h-[80vh] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-6 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-lg"
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  )}
                </motion.button>
                <motion.button
                  onClick={toggleMute}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-lg"
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
