/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full p-0.5 select-none"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,169,110,0.25)' }}
      role="group"
      aria-label="Language switch"
    >
      {(['id', 'en'] as const).map(lang => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
            style={{
              background: active ? 'linear-gradient(135deg, #c9a96e, #e07a6e)' : 'transparent',
              color: active ? '#0e080b' : 'rgba(240,230,222,0.5)',
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
