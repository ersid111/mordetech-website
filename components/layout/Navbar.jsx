'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/ai-solutions', label: 'AI Solutions' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60)
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Cursor follow
  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0
    const mousemove = (e) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', mousemove)
    const cursor = document.getElementById('cursor')
    const ring   = document.getElementById('cursor-ring')
    const animate = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
      if (ring)   { ring.style.left  = rx + 'px'; ring.style.top  = ry + 'px' }
      requestAnimationFrame(animate)
    }
    animate()
    return () => document.removeEventListener('mousemove', mousemove)
  }, [])

  useEffect(() => {
    const bar = document.getElementById('progress')
    if (bar) bar.style.width = progress + '%'
  }, [progress])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? 'px-6 md:px-[60px] py-3.5 bg-bg/90 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'px-6 md:px-[60px] py-5'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo.svg"
            alt="MordeTech Logo"
            width={34}
            height={34}
            className="flex-shrink-0"
          />
          <span className="font-display font-[800] text-[1.25rem] tracking-[-0.02em] bg-grad-cyan bg-clip-text text-transparent">
            Morde<em className="not-italic" style={{ WebkitTextFillColor: '#7b2fff' }}>Tech</em>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative text-muted hover:text-cyan font-[500] text-[0.9rem] tracking-[0.06em] uppercase transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/demo"
              className="flex items-center gap-1.5 text-green font-mono text-[0.88rem] font-[500]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-blink" />
              Live Demo
            </Link>
          </li>
        </ul>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/support"
            className="text-muted hover:text-text2 text-[0.88rem] font-[500] transition-colors"
          >
            Support Plans
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-gradient-to-r from-blue to-cyan text-bg font-[700] text-[0.88rem] rounded-[10px] hover:opacity-90 transition-opacity"
          >
            Contact Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-text2 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-6 bg-text2 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-text2 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[490] bg-bg/97 backdrop-blur-2xl flex flex-col pt-24 px-8 pb-12 gap-6"
          >
            {[...links, { href: '/demo', label: 'Live Demo' }, { href: '/support', label: 'Support Plans' }].map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-2xl font-display font-[700] text-text2 hover:text-cyan transition-colors py-2"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-4 bg-gradient-to-r from-blue to-cyan text-bg font-[700] text-lg rounded-xl"
              >
                Contact Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
