import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface TextBlock {
  text: string;
  color?: 'pink' | 'black' | 'blue';
  bold?: boolean;
  italic?: boolean;
}

interface SlideItem {
  type: 'image' | 'video' | 'text' | 'lottie';
  src?: string;
  content?: string | TextBlock[];
  caption?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  size: 'large' | 'medium-large' | 'medium' | 'small';
  color: string;
  image?: string;
  video?: string;
  lottie?: string;
  aspectRatio?: number;
  autoPlayVideo?: boolean;
  autoPlayLottie?: boolean;
  lottieDelay?: number;
  slides?: SlideItem[];
  borderColor?: string;
}

const projects: ProjectItem[] = [
  {
    id: '1',
    title: 'LottiePop',
    subtitle: 'macOS app for previewing .lottie files from Finder',
    category: 'App',
    size: 'large',
    color: 'var(--color-sky)',
    video: '/videos/lottiepop-tile.mp4',
    aspectRatio: 16 / 9,
    autoPlayVideo: true,
    borderColor: '#3B82DC',
    slides: [
      { type: 'video', src: '/videos/lottiepop-1.mp4' },
      { type: 'image', src: '/images/lottiepop-slide-01.png' },
      { type: 'image', src: '/images/lottiepop-slide-02.png' },
      { type: 'image', src: '/images/lottiepop-slide-03.png' },
      { type: 'image', src: '/images/lottiepop-slide-04.png' },
      { type: 'image', src: '/images/lottiepop-slide-05.png' },
    ],
  },
  {
    id: '2',
    title: 'Streaks',
    subtitle: 'Gamification feature for Bistro',
    category: 'Product',
    size: 'medium',
    color: 'var(--color-mint)',
    lottie: '/lotties/streaks.lottie',
    autoPlayLottie: true,
    aspectRatio: 360 / 203,
    borderColor: '#118C3D',
    slides: [
      { type: 'lottie', src: '/lotties/streaks.lottie' },
      { type: 'image', src: '/images/streaks-slide-2.png' },
      { type: 'lottie', src: '/lotties/streaks-3.lottie' },
      { type: 'image', src: '/images/streaks-slide-5.png' },
      { type: 'image', src: '/images/streaks-slide-4.png' },
    ],
  },
  {
    id: '3',
    title: 'Snackdown',
    subtitle: 'Campaign & feature design',
    category: 'Campaign',
    size: 'medium',
    color: '#00D26A',
    lottie: '/lotties/snackdown-logo.lottie',
    aspectRatio: 360 / 360,
    autoPlayLottie: true,
    lottieDelay: 2500,
    borderColor: '#00B96A',
    slides: [
      { type: 'video', src: '/videos/snackdown-1.mp4' },
      { type: 'lottie', src: '/lotties/snackdown-2.lottie' },
    ],
  },
  {
    id: '4',
    title: 'Cloche',
    subtitle: 'Animated food reveal',
    category: 'Animation',
    size: 'medium',
    color: '#00D26A',
    lottie: '/lotties/cloche.lottie',
    aspectRatio: 248 / 329,
    autoPlayLottie: true,
    lottieDelay: 2500,
    borderColor: '#25CA86',
    slides: [
      { type: 'video', src: '/projects-videos/NEW ON BISTRO/1.mp4' },
    ],
  },
  {
    id: '5',
    title: 'Motion Playbook',
    subtitle: 'Scalable motion design system for Bistro',
    category: 'Design System',
    size: 'medium',
    color: '#00D26A',
    image: '/images/motion-playbook-cover.png',
    aspectRatio: 1000 / 826,
    borderColor: '#00B85C',
    slides: [
      { type: 'image', src: '/images/motion-playbook-1.png' },
      { type: 'image', src: '/images/motion-playbook-2.png' },
    ],
  },
  {
    id: '6',
    title: 'New User Offer',
    subtitle: 'Promotional campaign for Blinkit',
    category: 'Campaign',
    size: 'medium',
    color: '#FFD700',
    lottie: '/lotties/nu-offer-cover.lottie',
    aspectRatio: 360 / 300,
    autoPlayLottie: true,
    borderColor: '#E6C200',
    slides: [
      { type: 'video', src: '/videos/nu-offer.mp4' },
    ],
  },
];

