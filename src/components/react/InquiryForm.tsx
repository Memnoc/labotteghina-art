import { useState, type FormEvent } from 'react';
import './InquiryForm.css';

interface Props {
  /** Pre-filled subject, e.g. the Work title. Omit for general contact. */
  workTitle?: string;
  accessKey: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function InquiryForm({ workTitle, accessKey }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never fill this.
    if (data.get('botcheck')) return;

    if (!accessKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className="inquiry-sent">
        Grazie — your message is on its way. You will hear back soon.
      </p>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={accessKey} />
      <input
        type="hidden"
        name="subject"
        value={
          workTitle
            ? `Inquiry about “${workTitle}” — La Botteghina`
            : 'General inquiry — La Botteghina'
        }
      />
      {workTitle && <input type="hidden" name="work" value={workTitle} />}
      <input
        type="checkbox"
        name="botcheck"
        className="inquiry-honeypot"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="inquiry-row">
        <label className="inquiry-field">
          <span>Name</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>
        <label className="inquiry-field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
      </div>

      <label className="inquiry-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={
            workTitle
              ? `I'd like to know more about “${workTitle}”…`
              : 'Write your message…'
          }
        />
      </label>

      <div className="inquiry-actions">
        <button type="submit" className="button-ghost" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send inquiry'}
        </button>
        {status === 'error' && (
          <p className="inquiry-error" role="alert">
            Something went wrong — please try again, or email directly.
          </p>
        )}
      </div>
    </form>
  );
}
