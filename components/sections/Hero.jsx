'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Live loss counter — ₹18,000/hr = ₹5/sec.
// Shows how much a typical plant loses while the visitor reads.
function LossCounter() {
  const [rupees, setRupees] = useState(0)
  const start = useRef(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - start.current) / 1000
      setRupees(Math.floor(elapsed * 5))
    }, 250)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.7 }}
      className="inline-flex flex-col gap-1 px-5 py-3 rounded-xl border border-red/25 bg-red/5 backdrop-blur-sm mb-8"
    >
      <span className="font-mono text-[0.72rem] text-red/80 tracking-[0.12em] uppercase">
        While you&apos;ve been on this page
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl font-[800] text-red tabular-nums">
          ₹{rupees.toLocaleString('en-IN')}
        </span>
        <span className="font-mono text-[0.78rem] text-red/60">lost to downtime</span>
      </div>
    </motion.div>
  )
}

// Circuit tree — brand identity as hero visual
function CircuitTree() {
  const chips = [
    { label: 'PLC',      cls: 'n1' },
    { label: 'AI Vision',cls: 'n2' },
    { label: 'SCADA',    cls: 'n3' },
    { label: 'IIoT',     cls: 'n4' },
    { label: 'OPC UA',   cls: 'n5' },
  ]
  const particles = [
    { size: 4, left: '34%', color: '#00d4ff', dur: '3.2s', delay: '.2s' },
    { size: 3, left: '52%', color: '#0066ff', dur: '3.9s', delay: '1.1s' },
    { size: 5, left: '64%', color: '#7b2fff', dur: '4.3s', delay: '1.8s' },
    { size: 3, left: '44%', color: '#00ff88', dur: '2.8s', delay: '2.5s' },
    { size: 4, left: '58%', color: '#00d4ff', dur: '3.6s', delay: '.6s' },
  ]

  return (
    <div className="relative w-[390px] h-[390px] flex-shrink-0">
      {/* Glow orb */}
      <div
        className="absolute rounded-full pointer-events-none animate-orb"
        style={{
          top: '50%', left: '50%',
          width: 230, height: 230,
          background: 'radial-gradient(circle,rgba(0,212,255,.22) 0%,rgba(0,102,255,.1) 45%,transparent 70%)',
          filter: 'blur(30px)',
          transform: 'translate(-50%,-50%)',
        }}
      />
      {/* Rings */}
      <div
        className="absolute rounded-full animate-ringCW"
        style={{ top:'50%',left:'50%', width:370,height:370,
          border:'1px dashed rgba(0,212,255,.1)',
          transform:'translate(-50%,-50%)' }}
      />
      <div
        className="absolute rounded-full animate-ringCCW"
        style={{ top:'50%',left:'50%', width:268,height:268,
          border:'1px solid rgba(0,102,255,.16)',
          transform:'translate(-50%,-50%)' }}
      />
      {/* Logo */}
      <div className="absolute" style={{ top:'50%',left:'50%', width:204,height:204, transform:'translate(-50%,-50%)' }}>
        <Image
          src="/images/logo.svg"
          alt="MordeTech Circuit Tree"
          fill
          className="animate-treeGlow"
          style={{ objectFit:'contain' }}
        />
      </div>
      {/* Orbiting chips */}
      {chips.map(({ label, cls }) => (
        <div key={label} className={`k-node ${cls}`}>
          <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-cyan/25 bg-bg/90 font-mono text-[0.68rem] text-cyan tracking-[0.05em] backdrop-blur-lg shadow-[0_0_8px_rgba(0,212,255,.12)] whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
      {/* Rising particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bottom-5 animate-kRise"
            style={{
              width: p.size, height: p.size,
              left: p.left,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
      {/* Floating metric cards */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[8%] right-[-8%] animate-float" style={{ animationDelay: '0s' }}>
          <MetricCard label="OPC UA" value="LIVE" />
        </div>
        <div className="absolute bottom-[12%] left-[-14%] animate-float" style={{ animationDelay: '1.2s' }}>
          <MetricCard label="AI Defect Rate" value="0.02%" />
        </div>
        <div className="absolute top-[55%] right-[-10%] animate-float" style={{ animationDelay: '2.2s' }}>
          <MetricCard label="OEE" value="94.7%" />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="px-3.5 py-2.5 rounded-[10px] border border-white/[0.07] bg-white/[0.03] backdrop-blur-lg font-mono text-[0.85rem] text-muted whitespace-nowrap">
      {label}: <span className="text-cyan font-[500]">{value}</span>
    </div>
  )
}

export default function Hero() {
  const words = ['Intelligent Automation', 'Smart Factories', 'AI-Driven Quality', 'Industry 4.0']
  const [wi, setWi] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[wi]
    const delay = del ? 55 : 110
    const timer = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          setTimeout(() => setDel(true), 2200)
        }
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setDel(false)
          setWi((wi + 1) % words.length)
        }
      }
    }, delay)
    return () => clearTimeout(timer)
  })

  return (
    <section className="relative min-h-screen flex items-center pt-[140px] pb-[80px] px-6 md:px-[60px] overflow-hidden bg-bg bg-grid">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,102,255,.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — Story copy */}
        <div>
          {/* Industry tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 font-mono text-[0.72rem] text-cyan tracking-[0.15em] uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
            Industry 4.0 Solutions · Pune, India
          </motion.div>

          {/* Loss counter — the hook */}
          <LossCounter />

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-[800] leading-[1.0] tracking-[-0.04em] text-[clamp(2.8rem,5vw,4.6rem)] mb-5"
          >
            AI that sees<br />
            <span className="grad-text">
              {text}
              <span className="inline-block w-0.5 h-[0.85em] bg-cyan ml-1 animate-blink align-middle" />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-text2 text-[1.05rem] leading-[1.75] max-w-[480px] mb-10"
          >
            Where <strong className="text-white font-[600]">PLC meets AI.</strong> MordeTech delivers
            world-class Siemens automation, machine vision, and smart factory systems — for
            manufacturers who refuse to lose.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue to-cyan text-bg font-[700] text-[0.97rem] rounded-[10px] hover:opacity-90 transition-opacity"
            >
              Show Me My Plant&apos;s Potential
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border border-white/10 text-text2 hover:border-cyan/40 hover:text-cyan font-[500] text-[0.97rem] rounded-[10px] transition-all"
            >
              ▶ Watch Live Demo
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-wrap gap-0 pt-8 border-t border-white/[0.06]"
          >
            {[
              { num: '150+', lbl: 'Projects Delivered' },
              { num: '13+',  lbl: 'Years Experience'   },
              { num: '99%',  lbl: 'Uptime SLA'         },
              { num: '40%',  lbl: 'Avg Cost Reduction'  },
            ].map(({ num, lbl }, i) => (
              <div
                key={lbl}
                className={`pr-8 mr-8 ${i < 3 ? 'border-r border-white/[0.06]' : ''}`}
              >
                <div className="font-display text-[2rem] font-[800] leading-none grad-text-cyan">{num}</div>
                <div className="font-mono text-[0.78rem] text-muted uppercase tracking-[0.06em] mt-1.5">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Circuit tree animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex items-center justify-center"
        >
          <CircuitTree />
        </motion.div>
      </div>
    </section>
  )
}
