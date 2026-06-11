'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SectionLabel from '../ui/SectionLabel'
import { fadeUp, slideLeft, slideRight } from '../../lib/animations'

function useCyclingCounter(base, variance, interval = 2800) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * variance)
    }, interval)
    return () => clearInterval(id)
  }, [base, variance, interval])
  return value
}

function LiveDashboard() {
  const oee = useCyclingCounter(94.7, 1.2, 3200)
  const defects = useCyclingCounter(0.018, 0.008, 2500)
  const uptime = useCyclingCounter(99.6, 0.3, 4000)
  const throughput = useCyclingCounter(1247, 30, 2000)

  const machines = [
    { name: 'Line A — Stamping', status: 'running', oee: 96.2 },
    { name: 'Line B — Assembly', status: 'running', oee: 92.8 },
    { name: 'Line C — Paint',    status: 'warning',  oee: 84.1 },
    { name: 'Line D — Final QC', status: 'running', oee: 98.4 },
  ]

  const statusColor = {
    running: '#00ff88',
    warning: '#ffb347',
    fault:   '#ff4d4d',
  }

  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      {/* Dashboard header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-blink" />
          <span className="font-mono text-[0.75rem] text-green tracking-[0.1em] uppercase">
            Live — MordeTech IIoT Dashboard
          </span>
        </div>
        <span className="font-mono text-[0.72rem] text-muted">
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
        {[
          { label: 'OEE', value: oee.toFixed(1) + '%', good: oee > 90 },
          { label: 'AI Defect Rate', value: defects.toFixed(3) + '%', good: defects < 0.05 },
          { label: 'Uptime', value: uptime.toFixed(1) + '%', good: uptime > 99 },
          { label: 'Throughput', value: throughput.toFixed(0) + '/hr', good: true },
        ].map(({ label, value, good }) => (
          <div key={label} className="px-5 py-4 bg-bg/80">
            <div className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.08em] mb-1.5">{label}</div>
            <div className={`font-display font-[800] text-[1.6rem] leading-none ${good ? 'text-cyan' : 'text-red'} tabular-nums`}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Machine status */}
      <div className="p-5">
        <div className="font-mono text-[0.72rem] text-muted uppercase tracking-[0.1em] mb-3">
          Machine Status
        </div>
        <div className="flex flex-col gap-2.5">
          {machines.map(({ name, status, oee: mOee }) => (
            <div key={name} className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: statusColor[status], boxShadow: `0 0 6px ${statusColor[status]}` }}
              />
              <span className="text-text2 text-[0.88rem] flex-1 truncate">{name}</span>
              {/* OEE bar */}
              <div className="w-24 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: mOee + '%',
                    background: mOee > 90 ? '#00d4ff' : mOee > 80 ? '#ffb347' : '#ff4d4d',
                  }}
                />
              </div>
              <span className="font-mono text-[0.78rem] text-muted w-14 text-right">{mOee.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom alert */}
      <div className="px-5 py-3.5 border-t border-white/[0.06] flex items-center gap-2.5 bg-white/[0.01]">
        <span className="text-[0.75rem]">⚠️</span>
        <span className="font-mono text-[0.75rem] text-[#ffb347]">
          Line C bearing temperature +12°C above baseline — maintenance in 5 days
        </span>
      </div>
    </div>
  )
}

export default function DemoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-[110px] px-6 md:px-[60px] overflow-hidden bg-bg"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,50,120,.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>See It Work</SectionLabel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h2 className="font-display font-[800] text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] mb-6">
              A factory running on{' '}
              <span className="grad-text">MordeTech intelligence.</span>
            </h2>
            <p className="text-text2 text-[1.02rem] leading-[1.8] mb-8">
              This is what your operators would see, live, on any device. Real OEE
              numbers. Real defect rates. Real predictive alerts — 5 days before the
              bearing fails, not 5 minutes after.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: '📊', text: 'OEE tracked live across every machine, every shift' },
                { icon: '🔍', text: 'AI defect detection at <8ms latency, 99.8%+ accuracy' },
                { icon: '🔔', text: 'Predictive alerts pushed to WhatsApp and email' },
                { icon: '📈', text: 'Root cause analysis — see WHY OEE dropped, not just that it did' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">{icon}</span>
                  <span className="text-text2 text-[0.97rem] leading-[1.65]">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="px-7 py-3.5 bg-gradient-to-r from-blue to-cyan text-bg font-[700] text-[0.95rem] rounded-[10px] hover:opacity-90 transition-opacity"
              >
                Explore Full Demo
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 border border-white/10 text-text2 hover:border-cyan/40 hover:text-cyan font-[500] text-[0.95rem] rounded-[10px] transition-all"
              >
                Request a Live Pilot
              </Link>
            </div>
          </motion.div>

          {/* Right dashboard */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <LiveDashboard />
            <p className="mt-3 font-mono text-[0.72rem] text-muted text-center tracking-[0.06em]">
              Simulated data based on real MordeTech deployment metrics
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
