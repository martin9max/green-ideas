import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stats } from '../data/content'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <>
      <section className="relative bg-forest-950 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-bg.jpg"
        >
          <source src="/media/hero-bg.webm" type="video/webm" />
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/55 to-forest-950/90" />

        <div className="relative z-10 min-h-screen flex items-center py-28">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl mx-auto w-full px-5 sm:px-8 flex flex-col items-center text-center gap-6"
          >
            <motion.p
              variants={item}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-leaf-400"
            >
              On-grid i off-grid solarni sistemi
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-extrabold text-cream-50 leading-[1.05] tracking-tight text-balance"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Green Ideas</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2">
                Sunce plaća <span className="text-gold-400">vaš račun.</span>
              </span>
            </motion.h1>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-cream-100/60"
            >
              <span>On-grid</span>
              <span className="text-leaf-400">·</span>
              <span>Off-grid</span>
              <span className="text-leaf-400">·</span>
              <span>Konsultantske usluge</span>
              <span className="text-leaf-400">·</span>
              <span>Tehničke usluge</span>
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-xl text-cream-100/90 text-base sm:text-lg leading-relaxed"
            >
              Analiza, nabavka, ugradnja i papirologija za status kupac-proizvođač, sve na jednom mestu,
              ključ u ruke, sa uštedom na računu i do 50%.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#kalkulator"
                className="group inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 text-ink-900 font-semibold px-6 py-3.5 transition-colors"
              >
                Izračunajte uštedu
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 hover:border-cream-50/60 text-cream-50 font-semibold px-6 py-3.5 transition-colors"
              >
                Zatražite ponudu
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="relative bg-forest-950 border-t border-cream-50/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-cream-50/10">
          {stats.map((s) => (
            <div key={s.label} className="py-5 px-4 first:pl-0">
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-cream-50">
                {s.value}
                <span className="text-gold-400 text-lg align-top ml-0.5">{s.unit}</span>
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wide text-cream-100/60 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
