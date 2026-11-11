import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RoseBloomLayer } from './RoseBloomLayer';

interface ScratchCardProps {
  value?: string;
  date1?: string;
  date2?: string;
  label: string;
  heading?: string;
  subheading?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  value,
  date1 = '18th November 2026',
  date2 = '19th November 2026',
  label,
  heading = 'Our Auspicious Dates',
  subheading = 'SAVE THE DATES',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const strokeCount = useRef(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);

  const displayDate1 = date1 || (value ? value.split('&')[0]?.trim() : '18th November 2026');
  const displayDate2 = date2 || (value ? value.split('&')[1]?.trim() : '19th November 2026');

  const paintCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Luxurious metallic gold foil gradient
    const grad = ctx.createRadialGradient(
      canvas.width * 0.36,
      canvas.height * 0.28,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.75
    );
    grad.addColorStop(0, '#FFF2C6');
    grad.addColorStop(0.28, '#E5BE64');
    grad.addColorStop(0.65, '#C69224');
    grad.addColorStop(1, '#8E6212');

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sprinkle festive golden and diamond shimmer specks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 220; i += 1) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const size = Math.random() * 2.8 + 1;
      ctx.fillRect(rx, ry, size, size);
    }

    // Elegant invitation hint on the scratch foil
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#68131E';
    ctx.font = `bold ${Math.round(canvas.width * 0.042)}px 'Cinzel', serif`;
    ctx.letterSpacing = '0.12em';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', canvas.width / 2, canvas.height * 0.48);

    ctx.font = `${Math.round(canvas.width * 0.03)}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#5A121A';
    ctx.fillText('Swipe finger or cursor across the heart', canvas.width / 2, canvas.height * 0.54);
    ctx.restore();
  }, []);

  const triggerReveal = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      setBurstOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.48,
      });
    }
    setIsRevealed(true);
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      paintCanvas(canvas);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [paintCanvas]);

  const checkCompletion = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      const totalSampled = imgData.length / 80;

      for (let i = 3; i < imgData.length; i += 80) {
        if (imgData[i] === 0) transparentPixels += 1;
      }

      if (transparentPixels / totalSampled > 0.28) {
        triggerReveal();
      }
    } catch {
      // Ignore if any security error
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const x = (clientX - rect.left) * scale;
    const y = (clientY - rect.top) * scale;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = canvas.width * 0.17;

    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      strokeCount.current += 1;
      if (strokeCount.current % 5 === 0) {
        checkCompletion();
      }
    }
    ctx.arc(x, y, canvas.width * 0.085, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
    checkCompletion();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* 
        Normalized SVG Clip-Path with a shallower, romantic top cleft (dips only to y=0.10).
        This guarantees that the top heading "Our Auspicious Dates" is never sliced by the cleft notch.
      */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.50 0.95 C 0.38 0.83, 0.02 0.60, 0.02 0.30 C 0.02 0.11, 0.17 0.02, 0.35 0.02 C 0.44 0.02, 0.48 0.05, 0.50 0.10 C 0.52 0.05, 0.56 0.02, 0.65 0.02 C 0.83 0.02, 0.98 0.11, 0.98 0.30 C 0.98 0.60, 0.62 0.83, 0.50 0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Responsive Heart Container - Centered across all mobile, tablet and desktop viewports */}
      <div className="relative mx-auto aspect-square w-[310px] xs:w-[335px] sm:w-[360px] md:w-[380px] max-w-[calc(100vw-36px)] flex items-center justify-center">
        {/* Revealed content layer underneath */}
        <div className="scratch-heart absolute inset-0 flex flex-col items-center justify-start pt-11 sm:pt-12 px-4 bg-gradient-to-br from-[#FFF5D6] via-[#E8C26E] to-[#C69224] text-center shadow-[0_18px_45px_rgba(198,146,36,0.45)]">
          <div className="scratch-heart-content max-w-[230px] sm:max-w-[250px] flex flex-col items-center">
            {/* Top Heading - Sits safely below the shallow top cleft */}
            <p className="font-script text-[26px] sm:text-[29px] leading-tight text-[#68131E] font-semibold drop-shadow-xs">
              {heading}
            </p>

            {/* Subheading */}
            <p className="mt-0.5 font-caps text-[8.5px] sm:text-[9.5px] tracking-[0.2em] uppercase font-bold text-[#68131E]">
              {subheading}
            </p>

            {/* Groom Name Badge */}
            <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#68131E] border border-amber-300 shadow-xs">
              <span className="font-script text-base sm:text-lg text-[#FFF4B8] drop-shadow-xs leading-none">
                Muhammad Wajahat
              </span>
            </div>

            {/* Dates Card - Clear, spacious and elegant */}
            <div className="mt-2 py-1.5 px-3 rounded-xl bg-white/95 border border-[#C69224]/40 shadow-sm w-full max-w-[220px]">
              <div className="flex items-center justify-between gap-2 border-b border-amber-100/80 pb-1 mb-1">
                <span className="font-caps text-[8px] font-bold bg-[#68131E] text-amber-100 px-2 py-0.5 rounded tracking-wide">
                  BARAT
                </span>
                <p className="font-serif text-[14px] sm:text-[15px] font-bold text-[#68131E] leading-none whitespace-nowrap">
                  {displayDate1}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-caps text-[8px] font-bold bg-[#68131E] text-amber-100 px-2 py-0.5 rounded tracking-wide">
                  VALIMA
                </span>
                <p className="font-serif text-[14px] sm:text-[15px] font-bold text-[#68131E] leading-none whitespace-nowrap">
                  {displayDate2}
                </p>
              </div>
            </div>

            {/* Bottom Subtitle Badge - Perfectly contained with ample margins inside the heart */}
            <div className="mt-2 px-3 py-1 rounded-full bg-white/90 border border-[#C69224]/35 shadow-xs max-w-[210px]">
              <p className="scratch-label font-serif text-[11px] sm:text-[12px] font-bold text-[#68131E] tracking-tight whitespace-nowrap text-center">
                {label}
              </p>
            </div>
          </div>
        </div>

        {/* Golden metallic scratchable canvas layer on top */}
        <canvas
          ref={canvasRef}
          aria-label="Scratch the golden heart to reveal the wedding date"
          className={`scratch-heart absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
            isRevealed ? 'pointer-events-none opacity-0' : 'cursor-crosshair opacity-100'
          }`}
          onPointerDown={(e) => {
            isDrawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (isDrawing.current) {
              scratch(e.clientX, e.clientY);
            }
          }}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />

        {/* Floating Rose Petal burst effect on revelation */}
        {isRevealed && burstOrigin && <RoseBloomLayer origin={burstOrigin} />}
      </div>

      {/* Helpful Tap-to-Reveal Instant Button */}
      {!isRevealed && (
        <button
          type="button"
          onClick={triggerReveal}
          className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100/90 border border-[#C69224]/50 text-[#68131E] font-caps text-[10px] font-bold tracking-wider uppercase hover:bg-amber-200 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <span>✨</span>
          <span>Tap to Reveal Instantly</span>
        </button>
      )}
    </div>
  );
};
