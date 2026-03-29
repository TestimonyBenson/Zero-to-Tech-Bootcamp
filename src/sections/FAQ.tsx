import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { faqConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!faqConfig.title || faqConfig.faqs.length === 0) return null;

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
        
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            x: -4 * (1 - progress) + 'vw',
            opacity: progress,
          });
        }
        
        if (barRef.current) {
          gsap.set(barRef.current, {
            scaleY: progress,
          });
        }
        
        itemsRef.current.forEach((item, i) => {
          if (item) {
            const staggerDelay = i * 0.08;
            const itemProgress = Math.max(0, Math.min(1, (progress - staggerDelay) / (1 - staggerDelay)));
            gsap.set(item, {
              y: 3 * (1 - itemProgress) + 'vh',
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Title */}
          <div className="lg:col-span-3">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-white lg:sticky lg:top-32"
              style={{ willChange: 'transform, opacity' }}
            >
              {faqConfig.title}
            </h2>
          </div>

          {/* Right column - FAQ items */}
          <div className="lg:col-span-9">
            <div className="space-y-0">
              {faqConfig.faqs.map((faq, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="relative"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Question */}
                  <button
                    className={`w-full py-5 lg:py-6 flex items-center justify-between text-left border-b transition-all duration-300 ${
                      openIndex === index
                        ? 'border-[#39FF14]/50'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-base lg:text-lg text-white pr-8 font-medium">
                      {faq.question}
                    </h3>

                    {/* Plus icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? 'bg-[#39FF14] border-[#39FF14] rotate-45'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <Plus className={`w-4 h-4 ${openIndex === index ? 'text-black' : 'text-white'}`} />
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openIndex === index
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="py-5 lg:py-6">
                      <p className="text-white/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative neon bar */}
      <div
        ref={barRef}
        className="hidden lg:block absolute right-[8vw] top-[22vh] w-[2px] h-[46vh] bg-[#39FF14]/30 origin-top"
        style={{ willChange: 'transform' }}
      />
    </section>
  );
}
