import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { href: '#usluge', label: 'Usluge' },
  { href: '#kalkulator', label: 'Procena uštede' },
  { href: '#klijenti', label: 'Reference' },
  { href: '#faq', label: 'Pitanja' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 left-0 right-0 z-[99999] bg-forest-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[4.5rem] py-3">
        <a href="#hero" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logos/green-ideas-logo.jpg"
            alt="Green Ideas"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
          />
          <span className="font-display font-bold text-cream-50 text-sm sm:text-base leading-tight tracking-tight">
            GREEN IDEAS
            <span className="block text-[10px] font-body font-medium text-leaf-400 tracking-[0.15em] uppercase">
              Solutions & Consulting
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cream-100/90 hover:text-gold-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+381 65 9133122"
            className="flex items-center gap-2 text-sm font-medium text-cream-50 hover:text-gold-400 transition-colors"
          >
            <Phone size={16} strokeWidth={2.5} />
            +381 65 9133122
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-gold-500 hover:bg-gold-400 text-ink-900 font-semibold text-sm px-5 py-2.5 transition-colors"
          >
            Zatražite ponudu
          </a>
        </div>

        <button
          type="button"
          aria-label="Otvori meni"
          onClick={() => setOpen(true)}
          className="lg:hidden text-cream-50 p-2 relative z-[99999]"
        >
          <Menu size={26} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[99999] bg-forest-950 lg:hidden flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-5 h-[4.5rem] border-b border-white/15 shrink-0">
            <span className="font-display font-bold text-cream-50 text-base">GREEN IDEAS</span>
            <button 
              type="button"
              aria-label="Zatvori meni" 
              onClick={() => setOpen(false)} 
              className="text-cream-50 p-3 -mr-2 bg-white/10 rounded-full active:scale-95 transition-transform"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-2 px-6 py-8 my-auto">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xl font-medium text-cream-100 py-3 border-b border-white/10 hover:text-gold-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-6 text-center rounded-full bg-gold-500 text-ink-900 font-semibold px-5 py-3.5 shadow-md"
            >
              Zatražite ponudu
            </a>
            
            <a
              href="tel:++381 65 9133122"
              className="mt-4 flex items-center justify-center gap-2 text-cream-50 font-medium py-3"
            >
              <Phone size={18} /> +381 65 9133122"
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}