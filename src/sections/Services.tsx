import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!servicesConfig.title || servicesConfig.services.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scroll-driven animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'top 40%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        if (imageRef.current) {
          gsap.set(imageRef.current, {
            x: -8 * (1 - progress) + 'vw',
            opacity: progress,
            scale: 0.98 + 0.02 * progress,
          });
        }
        
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            x: 8 * (1 - progress) + 'vw',
            opacity: progress,
          });
        }
        
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            x: 8 * (1 - progress) + 'vw',
            opacity: progress,
          });
        }
        
        if (underlineRef.current) {
          gsap.set(underlineRef.current, {
            scaleX: progress,
          });
        }
        
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const staggerDelay = i * 0.1;
            const itemProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay)));
            gsap.set(item, {
              x: 4 * (1 - itemProgress) + 'vw',
              opacity: itemProgress,
            });
          }
        });
      },
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const services = servicesConfig.services;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Subtle green glow */}
      <div 
        className="absolute top-1/2 right-0 w-1/2 h-1/2 pointer-events-none transform -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden"
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src="/build-project.jpg"
              alt="Build Project"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.85) contrast(1.05)' }}
            />
            {/* Green tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Right column - Content */}
          <div>
            {/* Eyebrow */}
            <span className="text-mono text-[#39FF14] block mb-4">
              {servicesConfig.title}
            </span>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
              style={{ willChange: 'transform, opacity' }}
            >
              {servicesConfig.subtitle}
            </h2>

            {/* Neon underline */}
            <div
              ref={underlineRef}
              className="h-[2px] bg-[#39FF14] mb-8 origin-left"
              style={{ willChange: 'transform', width: '80%' }}
            />

            {/* Description */}
            <p
              ref={subtitleRef}
              className="text-base md:text-lg text-white/70 leading-relaxed mb-8"
              style={{ willChange: 'transform, opacity' }}
            >
              By the end of Week 2, you'll have a real webpage: your name, your story, your links. 
              You'll host it for free and share it with friends, recruiters, or potential clients.
            </p>

            {/* Service items */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.08] hover:border-[#39FF14]/30 transition-colors duration-300"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <span className="text-mono text-[#39FF14] flex-shrink-0">
                    {service.id})
                  </span>
                  <div>
                    <h3 className="text-white font-medium mb-1">{service.title}</h3>
                    <p className="text-white/50 text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
