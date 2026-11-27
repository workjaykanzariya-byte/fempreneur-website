import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'event-overview', label: 'Event Overview' },
  { id: 'award-categories', label: 'Categories' },
  { id: 'who-should-nominate', label: 'Who Should Nominate' },
  { id: 'how-to-nominate', label: 'How to Nominate' },
  { id: 'coffee-table-book', label: 'Top 50 Book' },
  { id: 'stories', label: '1,000 Stories' },
  { id: 'why-attend', label: 'Why Attend' },
  { id: 'our-team', label: 'Our Team' },
];

const EVENT_HIGHLIGHTS = [
  {
    num: '01',
    title: 'Awards Ceremony',
    desc: 'Winners are celebrated on stage and receive a certificate, trophy and media visibility.',
  },
  {
    num: '02',
    title: 'Keynotes & Panels',
    desc: 'Leaders and mentors share real advice on growing a business.',
  },
  {
    num: '03',
    title: 'Masterclasses',
    desc: 'Practical sessions on funding, branding, marketing and leadership.',
  },
  {
    num: '04',
    title: 'Fireside Chats',
    desc: 'Women entrepreneurs share real stories of challenges and growth.',
  },
  {
    num: '05',
    title: 'Exhibition',
    desc: '50 women-led businesses show their products and services.',
  },
  {
    num: '06',
    title: 'Business Networking',
    desc: 'Meet people from many industries and find partners and clients.',
  },
  {
    num: '07',
    title: 'Top 50 Book Launch',
    desc: 'A printed book on 50 inspiring women entrepreneurs.',
  },
  {
    num: '08',
    title: 'Stories & Community',
    desc: '1,000 stories shared online, and a community that continues after the day.',
  },
];

const CATEGORY_GROUPS = [
  {
    title: 'Leaders & Rising Stars',
    count: 8,
    highlight: true,
    items: [
      'Woman Entrepreneur of the Year',
      'Emerging Woman Entrepreneur',
      'Young Woman Entrepreneur',
      'Startup Founder',
      'Young Business Woman (Under 35)',
      'Young Achiever (Under 25)',
      'Lifetime Achievement',
      'Pride of India',
    ],
  },
  {
    title: 'Technology & New Business',
    count: 6,
    items: [
      'Innovation & Technology',
      'Digital & New-Age Business',
      'E-Commerce Business',
      'Business Innovation',
      'Media & Entertainment',
      'Marketing & Advertising',
    ],
  },
  {
    title: 'Health, Education & Services',
    count: 7,
    items: [
      'Healthcare & Wellness',
      'Education & Training',
      'Finance & Financial Services',
      'Consulting & Coaching',
      'Legal Services',
      'Human Resources',
      'Pharma & Life Sciences',
    ],
  },
  {
    title: 'Industry & Building',
    count: 6,
    items: [
      'Manufacturing & Engineering',
      'Real Estate & Construction',
      'Architecture',
      'Interior & Exterior Design',
      'Logistics & Supply Chain',
      'Agriculture & Agri-Business',
    ],
  },
  {
    title: 'Lifestyle & Consumer',
    count: 8,
    items: [
      'Retail Business',
      'Fashion & Lifestyle',
      'Beauty & Personal Care',
      'Food & Beverage',
      'Hospitality & Tourism',
      'Art & Creative Business',
      'Events & Experiences',
      'Homegrown Brand',
    ],
  },
  {
    title: 'Impact & Community',
    count: 5,
    items: [
      'Women-Led Business',
      'Women-Led MSME',
      'Social Impact Business',
      'Rural Woman Entrepreneur',
      'Best Influencer',
    ],
  },
];

const WHO_SHOULD_NOMINATE = [
  { code: 'A', title: 'Startup Founders', desc: 'You have a new idea and are building it.' },
  { code: 'B', title: 'Business Owners', desc: 'You run a small or medium business or a family business.' },
  { code: 'C', title: 'Professionals', desc: 'You offer consulting, coaching, legal, finance or HR services.' },
  { code: 'D', title: 'Creative & Lifestyle', desc: 'Fashion, beauty, food, art, events, travel and more.' },
  { code: 'E', title: 'Young Women', desc: 'You are under 35, or under 25, and already making a mark.' },
  { code: 'F', title: 'Rural & Homegrown', desc: 'You grow a local brand or a business in a village or small town.' },
  { code: 'G', title: 'Social Impact Leaders', desc: 'Your business solves a problem for people or the planet.' },
  { code: 'H', title: 'Experienced Leaders', desc: 'You have led for many years and inspire other women.' },
];

