"use client";

import { useEffect, useState } from 'react';
import './EntryExperience.css';

export default function EntryExperience({ children }) {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRunning(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);
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
    
    let timeout;
    if (preference.matches) {
      timeout = window.setTimeout(finish, 150);
    } else {
      // Smart loader: Instead of a hard 4s timer, finish when Next.js hydration
      // and critical resources (like fonts/images) are fully loaded.
      if (document.readyState === 'complete') {
        timeout = window.setTimeout(finish, 800); // small delay to let initial frames render
      } else {
        window.addEventListener('load', finish);
      }
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener('load', finish);
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


