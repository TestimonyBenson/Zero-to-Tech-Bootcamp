import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!testimonialsConfig.title || testimonialsConfig.testimonials.length === 0) return null;

  const testimonial = testimonialsConfig.testimonials[0];

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
          
          if (nameRef.current) {
            gsap.set(nameRef.current, {
              y: 20 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
              scale: 0.97 + 0.03 * entranceProgress,
            });
          }
          
          if (labelRef.current) {
            gsap.set(labelRef.current, {
              y: -2 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (lineRef.current) {
            gsap.set(lineRef.current, {
              y: 2 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              scale: 1.08 - 0.08 * entranceProgress,
              opacity: entranceProgress,
            });
          }
        }
        // SETTLE (30% - 70%)
        else if (progress <= 0.7) {
          if (nameRef.current) {
            gsap.set(nameRef.current, { y: 0, opacity: 1, scale: 1 });
          }
          if (labelRef.current) {
            gsap.set(labelRef.current, { y: 0, opacity: 1 });
          }
          if (lineRef.current) {
            gsap.set(lineRef.current, { y: 0, opacity: 1 });
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, { scale: 1, opacity: 1 });
          }
        }
        // EXIT (70% - 100%)
        else {
          const exitProgress = (progress - 0.7) / 0.3;
          
          if (nameRef.current) {
            gsap.set(nameRef.current, {
              y: -16 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.75,
            });
          }
          
          if (labelRef.current) {
            gsap.set(labelRef.current, {
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (lineRef.current) {
            gsap.set(lineRef.current, {
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              scale: 1 + 0.06 * exitProgress,
              opacity: 1 - exitProgress * 0.65,
            });
          }
        }
      },
      onLeaveBack: () => {
        // Reset when scrolling back
        if (nameRef.current) {
          gsap.set(nameRef.current, { y: 0, opacity: 1, scale: 1 });
        }
        if (labelRef.current) {
          gsap.set(labelRef.current, { y: 0, opacity: 1 });
        }
        if (lineRef.current) {
          gsap.set(lineRef.current, { y: 0, opacity: 1 });
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
      id="testimonials"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        />
        {/* Green tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(57,255,20,0.06) 0%, transparent 60%)',
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

      {/* Content */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center px-8">
        {/* Label */}
        <span
          ref={labelRef}
          className="text-mono text-white/60 mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {testimonialsConfig.title}
        </span>

        {/* Name */}
        <h2
          ref={nameRef}
          className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold text-white tracking-tighter text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {testimonial.name}
        </h2>
      </div>

      {/* Bottom line */}
      <div className="absolute left-1/2 bottom-[7vh] z-30 transform -translate-x-1/2">
        <p
          ref={lineRef}
          className="text-mono text-white/50 text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {testimonial.title}
        </p>
      </div>
    </section>
  );
}
