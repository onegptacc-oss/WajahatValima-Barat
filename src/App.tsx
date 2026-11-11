/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getWeddingContent } from './config/content';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { DiamondDivider } from './components/Divider';
import { Reveal } from './components/Reveal';
import { ScratchCard } from './components/ScratchCard';
import { SaveTheDate } from './components/SaveTheDate';
import { Countdown } from './components/Countdown';
import { ProgramTimeline } from './components/ProgramTimeline';
import { VenueSection } from './components/VenueSection';
import { QuranBlessing } from './components/QuranBlessing';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DoorOpen } from 'lucide-react';

export default function App() {
  const [isUrdu, setIsUrdu] = useState(false);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  const content = getWeddingContent(isUrdu);

  return (
    <>
      {/* Interactive Royal Envelope Opening Entrance */}
      {!isEnvelopeOpened && (
        <EnvelopeIntro
          onOpened={() => setIsEnvelopeOpened(true)}
          content={content}
        />
      )}

      {/* Main Wedding Invitation Card Body */}
      <main className="invitation-shell relative mx-auto w-full max-w-[519px] overflow-hidden bg-[#FAF6F0] text-[#261619] shadow-[0_24px_80px_-19px_rgba(45,12,17,0.25)] border-x border-[#C69224]/15">
        {/* Floating Quick Action Controls (Language Toggle & Re-open Envelope) */}
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsUrdu((prev) => !prev)}
            className="rounded-full border border-[#C69224]/40 bg-white/95 px-4 py-2 font-serif text-xs font-semibold text-[#68131E] shadow-lg shadow-[#68131E]/10 backdrop-blur-md hover:bg-[#FDFBF7] hover:border-[#C69224] hover:scale-105 active:scale-95 cursor-pointer transition-all flex items-center gap-1.5"
            aria-label="Toggle language between English and Urdu"
          >
            <span className="text-[#C69224]">◉</span> {isUrdu ? 'English' : 'اردو'}
          </button>

          <button
            type="button"
            onClick={() => setIsEnvelopeOpened(false)}
            className="rounded-full border border-[#C69224]/40 bg-white/95 px-3.5 py-2 font-serif text-xs font-semibold text-[#68131E] shadow-lg shadow-[#68131E]/10 backdrop-blur-md hover:bg-[#FDFBF7] hover:border-[#C69224] hover:scale-105 active:scale-95 cursor-pointer transition-all flex items-center gap-1.5"
            aria-label="Re-open wedding gate"
            title="Experience the Royal Gate Entrance again"
          >
            <DoorOpen className="w-3.5 h-3.5 text-[#C69224]" />
            <span className="hidden sm:inline">Royal Gate</span>
          </button>
        </div>

        {/* Section 0: Hero Section with Royal Venue Backdrop & Wajahat Details */}
        <section className="hero-reveal relative min-h-[100svh] overflow-hidden text-white">
          <img
            src="/rosabel-banquet-grand-hall.jpg"
            alt="Icon Marquee grand illuminated wedding hall"
            width={900}
            height={1600}
            className="absolute inset-0 h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180306]/85 via-[#180306]/65 to-[#180306]/92" />

          {/* Hero Copy */}
          <div className="hero-copy relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-7 pb-24 pt-19 text-center">
            {/* Sacred Bismillah */}
            <p className="font-arabic text-amber-100/90 text-sm sm:text-base tracking-widest mb-3" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="font-serif text-[11px] italic text-amber-100/80 mb-4">
              In the Name of Allah, the Most Gracious, the Most Merciful
            </p>

            {/* Host Information */}
            <p className="font-caps text-xs sm:text-sm tracking-[0.22em] text-amber-300 font-bold uppercase mb-2">
              {content.host.name}
            </p>

            <p className="max-w-[21rem] font-serif text-sm italic leading-relaxed text-amber-100/90 mb-4">
              {content.hero.invitationText}
            </p>

            {/* Event Header Banner */}
            <div className="flex flex-col items-center gap-2 mb-3">
              <div className="inline-block px-4 py-1 rounded-full bg-amber-400/19 border border-amber-300/30">
                <span className="font-caps text-[10px] tracking-widest text-amber-100 uppercase font-semibold">
                  Valima Reception &amp; Wedding Ceremony
                </span>
              </div>
            </div>

            {/* Groom Name Calligraphy (محمد وجاہت) & English (Muhammad Wajahat) */}
            <div className="my-3 flex flex-col items-center">
              <div className="my-3 flex flex-col items-center">
  <div className="my-3 flex flex-col items-center">
  <p className="font-arabic text-3xl sm:text-4xl font-bold text-[#FFE68A] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_0_24px_rgba(255,215,0,0.35)] tracking-wide">
  مُحَمَّد وَجَاہَت عَلِی
</p>
</div>
</div>
         {/* <p className="font-['Dancing_Script'] text-4xl sm:text-5xl text-[#FFF8D6] drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] -mt-1 font-semibold">
  Muhammad Wajahat
</p> */}
              {/* Prominent Badge */}
           <div className="mt-2 inline-flex items-center justify-center px-5 py-1 rounded-full bg-[#68131E]/90 border border-amber-300/80 shadow-[0_0_12px_rgba(255,215,0,0.18)]">
  <span className="font-['Dancing_Script'] text-2xl sm:text-3xl font-semibold italic text-[#FFF3B0] drop-shadow-sm leading-none py-1">
    Muhammad Wajahat
  </span>
</div>
     </div>

            <p className="font-serif text-sm italic text-amber-100 mt-1 drop-shadow-sm">
              {content.groom.parents}
            </p>

           <p className="font-serif text-base italic text-amber-300/90 my-2">
  with the beloved daughter of
</p>
            <p className="font-serif text-base font-semibold text-amber-100 tracking-wide drop-shadow-sm">
              {content.bride.parents}
            </p>

            {/* Auspicious Dates on SEPARATE lines */}
            <div className="mt-4 max-w-[21rem] w-full mx-auto p-3 rounded-xl bg-black/65 border border-amber-300/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
              <p className="font-caps text-[9px] tracking-[0.22em] text-amber-300 uppercase font-bold text-center mb-2">
                Auspicious Wedding Dates
              </p>
             <div className="space-y-1.5 font-serif text-center">
  <div className="flex items-center justify-center gap-2 py-1 px-3 rounded-lg bg-white/10 border border-amber-300/25">
    <span className="text-base font-bold text-amber-100 tracking-wide">
      Barat: Wednesday, 18th November 2026
    </span>
  </div>

                <div className="flex items-center justify-center gap-2 py-1 px-3 rounded-lg bg-white/10 border border-amber-300/25">
                  <span className="text-sm font-bold text-amber-100 tracking-wide">
                    Valima: Thursday, 19th November 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Blessing Note from Card */}
            <p className="mt-4 max-w-[18rem] font-serif text-xs italic leading-relaxed text-amber-100/90 border-t border-amber-300/25 pt-3">
              &ldquo;{content.hero.blessing}&rdquo;
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-7 z-10 text-center text-amber-100/80">
            <span className="font-caps text-[9px] tracking-caps uppercase font-semibold">
              {content.hero.scrollText}
            </span>
            <div className="animate-bounce-arrow mt-1 text-xl text-amber-300">⌄</div>
          </div>
        </section>

        {/* Section 1: Faith & Love */}
        <section className="px-8 py-16 text-center">
          <Reveal>
            <p className="font-script text-3xl sm:text-4xl text-[#68131E]">
              {content.faith.title}
            </p>
            <p className="mx-auto mt-5 max-w-[21rem] font-serif text-base italic leading-8 text-[#634F53]">
              {content.faith.desc}
            </p>
            <span className="mt-4 block text-[#C69224]">♥</span>
          </Reveal>
        </section>

        {/* Section 2: Scratch to Reveal Dates */}
        <section className="px-4 sm:px-6 pb-16 text-center w-full flex flex-col items-center justify-center overflow-x-clip">
          <Reveal className="w-full flex flex-col items-center">
            <h2 className="font-script text-4xl text-[#68131E]">{content.scratch.title}</h2>
            <DiamondDivider />
          </Reveal>
          <Reveal delay={100} className="mt-4 w-full flex justify-center items-center">
            <ScratchCard
              date1={content.scratch.date1}
              date2={content.scratch.date2}
              label={content.scratch.label}
              heading={content.scratch.heartHeading}
              subheading={content.scratch.heartSub}
            />
          </Reveal>
        </section>

        {/* Section 3: Wedding Functions & Save the Date Cards */}
        <SaveTheDate content={content} />

        {/* Section 4: Venue Photos Gallery (Real Venue Photos) */}
        <section className="px-5 pb-16">
          <Reveal>
            <div className="text-center mb-8">
              <span className="font-caps text-[10px] tracking-widest text-[#C69224] uppercase font-bold">
                Wedding Venue Gallery
              </span>
              <h2 className="font-script text-4xl text-[#68131E] mt-1">
                Icon Marquee
              </h2>
              <p className="font-serif text-xs text-[#634F53] ">
                Sector 11-B, North Karachi
              </p>
              <DiamondDivider />
            </div>
          </Reveal>

          {/* Photo 1: Grand Hall Overhead View */}
          <Reveal>
            <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_16px_40px_rgba(82,14,23,0.12)] border border-[#C69224]/35 overflow-hidden transition-all hover:shadow-[0_19px_50px_rgba(82,14,23,0.18)]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/rosabel-banquet-grand-hall.jpg"
                  alt="Icon Marquee Grand Hall with crystal chandeliers and red velvet tables"
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-1 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100/70 border border-[#C69224]/30 font-caps text-[9px] font-bold tracking-wider text-[#68131E] uppercase mb-1.5">
                  Icon Marquee · Grand Ballroom
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#68131E] tracking-normal leading-snug">
                  Grand Hall &amp; Crystal Chandeliers
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[#634F53] mt-1 font-medium">
                  Spacious banquet hall, marquee draped ceiling &amp; dining reception
                </p>
              </div>
            </div>
          </Reveal>

          {/* Photo 2: Royal Bridal Stage */}
          <Reveal delay={100} className="mt-8">
            <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_16px_40px_rgba(82,14,23,0.12)] border border-[#C69224]/35 overflow-hidden transition-all hover:shadow-[0_19px_50px_rgba(82,14,23,0.18)]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/rosabel-wedding-stage.jpg"
                  alt="Icon Marquee royal bridal stage with golden sofa and floral arch"
                  loading="lazy"
                  width={1280}
                  height={719}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-1 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100/70 border border-[#C69224]/30 font-caps text-[9px] font-bold tracking-wider text-[#68131E] uppercase mb-1.5">
                  Bridal Stage &amp; Decor
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#68131E] tracking-normal leading-snug">
                  Royal Bridal Stage
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[#634F53] mt-1 font-medium">
                  Golden throne sofa set &amp; fresh floral arched backdrop
                </p>
              </div>
            </div>
          </Reveal>

          {/* Photo 3: Dining Hall & Lounge Setup */}
          <Reveal delay={150} className="mt-8">
            <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-[0_16px_40px_rgba(82,14,23,0.12)] border border-[#C69224]/35 overflow-hidden transition-all hover:shadow-[0_19px_50px_rgba(82,14,23,0.18)]">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/rosabel-dining-hall.jpg"
                  alt="Icon Marquee dining hall and guest lounge seating"
                  loading="lazy"
                  width={1280}
                  height={719}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-1 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100/70 border border-[#C69224]/30 font-caps text-[9px] font-bold tracking-wider text-[#68131E] uppercase mb-1.5">
                  Dining &amp; Hospitality
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#68131E] tracking-normal leading-snug">
                  Banquet Dining &amp; Lounge Setup
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[#634F53] mt-1 font-medium">
                  Guest lounge seating, floral arches &amp; Valima dinner arrangement
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Section 5: Countdown to Celebrations */}
        <section className="px-6 pb-19 text-center">
          <Reveal>
            <h2 className="font-script text-4xl text-[#68131E]">
              {content.countdown.title.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx === 0 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <DiamondDivider />
            <Countdown
              targetDate={content.countdown.eventDateTime}
              labels={{
                days: content.countdown.days,
                hours: content.countdown.hours,
                minutes: content.countdown.minutes,
                seconds: content.countdown.seconds,
              }}
            />
          </Reveal>
        </section>

        {/* Section 6: Programme Timelines (Barat & Valima) */}
        <ProgramTimeline content={content} />

        {/* Section 7: Venues & Google Maps Directions */}
        <VenueSection content={content} />

        {/* Section 8: Quran Blessing */}
        <QuranBlessing content={content} />

        {/* Section 9: R.S.V.P & Contact Numbers */}
        <ContactSection content={content} />

        {/* Footer */}
        <Footer content={content} />
      </main>
    </>
  );
}
