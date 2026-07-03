import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const { t } = useLanguage();

  const faqs = [
    {
      category: t('faq.cat.basics'),
      questions: [
        { q: t('faq.q1'), a: t('faq.a1') },
        { q: t('faq.q2'), a: t('faq.a2') },
      ],
    },
    {
      category: t('faq.cat.modes'),
      questions: [
        { q: t('faq.q3'), a: t('faq.a3') },
        { q: t('faq.q4'), a: t('faq.a4') },
        { q: t('faq.q5'), a: t('faq.a5') },
      ],
    },
    {
      category: t('faq.cat.privacy'),
      questions: [
        { q: t('faq.q6'), a: t('faq.a6') },
        { q: t('faq.q7'), a: t('faq.a7') },
      ],
    },
  ];

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic mb-6">{t('faq.title')}</h2>
          <p className="text-ink-soft">{t('faq.subtitle')}</p>
        </motion.div>

        <div className="space-y-12">
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-pink/60 px-4">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.questions.map((faq, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <motion.div 
                      key={id}
                      className={`glass rounded-2xl md:rounded-[2rem] overflow-hidden border transition-colors ${isOpen ? 'border-brand-pink/30' : 'border-hairline/60'}`}
                      initial={false}
                    >
                      <button
                        onClick={() => toggle(id)}
                        className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-surface-soft transition-colors"
                      >
                        <span className="font-serif italic text-lg">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full border border-hairline flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-pink/10 text-brand-pink' : ''}`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="p-6 pt-0 text-ink-soft leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center p-8 glass rounded-3xl"
        >
          <p className="text-ink-soft text-sm italic">{t('faq.stillQuestions')}</p>
          <a href="/contact" className="mt-4 inline-block text-brand-pink font-bold border-b border-brand-pink/30 hover:border-brand-pink transition-all pb-1">
            {t('faq.contactSupport')}
          </a>
        </motion.div>
      </div>
    </Layout>
  );
}
