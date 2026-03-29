import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.title) return null;

  useEffect(() => {
    // Entry animation on load
    const tl = gsap.timeline({ delay: 0.2 });

    // Image scale + fade
    tl.fromTo(
      imageRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    // Title animation - word by word
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '-=0.8'
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Tagline
    tl.fromTo(
      taglineRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    // CTA button
    tl.fromTo(
      ctaRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );

    // Vertical lines grow
    tl.fromTo(
      leftLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: 'expo.out' },
      '-=0.8'
    );
    
    tl.fromTo(
      rightLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: 'expo.out' },
      '-=0.9'
    );

    // Bottom microcopy
    tl.fromTo(
      [bottomLeftRef.current, bottomRightRef.current],
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    );

    setLoaded(true);

    // Scroll effects - exit animation
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=130%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Exit phase (70% - 100%)
        if (progress > 0.7) {
          const exitProgress = (progress - 0.7) / 0.3;
          
          if (titleRef.current) {
            gsap.set(titleRef.current, {
              y: -18 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.75,
            });
          }
          
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              y: -10 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: -8 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.8,
            });
          }
          
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              scale: 1 + 0.06 * exitProgress,
              opacity: 1 - exitProgress * 0.65,
            });
          }
          
          if (leftLineRef.current && rightLineRef.current) {
            gsap.set([leftLineRef.current, rightLineRef.current], {
              scaleY: 1 - exitProgress,
              transformOrigin: 'bottom',
            });
          }
        }
      },
      onLeaveBack: () => {
        // Reset all elements when scrolling back to top
        gsap.set(titleRef.current, { y: 0, opacity: 1 });
        gsap.set(subtitleRef.current, { y: 0, opacity: 1 });
        gsap.set(ctaRef.current, { y: 0, opacity: 1 });
        gsap.set(imageRef.current, { scale: 1, opacity: 1 });
        gsap.set([leftLineRef.current, rightLineRef.current], { scaleY: 1 });
      },
    });
    triggersRef.current.push(trigger1);

    return () => {
      tl.kill();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const titleWords = heroConfig.title.split(' ');

  const scrollToJoin = () => {
    const joinSection = document.getElementById('join');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.7) 100%)',
        }}
      />

      {/* Main background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={heroConfig.backgroundImage}
          alt="Hero"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) contrast(1.1)' }}
        />
        {/* Green tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(57,255,20,0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Vertical hairlines */}
      <div
        ref={leftLineRef}
        className="absolute left-[4vw] top-[18vh] w-px bg-white/20 z-20"
        style={{ height: '62vh', transformOrigin: 'top', willChange: 'transform' }}
      />
      <div
        ref={rightLineRef}
        className="absolute right-[4vw] top-[18vh] w-px bg-white/20 z-20"
        style={{ height: '62vh', transformOrigin: 'top', willChange: 'transform' }}
      />

      {/* Content container */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center px-8">
        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold text-white tracking-tighter mb-2 text-center"
          style={{ willChange: 'transform, opacity' }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.2em]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] font-light text-white/90 tracking-tight mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-sm md:text-base text-white/60 text-center max-w-md mb-10 tracking-wide"
          style={{ willChange: 'transform, opacity' }}
        >
          A 3-week program for beginners. No degree needed. No jargon. Just build.
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToJoin}
          className="btn-neon-filled"
          style={{ willChange: 'transform, opacity' }}
        >
          Join the Waitlist
        </button>
      </div>

      {/* Bottom microcopy - stacked on mobile, side by side on desktop */}
      <div
        ref={bottomLeftRef}
        className="absolute left-[4vw] bottom-[6vh] z-20 max-w-[45vw] md:max-w-none"
      >
        <span className="text-mono text-white/50 text-[10px] md:text-xs leading-relaxed block">
          <span className="md:hidden">ONLINE<br/>3 WEEKS<br/>BEGINNER FRIENDLY</span>
          <span className="hidden md:inline">ONLINE • 3 WEEKS • BEGINNER FRIENDLY</span>
        </span>
      </div>

      <div
        ref={bottomRightRef}
        className="absolute right-[4vw] bottom-[6vh] z-20 max-w-[45vw] md:max-w-none text-right"
      >
        <span className="text-mono text-white/50 text-[10px] md:text-xs leading-relaxed block">
          <span className="md:hidden">NEXT COHORT:<br/>EARLY BIRD OPEN</span>
          <span className="hidden md:inline">NEXT COHORT: EARLY BIRD OPEN</span>
        </span>
      </div>
    </section>
  );
}
