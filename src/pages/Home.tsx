/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Moon,
  Stars,
  MessageCircle,
  Sparkles,
  User,
  Users,
  Swords,
  Trophy,
  Home as HomeIcon,
  Flame,
  Flower2,
  ArrowRight,
  RotateCcw,
  Pin,
} from 'lucide-react';
import { casualQuestions } from '../data/casualQuestions';
import { deepQuestions } from '../data/deepQuestions';
import { versusQuestions, VersusQuestion } from '../data/versusQuestions';
import { marriedQuestions } from '../data/marriedQuestions';
import { boysGangQuestions } from '../data/boysGangQuestions';
import { girlsGangQuestions } from '../data/girlsGangQuestions';
import { familyQuestions } from '../data/familyQuestions';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

type Mode = 'casual' | 'deep' | 'versus' | 'married' | 'boysgang' | 'girlsgang' | 'family';

interface ModeConfig {
  key: Mode;
  label: string;
  tagline: string;
  desc: string;
  color: string;
  colorRgb: string;
  icon: React.ReactNode;
  bgIcon: React.ReactNode;
  ctaLabel: string;
}

const MODE_VISUALS: Record<Mode, Pick<ModeConfig, 'color' | 'colorRgb' | 'icon' | 'bgIcon'>> = {
  casual: {
    color: '#e07a6e',
    colorRgb: '224,122,110',
    icon: <Heart size={36} fill="currentColor" />,
    bgIcon: <Heart size={140} strokeWidth={0.5} />,
  },
  deep: {
    color: '#2a9d8f',
    colorRgb: '42,157,143',
    icon: <Moon size={36} fill="currentColor" />,
    bgIcon: <MessageCircle size={140} strokeWidth={0.5} />,
  },
  versus: {
    color: '#c9a96e',
    colorRgb: '201,169,110',
    icon: <Swords size={36} />,
    bgIcon: <Trophy size={140} strokeWidth={0.5} />,
  },
  married: {
    color: '#9b72cf',
    colorRgb: '155,114,207',
    icon: <HomeIcon size={36} />,
    bgIcon: <Heart size={140} strokeWidth={0.5} />,
  },
  boysgang: {
    color: '#d4914a',
    colorRgb: '212,145,74',
    icon: <Flame size={36} />,
    bgIcon: <Flame size={140} strokeWidth={0.5} />,
  },
  girlsgang: {
    color: '#c97b8a',
    colorRgb: '201,123,138',
    icon: <Flower2 size={36} />,
    bgIcon: <Flower2 size={140} strokeWidth={0.5} />,
  },
  family: {
    color: '#6fa886',
    colorRgb: '111,168,134',
    icon: <Users size={36} />,
    bgIcon: <Users size={140} strokeWidth={0.5} />,
  },
};

/* Paper-theme "ink on cream" mapping for the mode accent colors above.
   Icons/bgIcons are theme-agnostic, so only color/colorRgb are overridden. */
const PAPER_MODE_COLORS: Record<Mode, { color: string; colorRgb: string }> = {
  casual: { color: '#a1443a', colorRgb: '161,68,58' },
  deep: { color: '#1f6b61', colorRgb: '31,107,97' },
  versus: { color: '#8a6a2f', colorRgb: '138,106,47' },
  married: { color: '#6b4a96', colorRgb: '107,74,150' },
  boysgang: { color: '#9c651f', colorRgb: '156,101,31' },
  girlsgang: { color: '#954f5e', colorRgb: '149,79,94' },
  family: { color: '#3f7a58', colorRgb: '63,122,88' },
};

/* Small fixed per-slot tilt (deg) so the paper ModeCard grid reads as a
   loose stack of index cards rather than a perfect grid. Deterministic
   (keyed by card index), not random, so layout doesn't shift on re-render. */
const PAPER_TILTS = [-1.4, 1.1, -0.7, 1.6, -1.1, 0.8, -1.3];

/* Classic red index-card margin rule — fixed, not mode-colored, since a
   real index card's rule line doesn't change with what's written on it. */
const PAPER_MARGIN_LINE = 'rgba(163,58,50,0.32)';

/* Fixed boy/girl accent colors used throughout Versus mode, per theme. */
const VERSUS_BOY_COLOR = {
  noir: { color: '#2a9d8f', colorRgb: '42,157,143' },
  paper: { color: '#1f6b61', colorRgb: '31,107,97' },
};
const VERSUS_GIRL_COLOR = {
  noir: { color: '#e07a6e', colorRgb: '224,122,110' },
  paper: { color: '#a1443a', colorRgb: '161,68,58' },
};

