import { useEffect, useState } from 'react';
import './EntryExperience.css';

export default function EntryExperience({ children }) {
  const [running, setRunning] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!running) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const finish = () => setRunning(false);
    const keyboard = event => {
      if (event.key === 'Escape') finish();
    };
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preferenceChanged = event => { if (event.matches) finish(); };
    preference.addEventListener('change', preferenceChanged);
    window.addEventListener('keydown', keyboard);
    const timeout = window.setTimeout(finish, preference.matches ? 150 : 4200);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', keyboard);
      preference.removeEventListener('change', preferenceChanged);
      document.body.style.overflow = previousOverflow;
    };
  }, [running]);

  return (
    <>
      <div inert={running}>{children}</div>
      {running && (
        <div className="entry-overlay" role="status" aria-label="Light site entrance">
          <div className="entry-artwork" aria-hidden="true">
            <div className="intro-slit-scene">
              <div className="intro-slit-half intro-slit-half--top" />
              <div className="intro-slit-half intro-slit-half--bottom" />
              <div className="intro-slit-beam" />
              <div className="intro-slit-label">SHOJAHON <span>TOSHOV</span></div>
              <span className="intro-slit-note">A SPACE FOR IDEAS.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