const NOMINATION_STEPS = [
  { num: '1', title: 'Choose', desc: 'Pick your category and your package.' },
  { num: '2', title: 'Apply', desc: 'Fill in the nomination form with your business details.' },
  { num: '3', title: 'Jury review', desc: 'Experts score your work. This is 50% of your result.' },
  { num: '4', title: 'Public voting', desc: 'Share your personal voting link. This is 50% of your result.' },
  { num: '5', title: 'Celebrate', desc: 'Winners are honoured at the event with a certificate and trophy.' },
];

const STORY_BENEFITS = [
  { num: '1', title: 'Full-page story', desc: 'A picture story about you and your business on VyapaarJagat.com.' },
  { num: '2', title: 'Lifetime listing', desc: 'Your business stays listed in the VyapaarJagat directory.' },
  { num: '3', title: 'Social media reach', desc: 'Your story is promoted to a large following.' },
  { num: '4', title: 'A link to your website', desc: 'A link back to your site that helps Google find you.' },
  { num: '5', title: '15 free magazines', desc: 'Printed copies you can share with customers and friends.' },
  { num: '6', title: 'Trusted recognition', desc: 'Third-party coverage that builds trust in your brand.' },
];

const WHY_ATTEND_CARDS = [
  { num: '01', title: 'Meet 300–500 women entrepreneurs', desc: 'Build real connections with founders from many fields.' },
  { num: '02', title: 'Learn from experts', desc: 'Join masterclasses on funding, branding, marketing and leadership.' },
  { num: '03', title: 'Hear real stories', desc: 'Fireside chats and panels on what it truly takes to grow.' },
  { num: '04', title: 'Find partners and clients', desc: 'Open business networking built to start new deals.' },
  { num: '05', title: 'Show your business', desc: 'Exhibit to a focused audience of founders and decision-makers.' },
  { num: '06', title: 'Stay connected', desc: 'Join a community that keeps supporting you after the event.' },
];

const TEAM_MEMBERS = [
  {
    name: 'Dr. Ananta Singh Raghuvanshi',
    role: 'National Chair, Fempreneur India',
    image: '/images/award-overview/team-ananta.webp',
  },
  {
    name: 'Priya Shah',
    role: 'National Vice-Chair, Fempreneur India',
    image: '/images/award-overview/team-priya.webp',
  },
  {
    name: 'Dr. Puja Mehta',
    role: 'Chair, Fempreneur Ahmedabad',
    image: '/images/award-overview/team-puja.webp',
  },
  {
    name: 'Dr. Nikita Kanzariya',
    role: 'Vice-Chair, Fempreneur Ahmedabad',
    image: '/images/award-overview/team-nikita.webp',
  },
  {
    name: 'Ila Gohel',
    role: 'Secretary, Fempreneur Ahmedabad',
    image: '/images/award-overview/team-ila.webp',
  },
  {
    name: 'Dharmendra Joshi',
    role: 'Chief Mentor',
    image: '/images/award-overview/team-dharmendra.webp',
  },
  {
    name: 'Dr. Pravin Parmar',
    role: 'Founder, 1MEIF and VyapaarJagat.com',
    image: '/images/award-overview/team-pravin.webp',
  },
  {
    name: 'Vishal Parmar',
    role: 'Director & Co-Founder, Peers Global',
    image: '/images/award-overview/team-vishal.webp',
  },
];

