import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shalmaligaikwad/', icon: LinkedinIcon },
  { name: 'Email', url: 'mailto:shalmali2801@gmail.com', icon: MailIcon },
  { name: 'Phone', url: 'tel:+918693090848', icon: PhoneIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/meshmeadow/', icon: InstagramIcon },
];

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
    <section id="contact" className="relative bg-sky">
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
          <p className="text-lg md:text-xl text-paper/70 mb-6">Hi, I'm</p>
          <h2 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-display font-semibold text-paper leading-tight">
            Shalmali
          </h2>
          <p className="text-xl md:text-2xl text-paper/80 mt-4 leading-relaxed max-w-2xl">
            A motion designer crafting delightful animations and micro-interactions that make digital products feel alive.
          </p>
        </motion.div>

        <div className="flex flex-col items-center mt-96 text-center" style={{ marginTop: '2rem' }}>
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-display font-semibold text-paper">
            Say Hello
          </h3>

          <div className="flex items-center gap-10" style={{ marginTop: '4rem' }}>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.name}
                  className="w-14 h-14 rounded-full bg-paper flex items-center justify-center text-sky transition-all duration-200 hover:scale-110"
                >
                  <Icon />
                </a>
              );
            })}
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
            className="flex whitespace-nowrap text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-display font-semibold text-paper"
          >
            <span className="flex-shrink-0">{marqueeText}</span>
            <span className="flex-shrink-0">{marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="text-center py-8 text-xs text-paper/70">
        © 2026 Shalmali Gaikwad
      </div>
    </section>
  );
}
