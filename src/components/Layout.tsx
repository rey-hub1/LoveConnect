import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

const PROGRAMMER_NAME = "Reyno Nawfal Ghaisan";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 -z-30" style={{ background: '#0e080b' }} />

      {/* Warm center orb */}
      <div
        className="fixed -z-20 animate-pulse-glow"
        style={{
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, rgba(224,122,110,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Side accent orbs */}
      <div
        className="fixed -z-20 animate-pulse-glow"
        style={{
          top: '30%',
          left: '-15%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(224,122,110,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '1s',
        }}
      />
      <div
        className="fixed -z-20 animate-pulse-glow"
        style={{
          bottom: '10%',
          right: '-15%',
          width: '45vw',
          height: '45vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(42,157,143,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '2.5s',
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,4,6,0.6) 100%)',
        }}
      />

      {/* Main */}
      <main className="flex-1 flex flex-col px-6 py-8 lg:px-16 lg:py-12 max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link to="/" className="inline-block group">
              <h1
                className="font-serif italic leading-none tracking-wide"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  fontWeight: 300,
                  background: 'linear-gradient(135deg, #c9a96e 0%, #f0e6de 45%, #e07a6e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 20px rgba(201,169,110,0.15))',
                }}
              >
                LoveConnect
              </h1>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center gap-4 mt-4 mb-3"
          >
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4))' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.5)' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(224,122,110,0.5)' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(201,169,110,0.5)' }} />
            <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.4))' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="tracking-[0.25em] uppercase text-xs md:text-sm font-medium"
            style={{ color: 'rgba(240,230,222,0.75)', letterSpacing: '0.25em' }}
          >
            The Art of Deeper Connections
          </motion.p>
        </header>

        <div className="flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderTop: '1px solid rgba(201,169,110,0.1)' }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'rgba(201,169,110,0.7)' }}>
              {PROGRAMMER_NAME}
            </p>
            <p className="text-[10px] italic" style={{ color: 'rgba(240,230,222,0.5)' }}>
              Crafted with love to create special moments between souls.
            </p>
          </div>

          <nav className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium" aria-label="Footer Navigation">
            {[
              { to: '/about', label: 'About' },
              { to: '/faq', label: 'FAQ' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="transition-colors duration-200"
                style={{
                  color: location.pathname === to
                    ? 'rgba(201,169,110,0.9)'
                    : 'rgba(240,230,222,0.3)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(201,169,110,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color = location.pathname === to ? 'rgba(201,169,110,0.9)' : 'rgba(240,230,222,0.3)')}
              >
                {label}
              </Link>
            ))}
          </nav>
        </footer>
      </main>
    </div>
  );
}
