import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const frames = [
  '/loader/frame1.png',
  '/loader/frame2.png',
  '/loader/frame3.png',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const duration = 2700;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const newCount = Math.floor(progress * 100);

      setCount(newCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 300);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [onComplete]);

  // Fast frame switching
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-10 bg-blush overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20"
      >
        <span className="text-xs uppercase tracking-[0.15em] text-rose">
          Portfolio
        </span>
      </motion.div>

      {/* Single image switching fast */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[65vw] h-[45vh] md:w-[45vw] md:h-[55vh] flex items-center justify-center">
          <img
            src={frames[currentFrame]}
            alt="Loading"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 relative z-20">
        <span className="text-5xl md:text-7xl tabular-nums font-display font-bold text-rose">
          {String(count).padStart(3, '0')}
        </span>
        <div className="w-full h-[2px] overflow-hidden bg-rose/30">
          <div
            className="h-full transition-transform duration-100 origin-left bg-rose"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
