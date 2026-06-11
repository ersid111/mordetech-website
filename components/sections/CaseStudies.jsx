'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../ui/SectionLabel'
import { staggerContainer, cardVariant, fadeUp } from '../../lib/animations'

const cases = [
  {
    industry: 'Automotive',
    client:   'Tier-1 Supplier · Pune',
    icon:     '🏭',
    hook:     'From 4% defects to 0.06%. In 3 months.',
    before:   { label: 'Defect escape rate', value: '4.0%' },
    after:    { label: 'Defect escape rate', value: '0.06%' },
    outcome:  'Warranty claims dropped 70% in Q1. System ROI achieved in 8 months.',
    tags:     ['AI Vision', 'NVIDIA Jetson', 'Siemens S7-1500'],
    href:     '/case-study-1',
    color:    'from-blue/12 to-cyan/4',
    border:   'border-blue/18',
    glow:     'rgba(0,102,255,.15)',
  },
  {
    industry: 'Manufacturing',
    client:   'Press Shop · Aurangabad',
    icon:     '⚡',
    hook:     'From 61% OEE to 83%. In 6 months.',
    before:   { label: 'Overall OEE', value: '61%' },
    after:    { label: 'Overall OEE', value: '83%' },
    outcome:  'Predictive alerts caught bearing failures 5 days early. Zero unplanned downtime in 6 months.',
    tags:     ['OPC UA', 'IIoT', 'Grafana', 'Predictive Maint.'],
    href:     '/case-study-2',
    color:    'from-cyan/10 to-purple/4',
    border:   'border-cyan/18',
    glow:     'rgba(0,212,255,.12)',
  },
  {
    industry: 'Energy & Utilities',
    client:   'Utility Plant · Maharashtra',
    icon:     '🔧',
    hook:     '15-year-old system. Zero downtime. 3 days.',
    before:   { label: 'Annual stoppages', value: '3/year' },
    after:    { label: 'Annual stoppages', value: '0/year' },
    outcome:  'S5 → S7-1500 migration with zero production loss. ₹18L/year saved.',
    tags:     ['TIA Portal', 'S7-1500', 'WinCC Unified', 'Migration'],
    href:     '/case-study-3',
    color:    'from-purple/12 to-cyan/4',
    border:   'border-purple/18',
    glow:     'rgba(123,47,255,.14)',
  },
]

function BeforeAfter({ before, after }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 rounded-lg border border-red/20 bg-red/5 px-3.5 py-2.5 text-center">
        <div className="font-mono text-[0.68rem] text-muted uppercase tracking-[0.08em] mb-1">Before</div>
        <div className="font-display text-[1.3rem] font-[800] text-[#ff6b6b]">{before.value}</div>
        <div className="font-mono text-[0.68rem] text-muted mt-0.5">{before.label}</div>
      </div>
      <div className="font-mono text-[0.88rem] text-muted">→</div>
      <div className="flex-1 rounded-lg border border-cyan/20 bg-cyan/5 px-3.5 py-2.5 text-center">
        <div className="font-mono text-[0.68rem] text-muted uppercase tracking-[0.08em] mb-1">After</div>
        <div className="font-display text-[1.3rem] font-[800] grad-text-cyan">{after.value}</div>
        <div className="font-mono text-[0.68rem] text-muted mt-0.5">{after.label}</div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px]"
      style={{ background: 'linear-gradient(to bottom, #020408, #030810, #020408)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(0,212,255,.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>Proven Results</SectionLabel>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-4">
            Three plants. <span className="grad-text">Transformed.</span>
          </h2>
          <p className="text-text2 text-[1.02rem] leading-[1.8] max-w-[520px] mb-16">
            Real projects. Verifiable numbers. Here&apos;s exactly what we delivered — and how.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {cases.map(({ industry, client, icon, hook, before, after, outcome, tags, href, color, border }) => (
            <motion.div
              key={href}
              variants={cardVariant}
              className={`relative rounded-[20px] overflow-hidden bg-gradient-to-br ${color} border ${border} group flex flex-col`}
            >
              {/* Case visual header */}
              <div
                className="px-6 pt-7 pb-5 border-b border-white/[0.05]"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, rgba(0,0,0,.3), transparent 80%)`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{icon}</span>
                  <span className="font-mono text-[0.7rem] text-muted border border-white/10 rounded-full px-3 py-1 uppercase tracking-[0.1em]">
                    {industry}
                  </span>
                </div>
                <div className="font-mono text-[0.78rem] text-muted mb-3">{client}</div>
                <h3 className="font-display font-[800] text-[1.1rem] leading-[1.3] text-white">
                  {hook}
                </h3>
              </div>

              {/* Before / After */}
              <div className="px-6">
                <BeforeAfter before={before} after={after} />
              </div>

              {/* Outcome */}
              <div className="px-6 pb-5 flex-1">
                <p className="text-muted text-[0.9rem] leading-[1.7] mb-5">{outcome}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map(t => (
                    <span
                      key={t}
                      className="font-mono text-[0.68rem] text-cyan border border-cyan/18 rounded px-2 py-1 tracking-[0.05em]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={href}
                className="block px-6 py-4 border-t border-white/[0.05] font-mono text-[0.8rem] text-cyan tracking-[0.05em] hover:bg-cyan/5 transition-colors"
              >
                Read Full Case Study →
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-text2 hover:border-cyan/40 hover:text-cyan font-[500] text-[0.95rem] rounded-[10px] transition-all"
          >
            Discuss Your Plant →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
