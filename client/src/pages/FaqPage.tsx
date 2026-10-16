import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles, ArrowRight, Phone } from 'lucide-react';
import { fetchFaqs } from '../services/api.js';
import { Faq } from '../types/index.js';

export const FaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultFaqs: Faq[] = [
    {
      id: 'f1',
      category: 'Planning From Overseas',
      question: 'Can you plan our wedding if we live abroad (Australia, UK, Canada, Dubai)?',
      answer:
        'Yes, absolutely! More than half of our couples live overseas. We coordinate everything around your time zone via WhatsApp, voice notes, and Zoom calls. We send you photo and video updates of venues and decor options, and if your parents or relatives are in Sri Lanka, we happily meet them in person to finalize details smoothly.',
      sortOrder: 1,
    },
    {
      id: 'f2',
      category: 'Traditions & Rituals',
      question: 'Do you arrange traditional Poruwa ceremonies as well as church weddings?',
      answer:
        'Yes, we manage traditional Sinhala Poruwa ceremonies, Tamil Hindu weddings, Christian church weddings, and civil registrations. For Poruwa ceremonies, we provide custom wooden Poruwas decorated with fresh Saman Pichcha (jasmine) and lotus flowers, coordinated traditional Magul Bera drummers, Kandyan dancers, Jayamangala Gatha, and Ashtaka reciters.',
      sortOrder: 2,
    },
    {
      id: 'f3',
      category: 'Best Months & Monsoons',
      question: 'When is the best time for beach and outdoor weddings in Sri Lanka?',
      answer:
        'The best weather for beach and outdoor coastal celebrations is from December to late April, offering sunny skies, calm waters, and dry evening breezes. If you are planning an event during other months, we recommend climate-controlled luxury ballrooms or scenic hill-country estates.',
      sortOrder: 3,
    },
    {
      id: 'f4',
      category: 'Budgets & Fees',
      question: 'How do your planning fees and payments work?',
      answer:
        'We do not push rigid, overpriced packages. We charge a fair, transparent planning fee to manage your event from start to finish. All hotel bookings, catering, florists, and band fees are billed transparently with zero hidden markups. You can make payments conveniently in Sri Lankan Rupees (LKR) or foreign currency (USD, AUD, GBP, EUR) via direct bank transfer or card.',
      sortOrder: 4,
    },
    {
      id: 'f5',
      category: 'Vendors & Bands',
      question: 'Can we bring our own photographers, DJ, or live band?',
      answer:
        'Yes, of course! You are free to bring in your own favorite vendors. If you need recommendations, we also connect you with Sri Lanka’s top wedding photographers, videographers, popular live bands, and DJs who we know and trust for reliable quality.',
      sortOrder: 5,
    },
    {
      id: 'f6',
      category: 'Booking Timeline',
      question: 'How far in advance should we start planning?',
      answer:
        'For peak wedding seasons in Sri Lanka (December, January, February, August), popular hotels and venues get reserved 6 to 12 months in advance. For birthday parties, marriage proposals, or corporate dinners, we can organize everything smoothly on 3 to 6 weeks’ notice.',
      sortOrder: 6,
    },
  ];

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchFaqs();
        if (res.success && res.data.faqs?.length) {
          setFaqs(res.data.faqs);
        } else {
          setFaqs(defaultFaqs);
        }
      } catch (err) {
        setFaqs(defaultFaqs);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-16 md:py-24 space-y-16">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-3.5">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          Got Questions?
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-2xl mx-auto leading-relaxed">
          Here are simple, helpful answers to the questions couples and families ask us most about planning events in Sri Lanka.
        </p>
      </section>

      {/* Accordion FAQ list */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id || (openId === null && idx === 0);
            return (
              <div
                key={faq.id}
                className="bg-luxury-white border border-luxury-taupe/20 rounded-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-4">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-luxury-gold font-semibold block">
                      {faq.category}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-luxury-charcoal">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-luxury-taupe shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-luxury-gold' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-luxury-taupe/10 animate-fadeIn">
                    <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call / WhatsApp Banner */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-luxury-white p-8 sm:p-10 border border-luxury-taupe/30 text-center space-y-3.5 rounded-sm">
          <Sparkles className="w-5 h-5 text-luxury-gold mx-auto" />
          <h3 className="font-serif text-2xl text-luxury-charcoal">
            Have a question about your upcoming event?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 max-w-xl mx-auto leading-relaxed">
            Give us a quick call or message us on WhatsApp. Our friendly event coordinators are always happy to answer your questions.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+94771234567"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-luxury-charcoal text-luxury-ivory hover:bg-black font-sans text-xs tracking-wider uppercase transition-all duration-200 font-semibold rounded-sm"
            >
              <Phone className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Call / WhatsApp: +94 77 123 4567</span>
            </a>
            <Link
              to="/inquire"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white font-sans text-xs tracking-wider uppercase transition-all duration-200 font-semibold rounded-sm"
            >
              <span>Send Online Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
