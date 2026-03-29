import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { worksConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const rectRef = useRef<SVGSVGElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!worksConfig.title) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinned scroll animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=130%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // ENTRANCE (0% - 30%)
        if (progress <= 0.3) {
          const entranceProgress = progress / 0.3;
          
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              y: 18 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
              scale: 0.96 + 0.04 * entranceProgress,
            });
          }
          
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              y: 10 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (microRef.current) {
            gsap.set(microRef.current, {
              y: 6 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              scale: 1.08 - 0.08 * entranceProgress,
              opacity: entranceProgress,
            });
          }
          
          if (rectRef.current) {
            const path = rectRef.current.querySelector('rect');
            if (path) {
              const length = 2 * (72 + 34); // perimeter approximation
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length * (1 - entranceProgress),
                opacity: entranceProgress,
              });
            }
          }
        }
        // SETTLE (30% - 70%)
        else if (progress <= 0.7) {
          if (titleRef.current) {
            gsap.set(titleRef.current, { y: 0, opacity: 1, scale: 1 });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { y: 0, opacity: 1 });
          }
          if (microRef.current) {
            gsap.set(microRef.current, { y: 0, opacity: 1 });
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, { scale: 1, opacity: 1 });
          }
          if (rectRef.current) {
            const path = rectRef.current.querySelector('rect');
            if (path) {
              gsap.set(path, { strokeDashoffset: 0, opacity: 1 });
            }
          }
        }
        // EXIT (70% - 100%)
        else {
          const exitProgress = (progress - 0.7) / 0.3;
          
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              y: -14 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.75,
            });
          }
          
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              y: -8 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (microRef.current) {
            gsap.set(microRef.current, {
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              scale: 1 + 0.05 * exitProgress,
              opacity: 1 - exitProgress * 0.65,
            });
          }
          
          if (rectRef.current) {
            const path = rectRef.current.querySelector('rect');
            if (path) {
              gsap.set(path, {
                opacity: 1 - exitProgress * 0.8,
              });
            }
          }
        }
      },
      onLeaveBack: () => {
        // Reset when scrolling back
        if (titleRef.current) {
          gsap.set(titleRef.current, { y: 0, opacity: 1, scale: 1 });
        }
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { y: 0, opacity: 1 });
        }
        if (microRef.current) {
          gsap.set(microRef.current, { y: 0, opacity: 1 });
        }
        if (imageRef.current) {
          gsap.set(imageRef.current, { scale: 1, opacity: 1 });
        }
      },
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="curriculum"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src="/roadmap-workspace.jpg"
          alt="3-Week Roadmap"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Green tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.7) 100%)',
        }}
      />

      {/* Neon rectangle outline */}
      <svg
        ref={rectRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ willChange: 'opacity' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="14"
          y="33"
          width="72"
          height="34"
          fill="none"
          stroke="#39FF14"
          strokeWidth="0.1"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0.4 }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-30 h-full w-full flex flex-col justify-center items-center px-8">
        <h2
          ref={titleRef}
          className="text-[16vw] md:text-[12vw] lg:text-[10vw] font-bold text-white tracking-tighter text-center leading-none mb-4"
          style={{ willChange: 'transform, opacity' }}
        >
          {worksConfig.title}
        </h2>
        
        <p
          ref={subtitleRef}
          className="text-[5vw] md:text-[3vw] lg:text-[2vw] font-light text-white/90 tracking-wide text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {worksConfig.subtitle}
        </p>
      </div>

      {/* Bottom microcopy - stacked on mobile */}
      <div
        ref={microRef}
        className="absolute left-1/2 bottom-[7vh] z-30 transform -translate-x-1/2 text-center px-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="text-mono text-white/50 text-[10px] md:text-xs leading-relaxed">
          <span className="md:hidden">
            WEEK 1: FOUNDATIONS<br/>
            WEEK 2: BUILD<br/>
            WEEK 3: ROADMAP
          </span>
          <span className="hidden md:inline">
            WEEK 1: FOUNDATIONS • WEEK 2: BUILD • WEEK 3: ROADMAP
          </span>
        </span>
      </div>
    </section>
  );
}
