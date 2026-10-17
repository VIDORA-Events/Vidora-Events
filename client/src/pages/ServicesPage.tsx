import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../types/index.js';

export const ServicesPage: React.FC = () => {

  // Natural Sri Lankan luxury event offerings
  const defaultServices: Service[] = [
    {
      id: '1',
      slug: 'milestone-birthdays-island-celebrations',
      title: 'Birthday Parties & Milestone Celebrations',
      subtitle: 'Meaningful milestones, unforgettable celebrations',
      description:
        'From elegant 50th birthday dinners to lively 21st birthday poolside parties, we plan celebrations that bring people together in style. With personalized décor, delicious food, great music, and carefully coordinated entertainment, we take care of every detail so you can focus on celebrating with the people who matter most.',
      highlights: [
        'Personalized themes, photo backdrops, and stylish entrance décor',
        'DJs, live musicians, professional sound systems, and lighting',
        'Customized catering, BBQ stations, Sri Lankan fusion menus, and beverage arrangements',
        'Venue selection, including private villas, garden spaces, and boutique hotels',
      ],
      imageUrl: '/images/birthday.jpeg',
      sortOrder: 1,
      isActive: true,
    },
    {
      id: '2',
      slug: 'cliffside-sunset-proposals',
      title: 'Surprise Marriage Proposals',
      subtitle: 'Beautifully planned. Secretly arranged. Forever remembered.',
      description:
        'Ready to pop the question? We create unforgettable proposal experiences in some of Sri Lanka\'s most romantic settings. Picture a private ocean-view proposal at sunset, a secluded beach dinner beneath the stars, or an intimate escape surrounded by misty tea hills. From romantic décor and fresh flowers to live acoustic music, photography, and private dining, we take care of every detail while keeping your plans discreet.',
      highlights: [
        'Scouting romantic beach, ocean-view, and hill-country locations',
        'Fairy lights, lantern pathways, floral arches, and personalized décor',
        'Discreet professional photography and videography to capture the special moment',
        'Private candlelit dinners and customized dining arrangements',
        'Optional celebratory beverages and personalized finishing touches',
      ],
      imageUrl: '/images/proposal.jpeg',
      sortOrder: 2,
      isActive: true,
    },
    {
      id: '3',
      slug: 'corporate-summits-brand-retreats',
      title: 'Corporate Functions & Annual Dinner Dances',
      subtitle: 'Professional planning. Flawless execution.',
      description:
        'From annual dinner dances and awards ceremonies to corporate networking evenings and product launches, we organize business events that leave a lasting impression. We coordinate stage production, LED displays, professional sound and lighting, entertainment, VIP arrangements, and catering to ensure a seamless experience for your team, clients, and guests.',
      highlights: [
        'Stage design, trussing, LED displays, sound systems, and professional lighting',
        'Live bands, DJs, professional entertainment, and bilingual emcees',
        'VIP guest coordination, registration desks, and customized corporate gifts',
        'Venue selection, including luxury hotel ballrooms and convention halls',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 3,
      isActive: true,
    },
    {
      id: '4',
      slug: 'anniversaries-bawa-estate-galas',
      title: 'Anniversaries & Family Get-Togethers',
      subtitle: 'Meaningful milestones. Moments to cherish.',
      description:
        'From silver and golden wedding anniversaries to cherished family reunions and intimate celebrations, we plan heartfelt gatherings that bring generations together. Whether hosted in a beautiful garden, a charming heritage villa, or the comfort of your family home, every detail is thoughtfully arranged, from personalized menus and nostalgic photo displays to beautiful décor and entertainment that brings everyone closer.',
      highlights: [
        'Venue selection, from private villas and garden settings to intimate home celebrations',
        'Customized menus, family-style dining, and traditional Sri Lankan sweet tables',
        'Live acoustic music, personalized playlists, and entertainment suited to the occasion',
        'Professional photography, videography, and nostalgic photo displays to preserve precious memories',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 4,
      isActive: true,
    },
    {
      id: '5',
      slug: 'bespoke-ceylon-expeditions',
      title: 'Private Beach & Villa Parties',
      subtitle: 'Exceptional settings. Celebrations without limits.',
      description:
        'Looking for something beyond the ordinary? From private villa celebrations and sunset boat trips to beachfront gatherings and scenic hill-country retreats, we plan unique experiences tailored to your vision. With carefully selected venues, personalized décor, exceptional dining, and dedicated coordination, we take care of the details so you can enjoy every moment with your guests.',
      highlights: [
        'Private villa bookings, beachfront properties, and exclusive event venues',
        'Boat charters and sunset cruises for private celebrations, subject to availability',
        'Seafood BBQs, customized menus, and curated beverage arrangements',
        'Dedicated event coordination and on-site support throughout your celebration',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 5,
      isActive: true,
    },
    {
      id: '6',
      slug: 'destination-weddings-poruwa',
      title: 'Weddings, Poruwa & Homecoming Receptions',
      subtitle: 'Honouring tradition. Celebrating your love story.',
      description:
        'From traditional Sri Lankan Poruwa ceremonies and elegant church weddings to beautiful homecoming receptions and romantic beachfront celebrations, we coordinate every detail with care. From beautifully styled Poruwa structures and fresh Saman Pichcha garlands to traditional Magul Bera drummers, Jayamangala Gatha, and seamless reception arrangements, we bring your celebration together while you enjoy every moment of your special day.',
      highlights: [
        'Customized Poruwa styling, traditional Magul Bera drummers, and Jayamangala Gatha arrangements',
        'Fresh floral arrangements featuring jasmine, lotus, roses, and tropical blooms',
        'Venue selection and booking, from hotel ballrooms and beachfront villas to heritage venues',
        'Professional sound, lighting, DJs, live bands, and reception coordination',
      ],
      imageUrl: '/images/wedding.jpeg',
      sortOrder: 6,
      isActive: true,
    },
  ];

  const services = defaultServices;

  return (
    <div className="py-16 md:py-24 space-y-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-3.5">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          Our Services
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal">
          Every Occasion, Beautifully Planned.
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-2xl mx-auto leading-relaxed">
          From milestone birthdays and romantic proposals to corporate galas, intimate gatherings, and bespoke weddings, we bring your vision to life with thoughtful planning and attention to detail across Sri Lanka.
        </p>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.slug || service.id}
                id={service.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-200 shadow-md rounded-sm relative group">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-1.5">
                    <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
                      Service 0{index + 1}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
                      {service.title}
                    </h2>
                    {service.subtitle && (
                      <p className="font-sans text-stone-500 text-sm">
                        {service.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="font-sans text-sm text-luxury-charcoal/80 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  {service.highlights && service.highlights.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="font-sans text-xs uppercase tracking-wider text-luxury-taupe font-semibold">
                        What We Include:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {service.highlights.map((item, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start space-x-2 text-xs font-sans text-luxury-charcoal/85"
                          >
                            <Check className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-3">
                    <Link
                      to={`/inquire?type=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-luxury-charcoal text-luxury-ivory hover:bg-black font-sans text-xs tracking-wider uppercase transition-all duration-200 shadow-sm rounded-sm font-semibold"
                    >
                      <span>Inquire for {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* Honest Pricing Note */}
      <section className="max-w-4xl mx-auto px-6 text-center bg-luxury-white p-10 border border-luxury-taupe/20 space-y-3.5 shadow-sm rounded-sm">
        <Sparkles className="w-6 h-6 text-luxury-gold mx-auto" />
        <h3 className="font-serif text-2xl text-luxury-charcoal">
          Honest & Transparent Pricing
        </h3>
        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/80 leading-relaxed max-w-2xl mx-auto">
          Every celebration is unique, with costs shaped by your guest count, venue, décor, and personal preferences. We provide a detailed, itemized quotation tailored to your event, helping you understand your costs clearly, with no unexpected charges or hidden fees.
        </p>
        <div className="pt-2">
          <Link
            to="/inquire"
            className="inline-block text-xs font-sans uppercase tracking-wider text-luxury-gold hover:text-luxury-charcoal underline underline-offset-4 font-semibold"
          >
            Get a Free Custom Quote &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};
