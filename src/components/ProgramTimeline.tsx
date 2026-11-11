import React from 'react';
import { Clock3, Sparkles } from 'lucide-react';
import { DiamondDivider } from './Divider';
import { Reveal } from './Reveal';

interface ProgramTimelineProps {
  content: {
    events: {
      barat: {
        title: string;
        date: string;
        venue: string;
        timeline: Array<{ title: string; time: string; desc: string }>;
      };
      valima: {
        title: string;
        date: string;
        venue: string;
        timeline: Array<{ title: string; time: string; desc: string }>;
      };
    };
  };
}

export const ProgramTimeline: React.FC<ProgramTimelineProps> = ({ content }) => {
  return (
    <section className="px-7 pb-19">
      <Reveal>
        <div className="text-center">
          <Clock3 className="mx-auto h-5 w-5 stroke-[1.4] text-[#C69224]" />
          <h2 className="font-script mt-2 text-4xl text-[#68131E]">
            Programme Timeline
          </h2>
          <DiamondDivider />
        </div>
      </Reveal>

      <div className="space-y-10 mt-6">
        {/* Barat Event Schedule */}
        <div className="rounded-xl p-5 bg-white/80 border border-[#C69224]/30 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C69224]/19">
            <span className="p-1 rounded-full bg-[#C69224]/15 text-[#C69224]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#68131E]">
                {content.events.barat.title}
              </h3>
              <p className="font-serif text-xs text-[#634F53]">
                {content.events.barat.date} · {content.events.barat.venue}
              </p>
            </div>
          </div>

          <ol className="relative border-l-2 border-[#C69224]/35 pl-6 ml-3 space-y-5">
            {content.events.barat.timeline.map((event, idx) => (
              <li key={event.title} className="relative">
                <span className="absolute -left-[1.95rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gradient-to-br from-[#DFC377] to-[#C69224] shadow-[0_0_8px_rgba(198,146,36,0.5)]" />
                <Reveal delay={idx * 60}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-base font-semibold text-[#68131E]">
                      {event.title}
                    </h4>
                    <span className="font-serif text-xs font-bold text-[#68131E] bg-[#C69224]/15 px-2 py-0.5 rounded">
                      {event.time}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-xs italic text-[#634F53]">
                    {event.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Valima Event Schedule */}
        <div className="rounded-xl p-5 bg-white/80 border border-[#C69224]/30 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#C69224]/19">
            <span className="p-1 rounded-full bg-[#68131E]/10 text-[#68131E]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#68131E]">
                {content.events.valima.title}
              </h3>
              <p className="font-serif text-xs text-[#634F53]">
                {content.events.valima.date} · {content.events.valima.venue}
              </p>
            </div>
          </div>

          <ol className="relative border-l-2 border-[#C69224]/35 pl-6 ml-3 space-y-5">
            {content.events.valima.timeline.map((event, idx) => (
              <li key={event.title} className="relative">
                <span className="absolute -left-[1.95rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gradient-to-br from-[#DFC377] to-[#C69224] shadow-[0_0_8px_rgba(198,146,36,0.5)]" />
                <Reveal delay={idx * 60}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-base font-semibold text-[#68131E]">
                      {event.title}
                    </h4>
                    <span className="font-serif text-xs font-bold text-[#68131E] bg-[#C69224]/15 px-2 py-0.5 rounded">
                      {event.time}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-xs italic text-[#634F53]">
                    {event.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
