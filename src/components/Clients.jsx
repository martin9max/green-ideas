import { clients } from '../data/content'

const rowA = clients.filter((_, i) => i % 2 === 0)
const rowB = clients.filter((_, i) => i % 2 === 1)

function Row({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-10 sm:gap-16 py-4 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="flex items-center justify-center h-16 sm:h-20 shrink-0"
          >
            <img
              src={`/logos/${c.file}`}
              alt={c.name}
              className="max-h-12 sm:max-h-14 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  )
}
