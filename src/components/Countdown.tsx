import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: string;
  labels: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

function calculateTimeLeft(diffMs: number) {
  const totalSeconds = Math.floor(Math.max(0, diffMs) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, labels }) => {
  const [targetTimestamp] = useState(() => new Date(targetDate).getTime());
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const diff = targetTimestamp - (now ?? targetTimestamp);
  const { days, hours, minutes, seconds } = calculateTimeLeft(diff);

  const pad = (n: number) => String(n).padStart(2, '0');

  const items = [
    { value: String(days), label: labels.days },
    { value: pad(hours), label: labels.hours },
    { value: pad(minutes), label: labels.minutes },
    { value: pad(seconds), label: labels.seconds },
  ];

  return (
    <div className="flex items-start justify-center gap-1.5 sm:gap-4 mt-6">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex items-start">
            <div className="flex w-16 flex-col items-center sm:w-19 px-1 py-2 rounded-lg bg-white/70 border border-[#C69224]/19 shadow-xs">
              <span className="font-serif text-3xl font-medium text-[#68131E] tabular-nums sm:text-4xl drop-shadow-xs">
                {item.value}
              </span>
              <span className="mt-1 font-caps text-[9px] tracking-caps text-[#634F53] uppercase font-semibold">
                {item.label}
              </span>
            </div>
          </div>
          {index < items.length - 1 && (
            <span className="mt-3 font-serif text-2xl font-light text-[#C69224] sm:text-3xl select-none">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
