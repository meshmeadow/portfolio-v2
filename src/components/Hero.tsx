import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const navItems = ['Projects', 'Playground', 'Contact', 'Resume'];

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="home" className="h-0 relative z-10">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">

        <nav className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-full px-4 py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 border border-white/10">
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-10">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          ref={ref}
          className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 lg:px-16 pb-6 sm:pb-8 md:pb-12"
        >
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] relative"
                style={{ color: '#ffffff' }}
              >
                <span className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block"
                    initial={{ y: 80, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    Shalmali
                  </motion.span>
                </span>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6 pb-2 lg:pb-4">
              <motion.p
                className="text-xs sm:text-sm md:text-base max-w-md"
                style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.4 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Motion designer & visual artist crafting seamless digital experiences — from Lottie micro-interactions to CGI campaigns — bringing products to life through movement.
              </motion.p>

              <motion.a
                href="#work"
                className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 w-fit rounded-full"
                style={{ background: 'var(--color-rose)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="text-white font-medium text-sm sm:text-base pl-5 sm:pl-6 py-2">
                  View work
                </span>
                <span className="bg-white/20 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center mr-1 transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
