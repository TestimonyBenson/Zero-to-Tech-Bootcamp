import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bracketRef = useRef<SVGSVGElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.titleLine1) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Entry animations
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top 40%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (eyebrowRef.current) {
          gsap.set(eyebrowRef.current, {
            x: -6 * (1 - progress) + 'vw',
            opacity: progress,
          });
        }
        
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: 6 * (1 - progress) + 'vh',
            opacity: progress,
          });
        }
        
        if (textRef.current) {
          gsap.set(textRef.current, {
            y: 4 * (1 - progress) + 'vh',
            opacity: progress,
          });
        }
        
        if (bulletsRef.current) {
          const bullets = bulletsRef.current.querySelectorAll('li');
          bullets.forEach((bullet, i) => {
            const staggerDelay = i * 0.1;
            const bulletProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay)));
            gsap.set(bullet, {
              y: 3 * (1 - bulletProgress) + 'vh',
              opacity: bulletProgress,
            });
          });
        }
        
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            x: 8 * (1 - progress) + 'vw',
            opacity: progress,
            scale: 0.98 + 0.02 * progress,
          });
        }
        
        if (bracketRef.current) {
          const path = bracketRef.current.querySelector('path');
          if (path) {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length * (1 - progress),
            });
          }
        }
      },
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const bullets = [
    'Understand Frontend vs Backend vs Data vs UI/UX',
    'Build and host your first website',
    'Get a realistic roadmap for internships & freelance work',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#050505]"
    >
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(57,255,20,0.02) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <span
              ref={eyebrowRef}
              className="text-mono text-[#39FF14] block mb-4"
              style={{ willChange: 'transform, opacity' }}
            >
              THE PROMISE
            </span>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ willChange: 'transform, opacity' }}
            >
              {aboutConfig.titleLine1}
            </h2>

            {/* Description */}
            <p
              ref={textRef}
              className="text-base md:text-lg text-white/70 leading-relaxed mb-8"
              style={{ willChange: 'transform, opacity' }}
            >
              {aboutConfig.description}
            </p>

            {/* Bullets */}
            <ul ref={bulletsRef} className="space-y-4">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#39FF14]/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[#39FF14]" />
                  </span>
                  <span className="text-white/80">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Image with bracket */}
          <div className="order-1 lg:order-2 relative">
            {/* Neon bracket SVG */}
            <svg
              ref={bracketRef}
              className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 2 L 2 98 L 30 98 M 70 98 L 98 98 L 98 2 M 98 2 L 70 2 M 30 2 L 2 2"
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
                style={{ opacity: 0.6 }}
              />
            </svg>

            {/* Image */}
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              <img
                src={aboutConfig.image1}
                alt={aboutConfig.image1Alt}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9) contrast(1.05)' }}
              />
              {/* Green tint overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
