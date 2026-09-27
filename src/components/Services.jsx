import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../data/content'

const swipeConfidenceThreshold = 60

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -48 : 48 }),
}

export default function Services() {
  const [[index, direction], setIndex] = useState([0, 0])

  const paginate = (dir) => {
    setIndex(([prev]) => {
      const next = (prev + dir + services.length) % services.length
      return [next, dir]
    })
  }

  const current = services[index]

  return (
    <section id="usluge" className="relative bg-forest-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-leaf-400 mb-3">
              Šta radimo
            </p>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-50 tracking-tight text-balance">
              Od proračuna do
              <br />
              uključenja u mrežu.
            </h2>
          </div>
          <p className="max-w-sm text-cream-100/70 leading-relaxed">
            Četiri koraka koja vas dele od sopstvene solarne elektrane. Svaki od njih vodimo mi,
            od prvog izlaska na teren do konačne saglasnosti distributera.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cream-100/40">
              {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Prikaži uslugu ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? '28px' : '8px',
                    backgroundColor: i === index ? '#3FA66B' : 'rgba(247,245,238,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-cream-50/10 bg-forest-950 min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -swipeConfidenceThreshold) paginate(1)
                  else if (offset.x > swipeConfidenceThreshold) paginate(-1)
                }}
                className="relative min-h-[420px] grid sm:grid-cols-[1.15fr_0.85fr] items-stretch cursor-grab active:cursor-grabbing"
              >
                <div className="relative z-10 flex flex-col justify-center p-9 sm:p-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-[2px] w-6 bg-leaf-400 rounded-full shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf-400 font-bold">
                      Korak {current.id} · {current.short}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-cream-50 tracking-tight mb-4">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-cream-100/70 max-w-lg">
                    {current.body}
                  </p>
                </div>

                <div className="relative min-h-[220px] sm:min-h-0">
                  <video
                    key={current.video}
                    src={current.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/10 to-transparent sm:from-forest-950 sm:via-forest-950/0" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              aria-label="Prethodna usluga"
              onClick={() => paginate(-1)}
              className="h-11 w-11 rounded-full flex items-center justify-center border border-cream-50/15 text-cream-100/70 transition-colors hover:border-leaf-400 hover:text-leaf-400"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Sledeća usluga"
              onClick={() => paginate(1)}
              className="h-11 w-11 rounded-full flex items-center justify-center border border-cream-50/15 text-cream-100/70 transition-colors hover:border-leaf-400 hover:text-leaf-400"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
