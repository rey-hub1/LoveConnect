/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

type Entry = { en: string; id: string };

export const translations = {
  'layout.tagline': {
    en: 'The Art of Deeper Connections',
    id: 'Seni Terhubung Lebih Dalam',
  },
  'layout.footerCraft': {
    en: 'Crafted with love to create special moments between souls.',
    id: 'Dibuat dengan cinta untuk menciptakan momen spesial antar jiwa.',
  },
  'nav.about': { en: 'About', id: 'Tentang' },
  'nav.faq': { en: 'FAQ', id: 'FAQ' },
  'nav.contact': { en: 'Contact', id: 'Kontak' },

  'home.chooseMode': { en: 'Choose your mode', id: 'Pilih mode kamu' },
  'home.loading': { en: 'Crafting a special moment…', id: 'Menyiapkan momen spesial…' },
  'home.questionsLabel': { en: 'questions', id: 'pertanyaan' },
  'home.next': { en: 'Next Question', id: 'Pertanyaan Berikutnya' },
  'home.modesBack': { en: '← Modes', id: '← Mode' },
  'home.playAgain': { en: 'Play Again', id: 'Main Lagi' },
  'home.changeMode': { en: 'Change Mode', id: 'Ganti Mode' },
  'home.changeModeBack': { en: '← Change Mode', id: '← Ganti Mode' },
  'home.journeyComplete': { en: 'Journey Complete.', id: 'Perjalanan Selesai.' },
  'home.versusFinished': { en: 'Versus Finished!', id: 'Versus Selesai!' },
  'home.boyLabel': { en: 'Boy', id: 'Cowok' },
  'home.girlLabel': { en: 'Girl', id: 'Cewek' },
  'home.boyWins': { en: 'Boy Wins! He deserves extra love today.', id: 'Cowok Menang! Dia pantas dapat cinta ekstra hari ini.' },
  'home.girlWins': { en: 'Girl Wins! Time to pamper her.', id: 'Cewek Menang! Saatnya memanjakan dia.' },
  'home.tie': { en: "It's a Tie — equally amazing.", id: 'Seri — sama-sama luar biasa.' },

  'home.quote.married': {
    en: '"May your journey together be endless and full of joy."',
    id: '"Semoga perjalanan kalian berdua tak berujung dan penuh kebahagiaan."',
  },
  'home.quote.boysgang': {
    en: '"Everything got answered. This is what real hangout looks like."',
    id: '"Semua udah kejawab. Ini baru namanya nongkrong."',
  },
  'home.quote.girlsgang': {
    en: '"Everyone was heard. This is what a real safe space feels like."',
    id: '"Semua didengar. Ini yang namanya safe space beneran."',
  },
  'home.quote.family': {
    en: '"Every story shared brings this family a little closer."',
    id: '"Setiap cerita yang dibagikan bikin keluarga ini makin dekat."',
  },
  'home.quote.default': {
    en: '"May your love be long-lasting, full and always happy."',
    id: '"Semoga cinta kalian abadi, penuh, dan selalu bahagia."',
  },

  'mode.casual.label': { en: 'Fall in Love', id: 'Jatuh Cinta' },
  'mode.casual.tagline': { en: 'For the early spark', id: 'Untuk percikan awal' },
  'mode.casual.desc': {
    en: 'Light questions to break the ice and discover each other naturally.',
    id: 'Pertanyaan ringan buat mencairkan suasana dan saling mengenal secara alami.',
  },
  'mode.casual.cta': { en: 'Start Casual', id: 'Mulai Santai' },

  'mode.deep.label': { en: 'Deep Talk', id: 'Obrolan Dalam' },
  'mode.deep.tagline': { en: 'For the brave hearts', id: 'Untuk hati yang berani' },
  'mode.deep.desc': {
    en: 'Meaningful questions that build trust and reveal your true selves.',
    id: 'Pertanyaan bermakna yang membangun kepercayaan dan mengungkap jati diri kalian.',
  },
  'mode.deep.cta': { en: 'Start Deep', id: 'Mulai Mendalam' },

  'mode.versus.label': { en: 'Versus Mode', id: 'Mode Versus' },
  'mode.versus.tagline': { en: 'For the competitive souls', id: 'Untuk jiwa yang kompetitif' },
  'mode.versus.desc': {
    en: 'Vote who fits each scenario and crown the winner.',
    id: 'Voting siapa yang paling cocok di tiap skenario dan tentukan pemenangnya.',
  },
  'mode.versus.cta': { en: 'Start Versus', id: 'Mulai Versus' },

  'mode.married.label': { en: 'Married Life', id: 'Kehidupan Menikah' },
  'mode.married.tagline': { en: 'For lifelong partners', id: 'Untuk pasangan seumur hidup' },
  'mode.married.desc': {
    en: 'Strengthen your bond with topics only the committed truly explore.',
    id: 'Perkuat ikatan kalian lewat topik yang hanya dijelajahi pasangan yang benar-benar berkomitmen.',
  },
  'mode.married.cta': { en: 'Start Married', id: 'Mulai Menikah' },

  'mode.boysgang.label': { en: 'Boys Gang', id: 'Boys Gang' },
  'mode.boysgang.tagline': { en: 'Nongkrong legends', id: 'Nongkrong legends' },
  'mode.boysgang.desc': {
    en: 'Break the ice, then go deeper. Make hangout nights with the boys actually mean something.',
    id: 'Cair dulu, makin dalam. Buat malam bareng bocil makin bermakna.',
  },
  'mode.boysgang.cta': { en: 'Start Hangout', id: 'Mulai Nongkrong' },

  'mode.girlsgang.label': { en: 'Girls Gang', id: 'Girls Gang' },
  'mode.girlsgang.tagline': { en: 'Safe space for all', id: 'Safe space buat semua' },
  'mode.girlsgang.desc': {
    en: "Honest, deep, and safe. A girls' night that actually means something.",
    id: 'Jujur, dalam, dan aman. Girls night yang beneran berkesan.',
  },
  'mode.girlsgang.cta': { en: 'Start Girls Night', id: 'Mulai Girling' },

  'mode.family.label': { en: 'Family Time', id: 'Waktu Keluarga' },
  'mode.family.tagline': { en: 'For the ones who raised you', id: 'Untuk mereka yang membesarkanmu' },
  'mode.family.desc': {
    en: 'Warm questions to reconnect with parents and siblings over shared memories.',
    id: 'Pertanyaan hangat buat mempererat hubungan dengan orang tua dan saudara lewat kenangan bersama.',
  },
  'mode.family.cta': { en: 'Start Family', id: 'Mulai Keluarga' },

  'about.missionTitle': { en: 'Our Mission', id: 'Misi Kami' },
  'about.missionDesc': {
    en: 'LoveConnect was born from a simple idea: that the best moments in life are the ones where we truly connect with others. In a world of digital noise, we build tools that help you tune back into what matters.',
    id: 'LoveConnect lahir dari ide sederhana: momen terbaik dalam hidup adalah saat kita benar-benar terhubung dengan orang lain. Di tengah hiruk-pikuk dunia digital, kami membangun alat yang membantu kamu kembali fokus pada hal yang benar-benar penting.',
  },
  'about.card1Title': { en: 'Deepen Intimacy', id: 'Perdalam Keintiman' },
  'about.card1Desc': {
    en: 'Our questions are scientifically curated and AI-refined to bridge the gap between small talk and soul-searching conversations.',
    id: 'Pertanyaan kami dikurasi secara ilmiah dan disempurnakan dengan AI untuk menjembatani basa-basi menuju obrolan yang benar-benar menyentuh jiwa.',
  },
  'about.card2Title': { en: 'Playful Discovery', id: 'Eksplorasi yang Menyenangkan' },
  'about.card2Desc': {
    en: 'We believe that connection doesn\'t always have to be serious. Through Versus Mode, we bring laughter and competition to your bond.',
    id: 'Kami percaya terhubung nggak harus selalu serius. Lewat Mode Versus, kami menghadirkan tawa dan kompetisi seru ke dalam hubungan kalian.',
  },
  'about.card3Title': { en: 'Privacy First', id: 'Privasi Diutamakan' },
  'about.card3Desc': {
    en: 'Your conversations are your own. LoveConnect runs entirely in your browser, ensuring that your intimate moments stay private.',
    id: 'Percakapan kalian adalah milik kalian sendiri. LoveConnect berjalan sepenuhnya di browser kamu, memastikan momen pribadi kalian tetap rahasia.',
  },
  'about.card4Title': { en: 'AI-Powered Magic', id: 'Keajaiban Bertenaga AI' },
  'about.card4Desc': {
    en: 'Leveraging the power of Gemini AI, we ensure that every interaction feels personalized and thoughtfully crafted for you.',
    id: 'Dengan memanfaatkan kekuatan Gemini AI, kami memastikan setiap interaksi terasa personal dan dirancang dengan penuh perhatian untuk kamu.',
  },
  'about.ctaTitle': { en: 'Ready to Connect?', id: 'Siap Terhubung?' },
  'about.ctaDesc': {
    en: 'Join thousands of couples and friends who have transformed their communication through LoveConnect.',
    id: 'Bergabunglah dengan ribuan pasangan dan teman yang telah mengubah cara mereka berkomunikasi lewat LoveConnect.',
  },
  'about.ctaButton': { en: 'Start Journey', id: 'Mulai Perjalanan' },

  'faq.title': { en: 'Frequently Asked', id: 'Pertanyaan Umum' },
  'faq.subtitle': {
    en: 'Everything you need to know about the LoveConnect experience.',
    id: 'Semua yang perlu kamu tahu soal pengalaman LoveConnect.',
  },
  'faq.cat.basics': { en: 'Game Basics', id: 'Dasar Permainan' },
  'faq.cat.modes': { en: 'Game Modes', id: 'Mode Permainan' },
  'faq.cat.privacy': { en: 'Privacy & Technology', id: 'Privasi & Teknologi' },
  'faq.q1': { en: 'What is LoveConnect?', id: 'Apa itu LoveConnect?' },
  'faq.a1': {
    en: 'LoveConnect is an interactive deep conversation and relationship game designed to build stronger bonds, improve communication, and bring fun to your relationship through curated question modes.',
    id: 'LoveConnect adalah permainan obrolan mendalam dan hubungan yang interaktif, dirancang untuk mempererat ikatan, memperbaiki komunikasi, dan menghadirkan keseruan lewat mode pertanyaan yang telah dikurasi.',
  },
  'faq.q2': { en: 'Do we have to answer every question?', id: 'Apakah kami harus jawab semua pertanyaan?' },
  'faq.a2': {
    en: 'No! The goal is to build connection. If a question feels too much, feel free to skip it. The game is just a tool to help you start your own unique conversations.',
    id: 'Tidak! Tujuannya adalah membangun koneksi. Kalau ada pertanyaan yang terasa berat, boleh banget dilewati. Permainan ini cuma alat bantu buat memulai obrolan kalian sendiri.',
  },
  'faq.q3': {
    en: "What's the difference between Casual and Deep modes?",
    id: 'Apa bedanya mode Santai dan Obrolan Dalam?',
  },
  'faq.a3': {
    en: 'Casual Mode is perfect for new relationships or light-hearted fun. Deep Mode is designed for established couples looking to tackle more meaningful and vulnerable topics.',
    id: 'Mode Santai cocok buat hubungan baru atau sekadar seru-seruan ringan. Mode Obrolan Dalam dirancang buat pasangan yang sudah lebih mapan dan ingin membahas topik yang lebih bermakna dan terbuka.',
  },
  'faq.q4': { en: 'How does Versus Mode work?', id: 'Bagaimana cara kerja Mode Versus?' },
  'faq.a4': {
    en: 'Versus Mode is a fun, lighthearted way to see who knows who best or who is more likely to do something. Points are tracked, and the winner gets bragging rights!',
    id: 'Mode Versus adalah cara seru dan santai buat lihat siapa yang paling saling kenal atau siapa yang paling mungkin melakukan sesuatu. Poin dicatat, dan pemenangnya berhak pamer!',
  },
  'faq.q5': { en: 'Is Married Life only for married people?', id: 'Apakah Kehidupan Menikah cuma buat yang sudah menikah?' },
  'faq.a5': {
    en: "Not at all! While it focuses on long-term commitment and building a home together, it's great for any couple who is serious about their future together.",
    id: 'Sama sekali tidak! Meski berfokus pada komitmen jangka panjang dan membangun rumah tangga bersama, mode ini cocok buat pasangan mana pun yang serius soal masa depan bersama.',
  },
  'faq.q6': { en: 'Where is my data stored?', id: 'Di mana data saya disimpan?' },
  'faq.a6': {
    en: "LoveConnect is a privacy-first app. All game logic runs locally in your browser. We don't save your answers or personal data on any server.",
    id: 'LoveConnect mengutamakan privasi. Semua logika permainan berjalan lokal di browser kamu. Kami tidak menyimpan jawaban atau data pribadi kamu di server mana pun.',
  },
  'faq.q7': { en: 'Is an AI generating these questions?', id: 'Apakah pertanyaan ini dibuat oleh AI?' },
  'faq.a7': {
    en: 'Some of our questions are crafted and refined using Gemini AI to ensure they are high-quality and impactful, but the majority are curated based on relationship science.',
    id: 'Sebagian pertanyaan kami disusun dan disempurnakan menggunakan Gemini AI agar berkualitas dan berdampak, namun sebagian besar dikurasi berdasarkan ilmu hubungan.',
  },
  'faq.stillQuestions': {
    en: 'Still have questions? Feel free to reach out to us!',
    id: 'Masih ada pertanyaan? Jangan ragu buat hubungi kami!',
  },
  'faq.contactSupport': { en: 'Contact Support', id: 'Hubungi Dukungan' },

  'contact.title': { en: 'Get in Touch', id: 'Hubungi Kami' },
  'contact.desc': {
    en: "Have questions, feedback, or just want to say hi? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.",
    id: 'Punya pertanyaan, masukan, atau cuma mau say hi? Kami senang banget dengar dari kamu. Isi formulir di bawah dan kami akan balas secepatnya.',
  },
  'contact.emailUs': { en: 'Email Us', id: 'Email Kami' },
  'contact.ourStudio': { en: 'Our Studio', id: 'Studio Kami' },
  'contact.studioLocation': { en: 'Bandung, West Java, Indonesia', id: 'Bandung, Jawa Barat, Indonesia' },
  'contact.whatsapp': { en: 'WhatsApp', id: 'WhatsApp' },
  'contact.messageSent': { en: 'Message Sent!', id: 'Pesan Terkirim!' },
  'contact.thanks': {
    en: "Thank you for reaching out. We'll get back to you soon.",
    id: 'Terima kasih sudah menghubungi kami. Kami akan segera membalas.',
  },
  'contact.fullName': { en: 'Full Name', id: 'Nama Lengkap' },
  'contact.namePlaceholder': { en: 'Enter your name', id: 'Masukkan nama kamu' },
  'contact.emailAddress': { en: 'Email Address', id: 'Alamat Email' },
  'contact.subject': { en: 'Subject', id: 'Subjek' },
  'contact.selectSubject': { en: 'Select a subject', id: 'Pilih subjek' },
  'contact.generalFeedback': { en: 'General Feedback', id: 'Masukan Umum' },
  'contact.gameSupport': { en: 'Game Support', id: 'Bantuan Permainan' },
  'contact.partnership': { en: 'Partnership Inquiry', id: 'Kerja Sama' },
  'contact.other': { en: 'Other', id: 'Lainnya' },
  'contact.message': { en: 'Message', id: 'Pesan' },
  'contact.messagePlaceholder': { en: "Tell us what's on your mind...", id: 'Ceritakan apa yang ada di pikiran kamu...' },
  'contact.sendMessage': { en: 'Send Message', id: 'Kirim Pesan' },
} satisfies Record<string, Entry>;

export type TranslationKey = keyof typeof translations;
