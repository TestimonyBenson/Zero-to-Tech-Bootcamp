import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const rectRef = useRef<SVGSVGElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!contactConfig.title) return null;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pinned scroll animation
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=120%',
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
              y: 12 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: 6 * (1 - entranceProgress) + 'vh',
              opacity: entranceProgress,
            });
          }
          
          if (microRef.current) {
            gsap.set(microRef.current, {
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
              const length = 2 * (74 + 32);
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
          if (ctaRef.current) {
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
          }
          if (microRef.current) {
            gsap.set(microRef.current, { opacity: 1 });
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
              opacity: 1 - exitProgress * 0.75,
            });
          }
          
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, {
              opacity: 1 - exitProgress * 0.75,
            });
          }
          
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: -6 * exitProgress + 'vh',
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
              opacity: 1 - exitProgress * 0.6,
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
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { y: 0, opacity: 1 });
        }
        if (microRef.current) {
          gsap.set(microRef.current, { opacity: 1 });
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

  const handleCtaClick = () => {
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ willChange: 'transform, opacity' }}
      >
        <img
          src={contactConfig.image}
          alt="Final CTA"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) contrast(1.1)' }}
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

      {/* Neon rectangle outline */}
      <svg
        ref={rectRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ willChange: 'opacity' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect
          x="13"
          y="34"
          width="74"
          height="32"
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
          className="text-[10vw] md:text-[7vw] lg:text-[5vw] font-bold text-white tracking-tighter text-center leading-none mb-2"
          style={{ willChange: 'transform, opacity' }}
        >
          {contactConfig.title}
        </h2>
        
        <h3
          ref={subtitleRef}
          className="text-[6vw] md:text-[4vw] lg:text-[2.5vw] font-light text-white/90 tracking-wide text-center mb-10"
          style={{ willChange: 'transform, opacity' }}
        >
          {contactConfig.subtitle}
        </h3>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={handleCtaClick}
          className="btn-neon-filled mb-6"
          style={{ willChange: 'transform, opacity' }}
        >
          {contactConfig.submitButtonText}
        </button>

        {/* Microcopy */}
        <p
          ref={microRef}
          className="text-mono text-white/50 text-center"
          style={{ willChange: 'opacity' }}
        >
          Early bird closes soon. Cohort limited to 50.
        </p>
      </div>

      {/* Form Modal */}
      {showForm && (
        <form 
  action="https://formspree.io/f/xpqopgwn" 
  method="POST" 
  className="space-y-6"
>
  <div>
    <label className="text-mono text-white/60 block mb-2">{contactConfig.nameLabel}</label>
    <input 
      type="text" 
      name="name" // Important: Formspree needs this
      required
      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors"
      placeholder="Your full name"
    />
  </div>

  <div>
    <label className="text-mono text-white/60 block mb-2">{contactConfig.emailLabel}</label>
    <input 
      type="email" 
      name="email" // Important: Formspree needs this
      required
      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors"
      placeholder="your@email.com"
    />
  </div>

  <div>
    <label className="text-mono text-white/60 block mb-2">{contactConfig.projectTypeLabel}</label>
    <select 
      name="track" // Important: Formspree needs this
      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-[#39FF14] focus:outline-none transition-colors"
    >
      <option value="">{contactConfig.projectTypePlaceholder}</option>
      {contactConfig.projectTypeOptions.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>

  <button 
    type="submit" 
    className="w-full btn-neon-filled mt-4"
  >
    Complete Registration
  </button>
</form>
          </div>
        </div>
      )}
    </section>
  );
}