function OrnamentDivider({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2 my-3" style={{ color }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${color}60` }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${color}80` }} />
      <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${color}60` }} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  );
}

function ModeCard({ cfg, index, onClick }: { cfg: ModeConfig; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const { isPaper } = useTheme();
  const tilt = PAPER_TILTS[index % PAPER_TILTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, rotate: isPaper ? tilt : 0 }}
      animate={{ opacity: 1, y: 0, rotate: isPaper ? tilt : 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6, scale: 1.015, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl cursor-pointer overflow-hidden flex flex-col"
      style={
        isPaper
          ? {
              background: 'var(--color-surface)',
              border: '1px solid var(--color-hairline)',
              borderTop: `3px solid ${cfg.color}`,
              boxShadow: hovered
                ? '0 18px 34px rgba(36,31,22,0.16), 0 3px 8px rgba(36,31,22,0.1)'
                : '0 2px 4px rgba(36,31,22,0.08), 0 8px 18px rgba(36,31,22,0.07)',
              transition: 'box-shadow 0.35s cubic-bezier(0.23,1,0.32,1)',
            }
          : {
              background: hovered
                ? `linear-gradient(160deg, rgba(${cfg.colorRgb},0.1) 0%, rgba(255,255,255,0.05) 100%)`
                : 'rgba(255,255,255,0.055)',
              border: `1px solid rgba(${cfg.colorRgb},${hovered ? '0.35' : '0.15'})`,
              borderTop: `3px solid ${cfg.color}`,
              boxShadow: hovered
                ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${cfg.colorRgb},0.12), inset 0 1px 0 rgba(${cfg.colorRgb},0.2)`
                : '0 4px 24px rgba(0,0,0,0.4)',
              transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)',
            }
      }
    >
      {/* Pushpin — paper only, sells the "pinned index card" read.
          Card wrapper is overflow-hidden, so this sits just inside the
          top-left margin gutter rather than straddling the edge. */}
      {isPaper && (
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: 10, left: 12,
            color: cfg.color,
            transform: 'rotate(-28deg)',
            filter: 'drop-shadow(0 2px 2px rgba(36,31,22,0.35))',
            zIndex: 20,
          }}
        >
          <Pin size={17} fill="currentColor" strokeWidth={1.5} />
        </div>
      )}

      {/* Red index-card margin rule + faint ruled lines — paper only */}
      {isPaper && (
        <>
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: 34, width: 1, background: PAPER_MARGIN_LINE }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 27px, var(--color-hairline) 27px, var(--color-hairline) 28px)',
              opacity: 0.4,
            }}
          />
        </>
      )}

      {/* Background decorative icon */}
      <div
        className="absolute -bottom-6 -right-6 pointer-events-none select-none"
        style={{
          color: cfg.color,
          opacity: hovered ? 0.08 : 0.04,
          transition: 'opacity 0.35s ease',
          transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        {cfg.bgIcon}
      </div>

      {/* Inner glow on hover — a glassy noir effect, no equivalent on paper */}
      {!isPaper && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${cfg.colorRgb},0.12) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      )}

      {/* Dog-ear folded corner — paper only */}
      {isPaper && (
        <>
          <div
            className="absolute bottom-0 right-0 pointer-events-none"
            style={{
              width: 26, height: 26,
              background: `rgba(${cfg.colorRgb},0.5)`,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 2, right: 2, width: 22, height: 22,
              background: 'var(--color-surface)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              boxShadow: 'inset 1.5px 1.5px 3px rgba(36,31,22,0.3)',
            }}
          />
        </>
      )}

      <div
        className={isPaper ? 'relative z-10 pl-9 pr-6 py-6 md:pl-10 md:pr-7 md:py-7 flex flex-col gap-0 h-full' : 'relative z-10 p-6 md:p-7 flex flex-col gap-0 h-full'}
      >
        {/* Mode badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: cfg.color }}
          >
            {cfg.tagline}
          </span>
          <motion.div
            animate={hovered ? { rotate: 15, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ color: cfg.color }}
          >
            {cfg.icon}
          </motion.div>
        </div>

        {/* Mode name */}
        <h2
          className="font-serif italic leading-tight"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
            fontWeight: 400,
            color: isPaper ? 'var(--color-ink)' : '#ffffff',
            textShadow: isPaper ? 'none' : `0 0 30px rgba(${cfg.colorRgb},0.4)`,
          }}
        >
          {cfg.label}
        </h2>

        <OrnamentDivider color={cfg.color} />

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: isPaper ? 'var(--color-ink-soft)' : 'rgba(240,230,222,0.88)', fontWeight: 400 }}
        >
          {cfg.desc}
        </p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-2 mt-5 pt-4"
          style={{ borderTop: isPaper ? '1px solid var(--color-hairline)' : `1px solid rgba(${cfg.colorRgb},0.12)` }}
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span
            className="text-[13px] font-semibold tracking-wider uppercase"
            style={{ color: cfg.color }}
          >
            {cfg.ctaLabel}
          </span>
          <ArrowRight size={13} style={{ color: cfg.color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Oracle Card — question display component
───────────────────────────────────────────── */
interface OracleCardProps {
  mode: Mode;
  activeCfg: ModeConfig | null;
  currentQuestion: string | null;
  isLoading: boolean;
  isCompleted: boolean;
  scoreCowok: number;
  scoreCewek: number;
  progressPct: number;
  progressLabel: string;
  renderFormattedText: (text: string, type: Mode) => React.ReactNode;
  onNext: () => void;
  onVersusVote: (target: 'cowok' | 'cewek') => void;
  onReset: () => void;
  onChangeMode: () => void;
}

function VersusVoteButton({
  side, label, color, colorRgb, score, onClick, disabled,
}: {
  side: 'left' | 'right';
  label: string;
  color: string;
  colorRgb: string;
  score: number;
  onClick: () => void;
  disabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { isPaper } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-1 flex flex-col items-center justify-center py-6 gap-3 relative overflow-hidden transition-colors"
      style={{
        background: hovered ? `rgba(${colorRgb},0.14)` : `rgba(${colorRgb},0.04)`,
        borderRight: side === 'left' ? `1px solid ${isPaper ? 'var(--color-hairline)' : 'rgba(255,255,255,0.06)'}` : undefined,
        transition: 'background 0.25s ease',
      }}
    >
      {/* Radial hover glow — noir only; paper relies on the flat tint above */}
      {!isPaper && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${side === 'left' ? '80%' : '20%'} 50%, rgba(${colorRgb},0.12) 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span
          className="font-mono text-2xl font-bold"
          style={{ color, filter: isPaper ? 'none' : `drop-shadow(0 0 8px rgba(${colorRgb},0.6))` }}
        >
          {score}
        </span>
        <User
          size={28}
          style={{
            color,
            filter: !isPaper && hovered ? `drop-shadow(0 0 10px rgba(${colorRgb},0.7))` : 'none',
            transition: 'filter 0.25s ease',
          }}
        />
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color }}
        >
          {label}
        </span>
      </div>
    </motion.button>
  );
}

/* Corner ornament paths shared by both corners of the OracleCard.
   Noir keeps the translucent glow-fill triangle; paper drops it for a
   simple thin ink-line motif consistent with the flat stationery look. */
function CornerOrnamentPaths({ color, isPaper }: { color: string; isPaper: boolean }) {
  return (
    <>
      {!isPaper && <path d="M90,0 L90,45 Q90,0 45,0 Z" fill={color} fillOpacity="0.12" />}
      <path
        d="M90,0 L90,65 Q90,0 25,0 Z"
        fill="none"
        stroke={color}
        strokeWidth={isPaper ? 1 : 0.8}
        strokeOpacity={isPaper ? 0.55 : 1}
      />
      <path
        d="M90,0 L90,30 Q90,0 60,0 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeOpacity={isPaper ? 0.65 : 1}
      />
      <circle cx="78" cy="12" r="1.5" fill={color} fillOpacity={isPaper ? 0.35 : 0.6} />
      <circle cx="68" cy="22" r="1" fill={color} fillOpacity={isPaper ? 0.25 : 0.4} />
    </>
  );
}

function OracleCard({
  mode, activeCfg, currentQuestion, isLoading, isCompleted,
  scoreCowok, scoreCewek, progressPct, progressLabel,
  renderFormattedText, onNext, onVersusVote, onReset, onChangeMode,
}: OracleCardProps) {
  const { t } = useLanguage();
  const { isPaper } = useTheme();
  const color = activeCfg?.color ?? (isPaper ? '#8a6a2f' : '#c9a96e');
  const rgb = activeCfg?.colorRgb ?? (isPaper ? '138,106,47' : '201,169,110');
  const boyLabel = t('home.boyLabel');
  const girlLabel = t('home.girlLabel');

  const boyC = isPaper ? VERSUS_BOY_COLOR.paper : VERSUS_BOY_COLOR.noir;
  const girlC = isPaper ? VERSUS_GIRL_COLOR.paper : VERSUS_GIRL_COLOR.noir;
  const roseColor = isPaper ? '#a1443a' : '#e07a6e';
  const goldColor = isPaper ? '#8a6a2f' : '#c9a96e';
  const goldRgb = isPaper ? '138,106,47' : '201,169,110';

  const textPrimary = isPaper ? 'var(--color-ink)' : '#f5ede8';
  const textSoft = isPaper ? 'var(--color-ink-soft)' : 'rgba(240,230,222,0.65)';
  const textFaint = isPaper ? 'var(--color-ink-faint)' : 'rgba(240,230,222,0.4)';
  const textFainter = isPaper ? 'var(--color-ink-faint)' : 'rgba(240,230,222,0.3)';
  const hairline = isPaper ? 'var(--color-hairline)' : 'rgba(255,255,255,0.08)';
  const hairlineSoft = isPaper ? 'var(--color-hairline)' : 'rgba(255,255,255,0.06)';
  const surfaceTint = isPaper ? 'var(--color-surface-soft)' : 'rgba(255,255,255,0.03)';

  const completionQuote =
    mode === 'married' ? t('home.quote.married')
    : mode === 'boysgang' ? t('home.quote.boysgang')
    : mode === 'girlsgang' ? t('home.quote.girlsgang')
    : mode === 'family' ? t('home.quote.family')
    : t('home.quote.default');

  const versusResultLine =
    scoreCowok > scoreCewek ? t('home.boyWins')
    : scoreCewek > scoreCowok ? t('home.girlWins')
    : t('home.tie');

  return (
    <div className="relative w-full max-w-2xl" style={{ perspective: '1200px' }}>
      {/* Ghost deck cards */}
      {!isCompleted && (
        <>
          <div
            className="absolute inset-x-4 rounded-3xl pointer-events-none"
            style={{
              top: 8, bottom: -8,
              transform: 'rotate(-2deg) scaleX(0.96)',
              background: isPaper ? 'var(--color-surface-soft)' : `rgba(${rgb},0.055)`,
              borderWidth: '1px 1px 1px 3px',
              borderStyle: 'solid',
              borderColor: isPaper
                ? `var(--color-hairline) var(--color-hairline) var(--color-hairline) ${color}`
                : `rgba(${rgb},0.1) rgba(${rgb},0.1) rgba(${rgb},0.1) rgba(${rgb},0.3)`,
              boxShadow: isPaper ? '0 6px 16px rgba(36,31,22,0.06)' : '0 12px 40px rgba(0,0,0,0.35)',
              zIndex: 0,
            }}
          />
          <div
            className="absolute inset-x-8 rounded-3xl pointer-events-none"
            style={{
              top: 16, bottom: -16,
              transform: 'rotate(1.5deg) scaleX(0.92)',
              background: isPaper ? 'var(--color-surface-soft)' : 'rgba(255,255,255,0.015)',
              border: isPaper ? '1px solid var(--color-hairline)' : '1px solid rgba(255,255,255,0.04)',
              zIndex: 0,
            }}
          />
        </>
      )}

      {/* Main card */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={isCompleted ? 'completed' : currentQuestion}
          initial={{ opacity: 0, y: 24, rotateX: 6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -32, rotateX: -6, transition: { duration: 0.2, ease: 'easeIn' } }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative w-full rounded-3xl overflow-hidden"
          style={{
            zIndex: 2,
            background: isPaper
              ? 'var(--color-surface-strong)'
              : `linear-gradient(145deg, rgba(${rgb},0.11) 0%, rgba(14,8,11,0.92) 55%, rgba(14,8,11,0.98) 100%)`,
            borderWidth: '1px 1px 1px 4px',
            borderStyle: 'solid',
            borderColor: isPaper
              ? `var(--color-hairline) var(--color-hairline) var(--color-hairline) ${color}`
              : `rgba(${rgb},0.18) rgba(${rgb},0.18) rgba(${rgb},0.18) ${color}`,
            boxShadow: isPaper
              ? '0 2px 6px rgba(36,31,22,0.08), 0 24px 48px rgba(36,31,22,0.10)'
              : `0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(${rgb},0.1), inset 0 1px 0 rgba(${rgb},0.15), 0 0 80px rgba(${rgb},0.07)`,
          }}
        >
          {/* Top light streak — glossy glass highlight, noir only */}
          {!isPaper && (
            <div
              className="absolute pointer-events-none"
              style={{
                top: 0, right: 0,
                width: '45%', height: '40%',
                background: `radial-gradient(ellipse at top right, rgba(${rgb},0.09) 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Animated top shimmer line (noir) / static hairline rule (paper) */}
          {isPaper ? (
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{ height: 1, background: 'var(--color-hairline)', zIndex: 5 }}
            />
          ) : (
            <motion.div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, rgba(${rgb},0.75), transparent)`,
                backgroundSize: '200% 100%',
                zIndex: 5,
              }}
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
            />
          )}

          {/* Ledger-card texture: thin red rule beside the spine + faint
              ruled lines — paper only, kept subtle so it never fights
              the question text or the action buttons at the bottom. */}
          {isPaper && (
            <>
              <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: 10, width: 1, background: PAPER_MARGIN_LINE }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, var(--color-hairline) 31px, var(--color-hairline) 32px)',
                  opacity: 0.3,
                }}
              />
            </>
          )}

          {/* Corner ornament SVG */}
          <svg
            className="absolute top-0 right-0 pointer-events-none"
            width="90" height="90" viewBox="0 0 90 90"
            style={{ opacity: isPaper ? 0.5 : 0.35 }}
          >
            <CornerOrnamentPaths color={color} isPaper={isPaper} />
          </svg>

          {/* Mirrored bottom-left corner ornament */}
          <svg
            className="absolute bottom-0 left-0 pointer-events-none"
            width="90" height="90" viewBox="0 0 90 90"
            style={{ opacity: isPaper ? 0.4 : 0.28, transform: 'rotate(180deg)' }}
          >
            <CornerOrnamentPaths color={color} isPaper={isPaper} />
          </svg>

          {/* Progress bar — thin left edge accent */}
          <motion.div
            className="absolute left-0 top-0 w-1 rounded-tl-3xl"
            initial={{ height: '0%' }}
            animate={{ height: `${progressPct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ background: isPaper ? color : `linear-gradient(to bottom, ${color}, rgba(${rgb},0.3))`, zIndex: 10 }}
          />

          {/* Header bar */}
          <div
            className="flex items-center justify-between px-8 pt-7 pb-0"
          >
            {/* Mode badge */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.25)` }}
              >
                <span style={{ color, display: 'flex' }}>
                  {activeCfg?.icon && React.cloneElement(activeCfg.icon as React.ReactElement<{ size?: number }>, { size: 14 })}
                </span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color }}>
                  {activeCfg?.label}
                </p>
                {!isCompleted && !isLoading && (
                  <p className="text-[9px] tracking-wider" style={{ color: textFaint }}>
                    {activeCfg?.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Progress fraction — editorial style */}
            {!isCompleted && !isLoading && (
              <div className="text-right">
                <div className="font-mono leading-none" style={{ color: textSoft }}>
                  <span className="text-xl font-bold" style={{ color }}>
                    {progressLabel.split(' / ')[0]}
                  </span>
                  <span className="text-sm"> / {progressLabel.split(' / ')[1]}</span>
                </div>
                <p className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: textFainter }}>
                  {t('home.questionsLabel')}
                </p>
              </div>
            )}
          </div>

          {/* ── Versus score header ── */}
          {mode === 'versus' && !isCompleted && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-6 mt-5 mx-8 py-3 rounded-2xl"
              style={{ background: surfaceTint, border: `1px solid ${hairlineSoft}` }}
            >
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: `rgba(${boyC.colorRgb},0.8)` }}>{boyLabel}</p>
                <p className="text-2xl font-mono font-bold" style={{ color: boyC.color }}>{scoreCowok}</p>
              </div>
              <div style={{ width: 1, height: 36, background: hairline }} />
              <Swords size={16} style={{ color: `rgba(${goldRgb},0.5)` }} />
              <div style={{ width: 1, height: 36, background: hairline }} />
              <div className="text-center">
                <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: `rgba(${girlC.colorRgb},0.8)` }}>{girlLabel}</p>
                <p className="text-2xl font-mono font-bold" style={{ color: girlC.color }}>{scoreCewek}</p>
              </div>
            </motion.div>
          )}

          {/* ── Question body ── */}
          <div className="relative px-8 py-10 min-h-[200px] flex items-center justify-center">
            {/* Huge watermark number */}
            {!isCompleted && !isLoading && (
              <div
                className="absolute right-6 top-1/2 -translate-y-1/2 font-serif italic pointer-events-none select-none leading-none"
                style={{
                  fontSize: 'clamp(100px, 18vw, 160px)',
                  color: isPaper ? 'rgba(36,31,22,0.05)' : `rgba(${rgb},0.06)`,
                  fontWeight: 600,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {progressLabel.split(' / ')[0].padStart(2, '0')}
              </div>
            )}

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  >
                    <Sparkles size={32} style={{ color: `rgba(${rgb},0.6)` }} />
                  </motion.div>
                  <span
                    className="font-serif italic text-lg"
                    style={{ color: isPaper ? 'var(--color-ink-faint)' : 'rgba(240,230,222,0.45)' }}
                  >
                    {t('home.loading')}
                  </span>
                </motion.div>
              ) : isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.3 }}
                  className="text-center space-y-5 w-full"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    className="flex justify-center gap-3 mb-2"
                  >
                    <Heart size={40} fill="currentColor" style={{ color: roseColor, filter: isPaper ? 'none' : 'drop-shadow(0 0 16px rgba(224,122,110,0.7))' }} />
                    <Stars size={40} style={{ color: goldColor, filter: isPaper ? 'none' : 'drop-shadow(0 0 16px rgba(201,169,110,0.7))' }} />
                  </motion.div>

                  <h3
                    className="font-serif italic leading-tight"
                    style={{ fontSize: 'clamp(1.6rem,4vw,2.3rem)', fontWeight: 600, color: textPrimary }}
                  >
                    {mode === 'versus' ? t('home.versusFinished') : t('home.journeyComplete')}
                  </h3>

                  {mode === 'versus' ? (
                    <>
                      <p className="font-serif italic text-xl" style={{ color }}>
                        {versusResultLine}
                      </p>
                      <div className="flex justify-center gap-16 pt-3">
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `rgba(${boyC.colorRgb},0.8)` }}>{boyLabel}</p>
                          <p className="text-5xl font-mono font-bold" style={{ color: boyC.color }}>{scoreCowok}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `rgba(${girlC.colorRgb},0.8)` }}>{girlLabel}</p>
                          <p className="text-5xl font-mono font-bold" style={{ color: girlC.color }}>{scoreCewek}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="font-serif italic text-lg md:text-xl leading-relaxed" style={{ color }}>
                      {completionQuote}
                    </p>
                  )}

                  <div className="flex justify-center gap-2 pt-1">
                    {[0, 0.35, 0.7].map(d => (
                      <motion.div key={d} animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.8, delay: d }}>
                        <Heart size={12} fill="currentColor" style={{ color: `rgba(${rgb},0.5)` }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="relative z-10 flex flex-col items-center text-center w-full"
                >
                  {/* Decorative opening quote */}
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.5, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="font-serif select-none leading-none"
                    style={{
                      fontSize: '3.4rem',
                      color: isPaper ? `rgba(${rgb},0.55)` : `rgba(${rgb},0.4)`,
                      textShadow: isPaper ? 'none' : `0 0 28px rgba(${rgb},0.45)`,
                      marginBottom: '-0.55rem',
                    }}
                  >
                    “
                  </motion.span>

                  <h3
                    className="font-serif italic leading-snug"
                    style={{
                      fontSize: 'clamp(1.35rem, 3.5vw, 2.1rem)',
                      fontWeight: 600,
                      color: textPrimary,
                      textShadow: isPaper ? 'none' : '0 2px 28px rgba(0,0,0,0.55)',
                      maxWidth: '32ch',
                    }}
                  >
                    {renderFormattedText(currentQuestion!, mode)}
                  </h3>

                  {/* Ornament under question */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                    className="flex items-center gap-1.5 mt-5"
                  >
                    <div style={{ width: 26, height: 1, background: `linear-gradient(to right, transparent, rgba(${rgb},0.55))` }} />
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, boxShadow: isPaper ? 'none' : `0 0 10px rgba(${rgb},0.9)` }} />
                    <div style={{ width: 26, height: 1, background: `linear-gradient(to left, transparent, rgba(${rgb},0.55))` }} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Action area ── */}
          <div
            style={{ borderTop: `1px solid ${isPaper ? 'var(--color-hairline)' : `rgba(${rgb},0.1)`}` }}
          >
            {isCompleted ? (
              <div className="flex items-center gap-3 px-6 py-5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onReset}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-xs tracking-[0.15em] uppercase"
                  style={
                    isPaper
                      ? {
                          background: color,
                          color: '#fffdf7',
                          border: `1px solid ${color}`,
                          boxShadow: '0 1px 2px rgba(36,31,22,0.08), 0 8px 18px rgba(36,31,22,0.10)',
                        }
                      : {
                          background: `linear-gradient(135deg, ${color}, rgba(${rgb},0.65))`,
                          color: '#0e080b',
                          boxShadow: `0 8px 28px rgba(${rgb},0.35)`,
                        }
                  }
                >
                  <RotateCcw size={13} />
                  {t('home.playAgain')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onChangeMode}
                  className="px-5 py-3.5 rounded-2xl font-medium text-xs tracking-widest uppercase"
                  style={
                    isPaper
                      ? { background: 'transparent', border: '1px solid var(--color-hairline)', color: 'var(--color-ink-soft)' }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,230,222,0.7)' }
                  }
                >
                  {t('home.changeMode')}
                </motion.button>
              </div>
            ) : mode === 'versus' ? (
              /* Versus: full-width dramatic split buttons */
              <div>
                <div className="flex" style={{ minHeight: 110 }}>
                  <VersusVoteButton
                    side="left"
                    label={boyLabel}
                    color={boyC.color}
                    colorRgb={boyC.colorRgb}
                    score={scoreCowok}
                    onClick={() => onVersusVote('cowok')}
                    disabled={isLoading}
                  />
                  <VersusVoteButton
                    side="right"
                    label={girlLabel}
                    color={girlC.color}
                    colorRgb={girlC.colorRgb}
                    score={scoreCewek}
                    onClick={() => onVersusVote('cewek')}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-center pb-4 pt-2">
                  <button
                    onClick={onChangeMode}
                    className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors"
                    style={{ color: isPaper ? 'var(--color-ink-faint)' : 'rgba(240,230,222,0.35)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = isPaper ? 'var(--color-ink)' : 'rgba(240,230,222,0.75)')}
                    onMouseLeave={e => (e.currentTarget.style.color = isPaper ? 'var(--color-ink-faint)' : 'rgba(240,230,222,0.35)')}
                  >
                    {t('home.changeModeBack')}
                  </button>
                </div>
              </div>
            ) : (
              /* Standard: next + change mode */
              <div className="flex items-center gap-3 px-6 py-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onNext}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm tracking-wide relative overflow-hidden group"
                  style={
                    isPaper
                      ? {
                          background: color,
                          color: '#fffdf7',
                          boxShadow: '0 1px 2px rgba(36,31,22,0.08), 0 10px 22px rgba(36,31,22,0.12)',
                        }
                      : {
                          background: `linear-gradient(135deg, ${color} 0%, rgba(${rgb},0.72) 100%)`,
                          color: '#140a0e',
                          boxShadow: `0 10px 32px rgba(${rgb},0.35), inset 0 1px 0 rgba(255,255,255,0.25)`,
                        }
                  }
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('home.next')}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    >
                      <ArrowRight size={15} />
                    </motion.span>
                  </span>
                  {!isPaper && (
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'rgba(255,255,255,0.14)' }}
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onChangeMode}
                  className="px-4 py-3.5 rounded-2xl font-medium text-xs tracking-widest uppercase"
                  style={
                    isPaper
                      ? { background: 'transparent', border: '1px solid var(--color-hairline)', color: 'var(--color-ink-soft)' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,230,222,0.55)' }
                  }
                  onMouseEnter={e => (e.currentTarget.style.color = isPaper ? 'var(--color-ink)' : 'rgba(240,230,222,0.9)')}
                  onMouseLeave={e => (e.currentTarget.style.color = isPaper ? 'var(--color-ink-soft)' : 'rgba(240,230,222,0.55)')}
                >
                  {t('home.modesBack')}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const { isPaper } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentVersusQuestion, setCurrentVersusQuestion] = useState<VersusQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode | null>(null);
  const [seenCasual, setSeenCasual] = useState<string[]>([]);
  const [seenDeep, setSeenDeep] = useState<string[]>([]);
  const [seenVersus, setSeenVersus] = useState<string[]>([]);
  const [seenMarried, setSeenMarried] = useState<string[]>([]);
  const [seenBoysGang, setSeenBoysGang] = useState<string[]>([]);
  const [seenGirlsGang, setSeenGirlsGang] = useState<string[]>([]);
  const [seenFamily, setSeenFamily] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreCowok, setScoreCowok] = useState(0);
  const [scoreCewek, setScoreCewek] = useState(0);

  const modeConfigs: ModeConfig[] = useMemo(() => {
    // Derive the active palette per mode here so every downstream consumer
    // (ModeCard, OracleCard, watermark, ornaments, buttons) automatically
    // picks up the right theme without touching each call site.
    const visual = (key: Mode) =>
      isPaper ? { ...MODE_VISUALS[key], ...PAPER_MODE_COLORS[key] } : MODE_VISUALS[key];

    return [
      { key: 'casual', ...visual('casual'), label: t('mode.casual.label'), tagline: t('mode.casual.tagline'), desc: t('mode.casual.desc'), ctaLabel: t('mode.casual.cta') },
      { key: 'deep', ...visual('deep'), label: t('mode.deep.label'), tagline: t('mode.deep.tagline'), desc: t('mode.deep.desc'), ctaLabel: t('mode.deep.cta') },
      { key: 'versus', ...visual('versus'), label: t('mode.versus.label'), tagline: t('mode.versus.tagline'), desc: t('mode.versus.desc'), ctaLabel: t('mode.versus.cta') },
      { key: 'married', ...visual('married'), label: t('mode.married.label'), tagline: t('mode.married.tagline'), desc: t('mode.married.desc'), ctaLabel: t('mode.married.cta') },
      { key: 'boysgang', ...visual('boysgang'), label: t('mode.boysgang.label'), tagline: t('mode.boysgang.tagline'), desc: t('mode.boysgang.desc'), ctaLabel: t('mode.boysgang.cta') },
      { key: 'girlsgang', ...visual('girlsgang'), label: t('mode.girlsgang.label'), tagline: t('mode.girlsgang.tagline'), desc: t('mode.girlsgang.desc'), ctaLabel: t('mode.girlsgang.cta') },
      { key: 'family', ...visual('family'), label: t('mode.family.label'), tagline: t('mode.family.tagline'), desc: t('mode.family.desc'), ctaLabel: t('mode.family.cta') },
    ];
  }, [t, isPaper]);

  const activeCfg = modeConfigs.find(c => c.key === mode) ?? null;

  useEffect(() => {
    document.title = mode && activeCfg
      ? `${activeCfg.label} | LoveConnect`
      : 'LoveConnect — Deep Conversation & Relationship Game';
  }, [mode, activeCfg]);

  const renderFormattedText = (text: string, type: Mode) => {
    const color = modeConfigs.find(c => c.key === type)?.color ?? '#c9a96e';
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span key={index} style={{ color, fontWeight: 600 }}>
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  const generateQuestion = (type: Mode) => {
    setIsLoading(true);
    setMode(type);
    setIsCompleted(false);

    if (type === 'versus') {
      const pool = versusQuestions[language];
      const available = pool.filter(q => !seenVersus.includes(q.text));
      if (available.length === 0) {
        setTimeout(() => { setIsCompleted(true); setIsLoading(false); }, 50);
        return;
      }
      const q = available[Math.floor(Math.random() * available.length)];
      setSeenVersus(prev => [...prev, q.text]);
      setTimeout(() => { setCurrentVersusQuestion(q); setCurrentQuestion(q.text); setIsLoading(false); }, 10);
      return;
    }

    const allQ = (
      type === 'casual' ? casualQuestions
      : type === 'deep' ? deepQuestions
      : type === 'boysgang' ? boysGangQuestions
      : type === 'girlsgang' ? girlsGangQuestions
      : type === 'family' ? familyQuestions
      : marriedQuestions
    )[language];

    const seenQ = type === 'casual' ? seenCasual
      : type === 'deep' ? seenDeep
      : type === 'boysgang' ? seenBoysGang
      : type === 'girlsgang' ? seenGirlsGang
      : type === 'family' ? seenFamily
      : seenMarried;

    const available = allQ.filter(q => !seenQ.includes(q));
    if (available.length === 0) {
      setTimeout(() => { setIsCompleted(true); setIsLoading(false); }, 50);
      return;
    }

    const q = available[Math.floor(Math.random() * available.length)];
    if (type === 'casual') setSeenCasual(prev => [...prev, q]);
    else if (type === 'deep') setSeenDeep(prev => [...prev, q]);
    else if (type === 'boysgang') setSeenBoysGang(prev => [...prev, q]);
    else if (type === 'girlsgang') setSeenGirlsGang(prev => [...prev, q]);
    else if (type === 'family') setSeenFamily(prev => [...prev, q]);
    else setSeenMarried(prev => [...prev, q]);

    setTimeout(() => { setCurrentQuestion(q); setIsLoading(false); }, 10);
  };

  const handleVersusVote = (target: 'cowok' | 'cewek') => {
    if (!currentVersusQuestion) return;
    const pts = currentVersusQuestion.isNegative ? -1 : 1;
    if (target === 'cowok') setScoreCowok(p => p + pts);
    else setScoreCewek(p => p + pts);
    generateQuestion('versus');
  };

  const resetMode = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (mode === 'casual') setSeenCasual([]);
      else if (mode === 'deep') setSeenDeep([]);
      else if (mode === 'married') setSeenMarried([]);
      else if (mode === 'boysgang') setSeenBoysGang([]);
      else if (mode === 'girlsgang') setSeenGirlsGang([]);
      else if (mode === 'family') setSeenFamily([]);
      else { setSeenVersus([]); setScoreCowok(0); setScoreCewek(0); }
      setIsCompleted(false);
      generateQuestion(mode!);
    }, 50);
  };

  const progressPct = () => {
    if (!mode) return 0;
    if (isCompleted) return 100;
    if (mode === 'versus') return (seenVersus.length / versusQuestions[language].length) * 100;
    if (mode === 'married') return (seenMarried.length / marriedQuestions[language].length) * 100;
    if (mode === 'boysgang') return (seenBoysGang.length / boysGangQuestions[language].length) * 100;
    if (mode === 'girlsgang') return (seenGirlsGang.length / girlsGangQuestions[language].length) * 100;
    if (mode === 'family') return (seenFamily.length / familyQuestions[language].length) * 100;
    if (mode === 'casual') return (seenCasual.length / casualQuestions[language].length) * 100;
    return (seenDeep.length / deepQuestions[language].length) * 100;
  };

  const progressLabel = () => {
    if (!mode) return '';
    if (mode === 'versus') return `${seenVersus.length} / ${versusQuestions[language].length}`;
    if (mode === 'married') return `${seenMarried.length} / ${marriedQuestions[language].length}`;
    if (mode === 'boysgang') return `${seenBoysGang.length} / ${boysGangQuestions[language].length}`;
    if (mode === 'girlsgang') return `${seenGirlsGang.length} / ${girlsGangQuestions[language].length}`;
    if (mode === 'family') return `${seenFamily.length} / ${familyQuestions[language].length}`;
    if (mode === 'casual') return `${seenCasual.length} / ${casualQuestions[language].length}`;
    return `${seenDeep.length} / ${deepQuestions[language].length}`;
  };

  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!currentQuestion ? (
            /* ── Mode Selection Grid ── */
            <motion.div
              key="choices"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.2 } }}
              className="w-full max-w-5xl"
            >
              {/* Section intro */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                <p
                  className="text-xs uppercase tracking-[0.3em] font-light"
                  style={{ color: isPaper ? 'rgba(138,106,47,0.85)' : 'rgba(201,169,110,0.8)' }}
                >
                  {t('home.chooseMode')}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {modeConfigs.map((cfg, i) => (
                  <ModeCard
                    key={cfg.key}
                    cfg={cfg}
                    index={i}
                    onClick={() => generateQuestion(cfg.key)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Oracle Question Card ── */
            <OracleCard
              mode={mode!}
              activeCfg={activeCfg}
              currentQuestion={currentQuestion}
              isLoading={isLoading}
              isCompleted={isCompleted}
              scoreCowok={scoreCowok}
              scoreCewek={scoreCewek}
              progressPct={progressPct()}
              progressLabel={progressLabel()}
              renderFormattedText={renderFormattedText}
              onNext={() => generateQuestion(mode!)}
              onVersusVote={handleVersusVote}
              onReset={resetMode}
              onChangeMode={() => {
                setCurrentQuestion(null);
                setIsCompleted(false);
                setScoreCowok(0);
                setScoreCewek(0);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
