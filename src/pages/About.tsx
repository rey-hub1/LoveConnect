import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageCircle, Shield } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6">{t('about.missionTitle')}</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.missionDesc')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-4">
              <Heart size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-serif italic">{t('about.card1Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('about.card1Desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-3xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-4">
              <MessageCircle size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-serif italic">{t('about.card2Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('about.card2Desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-3xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
              <Shield size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-serif italic">{t('about.card3Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('about.card3Desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-3xl space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4">
              <Sparkles size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-serif italic">{t('about.card4Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('about.card4Desc')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-white/5 p-12 rounded-[3rem] border border-white/10"
        >
          <h3 className="text-2xl font-serif italic mb-4">{t('about.ctaTitle')}</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            {t('about.ctaDesc')}
          </p>
          <a href="/" className="inline-block px-10 py-4 rounded-full bg-linear-to-r from-brand-pink to-brand-blue text-white font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
            {t('about.ctaButton')}
          </a>
        </motion.div>
      </div>
    </Layout>
  );
}
