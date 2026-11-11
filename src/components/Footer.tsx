import React from 'react';
import { DiamondDivider } from './Divider';

interface FooterProps {
  content: {
    footer: {
      headline: string;
      couple: string;
      date: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  const headlineLines = content.footer.headline.split('\n');

  return (
    <footer className="px-8 pb-24 text-center">
      <DiamondDivider />
      <p className="font-script text-4xl leading-tight text-[#68131E]">
        {headlineLines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < headlineLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
      <p className="font-script mt-4 text-3xl text-[#C69224] drop-shadow-xs">
        {content.footer.couple}
      </p>
      {/* <div className="mt-2.5 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#68131E] border-2 border-[#C69224] shadow-sm">
        <span className="font-script text-2xl sm:text-3xl text-[#FFF4B8] drop-shadow-xs leading-none pt-0.5">
          Muhammad Wajahat
        </span>
      </div> */}
      <DiamondDivider />
      <div className="space-y-1 font-serif text-xs text-[#634F53] font-medium tracking-wide">
        <p className="font-semibold text-[#68131E]">Barat: Wednesday, 18th November 2026</p>
        <p className="font-semibold text-[#68131E]">Valima: Thursday, 19th November 2026</p>
        <p className="text-[11px] text-[#634F53]/80 pt-1">Karachi, Pakistan</p>
      </div>
    </footer>
  );
};
