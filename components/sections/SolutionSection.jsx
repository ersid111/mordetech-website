'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import SectionLabel from '../ui/SectionLabel'
import { fadeUp, slideLeft, slideRight, staggerContainer, cardVariant } from '../../lib/animations'

const pillars = [
  {
    icon: '👁',
    title: 'AI Vision QC',
    desc: 'Eyes that never blink. Deep learning models running at line speed — 94%+ defect reduction from day one.',
    tag: 'PyTorch · NVIDIA Jetson · OpenCV',
    color: 'from-blue/15 to-cyan/5',
    border: 'border-blue/20',
  },
  {
    icon: '⚡',
    title: 'Smart Automation',
    desc: 'Reflexes in milliseconds. Siemens TIA Portal + SCADA systems that react before humans can see the problem.',
    tag: 'Siemens S7-1500 · WinCC · OPC UA',
    color: 'from-cyan/10 to-blue/5',
    border: 'border-cyan/20',
  },
  {
    icon: '🌐',
    title: 'IIoT Intelligence',
    desc: 'Your factory, live. Real-time OEE dashboards, predictive maintenance, and data that\'s always current.',
    tag: 'MQTT · Grafana · InfluxDB · Edge AI',
    color: 'from-purple/15 to-cyan/5',
    border: 'border-purple/20',
  },
]

const differentiators = [
  { text: 'Not a system integrator that installs and disappears.' },
  { text: 'Not an AI startup that doesn\'t know a PLC from a HMI.' },
  { text: 'We sit at the intersection of deep OT expertise and modern AI.' },
  { text: 'We don\'t leave until your numbers move.' },
]

export default function SolutionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px] overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #020408, #030810 50%, #020408)',
      }}
    >
      {/* Cyan glow — hope / solution color temperature */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,100,200,.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>The MordeTech Way</SectionLabel>

        {/* Two-column: copy left, tree right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2 className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-6">
              We built a different kind of{' '}
              <span className="grad-text">automation company.</span>
            </h2>

            <div className="flex flex-col gap-4 mb-10">
              {differentiators.map(({ text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                  <p className="text-text2 text-[1rem] leading-[1.7]">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="border-l-2 border-cyan pl-5 py-1"
            >
              <p className="text-text2 italic text-[0.98rem] leading-[1.75]">
                &ldquo;13 years building automation systems for Indian manufacturers. AI-augmented.
                OT-native. We speak your plant floor language — and your CFO&apos;s.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[0.78rem] text-muted tracking-[0.06em] uppercase">
                — Priyanka Morde, Founder & Director
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Circuit tree (scaled down for solution section) */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[300px] h-[300px] opacity-80">
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: '50%', left: '50%', width: 180, height: 180,
                  background: 'radial-gradient(circle,rgba(0,212,255,.18) 0%,rgba(0,102,255,.08) 45%,transparent 70%)',
                  filter: 'blur(24px)',
                  transform: 'translate(-50%,-50%)',
                  animation: 'orb 4s ease-in-out infinite',
                }}
              />
              <div
                className="absolute rounded-full animate-ringCW"
                style={{ top:'50%',left:'50%', width:290,height:290,
                  border:'1px dashed rgba(0,212,255,.12)',
                  transform:'translate(-50%,-50%)' }}
              />
              <div
                className="absolute rounded-full animate-ringCCW"
                style={{ top:'50%',left:'50%', width:210,height:210,
                  border:'1px solid rgba(0,102,255,.18)',
                  transform:'translate(-50%,-50%)' }}
              />
              <div className="absolute" style={{ top:'50%',left:'50%', width:156,height:156, transform:'translate(-50%,-50%)' }}>
                <Image src="/images/logo.svg" alt="MordeTech" fill style={{ objectFit:'contain' }} className="animate-treeGlow" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Three pillars */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {pillars.map(({ icon, title, desc, tag, color, border }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              className={`relative rounded-[20px] p-8 bg-gradient-to-br ${color} border ${border} group transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,.4)]`}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(0,212,255,.4),transparent)' }}
              />
              <div className="text-3xl mb-5">{icon}</div>
              <h3 className="font-display font-[700] text-[1.15rem] text-white mb-3">{title}</h3>
              <p className="text-muted text-[0.95rem] leading-[1.75] mb-5">{desc}</p>
              <div className="inline-block font-mono text-[0.72rem] text-cyan border border-cyan/20 rounded px-2.5 py-1 tracking-[0.05em]">
                {tag}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
