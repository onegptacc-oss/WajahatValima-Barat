import React from 'react';

export const DiamondDivider: React.FC<{ className?: string }> = ({ className = 'my-5' }) => {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex w-32 items-center justify-center gap-2.5 text-primary ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C69224]/50 to-[#C69224]/19" />
      <span className="text-[9px] text-[#C69224] select-none">◆</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C69224]/50 to-[#C69224]/19" />
    </div>
  );
};
