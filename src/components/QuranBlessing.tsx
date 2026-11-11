import React, { useEffect, useRef, useState } from 'react';

interface QuranBlessingProps {
  content: {
    quran: {
      subtitle: string;
      title: string;
      arabic: string;
      urdu: string;
      reference: string;
    };
  };
}

export const QuranBlessing: React.FC<QuranBlessingProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const arabicWords = content.quran.arabic.split(' ');

  return (
    <section ref={sectionRef} className="quran-blessing px-6 pb-19 text-center relative">
      {/* Top Gold Ornament */}
      <div aria-hidden="true" className="quran-ornament quran-ornament-top text-[#C69224]">
        <span>◆</span>
      </div>

      <p className="font-caps text-[10px] uppercase tracking-caps text-[#C69224] font-semibold">
        {content.quran.subtitle}
      </p>
      <h2 className="font-script mt-3 text-4xl text-[#68131E] drop-shadow-xs">
        {content.quran.title}
      </h2>

      <blockquote className="mt-8">
        <p
          lang="ar"
          dir="rtl"
          aria-label={content.quran.arabic}
          className={`verse-words font-arabic text-[1.78rem] text-[#68131E] leading-[2.1] font-normal ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          {arabicWords.map((word, idx) => (
            <span key={`${word}-${idx}`} aria-hidden="true" className="verse-word">
              {word}{' '}
            </span>
          ))}
        </p>

        <div
          aria-hidden="true"
          className={`verse-divider ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="bg-[#C69224]/30" />
          <b className="text-[#C69224] text-lg">۞</b>
          <span className="bg-[#C69224]/30" />
        </div>

        <p
          lang="ur"
          dir="rtl"
          className={`verse-translation font-arabic mx-auto max-w-[26rem] text-base leading-8 text-[#634F53] font-medium ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          {content.quran.urdu}
        </p>

        <cite
          className={`verse-reference mt-5 block font-caps text-[11px] not-italic tracking-caps text-[#C69224] font-semibold ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          {content.quran.reference}
        </cite>
      </blockquote>

      {/* Bottom Gold Ornament */}
      <div aria-hidden="true" className="quran-ornament quran-ornament-bottom text-[#C69224]">
        <span>◆</span>
      </div>
    </section>
  );
};
