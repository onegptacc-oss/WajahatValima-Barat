import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronDown, Volume2, VolumeX, DoorOpen } from 'lucide-react';

interface EnvelopeIntroProps {
  onOpened: () => void;
  content: {
    host: {
      name: string;
    };
    groom: {
      name: string;
      parents: string;
    };
    bride: {
      name: string;
      parents: string;
    };
    envelope: {
      ceremony: string;
      invited: string;
      tap: string;
      toOpen: string;
    };
    coupleNames: string;
  };
}

// Royal synthesized harp arpeggio via Web Audio API
function playRoyalChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    // Majestic Pentatonic Royal Chime arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.07);

      gain.gain.setValueAtTime(0, now + index * 0.07);
      gain.gain.linearRampToValueAtTime(0.16, now + index * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.07);
      osc.stop(now + index * 0.07 + 1.9);
    });
  } catch {
    // Non-blocking fallback
  }
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpened, content }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [hasSparkleBurst, setHasSparkleBurst] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const handleOpen = () => {
    if (isOpening) return;
    if (soundEnabled) {
      playRoyalChime();
    }
    setIsOpening(true);
    setHasSparkleBurst(true);

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timeoutRef.current = window.setTimeout(() => {
      onOpened();
    }, isReduced ? 250 : 2400);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`royal-entrance-chamber fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
        isOpening ? 'pointer-events-none' : ''
      }`}
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #2A060C 0%, #150306 60%, #070102 100%)',
      }}
    >
      {/* Floating Rose Petals & Golden Stardust Ambient Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(24)].map((_, i) => (
          <span
            key={`stardust-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-amber-100 to-amber-400 animate-pulse"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17) % 96}%`,
              left: `${(i * 23) % 96}%`,
              boxShadow: '0 0 10px rgba(254, 222, 119, 0.9)',
              animationDuration: `${2.8 + (i % 3)}s`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}

        {/* Floating realistic rose petal accents */}
        {[...Array(8)].map((_, i) => (
          <img
            key={`petal-${i}`}
            src="/rose-petal.png"
            alt=""
            className="absolute pointer-events-none opacity-40 animate-[float-soft_6s_ease-in-out_infinite]"
            style={{
              width: `${22 + (i % 3) * 6}px`,
              top: `${(i * 24 + 10) % 90}%`,
              left: `${(i * 28 + 5) % 92}%`,
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.7}s`,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
            }}
          />
        ))}
      </div>

      {/* Floating Top Header: Sound & Fast Skip Controls */}
      <div className="absolute top-3 sm:top-4 inset-x-4 z-40 flex items-center justify-between max-w-[519px] mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-300/40 bg-black/75 backdrop-blur-md text-amber-100 hover:text-white text-xs transition-all cursor-pointer shadow-xl hover:bg-black/90 active:scale-95"
          aria-label={soundEnabled ? 'Mute royal chime' : 'Enable royal chime'}
          title="Toggle royal entrance chime"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-300" /> : <VolumeX className="w-3.5 h-3.5 text-amber-400/60" />}
          <span className="font-caps text-[9px] tracking-wider uppercase font-semibold">
            {soundEnabled ? 'Royal Chime' : 'Muted'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onOpened()}
          className="font-caps text-[10px] tracking-widest text-amber-100 hover:text-white uppercase px-4 py-1.5 rounded-full border border-amber-300/60 bg-black/75 backdrop-blur-md transition-all hover:bg-black/90 hover:border-amber-300 cursor-pointer shadow-xl font-bold flex items-center gap-1 active:scale-95"
          aria-label="Skip entrance animation"
        >
          <span>Skip to Card</span>
          <span>↗</span>
        </button>
      </div>

      {/* Main Royal Entrance Stage */}
      <div className="royal-entrance-stage relative w-full max-w-[500px] h-[94vh] max-h-[850px] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] border-2 border-amber-400/60 bg-[#1A0307]">
        {/* Floral Arch Backdrop */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/royal-floral-entrance-arch.jpg"
            alt="Royal wedding entrance with floral garland arch and draped curtains"
            className="w-full h-full object-cover scale-105 filter brightness-[0.75] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C0307]/80 via-[#26050C]/50 to-[#68131E]/90" />
        </div>

        {/* Floral Borders */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent flex items-start justify-center pt-1 px-4">
            <div className="flex items-center justify-center gap-1 text-amber-100/90 text-sm drop-shadow-md">
              <span className="text-rose-400 text-lg">🌹</span>
              <span className="text-amber-300 font-serif tracking-widest text-xs">❀ ❁ ❀</span>
              <span className="text-rose-300 text-xl">🌸</span>
              <span className="text-amber-300 font-serif tracking-widest text-xs">❀ ❁ ❀</span>
              <span className="text-rose-400 text-lg">🌹</span>
            </div>
          </div>

          <div className="absolute top-3 left-3 text-amber-300/70 text-3xl select-none filter drop-shadow">❧</div>
          <div className="absolute top-3 right-3 text-amber-300/70 text-3xl select-none scale-x-[-1] filter drop-shadow">❧</div>
          <div className="absolute bottom-3 left-3 text-amber-300/70 text-3xl select-none scale-y-[-1] filter drop-shadow">❧</div>
          <div className="absolute bottom-3 right-3 text-amber-300/70 text-3xl select-none scale-[-1] filter drop-shadow">❧</div>

          <div className="absolute inset-3 sm:inset-4 rounded-xl border border-amber-300/40 pointer-events-none">
            <div className="absolute inset-1 rounded-lg border border-amber-400/19 pointer-events-none" />
          </div>
        </div>

        {/* Left Royal Gate Door */}
        <div
          className={`royal-gate-left absolute inset-y-0 left-0 w-1/2 z-22 transition-all duration-[1400ms] cubic-bezier(0.65,0,0.25,1) ${
            isOpening
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 cursor-pointer pointer-events-auto'
          }`}
          onClick={handleOpen}
          style={{
            transformOrigin: 'left center',
            transform: isOpening
              ? 'perspective(1190px) rotateY(-85deg) scaleX(0.7) translateX(-15%)'
              : 'perspective(1190px) rotateY(0deg)',
            background:
              'linear-gradient(90deg, #2D050C 0%, #5E0E1C 35%, #68131E 70%, #240308 100%)',
            boxShadow:
              'inset -6px 0 24px rgba(0,0,0,0.9), 6px 0 19px rgba(0,0,0,0.7)',
          }}
          title="Click to open royal gate"
        >
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,215,0,0.22) 19px, transparent 24px)',
            }}
          />

          <div className="absolute inset-2 sm:inset-3 border border-amber-300/40 rounded-l-lg pointer-events-none flex flex-col justify-between p-2">
            <div className="w-full flex items-center justify-center gap-1 text-amber-300/80 text-xs">
              <span>⚜</span>
              <span className="h-px flex-1 bg-amber-400/50" />
              <span>✦</span>
            </div>

            <div className="self-end mr-1 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 via-amber-400 to-amber-600 border border-amber-100 shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center text-[#4A0A13]">
                <span className="text-xs font-bold">⚜</span>
              </div>
              <div className="w-4 h-5 -mt-1 rounded-b-full border-2 border-amber-300/90 shadow-sm" />
            </div>

            <div className="w-full flex items-center justify-center gap-1 text-amber-300/80 text-xs">
              <span>✦</span>
              <span className="h-px flex-1 bg-amber-400/50" />
              <span>⚜</span>
            </div>
          </div>

          <div className="absolute right-0 inset-y-0 w-2 bg-gradient-to-b from-amber-400 via-yellow-100 to-amber-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
        </div>

        {/* Right Royal Gate Door */}
        <div
          className={`royal-gate-right absolute inset-y-0 right-0 w-1/2 z-22 transition-all duration-[1400ms] cubic-bezier(0.65,0,0.25,1) ${
            isOpening
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100 cursor-pointer pointer-events-auto'
          }`}
          onClick={handleOpen}
          style={{
            transformOrigin: 'right center',
            transform: isOpening
              ? 'perspective(1190px) rotateY(85deg) scaleX(0.7) translateX(15%)'
              : 'perspective(1190px) rotateY(0deg)',
            background:
              'linear-gradient(270deg, #2D050C 0%, #5E0E1C 35%, #68131E 70%, #240308 100%)',
            boxShadow:
              'inset 6px 0 24px rgba(0,0,0,0.9), -6px 0 19px rgba(0,0,0,0.7)',
          }}
          title="Click to open royal gate"
        >
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,215,0,0.22) 19px, transparent 24px)',
            }}
          />

          <div className="absolute inset-2 sm:inset-3 border border-amber-300/40 rounded-r-lg pointer-events-none flex flex-col justify-between p-2">
            <div className="w-full flex items-center justify-center gap-1 text-amber-300/80 text-xs">
              <span>✦</span>
              <span className="h-px flex-1 bg-amber-400/50" />
              <span>⚜</span>
            </div>

            <div className="self-start ml-1 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 via-amber-400 to-amber-600 border border-amber-100 shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center text-[#4A0A13]">
                <span className="text-xs font-bold">⚜</span>
              </div>
              <div className="w-4 h-5 -mt-1 rounded-b-full border-2 border-amber-300/90 shadow-sm" />
            </div>

            <div className="w-full flex items-center justify-center gap-1 text-amber-300/80 text-xs">
              <span>⚜</span>
              <span className="h-px flex-1 bg-amber-400/50" />
              <span>✦</span>
            </div>
          </div>

          <div className="absolute left-0 inset-y-0 w-2 bg-gradient-to-b from-amber-400 via-yellow-100 to-amber-500 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
        </div>

        {/* Top Royal Velvet Valance */}
        <div
          className={`valance-top absolute inset-x-0 top-0 h-16 z-25 pointer-events-none transition-transform duration-[1100ms] cubic-bezier(0.65,0,0.25,1) ${
            isOpening ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
          style={{
            background:
              'linear-gradient(180deg, #2D050C 0%, #5C0E1C 80%, #3D0711 100%)',
            borderBottom: '2px solid rgba(236,190,105,0.7)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.75)',
          }}
        >
          <div className="flex items-center justify-center h-full gap-4 text-amber-300/80 text-xs">
            <span>⚜</span>
            <span className="font-caps tracking-[0.25em] text-[9px] uppercase font-bold text-amber-100">
              Royal Wedding Gate Entrance
            </span>
            <span>⚜</span>
          </div>
        </div>

        {/* Central Royal Invitation Content */}
        <div className="relative z-15 flex flex-col items-center justify-between h-full px-4 sm:px-5 py-7 sm:py-8 text-center">
          <div className="pt-8 sm:pt-9 flex flex-col items-center">
            <p className="font-arabic text-amber-100 text-base sm:text-lg tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="font-serif text-[11px] italic text-amber-100/90 mt-0.5 drop-shadow-xs">
              In the Name of Allah, the Most Gracious, the Most Merciful
            </p>

            <div className="my-1.5 flex items-center gap-2">
              <span className="h-px w-8 bg-amber-300/50" />
              <span className="h-px w-8 bg-amber-300/50" />
            </div>

            <p className="font-caps text-xs sm:text-sm tracking-[0.22em] text-white font-bold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              {content.host.name}
            </p>

            <p className="max-w-[19rem] font-serif text-[11px] sm:text-xs italic leading-relaxed text-amber-100/95 mt-1 drop-shadow-xs">
              cordially requests the honour of your gracious presence at the wedding celebrations of her beloved son
            </p>
          </div>

          {/* Central Interactive Golden Royal Wax Seal */}
          <div className="my-auto flex flex-col items-center z-30">
            <button
              type="button"
              onClick={handleOpen}
              aria-label="Tap to Open Royal Wedding Gate"
              className={`group relative rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 ${
                isOpening ? 'pointer-events-none animate-seal-crack' : ''
              }`}
              disabled={isOpening}
            >
              <span
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-400/60 via-amber-100/80 to-amber-500/60 blur-lg animate-pulse"
                aria-hidden="true"
              />
              <span
                className="absolute -inset-2.5 rounded-full bg-amber-300/60 blur-sm group-hover:bg-amber-100/90 transition-all animate-spin"
                style={{ animationDuration: '10s' }}
                aria-hidden="true"
              />

              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#8A1C2B] via-[#68131E] to-[#3B070D] p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_2px_6px_rgba(255,255,255,0.45),inset_0_-4px_10px_rgba(0,0,0,0.75)] border-2 border-amber-300/90 transition-transform group-hover:scale-105">
                <div className="w-full h-full rounded-full border border-dashed border-amber-300/90 p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#68131E] via-[#751623] to-[#450911] shadow-inner flex flex-col items-center justify-center text-amber-100 relative overflow-hidden">
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/45 to-transparent -translate-x-full animate-[shimmer-sweep_3s_ease-in-out_infinite]"
                      aria-hidden="true"
                    />

                    <span className="font-arabic text-xl sm:text-2xl font-bold leading-none tracking-tight text-amber-100 drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] pt-0.5">
                      مُحَمَّد وجاہت
                    </span>
                    <span className="font-caps text-[8px] tracking-[0.24em] text-amber-300 uppercase mt-1 font-bold">
                      Royal Seal
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {!isOpening && (
              <div className="mt-3.5 sm:mt-4 flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleOpen}
                  aria-label="Tap to Open Gate"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#FFFBEB] to-[#F59E0B] text-[#68131E] shadow-[0_10px_35px_rgba(245,158,11,0.75),0_0_25px_rgba(254,240,138,0.8)] border-2 border-white/95 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse pointer-events-auto"
                >
                  <span
                    className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 blur-md opacity-85 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />

                  <span className="relative flex items-center gap-2 z-10">
                    <DoorOpen className="w-5 h-5 text-[#6B0F1D] group-hover:scale-110 transition-transform" />
                    <span className="font-caps text-xs sm:text-sm font-black tracking-widest uppercase text-[#68131E] drop-shadow-xs">
                      Tap to Open Gate
                    </span>
                    <Sparkles className="w-4 h-4 text-[#8B1524] animate-spin" style={{ animationDuration: '6s' }} />
                  </span>
                </button>

                <div className="mt-1.5 flex items-center gap-1.5 text-amber-100/95 drop-shadow-md">
                  <span className="font-arabic text-xs sm:text-sm font-bold tracking-wide" dir="rtl">
                    گیٹ کھولنے کے لیے دبائیں
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-amber-300 animate-bounce mt-0.5" />
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="pb-3 w-full flex flex-col items-center">
            <div className="flex flex-col items-center mb-1">
              <span className="font-arabic text-3xl sm:text-4xl text-[#FFE68A] font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] leading-tight">
                مُحَمَّد وجاہت
              </span>
              <span className="font-script text-2xl sm:text-3xl text-white drop-shadow-md -mt-1 font-semibold">
                Muhammad Wajahat
              </span>
              <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#68131E] border border-amber-300 shadow-sm">
                <span className="font-script text-xl sm:text-2xl text-[#FFF4B8] drop-shadow-xs leading-none">
                  Muhammad Wajahat
                </span>
              </div>
            </div>

            <p className="font-serif text-xs italic text-amber-100 drop-shadow-xs">
              {content.groom.parents}
            </p>

            <p className="font-serif text-[11px] italic text-amber-100/90 my-0.5">
              with the beloved daughter of {content.bride.parents}
            </p>

            <div className="w-full max-w-[280px] flex flex-col gap-1 my-1.5">
              <div className="py-1 px-3 rounded-full bg-black/60 border border-amber-300/40 backdrop-blur-xs flex items-center justify-center gap-1.5 shadow-sm">
                <p className="font-serif text-xs font-bold text-amber-100 tracking-wide">
                  Barat: Wednesday, 18th November 2026
                </p>
              </div>

              <div className="py-1 px-3 rounded-full bg-black/60 border border-amber-300/40 backdrop-blur-xs flex items-center justify-center gap-1.5 shadow-sm">
                <p className="font-serif text-xs font-bold text-amber-100 tracking-wide">
                  Valima: Thursday, 19th November 2026
                </p>
              </div>
            </div>

            <span className="font-serif text-[11px] text-amber-100/80 italic">
              ICON MARQUEE &amp; One Window Solution · Karachi
            </span>
          </div>
        </div>

        {/* Sparkle burst on opening */}
        {hasSparkleBurst && (
          <div className="absolute inset-0 pointer-events-none z-35 flex items-center justify-center">
            {[...Array(19)].map((_, i) => (
              <span
                key={`sparkle-${i}`}
                className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-400 animate-ping"
                style={{
                  top: `calc(50% + ${Math.sin((i * Math.PI) / 10) * 110}px)`,
                  left: `calc(50% + ${Math.cos((i * Math.PI) / 10) * 110}px)`,
                  animationDuration: '1.2s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
