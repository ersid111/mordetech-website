'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import { staggerContainer, cardVariant, fadeUp } from '../../lib/animations'

const pains = [
  {
    icon: '🩸',
    stat: '3–5%',
    statLabel: 'defect escape rate',
    title: 'Defects that reach your customer.',
    body:
      'Manual QC misses 3–5% of defects. They travel through your supply chain, reach the end customer, and return as warranty claims, production stoppages, and lost contracts. The damage compounds quietly — until it doesn\'t.',
    glow: 'rgba(255,77,77,.12)',
    border: 'rgba(255,77,77,.2)',
  },
  {
    icon: '📞',
    stat: '₹4–10L',
    statLabel: 'per breakdown event',
    title: 'The 2am phone call.',
    body:
      'A machine fails. You call the maintenance team. By the time the part arrives and the line restarts, you\'ve lost a full shift. Reactive maintenance costs 3–5× more than prevention. And it happens again next quarter.',
    glow: 'rgba(255,165,0,.1)',
    border: 'rgba(255,165,0,.2)',
  },
  {
    icon: '📋',
    stat: '72 hrs',
    statLabel: 'average decision lag',
    title: 'Managing a live factory with dead data.',
    body:
      'Your SCADA shows yesterday. Your Excel sheet shows last week. You\'re making critical production decisions based on information that\'s already stale. By the time you see the problem, it\'s already a crisis.',
    glow: 'rgba(123,47,255,.12)',
    border: 'rgba(123,47,255,.2)',
  },
]

export default function ProblemSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px] overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #020408 0%, #06030a 50%, #020408 100%)',
      }}
    >
      {/* Subtle red tint to this section — "wound" color temperature */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(255,50,50,.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>The Real Cost</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-6 max-w-[600px]"
        >
          Old factories die from{' '}
          <span className="grad-text">a thousand small cuts.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="text-text2 text-[1.02rem] leading-[1.8] max-w-[540px] mb-16"
        >
          Every manufacturer knows the symptoms. Most never connect them to the real
          cause: an automation stack that was built for the 1990s, running a 2020s
          factory.
        </motion.p>

        {/* Pain cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {pains.map(({ icon, stat, statLabel, title, body, glow, border }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className="relative rounded-[20px] p-8 overflow-hidden group transition-transform duration-400 hover:-translate-y-2"
              style={{
                background: `radial-gradient(ellipse at 0% 0%, ${glow}, rgba(255,255,255,0.02) 60%)`,
                border: `1px solid ${border}`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${border.replace('.2', '.6')}, transparent)`,
                }}
              />

              <div className="text-3xl mb-5">{icon}</div>

              {/* Stat */}
              <div className="mb-5">
                <span className="font-display text-[2.4rem] font-[900] leading-none" style={{ color: '#ff6b6b' }}>
                  {stat}
                </span>
                <span className="block font-mono text-[0.75rem] text-muted tracking-[0.08em] uppercase mt-1">
                  {statLabel}
                </span>
              </div>

              <h3 className="font-display font-[700] text-[1.1rem] text-white mb-3 leading-[1.35]">
                {title}
              </h3>
              <p className="text-muted text-[0.95rem] leading-[1.75]">{body}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bridge to solution */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="font-mono text-[0.8rem] text-muted tracking-[0.1em] uppercase">
            There is a better way
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
