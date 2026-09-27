import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, MapPin } from 'lucide-react'

const ROOF_TYPES = ['Crep', 'Lim', 'Ravan/drugi']

// EPS tarifne zone (mesečno, cena aktivne energije sa PDV-om, bez fiksnih naknada
// za prenos/distribuciju). Zelena 0-350 kWh, plava 350-1.200 kWh, crvena preko 1.200 kWh.
const EPS_TIERS = [
  { limit: 350, pricePerKwh: 8.65 },
  { limit: 1200, pricePerKwh: 12.98 },
  { limit: Infinity, pricePerKwh: 25.96 },
]

function billForConsumption(kwh) {
  let remaining = kwh
  let prevLimit = 0
  let total = 0
  for (const tier of EPS_TIERS) {
    const tierSpan = tier.limit - prevLimit
    const consumedInTier = Math.min(Math.max(remaining, 0), tierSpan)
    total += consumedInTier * tier.pricePerKwh
    remaining -= consumedInTier
    prevLimit = tier.limit
    if (remaining <= 0) break
  }
  return total
}

// Okvirna regionalna razlika u insolaciji unutar Srbije (jug/istok dobija primetno
// više sunčanih sati godišnje od severa). Baza je "centralna" = 1.0.
const REGION_MULTIPLIER = { vojvodina: 0.95, centralna: 1.0, juznoistocna: 1.08 }
const REGION_LABEL = {
  vojvodina: 'Vojvodina — nešto niža insolacija',
  centralna: 'centralna Srbija — prosečna insolacija',
  juznoistocna: 'jug/istok Srbije — viša insolacija',
}

const CITY_REGION = {
  'novi sad': 'vojvodina', subotica: 'vojvodina', zrenjanin: 'vojvodina',
  pancevo: 'vojvodina', sombor: 'vojvodina', kikinda: 'vojvodina', vrsac: 'vojvodina',
  'sremska mitrovica': 'vojvodina', 'backa palanka': 'vojvodina', ruma: 'vojvodina',
  vrbas: 'vojvodina', indjija: 'vojvodina', senta: 'vojvodina', apatin: 'vojvodina',
  'backa topola': 'vojvodina',
  nis: 'juznoistocna', vranje: 'juznoistocna', leskovac: 'juznoistocna',
  pirot: 'juznoistocna', negotin: 'juznoistocna', zajecar: 'juznoistocna',
  bor: 'juznoistocna', prokuplje: 'juznoistocna', vlasotince: 'juznoistocna',
  knjazevac: 'juznoistocna', surdulica: 'juznoistocna', dimitrovgrad: 'juznoistocna',
}

function normalizeCity(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'dj')
}

function regionFor(cityInput) {
  return CITY_REGION[normalizeCity(cityInput)] || (cityInput.trim() ? 'centralna' : null)
}

// Tip krova: ravan krov dozvoljava optimalan nagib/orijentaciju bez obzira na
// orijentaciju same zgrade, pa nosi blagi bonus u proizvodnji.
const ROOF_MULTIPLIER = { Crep: 1.0, Lim: 1.0, 'Ravan/drugi': 1.05 }

const BASE_KWH_PER_KWP_MONTH = 100 // ~1.200 kWh/kWp godišnje, konzervativan prosek za Srbiju
const EUR_TO_RSD = 117.3
const CO2_KG_PER_KWH = 0.67 // prosečan intenzitet CO2 srpske elektro-mreže

