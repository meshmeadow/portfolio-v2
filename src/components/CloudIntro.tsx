import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { Mouse } from 'lucide-react';

declare global {
  interface Window {
    VANTA: {
      CLOUDS: (config: Record<string, unknown>) => { destroy: () => void };
    };
  }
}

const navItems = [
  { name: 'Projects', href: '#work' },
  { name: 'Playground', href: '#process' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '/resume.pdf' },
];

const sunriseColors = {
  backgroundColor: 0x0083ff,
  skyColor: 0x68c9ff,
  cloudColor: 0xffc0e8,
  cloudShadowColor: 0x7a5a8a,
  sunColor: 0xffb8ff,
  sunGlareColor: 0xffa0a0,
  sunlightColor: 0xffd4b8,
};

const heroText = 'Making things move';

function HotAirBalloon({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute w-[100px] md:w-[140px] xl:w-[180px] 2xl:w-[200px] z-10"
      style={{
        left: '5%',
        top: '15%',
      }}
      drag
      dragElastic={0.2}
      dragConstraints={containerRef}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
    >
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-interactive"
      >
        <img
          src={isHovered ? '/images/balloon2.png' : '/images/balloon-wave.png'}
          alt="Hot air balloon"
          className="w-full h-auto transition-all duration-300 pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export default function CloudIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const balloonContainerRef = useRef<HTMLDivElement>(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const cloudsScale = useTransform(scrollYProgress, [0.05, 0.25], [1, 0.88]);
  const containerPadding = useTransform(scrollYProgress, [0, 0.15], [0, 32]);
  const cloudsBorderRadius = useTransform(scrollYProgress, [0, 0.15], [0, 24]);
  const navOpacity = useTransform(scrollYProgress, [0.1, 0.18], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds.min.js';
    script.async = true;

    script.onload = () => {
      if (vantaRef.current && window.VANTA) {
        vantaEffect.current = window.VANTA.CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          speed: 1.0,
          ...sunriseColors,
        });
        setVantaLoaded(true);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* VANTA CLOUDS LAYER - with window frame effect */}
        <motion.div
          style={{ padding: containerPadding }}
          className="absolute inset-0 z-10"
        >
          <motion.div
            style={{
              scale: cloudsScale,
              borderRadius: cloudsBorderRadius,
            }}
            className="w-full h-full overflow-hidden relative window-frame"
          >
            <div
              ref={vantaRef}
              className="absolute inset-0 w-full h-full"
            />

            {!vantaLoaded && (
              <div
                className="absolute inset-0"
                style={{ background: '#00b8ff' }}
              />
            )}

            {/* Hot Air Balloon - inside the Vanta container, in the blue sky area */}
            <div ref={balloonContainerRef} className="absolute inset-0" />
            <HotAirBalloon containerRef={balloonContainerRef} />
          </motion.div>
        </motion.div>

        {/* NAVIGATION - inside window frame, sticks to top */}
        <motion.div
          style={{ padding: containerPadding }}
          className="absolute inset-0 z-30 pointer-events-none"
        >
          <motion.div
            style={{ borderRadius: cloudsBorderRadius }}
            className="w-full h-full relative"
          >
            <motion.nav
              style={{ opacity: navOpacity }}
              className="absolute top-0 left-0 right-0 pointer-events-auto"
            >
              <ul className="flex items-center justify-center gap-10 md:gap-14 xl:gap-16 2xl:gap-20 py-5 md:py-6 xl:py-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('/') ? '_blank' : undefined}
                      rel={item.href.startsWith('/') ? 'noopener noreferrer' : undefined}
                      className="text-sm xl:text-base 2xl:text-lg font-medium transition-all duration-300 hover:text-rose text-ink"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        </motion.div>

        {/* HERO CONTENT - Making things move, zooms out on scroll */}
        <motion.div
          style={{
            padding: containerPadding,
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <motion.div
            style={{ borderRadius: cloudsBorderRadius }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <motion.div
              className="text-center pointer-events-auto"
              style={{ scale: heroScale }}
            >
              <h1
                ref={textRef}
                className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] font-display font-semibold leading-[0.95] tracking-tight cursor-default text-paper"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}
                onMouseEnter={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                  }
                }}
              >
                {heroText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    animate={isAnimating ? {
                      y: [0, -10, 0],
                    } : { y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.04,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onAnimationComplete={() => {
                      if (i === heroText.length - 1) {
                        setIsAnimating(false);
                      }
                    }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
              </h1>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-8 flex flex-col items-center text-paper/70"
              >
                <Mouse className="w-5 h-5" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
