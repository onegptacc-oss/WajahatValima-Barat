import React from 'react';
import { createPortal } from 'react-dom';

interface RoseBloomLayerProps {
  origin: { x: number; y: number } | null;
}

export const RoseBloomLayer: React.FC<RoseBloomLayerProps> = ({ origin }) => {
  if (!origin || typeof document === 'undefined') return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="rose-bloom-layer"
      style={
        {
          '--ox': `${origin.x}px`,
          '--oy': `${origin.y}px`,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 40 }, (_, i) => (
        <img
          key={i}
          src="/rose-petal.png"
          alt=""
          width={32}
          height={32}
          className={`rose-bloom rose-${i + 1}`}
        />
      ))}
    </div>,
    document.body
  );
};