export default function AwardsPage() {
  const [activeSection, setActiveSection] = useState('event-overview');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fp">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap');

        .fp {
          --ink: #2a0b45;
          --plum: #6a1b9a;
          --rose: #c2185b;
          --text: #51405f;
          font-family: 'Outfit', system-ui, sans-serif;
          color: var(--text);
          overflow-x: clip;
          max-width: 100%;
          width: 100%;
        }
        .fp * { box-sizing: border-box; }
        .fp-s {
          background: #fbf7fe;
          padding: clamp(44px, 7vw, 96px) clamp(16px, 5vw, 64px);
          scroll-margin-top: calc(var(--header-height, 64px) + 58px);
        }
        .fp-s:nth-of-type(even) { background: #fff; }
        .fp-w { max-width: 1180px; margin: 0 auto; width: 100%; }
        .fp-h { text-align: center; max-width: 700px; margin: 0 auto clamp(26px, 4vw, 48px); }
        .fp-l {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--plum);
          margin: 0 0 14px;
          text-transform: uppercase;
        }
        .fp h2 {
          margin: 0 0 16px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.12;
          font-size: clamp(1.75rem, 4vw, 2.9rem);
        }
        .fp h2 em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          background: linear-gradient(90deg, #8e24aa, #d81b60);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: block;
          margin-top: 4px;
        }
        .fp-end h2 em { display: inline; margin: 0; }
        .fp-sub { margin: 0; font-size: 1.08rem; line-height: 1.65; color: var(--text); }
        .fp-g { display: grid; gap: 20px; }
        .fp-g4 { grid-template-columns: repeat(4, 1fr); }
        .fp-g3 { grid-template-columns: repeat(3, 1fr); }
        .fp-c {
          background: #fff;
          border: 1px solid #eadcf5;
          border-radius: 22px;
          padding: 26px 24px;
          box-shadow: 0 12px 32px rgba(80, 30, 120, 0.07);
        }
        .fp-s:nth-of-type(even) .fp-c { background: #fbf7fe; }
        .fp-n {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(145deg, #3b1260, #6a1b9a);
          color: #fff;
          font-weight: 700;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
        }
        .fp h3 {
          margin: 0 0 8px;
          font-size: 1.18rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.25;
        }
        .fp-c p { margin: 0; font-size: 0.98rem; line-height: 1.6; }
        .fp-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .fp-stat {
          text-align: center;
          padding: 22px 12px;
          border-radius: 20px;
          background: linear-gradient(145deg, #3b1260, #6a1b9a);
          color: #fff;
        }
        .fp-stat b { display: block; font-size: 2.2rem; line-height: 1.1; white-space: nowrap; }
        .fp-stat span { font-size: 0.94rem; opacity: 0.92; display: block; margin-top: 4px; }
        .fp-grp h3 { font-size: 1.05rem; margin-bottom: 14px; }
        .fp-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .fp-chip {
          background: #fff;
          border: 1px solid #e3d0f2;
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 0.9rem;
          color: var(--ink);
          font-weight: 500;
          line-height: 1.3;
        }
        .fp-chip.k { background: #f5ebfc; }
        .fp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 30px;
          min-height: 48px;
          border-radius: 999px;
          font: 600 1rem 'Outfit', sans-serif;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(90deg, #6a1b9a, #d81b60);
          box-shadow: 0 10px 24px rgba(160, 40, 140, 0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(160, 40, 140, 0.34);
          color: #fff;
        }
        .fp-btn.w { background: #fff; color: var(--plum); box-shadow: none; }
        .fp-btn.w:hover { color: var(--ink); }
        .fp-btn.o {
          background: #fff;
          color: var(--plum);
          border: 1.5px solid #d9c3ea;
          box-shadow: none;
        }
        .fp-btn.o:hover { color: var(--ink); border-color: var(--plum); }
        .fp-btn:focus-visible { outline: 3px solid var(--rose); outline-offset: 3px; }
        .fp-cta { text-align: center; margin-top: 34px; }
        .fp-note { margin: 14px 0 0; font-size: 0.94rem; }

        .fp-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .fp-step { text-align: center; padding: 0 6px; position: relative; }
        .fp-step .fp-n {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin: 0 auto 16px;
          font-size: 1.3rem;
          background: linear-gradient(90deg, #6a1b9a, #d81b60);
        }
        .fp-step h3 { font-size: 1.08rem; }
        .fp-step p { margin: 0; font-size: 0.95rem; line-height: 1.55; }
        .fp-step:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 28px;
          left: calc(50% + 40px);
          right: calc(-50% + 40px);
          border-top: 2px dashed #cdb0e6;
        }

        .fp-two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .fp-big { font-size: 2.4rem; font-weight: 700; color: var(--plum); line-height: 1; margin-bottom: 8px; }
        .fp-c ul { margin: 12px 0 0; padding-left: 20px; line-height: 1.7; }

        .fp-dark { background: linear-gradient(135deg, #2a0b45, #5b1a86) !important; color: #e9d9f6; }
        .fp-dark h2 { color: #fff; }
        .fp-dark h2 em {
          background: linear-gradient(90deg, #e6bcff, #ff9ec9);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .fp-dark .fp-l { color: #f0b4d4; }
        .fp-dark .fp-sub { color: #e9d9f6; }
        .fp-dark .fp-c {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: none;
          color: #e9d9f6;
        }
        .fp-dark h3 { color: #fff; }
        .fp-dark .fp-n { background: linear-gradient(90deg, #8e24aa, #d81b60); }

        .fp-nav {
          position: sticky;
          top: var(--header-height, 64px);
          z-index: 20;
          display: flex;
          gap: 6px;
          justify-content: center;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 10px 16px;
          background: rgba(251, 247, 254, 0.96);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #eadcf5;
        }
        .fp-nav::-webkit-scrollbar { display: none; }
        .fp-nav a {
          padding: 8px 15px;
          border-radius: 999px;
          color: var(--ink);
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .fp-nav a:hover { background: #f0e2fa; }
        .fp-nav a.active { background: #6a1b9a; color: #fff; }
        .fp-nav a:focus-visible { outline: 3px solid var(--rose); }

        .fp-hero2 {
          padding: clamp(40px, 7vw, 92px) clamp(16px, 5vw, 64px);
          background: radial-gradient(60% 90% at 80% 20%, #ecd9f8 0%, rgba(236, 217, 248, 0) 70%), #fbf7fe;
        }
        .fp-hg {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: center;
        }
        .fp-hero2 h1 {
          margin: 0 0 18px;
          font-size: clamp(2.2rem, 6vw, 4.6rem);
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.03em;
          line-height: 1.04;
        }
        .fp-hero2 h1 em {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          background: linear-gradient(90deg, #8e24aa, #d81b60);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .fp-hero2 p.s {
          margin: 0 0 28px;
          font-size: clamp(1rem, 2.2vw, 1.18rem);
          line-height: 1.65;
          max-width: 30em;
        }
        .fp-hero2 .b { display: flex; flex-wrap: wrap; gap: 12px; }
        .fp-col2 { position: relative; height: 440px; width: 100%; }
        .fp-h1, .fp-h2 {
          position: absolute;
          margin: 0;
          overflow: hidden;
          box-shadow: 0 22px 50px rgba(106, 27, 154, 0.25);
        }
        .fp-h1 { right: 0; top: 0; width: 88%; border-radius: 26px; }
        .fp-h1 img { width: 100%; height: 330px; object-fit: cover; display: block; }
        .fp-h2 { left: 0; bottom: 0; width: 50%; border: 6px solid #fff; border-radius: 22px; }
        .fp-h2 img { width: 100%; height: 190px; object-fit: cover; display: block; }
        .fp-cap {
          position: absolute;
          left: 14px;
          bottom: 12px;
          background: rgba(42, 11, 69, 0.86);
          color: #fff;
          padding: 7px 15px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 0.86rem;
        }
        .fp-h1 .fp-cap { left: auto; right: 14px; bottom: auto; top: 14px; }

        .fp-ban {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 30px;
          box-shadow: 0 18px 44px rgba(80, 30, 120, 0.16);
        }
        .fp-ban img {
          width: 100%;
          height: clamp(190px, 28vw, 340px);
          object-fit: cover;
          display: block;
        }
        .fp-ban .fp-cap { left: 16px; bottom: 14px; font-size: 0.9rem; max-width: calc(100% - 32px); }

        .fp-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .fp-trio img {
          width: 100%;
          height: 230px;
          object-fit: cover;
          border-radius: 20px;
          display: block;
        }

        .fp-split {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: center;
          margin-bottom: 26px;
        }
        .fp-split .im {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 18px 44px rgba(80, 30, 120, 0.16);
        }
        .fp-split .im img {
          width: 100%;
          height: 100%;
          min-height: 240px;
          object-fit: cover;
          display: block;
        }
        .fp-split .tx { padding: 6px 10px; }
        .fp-split .tx h3 { font-size: clamp(1.35rem, 3vw, 1.7rem); margin-bottom: 12px; }
        .fp-split .tx p { margin: 0 0 14px; line-height: 1.65; font-size: 1.03rem; }

        .fp-bkw {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: center;
        }
        .fp-books {
          position: relative;
          height: 430px;
          max-width: 540px;
          width: 100%;
          margin: 0 auto;
        }
        .fp-books img {
          position: absolute;
          width: 44%;
          border-radius: 8px;
          box-shadow: 0 18px 40px rgba(42, 11, 69, 0.35);
          display: block;
        }
        .fp-books .a { left: 28%; top: 0; z-index: 3; }
        .fp-books .b { left: 2%; top: 14%; transform: rotate(-8deg); z-index: 2; }
        .fp-books .c { right: 2%; top: 14%; transform: rotate(8deg); z-index: 2; }

        .fp-list { list-style: none; margin: 16px 0; padding: 0; display: grid; gap: 12px; }
        .fp-list li { padding-left: 30px; position: relative; line-height: 1.55; }
        .fp-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #efe2fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a1b9a' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 12.5l4 4L18 8'/%3E%3C/svg%3E") center/12px no-repeat;
        }

        .fp-mini { display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0 26px; }
        .fp-mini div {
          background: #fff;
          border: 1px solid #eadcf5;
          border-radius: 16px;
          padding: 14px 20px;
          flex: 1 1 140px;
        }
        .fp-mini b { display: block; font-size: 1.7rem; color: var(--plum); line-height: 1.1; }
        .fp-mini span { font-size: 0.9rem; }

        .fp-ppl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .fp-p {
          text-align: center;
          padding: 26px 16px;
          background: #fbf7fe;
          border: 1px solid #eadcf5;
          border-radius: 22px;
        }
        .fp-p img {
          width: 116px;
          height: 116px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 14px;
          display: block;
          border: 4px solid #fff;
          box-shadow: 0 8px 20px rgba(80, 30, 120, 0.15);
        }
        .fp-p h3 { font-size: 1.05rem; margin: 0 0 4px; }
        .fp-p p { margin: 0; font-size: 0.9rem; line-height: 1.45; }

        .fp-end {
          text-align: center;
          background: linear-gradient(rgba(42, 11, 69, 0.84), rgba(42, 11, 69, 0.9)),
            url('/images/award-overview/cta-bg.webp') center/cover no-repeat !important;
          color: #e9d9f6;
        }
        .fp-end h2 { color: #fff; }
        .fp-end h2 em {
          background: linear-gradient(90deg, #e6bcff, #ff9ec9);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .fp-end .fp-sub { color: #e9d9f6; max-width: 620px; }
        .fp-end .b { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .fp-end .fp-btn.o { border-color: #fff; }

        @media (max-width: 1000px) {
          .fp-g4, .fp-stats { grid-template-columns: repeat(2, 1fr); }
          .fp-g3 { grid-template-columns: repeat(2, 1fr); }
          .fp-steps { grid-template-columns: 1fr; max-width: 440px; margin-inline: auto; gap: 20px; }
          .fp-step:not(:last-child)::after { display: none; }
          .fp-two, .fp-hg, .fp-split, .fp-bkw { grid-template-columns: 1fr; }
          .fp-nav { justify-content: flex-start; padding: 8px 12px; }
          .fp-ppl { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .fp-trio { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .fp-trio img { height: 180px; }
          .fp-split .tx { padding: 4px 0; }
        }

        @media (max-width: 640px) {
          .fp-trio { grid-template-columns: 1fr; }
          .fp-trio img { height: 210px; }
        }

        @media (max-width: 560px) {
          .fp-g4, .fp-g3 { grid-template-columns: 1fr; gap: 14px; }
          .fp-c { padding: 20px 18px; border-radius: 18px; }
          .fp-btn { width: 100%; justify-content: center; padding: 14px 20px; }
          .fp-hero2 .b, .fp-end .b { flex-direction: column; width: 100%; }
          .fp-col2 { height: 330px; }
          .fp-h1 { width: 92%; border-radius: 20px; }
          .fp-h1 img { height: 230px; }
          .fp-h2 { width: 56%; border-width: 4px; border-radius: 16px; }
          .fp-h2 img { height: 135px; }
          .fp-cap { font-size: 0.78rem; padding: 5px 12px; }
          .fp-stat { padding: 16px 10px; border-radius: 16px; }
          .fp-stat b { font-size: 1.6rem; }
          .fp-stat span { font-size: 0.82rem; }
          .fp-chip { font-size: 0.84rem; padding: 6px 12px; }
          .fp-books { height: 300px; }
          .fp-ppl { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .fp-p { padding: 18px 10px; border-radius: 18px; }
          .fp-p img { width: 84px; height: 84px; border-width: 3px; margin-bottom: 10px; }
          .fp-p h3 { font-size: 0.94rem; }
          .fp-p p { font-size: 0.8rem; }
          .fp-sub { font-size: 0.98rem; }
          .fp-ban { border-radius: 18px; margin-bottom: 22px; }
          .fp-split .im { border-radius: 18px; }
          .fp-split .im img { min-height: 200px; }
        }

        @media (max-width: 380px) {
          .fp-col2 { height: 290px; }
          .fp-h1 img { height: 200px; }
          .fp-h2 img { height: 120px; }
          .fp-books { height: 250px; }
          .fp-ppl { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Section */}
      <header className="fp-hero2">
        <div className="fp-w fp-hg">
          <div>
            <p className="fp-l">FEMPRENEUR 2027</p>
            <h1>
              Award <em>Overview</em>
            </h1>
            <p className="s">
              Everything you need to know about Fempreneur 2027: the event, the categories, who can
              nominate, how it works and why you should be there.
            </p>
            <div className="b">
              <Link className="fp-btn" to="/awards/apply">
                Nominate Now <span aria-hidden="true">→</span>
              </Link>
              <Link className="fp-btn o" to="/events">
                Attend the Event
              </Link>
            </div>
          </div>

          <div className="fp-col2">
            <figure className="fp-h1">
              <img
                src="/images/award-overview/hero-ceremony.webp"
                alt="Award winners holding trophies"
                loading="eager"
              />
              <span className="fp-cap">Awards Ceremony</span>
            </figure>
            <figure className="fp-h2">
              <img
                src="/images/award-overview/hero-community.webp"
                alt="Women holding the Fempreneur magazine"
                loading="eager"
              />
              <span className="fp-cap">Our Community</span>
            </figure>
          </div>
        </div>
      </header>

      {/* Sticky Section Navigation */}
      <nav className="fp-nav" aria-label="Award Overview sections">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            onClick={(e) => handleAnchorClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* 1. Event Overview */}
      <section className="fp-s" id="event-overview" aria-label="Event Overview">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">EVENT OVERVIEW</p>
            <h2>
              A Full Day for <em>Women Entrepreneurs</em>
            </h2>
            <p className="fp-sub">
              Fempreneur 2027 is one day to learn, meet, get noticed and celebrate. Here is what
              happens at the event.
            </p>
          </div>

          <div className="fp-ban">
            <img
              src="/images/award-overview/event-banner.webp"
              alt="From a past Fempreneur event"
              loading="lazy"
            />
            <span className="fp-cap">From a past Fempreneur event</span>
          </div>

          <div className="fp-stats">
            <div className="fp-stat">
              <b>1 Day</b>
              <span>Full-day experience</span>
            </div>
            <div className="fp-stat">
              <b>2 Cities</b>
              <span>Ahmedabad &amp; Delhi NCR</span>
            </div>
            <div className="fp-stat">
              <b>300–500</b>
              <span>Women entrepreneurs</span>
            </div>
            <div className="fp-stat">
              <b>40</b>
              <span>Award categories</span>
            </div>
          </div>

          <div className="fp-g fp-g4">
            {EVENT_HIGHLIGHTS.map((item) => (
              <article className="fp-c" key={item.num}>
                <div className="fp-n">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="fp-cta">
            <Link className="fp-btn" to="/events">
              Attend the Event <span aria-hidden="true">→</span>
            </Link>
            <p className="fp-note">Ahmedabad &amp; Delhi NCR · Fempreneur 2027</p>
          </div>
        </div>
      </section>

      {/* 2. Award Categories */}
      <section className="fp-s" id="award-categories" aria-label="Award Categories">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">AWARD CATEGORIES</p>
            <h2>
              40 Categories, <em>A Place for Every Business</em>
            </h2>
            <p className="fp-sub">
              Whatever your work, there is a category for you. Find yours below and nominate in the
              one that fits best.
            </p>
          </div>

          <div className="fp-ban">
            <img
              src="/images/award-overview/categories-banner.webp"
              alt="Award winners with their trophies"
              loading="lazy"
            />
            <span className="fp-cap">Award winners with their trophies</span>
          </div>

          <div className="fp-g fp-g3">
            {CATEGORY_GROUPS.map((group) => (
              <article className="fp-c fp-grp" key={group.title}>
                <h3>
                  {group.title}{' '}
                  <span style={{ color: '#a37cc0', fontWeight: 500 }}>· {group.count}</span>
                </h3>
                <div className="fp-chips">
                  {group.items.map((cat) => (
                    <span className={`fp-chip${group.highlight ? ' k' : ''}`} key={cat}>
                      {cat}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="fp-cta">
            <Link className="fp-btn" to="/awards/apply">
              Nominate Now <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Who Should Nominate */}
      <section className="fp-s" id="who-should-nominate" aria-label="Who Should Nominate">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">WHO SHOULD NOMINATE</p>
            <h2>
              If You Lead a Business, <em>This Is for You</em>
            </h2>
            <p className="fp-sub">
              Fempreneur welcomes women entrepreneurs from every industry and every stage.
            </p>
          </div>

          <div className="fp-trio">
            <img
              src="/images/award-overview/trio-1.webp"
              alt="Women entrepreneurs at a Fempreneur event"
              loading="lazy"
            />
            <img
              src="/images/award-overview/trio-2.webp"
              alt="Women entrepreneurs at a Fempreneur event"
              loading="lazy"
            />
            <img
              src="/images/award-overview/trio-3.webp"
              alt="Women entrepreneurs at a Fempreneur event"
              loading="lazy"
            />
          </div>

          <div className="fp-g fp-g4">
            {WHO_SHOULD_NOMINATE.map((item) => (
              <article className="fp-c" key={item.code}>
                <div className="fp-n">{item.code}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="fp-cta">
            <p className="fp-sub" style={{ marginBottom: '18px' }}>
              Not sure which one you are? Check the 40 categories and pick the closest match.
            </p>
            <a
              className="fp-btn"
              href="#award-categories"
              onClick={(e) => handleAnchorClick(e, 'award-categories')}
            >
              See All Categories <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. How to Nominate */}
      <section className="fp-s" id="how-to-nominate" aria-label="How to Nominate">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">HOW TO NOMINATE</p>
            <h2>
              Five Simple Steps <em>to Be Featured</em>
            </h2>
            <p className="fp-sub">From applying to the stage, here is the full journey.</p>
          </div>

          <div className="fp-steps">
            {NOMINATION_STEPS.map((step) => (
              <div className="fp-step" key={step.num}>
                <div className="fp-n">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="fp-split">
            <div className="im">
              <img
                src="/images/award-overview/step-celebrate.webp"
                alt="Award winners celebrating on stage"
                loading="lazy"
              />
            </div>
            <div className="tx">
              <p className="fp-l" style={{ margin: '0 0 10px' }}>
                STEP 5 · CELEBRATE
              </p>
              <h3>Winners are honoured on stage</h3>
              <p>
                Every winner receives a certificate, a trophy and media visibility, in front of
                hundreds of women entrepreneurs.
              </p>
            </div>
          </div>

          <div className="fp-two">
            <article className="fp-c">
              <div className="fp-big">50%</div>
              <h3>Jury score</h3>
              <p>A panel of experts looks at:</p>
              <div className="fp-chips" style={{ marginTop: '14px' }}>
                <span className="fp-chip">Leadership and vision</span>
                <span className="fp-chip">Social impact</span>
                <span className="fp-chip">Innovation</span>
                <span className="fp-chip">Growth and scale</span>
                <span className="fp-chip">Lasting business practices</span>
                <span className="fp-chip">Achievements</span>
                <span className="fp-chip">Role and influence</span>
              </div>
            </article>
            <article className="fp-c">
              <div className="fp-big">50%</div>
              <h3>Public vote</h3>
              <p>Friends, customers and the community vote for you:</p>
              <ul>
                <li>You appear on the Fempreneur voting page</li>
                <li>You get a personal poster and voting link</li>
                <li>Share it on social media and WhatsApp</li>
                <li>Fempreneur promotes you on its channels</li>
              </ul>
            </article>
          </div>

          <div className="fp-cta">
            <Link className="fp-btn" to="/awards/apply">
              Start Your Nomination <span aria-hidden="true">→</span>
            </Link>
            <p className="fp-note">Nominations Open for Fempreneur 2027</p>
          </div>
        </div>
      </section>

      {/* 5. Top 50 Book */}
      <section className="fp-s" id="coffee-table-book" aria-label="Top 50 Book">
        <div className="fp-w">
          <div className="fp-bkw">
            <div className="fp-books">
              <img
                className="b"
                src="/images/award-overview/book-inside-1.webp"
                alt="Inside page of the Fempreneur book"
                loading="lazy"
              />
              <img
                className="c"
                src="/images/award-overview/book-inside-2.webp"
                alt="Inside page of the Fempreneur book"
                loading="lazy"
              />
              <img
                className="a"
                src="/images/award-overview/book-cover.webp"
                alt="Cover of the Fempreneur book"
                loading="lazy"
              />
            </div>

            <div>
              <p className="fp-l">TOP 50 BOOK</p>
              <h2 style={{ marginBottom: '14px' }}>
                Your Story in <em>a Printed Book</em>
              </h2>
              <p className="fp-sub">
                The Fempreneur book features the Top 50 Women Entrepreneurs. It is premium,
                hardbound and shared across India.
              </p>
              <ul className="fp-list">
                <li>Profiles and journeys of the Top 50 women entrepreneurs</li>
                <li>Full-page picture stories of inspiring women</li>
                <li>Features on Fempreneur Award winners</li>
                <li>Expert views on women entrepreneurship and business growth</li>
              </ul>
              <div className="fp-mini">
                <div>
                  <b>5,000+</b>
                  <span>Printed copies</span>
                </div>
                <div>
                  <b>5,00,000+</b>
                  <span>Digital reach</span>
                </div>
              </div>
              <p style={{ margin: '0 0 22px' }}>
                Copies reach corporate offices, government offices, hospitals, airports and business
                events.
              </p>
              <Link className="fp-btn" to="/coffee-table-book">
                Feature in the Book <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 1,000 Stories */}
      <section className="fp-s" id="stories" aria-label="1,000 Stories">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">1,000 STORIES</p>
            <h2>
              An Event Lasts a Day. <em>A Story Lasts Forever.</em>
            </h2>
            <p className="fp-sub">
              Through VyapaarJagat.com, which has published 10,000+ entrepreneur stories, Fempreneur
              will share 1,000 stories of women entrepreneurs.
            </p>
          </div>

          <div className="fp-split">
            <div className="im">
              <img
                src="/images/award-overview/stories-magazine.webp"
                alt="Women entrepreneurs holding the Fempreneur magazine"
                loading="lazy"
              />
            </div>
            <div className="tx">
              <h3>Be one of the 1,000</h3>
              <p>
                Your story is written, designed and published, so customers, partners and investors
                can find you long after the event.
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                Story publishing is included in the Change Maker, Fame of India and Impact Creator
                packages.
              </p>
              <Link className="fp-btn" to="/story-drive">
                Get Your Story Published <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="fp-g fp-g3">
            {STORY_BENEFITS.map((item) => (
              <article className="fp-c" key={item.num}>
                <div className="fp-n">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Attend */}
      <section className="fp-s fp-dark" id="why-attend" aria-label="Why Attend">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">WHY ATTEND</p>
            <h2>
              One Day That Can <em>Change Your Business</em>
            </h2>
            <p className="fp-sub">Come for the talks. Stay for the people.</p>
          </div>

          <div className="fp-ban">
            <img
              src="/images/award-overview/why-attend-banner.webp"
              alt="Meet 300–500 women entrepreneurs in one day"
              loading="lazy"
            />
            <span className="fp-cap">Meet 300–500 women entrepreneurs in one day</span>
          </div>

          <div className="fp-g fp-g3">
            {WHY_ATTEND_CARDS.map((item) => (
              <article className="fp-c" key={item.num}>
                <div className="fp-n">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="fp-cta">
            <Link className="fp-btn w" to="/events">
              Attend the Event <span aria-hidden="true">→</span>
            </Link>
            <p className="fp-note">Ahmedabad &amp; Delhi NCR · Fempreneur 2027</p>
          </div>
        </div>
      </section>

      {/* 8. Our Team */}
      <section className="fp-s" id="our-team" aria-label="Our Team">
        <div className="fp-w">
          <div className="fp-h">
            <p className="fp-l">OUR TEAM</p>
            <h2>
              The People <em>Behind Fempreneur</em>
            </h2>
            <p className="fp-sub">Meet the leaders who guide the community and the awards.</p>
          </div>

          <div className="fp-ppl">
            {TEAM_MEMBERS.map((member) => (
              <article className="fp-p" key={member.name}>
                <img src={member.image} alt={member.name} loading="lazy" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="fp-s fp-end ph" id="join" aria-label="Join Fempreneur 2027">
        <div className="fp-w">
          <h2 style={{ marginBottom: '14px' }}>
            Ready to Be Part of <em>Fempreneur 2027?</em>
          </h2>
          <p className="fp-sub" style={{ margin: '0 auto 28px' }}>
            Nominate your business, or come and meet the women who are building theirs.
          </p>
          <div className="b">
            <Link className="fp-btn" to="/awards/apply">
              Nominate Now <span aria-hidden="true">→</span>
            </Link>
            <Link className="fp-btn o" to="/events">
              Attend the Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
