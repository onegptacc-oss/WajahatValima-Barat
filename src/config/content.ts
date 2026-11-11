/**
 * Wedding Content Configuration
 * Royal Maroon & Gold Wedding Invitation
 * Updated: November 2026
 */

const env = (key: string, defaultValue: string): string => {
  const value = import.meta.env[key];
  return typeof value === 'string' && value.trim().length > 0
    ? value
    : defaultValue;
};

export const getWeddingContent = (isUrdu = false) => {
  return {
    isUrdu,

    // Host Information
    host: {
      name: isUrdu
        ? env('VITE_HOST_NAME_URDU', 'محترمہ محمد ذاکر')
        : env('VITE_HOST_NAME', 'Mrs. Muhammad Zakir'),
    },

    // Groom Details
    groom: {
      name: isUrdu
        ? env('VITE_GROOM_NAME_URDU', 'مُحَمَّد وجاہت')
        : env('VITE_GROOM_NAME', 'Muhammad Wajahat'),
      parents: isUrdu
        ? env('VITE_GROOM_PARENTS_URDU', 'فرزند ارجمند: مرحوم محمد ذاکر')
        : env('VITE_GROOM_PARENTS', 'Son of Muhammad Zakir'),
    },

    // Bride Details
    bride: {
      name: isUrdu
        ? env('VITE_BRIDE_NAME_URDU', 'دخترِ جناب محمد شاہد')
        : env('VITE_BRIDE_NAME', 'Daughter of Muhammad Shahid'),
      parents: isUrdu
        ? env('VITE_BRIDE_PARENTS_URDU', 'جناب محمد شاہد')
        : env('VITE_BRIDE_PARENTS', 'Muhammad Shahid'),
    },

    coupleNames: env('VITE_COUPLE_NAMES', 'Muhammad Wajahat & Family'),
    footerNames: env('VITE_FOOTER_NAMES', 'Muhammad Wajahat & Family'),

    // Envelope Intro
    envelope: {
      ceremony: isUrdu
        ? env('VITE_ENVELOPE_CEREMONY_URDU', 'شادی خانہ آبادی و دعوتِ ولیمہ')
        : env('VITE_ENVELOPE_CEREMONY', 'Wedding Ceremony & Valima of'),

      invited: isUrdu
        ? env('VITE_ENVELOPE_INVITED_URDU', 'آپ کی شرکت ہمارے لیے باعثِ مسرت و افتخار ہے')
        : env('VITE_ENVELOPE_INVITED', 'YOU ARE CORDIALLY INVITED'),

      tap: isUrdu
        ? env('VITE_ENVELOPE_TAP_URDU', 'کھولیں')
        : env('VITE_ENVELOPE_TAP', 'Tap'),

      toOpen: isUrdu
        ? env('VITE_ENVELOPE_TO_OPEN_URDU', 'دعوت نامہ')
        : env('VITE_ENVELOPE_TO_OPEN', 'to open'),
    },

    // Hero Section
    hero: {
      invitationText: isUrdu
        ? env(
            'VITE_HERO_INVITATION_TEXT_URDU',
            'محترمہ محمد ذاکر اپنے پیارے بیٹے کی شادی و ولیمہ کی تقریب میں آپ کی پُرخلوص شرکت کی متمنی ہیں'
          )
        : env(
            'VITE_HERO_INVITATION_TEXT',
            'Mrs. Muhammad Zakir requests the honour and pleasure of your gracious presence at the wedding celebrations of her beloved son'
          ),

      blessing: isUrdu
        ? env(
            'VITE_HERO_BLESSING_URDU',
            'آپ کی پُروقار شرکت اور دعائیں اس تقریب کو یادگار بنا دیں گی۔'
          )
        : env(
            'VITE_HERO_BLESSING',
            'Your presence and blessings will make this auspicious occasion truly memorable for the family.'
          ),

      scrollText: env('VITE_HERO_SCROLL', 'SCROLL'),
    },

    // Faith & Love
    faith: {
      title: isUrdu
        ? env('VITE_FAITH_TITLE_URDU', 'ایمان اور محبت کا سفر')
        : env('VITE_FAITH_TITLE', 'Together in faith and love'),

      desc: isUrdu
        ? env(
            'VITE_FAITH_DESC_URDU',
            'مُحَمَّد وجاہت اور دخترِ جناب محمد شاہد کے نکاح اور دعوتِ ولیمہ کی پرمسرت تقریبات۔ آپ کی شرکت اور دعائیں ہمارے خاندان کے لیے باعثِ برکت ہوں گی۔'
          )
        : env(
            'VITE_FAITH_DESC',
            'Celebrating the joyous union of Muhammad Wajahat with the beloved daughter of Muhammad Shahid. Your presence and prayers will make this auspicious occasion truly memorable for our family.'
          ),
    },

    // Scratch Card
    scratch: {
      title: isUrdu
        ? env('VITE_SCRATCH_TITLE_URDU', 'تاریخ دیکھنے کے لیے کھرچیں')
        : env('VITE_SCRATCH_TITLE', 'Scratch to Reveal'),

      heartHeading: isUrdu
        ? env('VITE_SCRATCH_HEART_HEADING_URDU', 'شادی و ولیمہ کی تاریخیں')
        : env('VITE_SCRATCH_HEART_HEADING', 'Our Auspicious Dates'),

      heartSub: isUrdu
        ? env('VITE_SCRATCH_HEART_SUB_URDU', 'تاریخ یاد رکھیں')
        : env('VITE_SCRATCH_HEART_SUB', 'SAVE THE DATES'),

      date1: env('VITE_SCRATCH_DATE_1', '18th November 2026'),
      date2: env('VITE_SCRATCH_DATE_2', '19th November 2026'),

      label: isUrdu
        ? env('VITE_SCRATCH_LABEL_URDU', 'بدھ · بارات | جمعرات · ولیمہ')
        : env('VITE_SCRATCH_LABEL', 'Wednesday · Barat | Thursday · Valima'),
    },

    // Wedding Events
    events: {
      barat: {
        id: 'barat',

        title: isUrdu
          ? env('VITE_BARAT_TITLE_URDU', 'شادی کی تقریب (بارات)')
          : env('VITE_BARAT_TITLE', 'Wedding Ceremony (Barat)'),

        date: isUrdu
          ? env('VITE_BARAT_DATE_URDU', 'بدھ 18 نومبر 2026')
          : env('VITE_BARAT_DATE', 'Wednesday 18th November 2026'),

        day: env('VITE_BARAT_DAY', '18'),

        month: isUrdu
          ? env('VITE_BARAT_MONTH_URDU', 'نومبر')
          : env('VITE_BARAT_MONTH', 'November'),

        year: env('VITE_BARAT_YEAR', '2026'),

        weekday: isUrdu
          ? env('VITE_BARAT_WEEKDAY_URDU', 'بدھ')
          : env('VITE_BARAT_WEEKDAY', 'Wednesday'),

        venue: isUrdu
          ? env('VITE_BARAT_VENUE_URDU', 'آئیکون مارکی')
          : env('VITE_BARAT_VENUE', 'ICON MARQUEE'),

        address: isUrdu
          ? env(
              'VITE_BARAT_ADDRESS_URDU',
              'آئیکون مارکی، سیکٹر 11-B، نارتھ کراچی'
            )
          : env(
              'VITE_BARAT_ADDRESS',
              'ICON MARQUEE, Sector 11-B, North Karachi, Karachi'
            ),

        embedUrl: env(
          'VITE_BARAT_MAP_EMBED',
          'https://www.google.com/maps?q=24.9721174,67.0582774&output=embed'
        ),

        mapsUrl: env(
          'VITE_BARAT_MAP_URL',
          'https://www.google.com/maps/place/ICON+MARQUEE/@24.9721222,67.0557025,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb341d4bd101091:0x4f8c54eee93a9b76!8m2!3d24.9721174!4d67.0582774!16s%2Fg%2F11vs5mdlk_?entry=ttu'
        ),

        timeline: [
          {
            title: isUrdu
              ? 'سہرہ بندی'
              : env('VITE_BARAT_TIME_1_TITLE', 'Sehra Bandi'),

            time: env('VITE_BARAT_TIME_1_TIME', '7:30 PM'),

            desc: isUrdu
              ? 'مقام: مکان نمبر L-295، سیکٹر 5B2، نارتھ کراچی'
              : env('VITE_BARAT_TIME_1_DESC', 'At home: 6/29 B1 Area, Liaquatabad'),
          },

          {
            title: isUrdu
              ? 'روانگی بارات'
              : env('VITE_BARAT_TIME_2_TITLE', 'Departure of Barat'),

            time: env('VITE_BARAT_TIME_2_TIME', '9:00 PM'),

            desc: isUrdu
              ? 'از مکان نمبر L-295، سیکٹر 5B2 تا آئیکون مارکی'
              : env(
                  'VITE_BARAT_TIME_2_DESC',
                  'At home: 6/29 B1 Area, Liaquatabad'
                ),
          },
        ],
      },

      valima: {
        id: 'valima',

        title: isUrdu
          ? env('VITE_VALIMA_TITLE_URDU', 'دعوتِ ولیمہ')
          : env('VITE_VALIMA_TITLE', 'Valima Reception'),

        date: isUrdu
          ? env('VITE_VALIMA_DATE_URDU', 'جمعرات 19 نومبر 2026')
          : env('VITE_VALIMA_DATE', 'Thursday 19th November 2026'),

        day: env('VITE_VALIMA_DAY', '19'),

        month: isUrdu
          ? env('VITE_VALIMA_MONTH_URDU', 'نومبر')
          : env('VITE_VALIMA_MONTH', 'November'),

        year: env('VITE_VALIMA_YEAR', '2026'),

        weekday: isUrdu
          ? env('VITE_VALIMA_WEEKDAY_URDU', 'جمعرات')
          : env('VITE_VALIMA_WEEKDAY', 'Thursday'),

        venue: isUrdu
          ? env('VITE_VALIMA_VENUE_URDU', 'ون ونڈو سلوشن اینڈ ریسٹورنٹ')
          : env('VITE_VALIMA_VENUE', 'One Window Solution'),

        address: isUrdu
          ? env('VITE_VALIMA_ADDRESS_URDU', 'ون ونڈو سلوشن اینڈ ریسٹورنٹ، کراچی')
          : env('VITE_VALIMA_ADDRESS', 'One Window Solution and Restaurant, Karachi, Pakistan'),

        embedUrl: env(
          'VITE_VALIMA_MAP_EMBED',
          'https://www.google.com/maps?q=24.9344786,67.0723536&output=embed'
        ),

        mapsUrl: env(
          'VITE_VALIMA_MAP_URL',
          'https://www.google.com/maps/place/One+Window+Solution+and+Restaurant/@24.9344834,67.0697787,17z/data=!3m1!4b1!4m6!3m5!1s0x3eb33f001ee08f45:0xe2a2ecd829517b9c!8m2!3d24.9344786!4d67.0723536!16s%2Fg%2F11w5bpn3x5?entry=ttu'
        ),

        timeline: [
          {
            title: isUrdu
              ? 'آمدِ مہمانانِ گرامی'
              : env('VITE_VALIMA_TIME_1_TITLE', 'Gathering'),

            time: env('VITE_VALIMA_TIME_1_TIME', '9:00 PM'),

            desc: isUrdu
              ? 'خوش آمدید (9:00 بجے)'
              : env(
                  'VITE_VALIMA_TIME_1_DESC',
                  'Gathering & Welcome (9:00 PM)'
                ),
          },

          {
            title: isUrdu
              ? 'طعام و عشائیہ'
              : env('VITE_VALIMA_TIME_2_TITLE', 'Dinner'),

            time: env('VITE_VALIMA_TIME_2_TIME', '10:30 PM'),

            desc: isUrdu
              ? 'شاندار و پُرتکلف عشائیہ (10:30 بجے)'
              : env(
                  'VITE_VALIMA_TIME_2_DESC',
                  'Dinner (10:30 PM)'
                ),
          },
        ],
      },
    },

    // Countdown
    countdown: {
      title: isUrdu
        ? env('VITE_COUNTDOWN_TITLE_URDU', 'تقریبات کے آغاز میں باقی وقت')
        : env('VITE_COUNTDOWN_TITLE', 'Counting Down to the\nCelebrations'),

      eventDateTime: env(
        'VITE_EVENT_DATETIME',
        '2026-11-18T19:30:00+05:00'
      ),

      days: isUrdu
        ? env('VITE_COUNTDOWN_DAYS_URDU', 'دن')
        : env('VITE_COUNTDOWN_DAYS', 'Days'),

      hours: isUrdu
        ? env('VITE_COUNTDOWN_HOURS_URDU', 'گھنٹے')
        : env('VITE_COUNTDOWN_HOURS', 'Hours'),

      minutes: isUrdu
        ? env('VITE_COUNTDOWN_MINUTES_URDU', 'منٹ')
        : env('VITE_COUNTDOWN_MINUTES', 'Minutes'),

      seconds: isUrdu
        ? env('VITE_COUNTDOWN_SECONDS_URDU', 'سیکنڈ')
        : env('VITE_COUNTDOWN_SECONDS', 'Seconds'),
    },

    // Photos
    photos: {
      photo1Caption: isUrdu
        ? 'ایک پُرمسرت اور پُروقار تقریب'
        : 'An auspicious celebration',
    },

    // Quran Blessing
    quran: {
      subtitle: isUrdu
        ? env('VITE_QURAN_SUBTITLE_URDU', 'دعائے خیر و برکت')
        : env('VITE_QURAN_SUBTITLE', 'A blessing for the couple'),

      title: isUrdu
        ? env('VITE_QURAN_TITLE_URDU', 'محبت اور رحمت')
        : env('VITE_QURAN_TITLE', 'Love & Mercy'),

      arabic: env(
        'VITE_QURAN_ARABIC',
        'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ'
      ),

      urdu: env(
        'VITE_QURAN_URDU',
        'اور اُس کی نشانیوں میں سے ہے کہ اُس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم اُن کے پاس سکون پاؤ، اور اُس نے تمہارے درمیان محبت اور رحمت رکھ دی۔ بے شک اس میں غور و فکر کرنے والوں کے لیے نشانیاں ہیں۔'
      ),

      reference: env('VITE_QURAN_REF', 'سورۃ الروم · 30:21'),
    },

    // RSVP
    rsvp: {
      title: env('VITE_RSVP_TITLE', 'R.S.V.P'),

      subtitle: isUrdu
        ? 'تمام اہل خانہ'
        : env('VITE_RSVP_SUBTITLE', 'From Family & Friends'),

      contacts: [
        {
          name: isUrdu ? 'محمد ذاکر' : 'Muhammad Zakir',
          phone: env('VITE_RSVP_PHONE_1', '0330-1249828'),
          relation: isUrdu ? 'میزبان' : 'Family Host',
        },
        {
          name: isUrdu ? 'یاسر' : 'Muhammad Yasir',
          phone: env('VITE_RSVP_PHONE_2', '0348-2810730'),
          relation: isUrdu ? 'کوآرڈینیٹر' : 'Event Coordinator',
        },
        {
          name: isUrdu ? 'مُحَمَّد وجاہت' : 'Muhammad Wajahat',
          phone: env('VITE_RSVP_PHONE_3', '0330-3714456'),
          relation: isUrdu ? 'دولہا' : 'Groom',
        },
      ],

      phones: [
        env('VITE_RSVP_PHONE_1', '0330-1249828'),
        env('VITE_RSVP_PHONE_2', '0348-2810730'),
        env('VITE_RSVP_PHONE_3', '0330-3714456'),
      ],
    },

    // Footer
    footer: {
      headline: isUrdu
        ? env('VITE_FOOTER_HEADLINE_URDU', 'ہم آپ کی پُرخلوص شرکت کے منتظر ہیں!')
        : env('VITE_FOOTER_HEADLINE', 'We can’t wait to\ncelebrate with you!'),

      couple: env('VITE_FOOTER_COUPLE', 'Muhammad Wajahat & Family'),

      date: isUrdu
        ? '18 اور 19 نومبر 2026 · کراچی'
        : env('VITE_FOOTER_DATE', 'November 18 & 19, 2026 · Karachi'),
    },
  };
};
