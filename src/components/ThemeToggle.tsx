/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center rounded-full p-0.5 select-none"
      style={{ background: 'var(--color-surface-soft)', border: '1px solid var(--color-hairline)' }}
      role="group"
      aria-label="Theme switch"
    >
      {([
        { key: 'noir' as const, icon: <Moon size={11} /> },
        { key: 'paper' as const, icon: <FileText size={11} /> },
      ]).map(({ key, icon }) => {
        const active = theme === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setTheme(key)}
            aria-pressed={active}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
            style={{
              background: active ? 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-rose))' : 'transparent',
              color: active ? 'var(--color-bg)' : 'var(--color-ink-faint)',
            }}
          >
            {icon}
            {key}
          </button>
        );
      })}
    </div>
  );
}
