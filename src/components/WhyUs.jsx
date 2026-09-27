import { motion } from 'framer-motion'
import { Lightbulb, Wrench } from 'lucide-react'

const cards = [
  {
    icon: Lightbulb,
    title: 'Prilagođena tehnička rešenja',
    body:
      'Razvijamo inovativna i prilagođena tehnička rešenja koja odgovaraju specifičnim potrebama svakog klijenta.',
  },
  {
    icon: Wrench,
    title: 'Stručna rešenja za vaše potrebe',
    body:
      'Pružamo širok spektar inženjerskih i konsultantskih usluga prilagođenih specifičnim zahtevima vašeg poslovanja.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhyUs() {
  return (
    <section id="pristup" className="relative bg-forest-950 py-24 sm:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(closest-side, #3FA66B, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-400 mb-3">
            Naš pristup
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-50 tracking-tight text-balance">
            Zašto klijenti biraju Green Ideas
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid sm:grid-cols-2 gap-6 sm:gap-8"
        >
          {cards.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative rounded-3xl border border-cream-50/10 bg-forest-900 p-8 sm:p-10 flex flex-col gap-8 overflow-hidden transition-colors duration-300 hover:border-leaf-400/40"
            >
              <div
                className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                style={{ background: 'radial-gradient(closest-side, #3FA66B, transparent)' }}
              />

              <motion.div
                whileHover={{ rotate: -8, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="relative z-10 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-leaf-500 to-leaf-400 shadow-lg shadow-leaf-500/20"
              >
                <Icon size={26} className="text-forest-950" strokeWidth={2.2} />
              </motion.div>

              <div className="relative z-10">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-cream-50 tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-cream-100/70">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
