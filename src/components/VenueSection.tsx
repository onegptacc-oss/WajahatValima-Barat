import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { DiamondDivider } from './Divider';
import { Reveal } from './Reveal';

interface VenueItem {
  id: string;
  title: string;
  date: string;
  venue: string;
  address: string;
  mapsUrl: string;
  embedUrl: string;
}

interface VenueSectionProps {
  content: {
    events: {
      valima: VenueItem;
      barat: VenueItem;
    };
  };
}

const UPDATED_VENUES = {
  valima: {
    venue: 'One Window Solution and Restaurant',
    address: 'One Window Solution and Restaurant, Karachi, Pakistan',
    mapsUrl:
      'https://www.google.com/maps/place/One+Window+Solution+and+Restaurant/@24.9344834,67.0697787,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33f001ee08f45:0xe2a2ecd829517b9c!8m2!3d24.9344786!4d67.0723536!16s%2Fg%2F11w5bpn3x5?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D',
    embedUrl:
      'https://www.google.com/maps?q=24.9344786,67.0723536&output=embed',
  },

  barat: {
    venue: 'ICON MARQUEE',
    address: 'ICON MARQUEE, Karachi, Pakistan',
    mapsUrl:
      'https://www.google.com/maps/place/ICON+MARQUEE/@24.9721222,67.0557025,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb341d4bd101091:0x4f8c54eee93a9b76!8m2!3d24.9721174!4d67.0582774!16s%2Fg%2F11vs5mdlk_?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D',
    embedUrl:
      'https://www.google.com/maps?q=24.9721174,67.0582774&output=embed',
  },
};

export const VenueSection: React.FC<VenueSectionProps> = ({ content }) => {
  const [selectedVenue, setSelectedVenue] = useState<'valima' | 'barat'>('valima');

  const current = content.events[selectedVenue];
  const updatedVenue = UPDATED_VENUES[selectedVenue];

  return (
    <section className="px-6 pb-20 text-center">
      <Reveal>
        <div className="text-center">
          <MapPin className="mx-auto h-5 w-5 stroke-[1.4] text-[#C69224]" />

          <h2 className="font-script mt-2 text-4xl text-[#68131E]">
            Locations &amp; Directions
          </h2>

          <DiamondDivider />
        </div>

        {/* Venue Selector */}
        <div className="mx-auto mt-4 inline-flex flex-wrap justify-center p-1 rounded-full bg-[#EAE2D5]/80 border border-[#C69224]/30 shadow-inner">
          <button
            type="button"
            onClick={() => setSelectedVenue('valima')}
            className={`px-4 py-1.5 rounded-full font-serif text-xs font-semibold transition-all cursor-pointer ${
              selectedVenue === 'valima'
                ? 'bg-gradient-to-r from-[#68131E] to-[#520E17] text-white shadow-md'
                : 'text-[#520E17] hover:text-[#68131E]'
            }`}
          >
            One Window Solution (Valima)
          </button>

          <button
            type="button"
            onClick={() => setSelectedVenue('barat')}
            className={`px-4 py-1.5 rounded-full font-serif text-xs font-semibold transition-all cursor-pointer ${
              selectedVenue === 'barat'
                ? 'bg-gradient-to-r from-[#68131E] to-[#520E17] text-white shadow-md'
                : 'text-[#520E17] hover:text-[#68131E]'
            }`}
          >
            ICON MARQUEE (Barat)
          </button>
        </div>

        {/* Selected Venue Display */}
        <div className="mt-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C69224]/15 border border-[#C69224]/30 font-caps text-[9px] tracking-wider text-[#68131E] font-bold uppercase mb-2">
            {current.title} · {current.date}
          </span>

          <h3 className="font-serif text-2xl font-bold text-[#520E17]">
            {updatedVenue.venue}
          </h3>

          <p className="mt-1 font-serif text-sm leading-relaxed text-[#634F53] max-w-md mx-auto">
            {updatedVenue.address}
          </p>

          <a
            href={updatedVenue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open directions for ${updatedVenue.venue}`}
            className="group relative mt-5 block overflow-hidden rounded-xl border-2 border-[#C69224]/35 shadow-[0_16px_40px_rgba(82,14,23,0.12)] transition-transform hover:-translate-y-0.5"
          >
            <iframe
              title={`Map of ${updatedVenue.venue}`}
              src={updatedVenue.embedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none block h-64 w-full border-0 grayscale-[10%]"
            />

            <span className="absolute inset-0 bg-[#520E17]/10 transition-colors group-hover:bg-[#520E17]/0" />

            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#68131E]/95 via-[#520E17]/95 to-[#68131E]/95 py-3.5 font-serif text-sm font-medium text-amber-100 shadow-md">
              <Navigation className="h-4 w-4 text-amber-300" />
              {updatedVenue.venue} · Open In Map
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
};