export default function Calculator() {
  const [kwh, setKwh] = useState(450)
  const [roof, setRoof] = useState(ROOF_TYPES[0])
  const [city, setCity] = useState('')

  const detectedRegion = useMemo(() => regionFor(city), [city])

  const { kwp, savingsPct, savingsRsd, panels, priceEur, paybackYears, co2Kg } = useMemo(() => {
    const regionMultiplier = REGION_MULTIPLIER[detectedRegion || 'centralna']
    const roofMultiplier = ROOF_MULTIPLIER[roof] ?? 1.0

    const kwpRaw = kwh / BASE_KWH_PER_KWP_MONTH
    const kwpClamped = Math.min(Math.max(kwpRaw, 3), 10)
    const monthlyProduction = kwpClamped * BASE_KWH_PER_KWP_MONTH * regionMultiplier * roofMultiplier
    const remainingConsumption = Math.max(0, kwh - monthlyProduction)

    const oldBill = billForConsumption(kwh)
    const newBill = billForConsumption(remainingConsumption)
    const pct = oldBill > 0 ? Math.round(((oldBill - newBill) / oldBill) * 100) : 0
    const monthlySavingsRsd = Math.round(oldBill - newBill)
    const panelCount = Math.round((kwpClamped * 1000) / 450)

    // Cena po kWp opada sa veličinom sistema (ekonomija obima): ~1.100 €/kWp na 3kWp
    // do ~780 €/kWp na 10kWp, u skladu sa aktuelnim tržišnim rasponom u Srbiji.
    const pricePerKwp = 1100 - ((kwpClamped - 3) / 7) * 320
    const priceEurValue = Math.round(kwpClamped * pricePerKwp)

    const annualSavingsEur = (monthlySavingsRsd * 12) / EUR_TO_RSD
    const paybackYearsValue = annualSavingsEur > 0 ? priceEurValue / annualSavingsEur : 0

    const annualProductionKwh = monthlyProduction * 12
    const co2KgValue = Math.round(annualProductionKwh * CO2_KG_PER_KWH)

    return {
      kwp: kwpClamped.toFixed(1),
      savingsPct: pct,
      savingsRsd: monthlySavingsRsd,
      panels: panelCount,
      priceEur: priceEurValue,
      paybackYears: paybackYearsValue.toFixed(1),
      co2Kg: co2KgValue,
    }
  }, [kwh, roof, detectedRegion])

  return (
    <section id="kalkulator" className="bg-forest-950 py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(247,245,238,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,238,.6) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-400 mb-3">
            Brza procena
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-50 tracking-tight text-balance">
            Koliko sistema
            <br /> vama treba?
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-leaf-500/20 bg-forest-900/60 backdrop-blur-sm p-6 sm:p-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-7">
              <div>
                <label className="flex items-center justify-between text-cream-100/70 text-sm mb-2">
                  <span>Prosečna mesečna potrošnja</span>
                  <span className="font-mono text-gold-400">{kwh} kWh</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="10"
                  value={kwh}
                  onChange={(e) => setKwh(Number(e.target.value))}
                  className="w-full accent-leaf-500"
                />
              </div>

              <div>
                <span className="block text-cream-100/70 text-sm mb-2">Tip krova</span>
                <div className="flex flex-wrap gap-2">
                  {ROOF_TYPES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoof(r)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        roof === r
                          ? 'bg-leaf-500 border-leaf-500 text-forest-950'
                          : 'border-cream-50/20 text-cream-100/80 hover:border-cream-50/40'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-cream-100/70 text-sm mb-2" htmlFor="city">
                  Grad objekta
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="npr. Negotin"
                  className="w-full rounded-xl bg-forest-950/60 border border-cream-50/15 text-cream-50 placeholder:text-cream-100/30 px-4 py-3 outline-none focus:border-leaf-500 transition-colors"
                />
                {detectedRegion && (
                  <p className="flex items-center gap-1.5 mt-2 text-xs text-leaf-400">
                    <MapPin size={12} />
                    {REGION_LABEL[detectedRegion]}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-forest-950 border border-leaf-500/30 p-6 sm:p-8 font-mono flex flex-col justify-between">
              <div className="flex items-center gap-2 text-leaf-400 text-xs tracking-widest uppercase mb-6">
                <Zap size={14} className="fill-leaf-400" />
                Procena sistema
              </div>

              <div className="space-y-4">
                <ReadoutRow label="Preporučena snaga" value={kwp} unit="kWp" />
                <ReadoutRow label="Ušteda mesečno" value={savingsRsd.toLocaleString('sr-RS')} unit="din" accent />
                <ReadoutRow label="Procenjena ušteda" value={savingsPct} unit="%" accent />
                <ReadoutRow label="Period povraćaja" value={paybackYears} unit="god." />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-cream-50/10">
                <MiniStat label="Panela" value={panels} />
                <MiniStat label="Cena (okvirno)" value={`~${priceEur.toLocaleString('sr-RS')}€`} />
                <MiniStat label="CO₂ / god." value={`${(co2Kg / 1000).toFixed(1)}t`} />
              </div>

              <a
                href="#kontakt"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 text-ink-900 font-sans font-semibold px-5 py-3 transition-colors"
              >
                Pošaljite ovaj upit
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <p className="text-cream-100/40 text-xs mt-8 leading-relaxed">
            * Procena je zasnovana na aktuelnim tarifnim zonama Elektroprivrede Srbije (zelena do 350 kWh,
            plava 350-1.200 kWh, crvena preko 1.200 kWh), proseku insolacije po regionima Srbije, tipu krova
            i tržišnom rasponu cena solarnih sistema ključ u ruke (bez državne subvencije, koja može pokriti
            do 50% troška, maksimalno 420.000 RSD, kroz opštinske javne pozive Ministarstva rudarstva i
            energetike). CO₂ ušteda računata je po proseku emisija srpske elektro-mreže. Konačan proračun
            radimo u besplatnom elaboratu, na osnovu vašeg stvarnog računa i obilaska objekta.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ReadoutRow({ label, value, unit, accent }) {
  return (
    <div className="flex items-baseline justify-between border-b border-cream-50/10 pb-3">
      <span className="text-cream-100/60 text-xs tracking-wide uppercase">{label}</span>
      <span className={`text-2xl font-semibold ${accent ? 'text-gold-400' : 'text-cream-50'}`}>
        {value}
        <span className="text-sm text-cream-100/50 ml-1">{unit}</span>
      </span>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-cream-50 text-sm font-semibold">{value}</div>
      <div className="text-cream-100/50 text-[10px] uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  )
}
