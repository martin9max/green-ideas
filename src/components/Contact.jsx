import { useState } from 'react'
import { Mail, Phone, MapPin, AtSign } from 'lucide-react'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const form = e.target
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Slanje nije uspelo')

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="bg-forest-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-14">
        <div className="lg:col-span-2">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-400 mb-3">
            Kontakt
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-50 tracking-tight text-balance">
            Popričajmo o
            <br /> vašem krovu.
          </h2>
          <p className="text-cream-100/70 leading-relaxed mt-6 max-w-sm">
            Pošaljite upit i javićemo vam se u roku od 24h da dogovorimo besplatan obilazak
            objekta i pripremu elaborata.
          </p>

          <div className="mt-10 space-y-5">
            <ContactRow icon={<Phone size={18} />} label="+381 64 5022442 · +381 65 9133122" href = "tel:+381 65 9133122"/>
            <ContactRow icon={<Mail size={18} />} label="office@greenideas.solutions" href="mailto:office@greenideas.solutions" />
            <ContactRow icon={<MapPin size={18} />} label="Rudi Čajaveca 1B, Zvezdara, Beograd" />
            <ContactRow icon={<AtSign size={18} />} label="@greenideas_belgrade" href="https://www.instagram.com/greenideas_belgrade/" />
          </div>
        </div>

        <form
          className="lg:col-span-3 rounded-3xl bg-forest-900/60 border border-cream-50/10 p-6 sm:p-10 grid sm:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          <Field label="Ime i prezime" name="name" className="sm:col-span-2" required />
          <Field label="Adresa objekta" name="address" className="sm:col-span-2" />
          <Field label="Grad" name="city" />
          <Field label="Prosečna mesečna potrošnja (kWh)" name="kwh" type="number" />
          <Field label="Telefon" name="phone" className="sm:col-span-2" required />
          <div className="sm:col-span-2">
            <label className="block text-cream-100/70 text-sm mb-2" htmlFor="message">
              Poruka
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Recite nam nešto o vašem krovu i potrošnji..."
              className="w-full rounded-xl bg-forest-950/60 border border-cream-50/15 text-cream-50 placeholder:text-cream-100/30 px-4 py-3 outline-none focus:border-leaf-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="sm:col-span-2 rounded-full bg-gold-500 hover:bg-gold-400 text-ink-900 font-semibold px-6 py-3.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Slanje...' : 'Pošaljite upit'}
          </button>

          {status === 'success' && (
            <p className="sm:col-span-2 text-leaf-400 text-sm text-center">
              Hvala! Upit je poslat, javićemo vam se uskoro.
            </p>
          )}
          {status === 'error' && (
            <p className="sm:col-span-2 text-red-400 text-sm text-center">
              Došlo je do greške. Probajte ponovo ili nas pozovite direktno.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function ContactRow({ icon, label, href }) {
  const content = (
    <>
      <span className="h-10 w-10 flex items-center justify-center rounded-full bg-leaf-500/15 text-leaf-400">
        {icon}
      </span>
      <span className="text-cream-100/90 text-sm sm:text-base">{label}</span>
    </>
  )
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-4 hover:text-gold-400 transition-colors">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  )
}

function Field({ label, name, type = 'text', className = '', required = false }) {
  return (
    <div className={className}>
      <label className="block text-cream-100/70 text-sm mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl bg-forest-950/60 border border-cream-50/15 text-cream-50 placeholder:text-cream-100/30 px-4 py-3 outline-none focus:border-leaf-500 transition-colors"
      />
    </div>
  )
}
