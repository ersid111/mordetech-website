'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import AnimatedCounter from '../ui/AnimatedCounter'
import { staggerContainer, cardVariant, fadeUp } from '../../lib/animations'

const quotes = [
  {
    quote:
      'MordeTech transformed our stamping line. Their AI vision system caught defects we were completely missing — our warranty claims dropped 70% in the first quarter. Delivered on time, within budget.',
    name:  'Rajesh Kulkarni',
    role:  'Plant Head',
    org:   'Tier-1 Automotive, Pune',
    icon:  '🏭',
  },
  {
    quote:
      'We migrated our 15-year-old S5 system to S7-1500 with zero downtime. What seemed impossible was handled flawlessly. The new WinCC HMI has made our operators 40% more efficient.',
    name:  'Amit Deshpande',
    role:  'Engineering Director',
    org:   'Industrial Utility, Maharashtra',
    icon:  '⚡',
  },
  {
    quote:
      'The OEE dashboard changed how we run our factory. We went from guessing at downtime causes to having real-time root cause data. OEE improved from 61% to 83% in 6 months.',
    name:  'Sneha Patil',
    role:  'VP Operations',
    org:   'Press Shop, Aurangabad',
    icon:  '📊',
  },
]

const trustStats = [
  { target: 150, suffix: '+', label: 'Plants Automated'  },
  { target: 13,  suffix: '+', label: 'Years Experience'  },
  { target: 99,  suffix: '%', label: 'Uptime SLA'        },
  { target: 3,   suffix: '',  label: 'States Served'     },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px] bg-bg"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(0,102,255,.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Client Stories</SectionLabel>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <h2 className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-4">
            In their own words.
          </h2>
          <p className="text-text2 text-[1.02rem] leading-[1.8] max-w-[480px]">
            Real plant managers, real engineering directors, real results.
          </p>
        </motion.div>

        {/* Quote cards */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
        >
          {quotes.map(({ quote, name, role, org, icon }) => (
            <motion.div
              key={name}
              variants={cardVariant}
              className="relative rounded-[20px] p-8 border border-white/[0.07] bg-white/[0.02] hover:border-cyan/25 transition-all duration-400 hover:-translate-y-2 group"
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 left-6 font-display text-[5rem] leading-none text-cyan/15 select-none pointer-events-none"
                aria-hidden
              >
                &ldquo;
              </div>

              <p className="relative text-text2 text-[0.95rem] leading-[1.85] italic mb-7 pt-4">
                {quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-[1.1rem] flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <div className="font-display font-[700] text-[0.97rem] text-white">{name}</div>
                  <div className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.06em] mt-0.5">
                    {role} · {org}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-[20px] overflow-hidden border border-white/[0.06]"
        >
          {trustStats.map(({ target, suffix, label }) => (
            <div key={label} className="bg-bg/95 px-6 py-8 text-center">
              <div className="font-display font-[900] text-[2.8rem] leading-none grad-text-cyan">
                <AnimatedCounter target={target} suffix={suffix} duration={1800} />
              </div>
              <div className="font-mono text-[0.78rem] text-muted uppercase tracking-[0.08em] mt-2">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
