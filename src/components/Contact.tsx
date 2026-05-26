import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeRef.current) return;

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const marqueeText = 'CRAFTING MOTION ✦ TELLING STORIES ✦ MAKING MAGIC ✦ '.repeat(8);

  return (
    <section id="contact" className="relative z-10 bg-sky">
      {/* Scalloped top edge */}
      <div
        className="absolute top-0 left-0 right-0 w-full"
        style={{
          height: '40px',
          background: `radial-gradient(circle at 50% 100%, var(--color-sky) 35px, transparent 35px)`,
          backgroundSize: '70px 40px',
          backgroundRepeat: 'repeat-x',
          transform: 'translateY(-40px)'
        }}
      />
      <div className="relative z-10 w-full" style={{ padding: '4rem 1.5rem 16rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-display font-semibold text-ink leading-tight">
            Hi, I'm Shalmali
          </h2>
          <p className="text-xl md:text-2xl text-ink/70 mt-4 leading-relaxed max-w-2xl">
            A motion designer crafting delightful animations and micro-interactions that make digital products feel alive.
          </p>
        </motion.div>

        <div className="flex flex-col items-center mt-96 text-center" style={{ marginTop: '2rem' }}>
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-display font-semibold text-ink">
            Say Hello
          </h3>

          <div className="flex items-center gap-4 md:gap-8" style={{ marginTop: '4rem' }}>
            <a href="https://www.linkedin.com/in/shalmaligaikwad/" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl text-ink hover:opacity-70 transition-opacity">Linkedin</a>
            <span className="text-ink/40">|</span>
            <a href="https://www.instagram.com/meshmeadow/" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl text-ink hover:opacity-70 transition-opacity">Instagram</a>
            <span className="text-ink/40">|</span>
            <a href="mailto:shalmali2801@gmail.com" className="text-lg md:text-xl text-ink hover:opacity-70 transition-opacity">Email</a>
            <span className="text-ink/40">|</span>
            <a href="tel:+918693090848" className="text-lg md:text-xl text-ink hover:opacity-70 transition-opacity">Call</a>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute bottom-full left-0 md:left-[2%] xl:left-[4%] w-[320px] md:w-[480px] xl:w-[560px] 2xl:w-[640px] z-10 pointer-events-none"
          style={{ marginBottom: '-40px' }}
        >
          <img
            src="/images/character.png"
            alt="Character"
            className="w-full h-auto"
          />
        </div>
        <div className="overflow-hidden py-12 md:py-20 xl:py-24 2xl:py-32 bg-sky">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-display font-semibold text-ink"
          >
            <span className="flex-shrink-0">{marqueeText}</span>
            <span className="flex-shrink-0">{marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="text-center py-8 text-xs text-ink/60">
        © 2026 Shalmali Gaikwad
      </div>
    </section>
  );
}
