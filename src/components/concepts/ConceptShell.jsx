import { useEffect } from 'react';
import { contact } from '../../data/studies';
import '../../styles/concepts.css';
export default function ConceptShell({
  children,
  theme,
  title
}) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Shojahon Toshov`;
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, [title]);
  return <div className={`concept ${theme}`}>
<a className="skip-link" href="#concept-main">Skip to content</a>
{children}
</div>;
}
export function ContactFooter({
  editorial = false
}) {
  return <footer className="concept-contact" id="contact">
<div className="eyebrow">
{editorial ? 'The next chapter' : 'NEXT CONNECTION'}
</div>
<h2>Have a complex idea?<br /><em>Let’s make it work.</em></h2>
<a className="contact-email" href={`mailto:${contact.email}`}>
{contact.email}
<span aria-hidden="true">↗</span>
</a>
<div className="footer-line">
<span>Shojahon Toshov · {new Date().getFullYear()}</span>
<div>
<a href={contact.github}>GitHub ↗</a>
<a href={contact.telegram}>Telegram ↗</a>
<a href="#concept-main">Back to top ↑</a>
</div>
</div>
</footer>;
}
