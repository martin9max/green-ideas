import { Sun, PlugZap, BatteryCharging, FileCheck2 } from 'lucide-react'

const points = [
  {
    icon: Sun,
    title: 'Solarni paneli za kuću',
    body: 'Sistemi od 3 do 10 kW za domaćinstva, projektovani prema vašoj potrošnji, krovu i orijentaciji.',
  },
  {
    icon: PlugZap,
    title: 'On-grid solarni sistemi',
    body: 'Povezani na mrežu: višak struje predajete distributeru i kao kupac-proizvođač smanjujete račun.',
  },
  {
    icon: BatteryCharging,
    title: 'Off-grid sa baterijama',
    body: 'Nezavisno napajanje za vikendice, farme i objekte bez priključka na elektromrežu.',
  },
  {
    icon: FileCheck2,
    title: 'Papirologija bez brige',
    body: 'Kompletnu dokumentaciju za status kupac-proizvođač pripremamo i predajemo mi.',
  },
]

export default function SolarInfo() {
  return (
    <section id="solarni-paneli" className="relative bg-forest-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-400 mb-3">
            Solarni paneli Beograd · Srbija
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-50 tracking-tight text-balance">
            Ugradnja solarnih panela, ključ u ruke.
          </h2>
          <div className="mt-6 space-y-4 text-cream-100/75 leading-relaxed max-w-xl">
            <p>
              <strong className="text-cream-50 font-semibold">Green Ideas</strong> projektuje i
              ugrađuje solarne panele i kompletne solarne sisteme za kuće, vikendice i firme u
              Beogradu i širom Srbije. Svaki projekat počinje besplatnim obilaskom objekta i
              elaboratom koji pokazuje koliko struje vaša solarna elektrana može da proizvede i
              koliko ćete uštedeti.
            </p>
            <p>
              Biramo panele i invertere proverenih proizvođača, izvodimo montažu na crep, lim ili
              ravan krov, puštamo sistem u rad i završavamo papirologiju za status
              kupac-proizvođač. Vi samo pratite kako vam račun za struju pada i do 50%.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 gap-5">
          {points.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-2xl bg-forest-950/60 border border-cream-50/10 p-6"
            >
              <span className="h-10 w-10 flex items-center justify-center rounded-full bg-leaf-500/15 text-leaf-400 mb-4">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display font-bold text-lg text-cream-50 tracking-tight mb-2">
                {title}
              </h3>
              <p className="text-sm text-cream-100/70 leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
