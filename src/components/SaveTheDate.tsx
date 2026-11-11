import React, { useState } from 'react';
import { CalendarDays, CalendarPlus, Clock, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';

interface EventItem {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  year: string;
  weekday: string;
  venue: string;
  address: string;
  timeline: Array<{ title: string; time: string; desc: string }>;
}

interface SaveTheDateProps {
  content: {
    events: {
      barat: EventItem;
      valima: EventItem;
    };
    groom: {
      name: string;
    };
  };
}

export const SaveTheDate: React.FC<SaveTheDateProps> = ({ content }) => {
  const [activeEvent, setActiveEvent] = useState<'valima' | 'barat'>('valima');

  const selected = content.events[activeEvent];

  const handleAddToCalendar = (evt: EventItem) => {
    const isBarat = evt.id === 'barat';

    // Barat starts 7:30 PM, Valima starts 9:00 PM
    const dtStart = isBarat ? '20261118T193000' : '20261119T210000';
    const dtEnd = isBarat ? '20261118T233000' : '20261120T000000';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wajahat Wedding Celebrations//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${evt.id}-202611-Wajahat@wedding`,
      'DTSTAMP:20261110T000000Z',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${evt.title} - Muhammad Wajahat`,
      `DESCRIPTION:${evt.title} of Muhammad Wajahat. Venue: ${evt.venue}, ${evt.address}. Programme: ${evt.timeline.map((t) => `${t.title}: ${t.time} (${t.desc})`).join('; ')}`,
      `LOCATION:${evt.venue}\\, ${evt.address}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${evt.id}-invitation-muhammad-wajahat.ics`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="px-6 pb-16 text-center">
      <Reveal>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C69224]/35 bg-[#C69224]/10 text-[#C69224] shadow-sm">
          <CalendarDays className="h-5 w-5 stroke-[1.4]" />
        </span>

        <p className="font-caps mt-4 text-[10px] tracking-caps text-[#C69224] font-semibold uppercase">
          Mark Your Calendar
        </p>

        <h2 className="font-script mt-2 text-4xl text-[#68131E] drop-shadow-xs">
          Wedding Functions
        </h2>

        <div className="mt-3 flex items-center justify-center gap-2 text-[#C69224]">
          <span className="h-px w-8 bg-[#C69224]/35" />
          <span className="text-xs text-[#68131E]">♥</span>
          <span className="h-px w-8 bg-[#C69224]/35" />
        </div>

        {/* Function Switcher Tabs */}
        <div className="mx-auto mt-6 inline-flex p-1 rounded-full bg-[#EAE2D5]/80 border border-[#C69224]/30 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveEvent('valima')}
            className={`px-5 py-2 rounded-full font-serif text-xs font-semibold transition-all cursor-pointer ${
              activeEvent === 'valima'
                ? 'bg-[#68131E] text-white shadow-md'
                : 'text-[#68131E] hover:text-[#4A0D15]'
            }`}
          >
            Valima (19 Nov)
          </button>

          <button
            type="button"
            onClick={() => setActiveEvent('barat')}
            className={`px-5 py-2 rounded-full font-serif text-xs font-semibold transition-all cursor-pointer ${
              activeEvent === 'barat'
                ? 'bg-[#68131E] text-white shadow-md'
                : 'text-[#68131E] hover:text-[#4A0D15]'
            }`}
          >
            Barat (18 Nov)
          </button>
        </div>

        {/* Function Details Card */}
        <div className="relative mx-auto mt-6 max-w-[22rem] rounded-xl border border-[#C69224]/30 bg-white px-6 py-9 shadow-[0_16px_40px_rgba(82,14,23,0.06)] transition-all">
          {/* Event Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-[#C69224]/15 border border-[#C69224]/30 font-caps text-[9px] tracking-wider text-[#68131E] font-bold uppercase mb-2">
            {selected.title}
          </span>

          <p className="font-caps text-[11px] tracking-caps text-[#68131E] font-semibold uppercase mt-1">
            {selected.month}
          </p>

          <div className="mt-2 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#C69224]/35" />

            <span className="font-serif text-7xl leading-none text-[#68131E] font-normal drop-shadow-xs">
              {selected.day}
            </span>

            <span className="h-px w-10 bg-[#C69224]/35" />
          </div>

          <p className="font-caps mt-2 text-[11px] tracking-caps text-[#634F53] font-medium">
            {selected.year}
          </p>

          <p className="font-script mt-2 text-3xl text-[#68131E] capitalize">
            {selected.weekday}
          </p>

          {/* Venue & Location */}
          <div className="mt-4 pt-3 border-t border-[#C69224]/19">
            <p className="font-serif text-base font-bold text-[#68131E] flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C69224]" />
              {selected.venue}
            </p>

            <p className="mt-1 font-serif text-xs text-[#634F53] leading-relaxed">
              {selected.address}
            </p>
          </div>

          {/* Timing Programme */}
          <div className="mt-4 p-3 rounded-lg bg-amber-50/60 border border-[#C69224]/25">
            <p className="font-caps text-[9px] tracking-wider text-[#68131E] font-bold uppercase mb-2.5 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-[#C69224]" />
              Programme Details
            </p>

            <div className="space-y-2 text-xs font-serif text-left">
              {selected.timeline.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/80 p-2 rounded-md border border-[#C69224]/19"
                >
                  <div className="flex justify-between items-center text-[#261619]">
                    <span className="font-semibold text-[#68131E]">
                      {item.title}:
                    </span>

                    <span className="font-medium bg-amber-100/70 text-[#68131E] px-2 py-0.5 rounded border border-[#C69224]/19 text-[11px]">
                      {item.time}
                    </span>
                  </div>

                  {item.desc && (
                    <p className="mt-1 text-[11px] text-[#634F53] leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Calendar Button */}
          <button
            type="button"
            onClick={() => handleAddToCalendar(selected)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all mt-6 h-11 w-full rounded-full bg-[#68131E] hover:bg-[#4A0D15] px-6 font-caps text-[10px] tracking-caps text-white shadow-md hover:shadow-lg hover:shadow-[#68131E]/25 hover:scale-[1.02] active:scale-95"
          >
            <CalendarPlus className="h-4 w-4 text-white" />
            Add {selected.id === 'valima' ? 'Valima' : 'Barat'} to Calendar
          </button>
        </div>
      </Reveal>
    </section>
  );
};
