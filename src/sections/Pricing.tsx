import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star } from 'lucide-react';
import { pricingConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedPrices, setAnimatedPrices] = useState<number[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!pricingConfig.title || pricingConfig.plans.length === 0) return null;

  const plans = pricingConfig.plans;

  useEffect(() => {
    setAnimatedPrices(new Array(plans.length).fill(0));

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
        
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: 5 * (1 - progress) + 'vh',
            opacity: progress,
          });
        }
        
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: 3 * (1 - progress) + 'vh',
            opacity: progress,
          });
        }
        
        cardsRef.current.forEach((card, i) => {
          if (card) {
            const staggerDelay = i * 0.15;
            const cardProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay)));
            gsap.set(card, {
              y: 8 * (1 - cardProgress) + 'vh',
              opacity: cardProgress,
              rotateX: 10 * (1 - cardProgress),
            });
          }
        });
      },
      onLeave: () => {
        // Animate price counters when section is fully visible
        plans.forEach((plan, i) => {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: plan.price,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              setAnimatedPrices((prev) => {
                const newPrices = [...prev];
                newPrices[i] = Math.round(obj.value);
                return newPrices;
              });
            },
          });
        });
      },
    });
    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const scrollToJoin = () => {
    const joinSection = document.getElementById('join');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#0b0b0d] overflow-hidden"
    >
      {/* Subtle green glow */}
      <div 
        className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(57,255,20,0.02) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ willChange: 'transform, opacity' }}
          >
            {pricingConfig.title}
          </h2>
          <p 
            ref={subtitleRef} 
            className="text-base md:text-lg text-white/60"
            style={{ willChange: 'transform, opacity' }}
          >
            {pricingConfig.subtitle}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch" style={{ perspective: '1000px' }}>
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative p-8 lg:p-10 ${
                plan.featured
                  ? 'bg-[#39FF14]/10 border border-[#39FF14]/30'
                  : 'bg-white/[0.03] border border-white/[0.08]'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute -top-3 right-6 flex items-center gap-1 px-3 py-1 bg-[#39FF14] text-black text-xs font-medium">
                  <Star className="w-3 h-3" />
                  RECOMMENDED
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-medium text-white mb-6">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
                  ₦{(animatedPrices[index] || plan.price).toLocaleString()}
                </span>
                <span className="text-white/50 ml-2">
                  / {plan.unit}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-10">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.featured ? 'bg-[#39FF14]/20' : 'bg-white/10'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.featured ? 'text-[#39FF14]' : 'text-white/60'}`} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={scrollToJoin}
                className={`w-full py-4 font-medium transition-all duration-300 ${
                  plan.featured
                    ? 'btn-neon-filled'
                    : 'btn-neon'
                }`}
              >
                {pricingConfig.ctaButtonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
