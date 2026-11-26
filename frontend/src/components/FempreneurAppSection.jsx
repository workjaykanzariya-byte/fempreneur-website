import React from 'react';

export default function FempreneurAppSection() {
  return (
    <>
      <style>{`
        .fa-app {
          --ink: #2a0b45;
          --plum: #6a1b9a;
          --rose: #c2185b;
          --mist: #f6effb;
          --text: #51405f;
          font-family: 'Outfit', system-ui, sans-serif;
          background: var(--mist);
          color: var(--text);
          padding: clamp(48px, 7vw, 96px) clamp(20px, 5vw, 64px);
          overflow: hidden;
          box-sizing: border-box;
        }
        .fa-app * { box-sizing: border-box; }
        .fa-app__wrap {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }
        .fa-app h2 {
          font-size: clamp(2rem, 4.6vw, 3.4rem);
          line-height: 1.08;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .fa-app__brief {
          font-size: 1.125rem;
          line-height: 1.65;
          max-width: 34em;
          margin: 0 0 22px;
        }
        .fa-app__words {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--plum);
          margin: 0 0 22px;
          letter-spacing: 0.01em;
        }
        .fa-app__talk {
          font-size: 1.125rem;
          font-style: italic;
          color: var(--ink);
          margin: 0 0 32px;
          padding-left: 16px;
          border-left: 3px solid var(--rose);
          max-width: 30em;
        }
        .fa-app h3 {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 6px;
        }
        .fa-app__sub {
          margin: 0 0 20px;
          font-size: 1.05rem;
        }
        .fa-app__stores {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .fa-app__store {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #160827;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px 10px 16px;
          border-radius: 12px;
          line-height: 1.15;
          min-width: 176px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .fa-app__store small {
          display: block;
          font-size: 0.7rem;
          opacity: 0.8;
        }
        .fa-app__store strong {
          font-size: 1.05rem;
          font-weight: 600;
        }
        .fa-app__store:hover {
          background: var(--plum);
          transform: translateY(-2px);
        }
        .fa-app__store:focus-visible {
          outline: 3px solid var(--rose);
          outline-offset: 3px;
        }
        .fa-app__store svg {
          width: 26px;
          height: 26px;
          flex: none;
        }

        /* phones */
        .fa-app__phones {
          --pw: 250px;
          position: relative;
          height: calc(var(--pw) * 2.18);
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }
        .fa-app__phones::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 92%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: linear-gradient(145deg, #b66be0, #e0457f);
          opacity: 0.28;
        }
        .fa-phone {
          position: absolute;
          margin: 0;
          padding: calc(var(--pw) * 0.032);
          background: #160827;
          border-radius: calc(var(--pw) * 0.14);
          box-shadow: 0 24px 50px rgba(42, 11, 69, 0.28);
        }
        .fa-phone img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 738 / 1600;
          object-fit: cover;
          border-radius: calc(var(--pw) * 0.11);
        }
        .fa-phone--c {
          width: var(--pw);
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          z-index: 3;
        }
        .fa-phone--l {
          width: calc(var(--pw) * 0.84);
          left: 0;
          top: 12%;
          transform: rotate(-6deg);
          z-index: 2;
        }
        .fa-phone--r {
          width: calc(var(--pw) * 0.84);
          right: 0;
          top: 12%;
          transform: rotate(6deg);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .fa-app__wrap { grid-template-columns: 1fr; }
          .fa-app__phones { --pw: 200px; }
        }
        @media (max-width: 420px) {
          .fa-app__phones { --pw: 165px; }
          .fa-app__store { min-width: 100%; }
        }
      `}</style>

      <section className="fa-app" aria-labelledby="fa-app-title">
        <div className="fa-app__wrap">
          <div className="fa-app__text">
            <h2 id="fa-app-title">Your community, always in your pocket.</h2>
            <p className="fa-app__brief">
              The Fempreneur App keeps women entrepreneurs connected after every event. Meet women in your city, share your work, ask for help and find new business partners.
            </p>
            <p className="fa-app__words">Connect. Share. Ask. Support. Collaborate.</p>
            <p className="fa-app__talk">Because a good community doesn’t wait for the next meetup.</p>
            <h3>Download the Fempreneur App</h3>
            <p className="fa-app__sub">Explore the community and see it for yourself.</p>
            <div className="fa-app__stores">
              <a className="fa-app__store" href="#app-store" aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                  <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.9zM14.2 5.8c.6-.8 1.1-1.8.9-2.8-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3z" />
                </svg>
                <span>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a className="fa-app__store" href="#google-play" aria-label="Get it on Google Play">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#3ddc84" d="M3.6 2.4l10.2 9.6-10.2 9.6c-.3-.2-.6-.6-.6-1.1V3.5c0-.5.3-.9.6-1.1z" />
                  <path fill="#ffd400" d="M17.2 8.7l-3.4 3.3 3.4 3.3 3.6-2c.9-.5.9-1.8 0-2.3z" />
                  <path fill="#ff3d57" d="M3.6 21.6l10.2-9.6 3.4 3.3-11.3 6.3c-.8.4-1.7.4-2.3 0z" />
                  <path fill="#4aa3ff" d="M3.6 2.4c.6-.4 1.5-.4 2.3 0l11.3 6.3-3.4 3.3z" />
                </svg>
                <span>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>
          </div>

          <div className="fa-app__phones">
            <figure className="fa-phone fa-phone--l">
              <img
                src="/images/app/screen-left.jpg"
                alt="Fempreneur app: My Members screen with suggested women entrepreneurs"
                loading="lazy"
              />
            </figure>
            <figure className="fa-phone fa-phone--r">
              <img
                src="/images/app/screen-right.jpg"
                alt="Fempreneur app: Join a group screen with industry-specific groups"
                loading="lazy"
              />
            </figure>
            <figure className="fa-phone fa-phone--c">
              <img
                src="/images/app/screen-center.jpg"
                alt="Fempreneur app: home feed with a member post"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
