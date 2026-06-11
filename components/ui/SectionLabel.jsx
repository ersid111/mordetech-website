'use client'
import { motion } from 'framer-motion'

export default function SectionLabel({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 font-mono text-[0.72rem] tracking-[0.15em] text-cyan uppercase mb-6 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-blink" />
      {children}
    </motion.div>
  )
}
