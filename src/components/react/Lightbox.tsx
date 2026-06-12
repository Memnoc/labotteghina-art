import { useCallback, useEffect, useState, type ReactNode } from 'react';
import './Lightbox.css';

interface Props {
  /** Full-resolution image URL to show when opened. */
  src: string;
  alt: string;
  /** The inline (already optimized) image rendered by Astro. */
  children: ReactNode;
}

export default function Lightbox({ src, alt, children }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        className="lightbox-trigger"
        onClick={() => setOpen(true)}
        aria-label={`View ${alt} at full size`}
      >
        {children}
        <span className="lightbox-hint" aria-hidden="true">
          Click to expand
        </span>
      </button>

      {open && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" onClick={close}>
          <img src={src} alt={alt} className="lightbox-image" />
          <button
            type="button"
            className="lightbox-close"
            aria-label="Close"
            onClick={close}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
