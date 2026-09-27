import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/content'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-cream-50 py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-500 mb-3">FAQ</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-ink-900 tracking-tight">
            Najčešća pitanja
          </h2>
        </div>

        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-display font-semibold text-lg sm:text-xl text-ink-900">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 h-9 w-9 flex items-center justify-center rounded-full border border-ink-900/15 text-ink-900 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-leaf-500 border-leaf-500 text-white' : 'group-hover:border-leaf-500'
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-ink-700 leading-relaxed max-w-2xl">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