function BentoCard({ project, onClick }: { project: ProjectItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lottieRef = useRef<any>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (project.autoPlayLottie && lottieRef.current && isInView) {
      const playWithDelay = () => {
        setTimeout(() => {
          if (lottieRef.current) {
            lottieRef.current.play();
          }
        }, project.lottieDelay || 0);
      };

      lottieRef.current.addEventListener('complete', playWithDelay);
      playWithDelay();

      return () => {
        if (lottieRef.current) {
          lottieRef.current.removeEventListener('complete', playWithDelay);
        }
      };
    }
  }, [isInView, project.autoPlayLottie, project.lottieDelay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (lottieRef.current && !project.autoPlayLottie) {
      lottieRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !project.autoPlayVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      aria-label={`View ${project.title} project`}
      className="w-full h-full rounded-2xl overflow-hidden cursor-interactive group relative focus-visible:outline-2 focus-visible:outline-rose focus-visible:outline-offset-2"
      style={{
        backgroundColor: project.color,
        ...(project.borderColor && { border: `1.5px solid ${project.borderColor}` }),
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {project.video && (
        <video
          ref={project.autoPlayVideo ? undefined : videoRef}
          src={project.video}
          autoPlay={project.autoPlayVideo}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {project.lottie && (
        <div className="absolute inset-0 pointer-events-none">
          <DotLottieReact
            src={project.lottie}
            loop={project.autoPlayLottie && !project.lottieDelay}
            autoplay={project.autoPlayLottie && !project.lottieDelay}
            dotLottieRefCallback={(ref) => { lottieRef.current = ref; }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}

      {!project.video && !project.lottie && !project.image && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/40 text-xs uppercase tracking-wider">Coming soon</span>
        </div>
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 md:p-6 xl:p-8 2xl:p-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.15em] mb-1 block text-white/70">
            {project.category}
          </span>
          <h3 className="text-white text-base md:text-lg xl:text-xl 2xl:text-2xl font-display font-bold mb-0.5">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm">
            {project.subtitle}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const isDragging = useRef(false);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current && scrollRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const scrollWidth = scrollRef.current.scrollWidth;
        setDragConstraints({
          left: -(scrollWidth - containerWidth + 100),
          right: 0
        });
      }
    };

    // Delay to ensure DOM is rendered
    const timeout = setTimeout(updateConstraints, 100);
    window.addEventListener('resize', updateConstraints);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [projects.length]);

  const handleCardClick = (project: ProjectItem) => {
    if (!isDragging.current) {
      setCurrentSlideIndex(0);
      setSelectedProject(project);
    }
  };

  return (
    <>
      <section className="pt-16 md:pt-24 xl:pt-32 2xl:pt-40 pb-32 md:pb-40 xl:pb-48 wall-texture bg-cream relative">
        <div
          className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,252,245,0), rgba(255,252,245,1))',
          }}
        />
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center' }} className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-display font-semibold text-ink leading-tight">
              Projects & Experiments
            </h2>
            <p style={{ textAlign: 'center' }} className="text-base xl:text-lg 2xl:text-xl text-graphite mt-4 xl:mt-6 leading-relaxed">
              Apps, micro-interactions, and campaign work
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="overflow-hidden py-4">
          <motion.div
            ref={scrollRef}
            className="flex gap-4 xl:gap-5 2xl:gap-6 px-4 md:px-6 xl:px-8 2xl:px-12 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={dragConstraints}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 100); }}
          >
            {[...projects, ...projects, ...projects].map((project, index) => {
              const aspectRatio = project.aspectRatio || 1;
              return (
                <motion.div
                  key={`${project.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % projects.length) * 0.03 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 h-[280px] md:h-[320px] xl:h-[360px] 2xl:h-[400px]"
                  style={{ aspectRatio: aspectRatio }}
                >
                  <BentoCard project={project} onClick={() => handleCardClick(project)} />
                </motion.div>
              );
            })}
            <div className="flex-shrink-0 w-4 md:w-6 xl:w-8 2xl:w-12" />
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 w-[90vw] max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-white ${selectedProject.slides && selectedProject.slides.length > 0 ? 'max-h-[90vh]' : 'aspect-video'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.slides && selectedProject.slides.length > 0 ? (
                <div className="relative bg-white">
                  {(() => {
                    const slide = selectedProject.slides[currentSlideIndex];
                    return (
                      <div className="w-full">
                        {slide.type === 'video' && (
                          <div className="w-full relative" style={{ backgroundColor: selectedProject.color, paddingBottom: '56.25%', height: 0 }}>
                            <video
                              key={currentSlideIndex}
                              src={slide.src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                          </div>
                        )}
                        {slide.type === 'image' && (
                          <div className="w-full relative" style={{ backgroundColor: selectedProject.color, paddingBottom: '56.25%', height: 0 }}>
                            <img
                              src={slide.src}
                              alt={slide.caption || ''}
                              className="absolute inset-0 w-full h-full object-contain"
                            />
                          </div>
                        )}
                        {slide.type === 'lottie' && (
                          <div className="w-full relative" style={{ backgroundColor: selectedProject.color, paddingBottom: '56.25%', height: 0 }}>
                            <div className="absolute inset-0">
                              <DotLottieReact
                                src={slide.src}
                                loop
                                autoplay
                                style={{ width: '100%', height: '100%' }}
                              />
                            </div>
                          </div>
                        )}
                        {slide.type === 'text' && (
                          <div className="w-full relative" style={{ backgroundColor: '#fff', paddingBottom: '56.25%', height: 0 }}>
                            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                              <div className="max-w-4xl mx-auto space-y-4 text-left">
                                {Array.isArray(slide.content) ? (
                                  slide.content.map((block, i) => {
                                    const colorClass = block.color === 'pink' ? 'text-rose' : block.color === 'black' ? 'text-ink' : 'text-sky';
                                    return (
                                      <p
                                        key={i}
                                        className={`${colorClass} ${block.bold ? 'font-bold' : 'font-normal'} ${block.italic ? 'italic' : ''} text-lg md:text-xl leading-relaxed`}
                                      >
                                        {block.text}
                                      </p>
                                    );
                                  })
                                ) : (
                                  <p className="text-lg md:text-xl leading-relaxed" style={{ color: selectedProject.color }}>{slide.content}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Navigation arrows */}
                  {selectedProject.slides.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlideIndex((prev) => (prev === 0 ? selectedProject.slides!.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlideIndex((prev) => (prev === selectedProject.slides!.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-ink hover:bg-white transition-colors shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.slides.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentSlideIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlideIndex ? 'bg-ink' : 'bg-ink/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  {selectedProject.video && (
                    <video
                      src={selectedProject.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {!selectedProject.video && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: selectedProject.color }}>
                      <span className="text-white/40 text-sm uppercase tracking-widest">Coming soon</span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
