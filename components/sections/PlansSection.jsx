'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../ui/SectionLabel'
import { staggerContainer, cardVariant, fadeUp } from '../../lib/animations'

const engagements = [
  {
    icon: '🔬',
    name: 'Automation Readiness Audit',
    pitch: 'Find ₹X in hidden savings — in 2 hours.',
    desc:
      'A focused half-day plant visit. Our engineers map your current automation state, identify the top 3 downtime causes, quantify the cost, and produce an ROI projection for each fix. No commitment required.',
    includes: [
      'On-site plant walk-through (half day)',
      'Current-state automation assessment',
      'Top 3 opportunity identification',
      'ROI projection report',
      'Technology roadmap recommendation',
    ],
    timeline: '1–2 weeks to schedule',
    cta:      'Book Free Audit',
    href:     '/contact?service=audit',
    color:    'from-blue/12 to-cyan/4',
    border:   'border-blue/20',
    featured: false,
  },
  {
    icon: '👁',
    name: 'AI Vision Package',
    pitch: 'From zero to 94% defect reduction.',
    desc:
      'Our complete computer vision QC implementation — hardware, models, PLC integration, and live dashboard. We train on your specific defect library, deploy on-premise, and don\'t leave until your numbers move.',
    includes: [
      'Defect analysis & dataset creation',
      'Custom model training (PyTorch)',
      'NVIDIA Jetson edge deployment',
      'Siemens PLC reject integration',
      'Grafana defect dashboard',
      '30-day hypercare support',
    ],
    timeline: '4–8 weeks end-to-end',
    cta:      'Get AI Vision Quote',
    href:     '/contact?service=ai-vision',
    color:    'from-cyan/12 to-blue/5',
    border:   'border-cyan/30',
    featured: true,
  },
  {
    icon: '🛡️',
    name: 'Plant Support AMC',
    pitch: 'Never fight a 2am breakdown alone.',
    desc:
      'Ongoing maintenance contracts for your PLC, SCADA, AI Vision, and IIoT systems. Three tiers — Bronze, Silver, Gold — from remote helpdesk to 4-hour emergency on-site response.',
    includes: [
      'Remote helpdesk (Mon–Sat)',
      'Quarterly preventive maintenance',
      'Software updates & backups',
      'Operator training sessions',
      '4-hour emergency on-site (Gold)',
      '24/7 remote monitoring (Gold)',
    ],
    timeline: 'Activate in 5–10 days',
    cta:      'View AMC Plans',
    href:     '/support',
    color:    'from-purple/12 to-cyan/4',
    border:   'border-purple/20',
    featured: false,
  },
]

export default function PlansSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px]"
      style={{ background: 'linear-gradient(to bottom, #020408, #040b14, #020408)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(123,47,255,.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>How We Work</SectionLabel>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <h2 className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-4">
            Engineered for your timeline.{' '}
            <span className="grad-text">Not ours.</span>
          </h2>
          <p className="text-text2 text-[1.02rem] leading-[1.8] max-w-[500px]">
            Three ways to engage — from a no-obligation audit to a full automation
            transformation. Each with clear deliverables and a defined next step.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {engagements.map(({ icon, name, pitch, desc, includes, timeline, cta, href, color, border, featured }) => (
            <motion.div
              key={name}
              variants={cardVariant}
              className={`relative rounded-[20px] bg-gradient-to-br ${color} border ${border} flex flex-col ${
                featured ? 'ring-1 ring-cyan/30 scale-[1.02]' : ''
              }`}
            >
              {featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan to-blue text-bg text-[0.72rem] font-[800] font-mono rounded-full uppercase tracking-[0.1em] whitespace-nowrap">
                  Most Requested
                </div>
              )}

              <div className="p-8 flex-1">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="font-display font-[800] text-[1.2rem] text-white mb-2">{name}</h3>
                <p className="font-mono text-[0.82rem] text-cyan mb-4 tracking-[0.04em]">{pitch}</p>
                <p className="text-muted text-[0.93rem] leading-[1.75] mb-6">{desc}</p>

                <ul className="flex flex-col gap-2.5 mb-7">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-text2 text-[0.9rem]">
                      <span className="text-cyan font-mono mt-px flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-mono text-[0.72rem] text-muted mb-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                  {timeline}
                </div>
              </div>

              <div className="p-5 border-t border-white/[0.06]">
                <Link
                  href={href}
                  className={`block w-full text-center py-3.5 rounded-[10px] font-[700] text-[0.95rem] transition-all ${
                    featured
                      ? 'bg-gradient-to-r from-blue to-cyan text-bg hover:opacity-90'
                      : 'border border-white/12 text-text2 hover:border-cyan/35 hover:text-cyan'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
