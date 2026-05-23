import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { value: 4, suffix: '+', label: 'Years of Experience', color: '#e87f92' },
  { value: 80, suffix: '+', label: 'Lottie Animations', color: '#4a90b8' },
  { value: 50, suffix: '+', label: 'Campaigns Delivered', color: '#f9d56e' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 md:py-24 wall-texture" style={{ backgroundColor: '#fdf8f3' }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: '#6b7280' }}
          >
            Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold" style={{ color: '#2d3748' }}>
            Numbers that{' '}
            <span style={{ color: '#e87f92' }}>matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-2xl text-center"
              style={{ backgroundColor: stat.color }}
            >
              <span
                className="block text-4xl md:text-5xl font-display font-bold mb-1"
                style={{ color: index === 2 ? '#2d3748' : '#ffffff' }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs uppercase tracking-[0.15em]" style={{ color: index === 2 ? '#6b7280' : 'rgba(255, 255, 255, 0.85)' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
