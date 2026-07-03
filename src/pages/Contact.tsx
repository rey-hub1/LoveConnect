import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Instagram, Github, Twitter, MessageCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

export default function Contact() {
  const { t } = useLanguage();
  const { isPaper } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-12 px-4 lg:grid lg:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10 mb-16 lg:mb-0"
        >
          <div className="text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif italic">{t('contact.title')}</h2>
            <p className="text-ink-soft max-w-md">
              {t('contact.desc')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mb-1">{t('contact.emailUs')}</p>
                <p className="text-ink hover:text-brand-pink transition-colors cursor-pointer">hello@loveconnect.app</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mb-1">{t('contact.ourStudio')}</p>
                <p className="text-ink">{t('contact.studioLocation')}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-faint font-bold mb-1">{t('contact.whatsapp')}</p>
                <p className="text-ink hover:text-green-500 transition-colors cursor-pointer">+62 (812) 3456-7890</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex gap-6">
            <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-ink-soft hover:text-brand-pink hover:border-brand-pink/30 transition-all hover:scale-110">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-ink-soft hover:text-brand-blue hover:border-brand-blue/30 transition-all hover:scale-110">
              <Github size={20} />
            </a>
            <a href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-ink-soft hover:text-brand-blue/80 hover:border-brand-blue/30 transition-all hover:scale-110">
              <Twitter size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-8 md:p-12 rounded-[3rem] relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 text-brand-pink/10 opacity-50 -z-10">
            <Send size={150} />
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-20 space-y-6"
            >
              <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mx-auto">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-serif italic">{t('contact.messageSent')}</h3>
              <p className="text-ink-soft">{t('contact.thanks')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-ink-faint font-bold ml-4">{t('contact.fullName')}</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-soft border border-hairline rounded-2xl px-6 py-4 focus:border-brand-pink/50 outline-hidden transition-all text-sm"
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-ink-faint font-bold ml-4">{t('contact.emailAddress')}</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-soft border border-hairline rounded-2xl px-6 py-4 focus:border-brand-pink/50 outline-hidden transition-all text-sm"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-ink-faint font-bold ml-4">{t('contact.subject')}</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-surface-soft border border-hairline rounded-2xl px-6 py-4 focus:border-brand-pink/50 outline-hidden transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="" style={{ backgroundColor: isPaper ? 'var(--color-surface)' : 'var(--color-bg-alt)' }}>{t('contact.selectSubject')}</option>
                  <option value="feedback" style={{ backgroundColor: isPaper ? 'var(--color-surface)' : 'var(--color-bg-alt)' }}>{t('contact.generalFeedback')}</option>
                  <option value="support" style={{ backgroundColor: isPaper ? 'var(--color-surface)' : 'var(--color-bg-alt)' }}>{t('contact.gameSupport')}</option>
                  <option value="partnership" style={{ backgroundColor: isPaper ? 'var(--color-surface)' : 'var(--color-bg-alt)' }}>{t('contact.partnership')}</option>
                  <option value="other" style={{ backgroundColor: isPaper ? 'var(--color-surface)' : 'var(--color-bg-alt)' }}>{t('contact.other')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-ink-faint font-bold ml-4">{t('contact.message')}</label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-surface-soft border border-hairline rounded-2xl px-6 py-4 focus:border-brand-pink/50 outline-hidden transition-all text-sm resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-2xl bg-linear-to-r from-brand-pink to-brand-blue text-white font-bold uppercase tracking-widest shadow-xl shadow-brand-pink/10 hover:scale-101 active:scale-98 transition-all flex items-center justify-center gap-3 group"
              >
                <span>{t('contact.sendMessage')}</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover: -translate-y-1 transition-transform" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
