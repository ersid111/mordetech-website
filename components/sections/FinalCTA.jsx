'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import AnimatedCounter from '../ui/AnimatedCounter'
import { fadeUp, staggerContainer } from '../../lib/animations'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[120px] px-6 md:px-[60px] overflow-hidden"
      style={{ background: '#020408' }}
    >
      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,80,160,.1) 0%, rgba(123,47,255,.06) 40%, transparent 70%)',
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-[800px] mx-auto text-center">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 font-mono text-[0.72rem] text-cyan tracking-[0.15em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
            Your move
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display font-[900] text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.0] tracking-[-0.04em] mb-6"
          >
            Your competition<br />
            <span className="grad-text">isn&apos;t waiting.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-text2 text-[1.08rem] leading-[1.8] max-w-[560px] mx-auto mb-12"
          >
            Every day without AI vision, predictive maintenance, or real-time OEE costs more
            than the system would. Let&apos;s find out exactly how much — in a free,
            no-obligation, 2-hour plant assessment.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/contact"
              className="px-9 py-5 bg-gradient-to-r from-blue to-cyan text-bg font-[800] text-[1.05rem] rounded-[12px] hover:opacity-90 transition-opacity shadow-[0_0_40px_rgba(0,102,255,.3)]"
            >
              Schedule Free Plant Assessment
            </Link>
            <a
              href="https://wa.me/919404030215?text=Hi%2C%20I%20want%20to%20book%20a%20free%20plant%20assessment."
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-5 bg-[#25D366] text-white font-[700] text-[1.05rem] rounded-[12px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(37,211,102,.25)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us Now
            </a>
          </motion.div>

          {/* Social proof counter */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { target: 150, suffix: '+', label: 'plants automated' },
              { target: 13,  suffix: '+', label: 'years experience'  },
              { target: 99,  suffix: '%', label: 'uptime SLA'       },
            ].map(({ target, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="font-display font-[800] text-[2rem] grad-text-cyan">
                  <AnimatedCounter target={target} suffix={suffix} duration={1600} />
                </div>
                <div className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.08em] mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-10 font-mono text-[0.78rem] text-muted tracking-[0.05em]"
          >
            Response within 2 business hours &nbsp;·&nbsp; No obligation &nbsp;·&nbsp; Free plant assessment
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
