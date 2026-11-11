import React from 'react';
import { Users } from 'lucide-react';
import { DiamondDivider } from './Divider';
import { Reveal } from './Reveal';

interface ContactItem {
  name: string;
  phone: string;
  relation?: string;
}

interface ContactSectionProps {
  content: {
    rsvp: {
      title: string;
      subtitle: string;
      phones: string[];
      contacts?: ContactItem[];
    };
  };
}

// Fallback names mapping if not provided in content
const DEFAULT_CONTACT_NAMES: Record<string, string> = {
  '0330-1249828': 'M. Zakir',
  '0348-2810730': 'Yasir',
  '0330-3714456': 'M. Wajahat',
};

// Converts Pakistani phone number into direct WhatsApp chat URL with customized greeting
function formatWhatsAppUrl(rawPhone: string, contactName?: string): string {
  const digits = rawPhone.replace(/\D/g, '');
  let normalized = digits;

  if (digits.startsWith('0')) {
    normalized = '92' + digits.slice(1);
  } else if (!digits.startsWith('92')) {
    normalized = '92' + digits;
  }

  const nameGreeting = contactName ? ` ${contactName}` : '';
  const greeting = encodeURIComponent(
    `Assalam-o-Alaikum${nameGreeting}! Regarding Muhammad Wajahat's Wedding Celebrations.`
  );

  // Directly launches the WhatsApp chat interface
  return `https://api.whatsapp.com/send?phone=${normalized}&text=${greeting}`;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content }) => {
  // Normalize contact list from content.contacts or content.phones
  const contacts: ContactItem[] =
    content.rsvp.contacts && content.rsvp.contacts.length > 0
      ? content.rsvp.contacts
      : content.rsvp.phones.map((phone) => ({
          name: DEFAULT_CONTACT_NAMES[phone] || 'Family Host',
          phone,
        }));

  return (
    <section className="px-4 sm:px-6 pb-20">
      <Reveal>
        <div className="text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#C69224]/35 bg-[#C69224]/10 text-[#C69224] shadow-sm">
            <Users className="h-5 w-5 stroke-[1.4]" />
          </span>

          <h2 className="font-script mt-2 text-4xl text-[#68131E]">
            {content.rsvp.title}
          </h2>

          <p className="font-caps text-[10px] tracking-widest text-[#C69224] uppercase font-bold mt-1">
            {content.rsvp.subtitle}
          </p>

          <DiamondDivider />
        </div>

        <p className="text-center font-serif text-xs text-[#634F53] -mt-2 mb-6">
          Tap any card below to chat directly with host on WhatsApp
        </p>

        {/* 
          Balanced grid layout:
          - On mobile: full-width stacked cards.
          - On tablet/desktop (sm): 2 columns with generous width (max-w-2xl), with Card 3 centered.
          - Name is on the top line, phone number is on its own row, ensuring ONLINE badge NEVER overlaps phone digits.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contacts.map((contact, index) => {
            const isLastOfThree = contacts.length === 3 && index === 2;

            return (
              <a
                key={contact.phone}
                href={formatWhatsAppUrl(contact.phone, contact.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open direct WhatsApp chat with ${contact.name} (${contact.phone})`}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 border-[#25D366]/40 bg-white shadow-sm hover:border-[#25D366] hover:bg-[#F2FCF5] hover:shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                  isLastOfThree ? 'sm:col-span-2 sm:max-w-[324px] sm:mx-auto w-full' : 'w-full'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* WhatsApp Avatar with live status pulse */}
                  <div className="relative shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xs group-hover:scale-105 transition-transform">
                      <svg
                        viewBox="0 0 24 24"
                        width="21"
                        height="21"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 19.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 19.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 19.15C10.57 19.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 19.28 9.72 19.28 11.92C19.28 16.46 16.58 19.15 12.05 19.15ZM16.57 14.41C16.32 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.73C14.16 13.98 13.69 14.53 13.55 14.69C13.41 14.86 13.27 14.88 13.02 14.76C12.78 14.64 11.99 14.38 11.06 13.55C10.33 12.9 9.84 12.1 9.7 11.85C9.56 11.61 9.68 11.47 9.81 11.35C9.92 11.24 10.05 11.07 10.18 10.92C10.3 10.77 10.34 10.65 10.42 10.49C10.5 10.32 10.46 10.18 10.4 10.06C10.34 9.94 9.85 8.73 9.64 8.24C9.44 7.76 9.24 7.82 9.09 7.81C8.94 7.81 8.78 7.8 8.62 7.8C8.45 7.8 8.18 7.86 7.95 8.11C7.72 8.36 7.07 8.97 7.07 10.21C7.07 11.45 7.97 12.65 8.1 12.82C8.23 12.99 9.88 15.54 12.41 16.63C13.01 16.89 13.48 17.05 13.84 17.16C14.45 17.36 15.01 17.33 15.45 17.26C15.94 17.19 16.96 16.65 17.17 16.04C17.38 15.43 17.38 14.91 17.31 14.79C17.25 14.67 17.09 14.61 16.84 14.48L16.57 14.41Z" />
                      </svg>
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25D366] ring-2 ring-white" />
                  </div>

                  {/* Contact Info: Name on top line, phone on second line */}
                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="font-serif text-[17px] sm:text-[18px] font-bold text-[#68131E] leading-tight truncate">
                        {contact.name}
                      </p>

                      {/* ONLINE Badge placed neatly on the top line */}
                      <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E7F8EE] text-[#1E7E34] font-sans text-[9px] font-bold tracking-wider uppercase border border-[#25D366]/35 shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        ONLINE
                      </span>
                    </div>

                    {/* Phone Number on its OWN dedicated line - completely free from badge collision */}
                    <p className="font-sans text-[15px] sm:text-[16px] font-bold text-[#1E293B] tracking-wide whitespace-nowrap tabular-nums group-hover:text-[#25D366] transition-colors leading-tight mt-0.5">
                      {contact.phone}
                    </p>

                    {/* Subtext */}
                    <p className="font-serif text-[11px] text-[#634F53] mt-0.5 flex items-center gap-1">
                      <span>Click to WhatsApp</span>
                      <span className="text-[#25D366] font-bold">→</span>
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};
