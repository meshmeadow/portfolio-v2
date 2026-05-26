import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface MarqueeItem {
  id: string;
  name: string;
  src: string;
  type?: 'lottie' | 'image';
}

const row1Items: MarqueeItem[] = [
  { id: '1', name: 'BHAI DOOJ', src: '/lotties/BHAI DOOJ.lottie' },
  { id: '2', name: 'BOGO', src: '/lotties/BOGO.lottie' },
  { id: '3', name: 'BRUNCH', src: '/lotties/BRUNCH.lottie' },
  { id: '4', name: 'DUSSEHRA', src: '/lotties/DUSSEHRA.lottie' },
  { id: '5', name: 'FLAVOURS OF PUNJAB', src: '/lotties/FLAVOURS OF PUNJAB.lottie' },
  { id: '6', name: 'HOUSE PARTY', src: '/lotties/HOUSE PARTY.lottie' },
];

const row2Items: MarqueeItem[] = [
  { id: '7', name: 'MONSOON MUNCHIES', src: '/lotties/MONSOON MUNCHIES.lottie' },
  { id: '8', name: 'NAVRATRI 2025', src: '/lotties/NAVRATRI 2025.lottie' },
  { id: '9', name: 'NEW YEAR', src: '/lotties/NEW YEAR.lottie' },
  { id: '10', name: 'ONAM', src: '/lotties/ONAM.lottie' },
  { id: '11', name: 'RAMADAN', src: '/lotties/RAMADAN.lottie' },
  { id: '12', name: 'STREET FOOD FESTIVAL', src: '/lotties/STREET FOOD FESTIVAL.lottie' },
];

function MarqueeTile({ item, onClick, isDraggingRef }: { item: MarqueeItem; onClick: () => void; isDraggingRef: React.MutableRefObject<boolean> }) {
  const [hasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tileRef = useRef<HTMLButtonElement>(null);
  const mouseDownPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    if (tileRef.current) {
      observer.observe(tileRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - mouseDownPos.current.x);
    const dy = Math.abs(e.clientY - mouseDownPos.current.y);
    if (dx < 5 && dy < 5 && !isDraggingRef.current) {
      onClick();
    }
  };

  return (
    <button
      ref={tileRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      aria-label={`View ${item.name} animation`}
      className="flex-shrink-0 rounded-md overflow-hidden focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2 bg-paper relative group"
      style={{ cursor: "url('/cursor-pointer.svg') 17 7, pointer" }}
    >
      <div className="transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none">
        {!hasError && isVisible ? (
          item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.name}
              className="w-[200px] h-[70px] sm:w-[280px] sm:h-[100px] md:w-[400px] md:h-[140px] xl:w-[500px] xl:h-[175px] 2xl:w-[600px] 2xl:h-[210px] object-contain"
            />
          ) : (
            <DotLottieReact
              src={item.src}
              loop
              autoplay
              speed={1}
              useFrameInterpolation
              renderConfig={{
                autoResize: true,
              }}
              className="w-[200px] h-[70px] sm:w-[280px] sm:h-[100px] md:w-[400px] md:h-[140px] xl:w-[500px] xl:h-[175px] 2xl:w-[600px] 2xl:h-[210px]"
            />
          )
        ) : (
          <div className="w-[200px] h-[70px] sm:w-[280px] sm:h-[100px] md:w-[400px] md:h-[140px] xl:w-[500px] xl:h-[175px] 2xl:w-[600px] 2xl:h-[210px] flex items-center justify-center">
            <span className="text-sm font-medium text-graphite">
              {item.name}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<MarqueeItem | null>(null);
  const isDraggingRef = useRef(false);
  const dragVelocityRef = useRef(0);
  const lastMouseXRef = useRef(0);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const section = sectionRef.current;
    if (!row1 || !row2 || !section) return;

    let row1Offset = 0;
    let row2Offset = 0;
    const getTileWidth = () => {
      if (window.innerWidth < 640) return 200;
      if (window.innerWidth < 768) return 280;
      if (window.innerWidth < 1280) return 400;
      if (window.innerWidth < 1536) return 500;
      return 600;
    };
    const tileWidth = getTileWidth();
    const row1Width = row1Items.length * tileWidth;
    const row2Width = row2Items.length * tileWidth;

    let animationId: number;

    const animate = () => {
      const baseSpeed = 0.8;

      if (!isDraggingRef.current) {
        dragVelocityRef.current *= 0.95;
      }

      const speed = baseSpeed + dragVelocityRef.current;

      row1Offset -= speed;
      row2Offset += speed;

      if (Math.abs(row1Offset) >= row1Width) {
        row1Offset = row1Offset % row1Width;
      }
      if (row1Offset > 0) {
        row1Offset = -row1Width + row1Offset;
      }

      if (row2Offset >= row2Width) {
        row2Offset = row2Offset % row2Width;
      }
      if (row2Offset < 0) {
        row2Offset = row2Width + row2Offset;
      }

      row1.style.transform = `translateX(${row1Offset}px)`;
      row2.style.transform = `translateX(${row2Offset - row2Width}px)`;

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.clientX;
      section.style.cursor = 'grabbing';
      window.dispatchEvent(new CustomEvent('marqueeSwiped'));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMouseXRef.current;
      dragVelocityRef.current = deltaX * 0.3;
      lastMouseXRef.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      section.style.cursor = 'grab';
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.touches[0].clientX - lastMouseXRef.current;
      dragVelocityRef.current = deltaX * 0.3;
      lastMouseXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    section.style.cursor = 'grab';
    section.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    section.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      section.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      section.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const tripleRow1 = row1Items.length > 0
    ? [...row1Items, ...row1Items, ...row1Items]
    : [];
  const tripleRow2 = row2Items.length > 0
    ? [...row2Items, ...row2Items, ...row2Items]
    : [];

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="py-16 md:py-24 overflow-x-clip overflow-y-visible select-none cursor-interactive"
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center' }} className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-display font-semibold text-ink leading-tight">
              Bistro by Blinkit
            </h2>
            <p style={{ textAlign: 'center' }} className="text-base xl:text-lg 2xl:text-xl text-graphite mt-4 xl:mt-6 leading-relaxed">
              Lottie animations for in-app merchandising and seasonal campaigns
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-[20px] py-8">
          {tripleRow1.length > 0 && (
            <div
              ref={row1Ref}
              className="flex gap-3"
              style={{ willChange: 'transform' }}
            >
              {tripleRow1.map((item, index) => (
                <MarqueeTile
                  key={`row1-${index}`}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  isDraggingRef={isDraggingRef}
                />
              ))}
            </div>
          )}

          {tripleRow2.length > 0 && (
            <div
              ref={row2Ref}
              className="flex gap-3"
              style={{ willChange: 'transform' }}
            >
              {tripleRow2.map((item, index) => (
                <MarqueeTile
                  key={`row2-${index}`}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  isDraggingRef={isDraggingRef}
                />
              ))}
            </div>
          )}
        </div>
      </section>

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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 shadow-2xl rounded-3xl overflow-hidden w-[90vw] max-w-[1000px]"
              style={{ aspectRatio: '600 / 210' }}
              onClick={(e) => e.stopPropagation()}
            >
              <DotLottieReact
                src={selectedItem.src}
                loop
                autoplay
                speed={1}
                useFrameInterpolation
                renderConfig={{
                  autoResize: true,
                }}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
