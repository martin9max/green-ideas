import { clients } from '../data/content'

// Dva reda sa različitim logoima (nikad se isti logo ne pojavljuje u oba reda).
const rowA = clients.filter((_, i) => i % 2 === 0)
const rowB = clients.filter((_, i) => i % 2 === 1)

/*
  Svaki logo dobija "slot" fiksne širine: max(11rem, 24vw).
  Red ima 5 logoa => ukupna širina jednog niza je >= 120vw, tj. UVEK šira od ekrana.
  Zato se na ekranu (telefon ili računar) ni u jednom trenutku ne vide dva ista logoa.
  Razmak je ugrađen u slot (bez `gap`), pa je petlja animacije (-50%) savršeno glatka.
*/
function Row({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden" style={{ '--slot': 'max(11rem, 24vw)' }}>
      <div
        className={`flex w-max py-4 [animation-duration:30s] lg:[animation-duration:45s] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="group flex items-center justify-center shrink-0 h-16 sm:h-20 w-[var(--slot)] px-4"
          >
            <img
              src={`/logos/${c.file}`}
              alt={i < items.length ? c.name : ''}
              loading="lazy"
              className="max-h-12 sm:max-h-14 max-w-full w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Clients() {
  return (
    <section id="klijenti" className="bg-cream-100 py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 text-center">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-500 mb-3">
          Poverenje
        </p>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 tracking-tight">
          Naši klijenti
        </h2>
      </div>

      <div
        className="space-y-2"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Gornji red ulazi sa desne strane, donji sa leve */}
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  )
}
