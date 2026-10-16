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
        'Custom theme styling, photobooth backdrops & entrance decor',
        'Top DJs, live acoustic singers, and professional sound & lighting',
        'Delicious catering: BBQ stations, Sri Lankan fusion, and cocktail bars',
        'Private villa, lawn, or boutique hotel reservations',
      ],
      imageUrl: '/images/birthday.jpeg',
      sortOrder: 1,
      isActive: true,
    },
    {
      id: '2',
      slug: 'cliffside-sunset-proposals',
      title: 'Surprise Marriage Proposals',
      subtitle: 'Romantic setups in complete secrecy',
      description:
        'Planning to pop the question? We create magical, intimate proposal settings across Sri Lanka. Imagine a private cliffside overlooking the ocean at sunset with glowing oil lamps, a secluded golden beach dinner under the stars, or an intimate retreat nestled in the misty tea hills. We organize live acoustic music, flowers, photography, and champagne dinners in 100% secrecy.',
      highlights: [
        'Secret beach, cliffside, and hill country location scouting',
        'Romantic fairy lights, lantern pathways, and fresh flower arches',
        'Hidden professional photographer and videographer to capture the moment',
        'Private candlelit dinner and celebratory champagne or wine',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 2,
      isActive: true,
    },
    {
      id: '3',
      slug: 'corporate-summits-brand-retreats',
      title: 'Corporate Functions & Annual Dinner Dances',
      subtitle: 'Professional, seamless events for top companies and brands',
      description:
        'Company annual dinner dances, awards nights, corporate cocktail evenings, and product launches organized with precision. We handle LED walls, state-of-the-art stage setups, emcees, live bands, VIP protocol, and catering for 50 to 1,000+ corporate guests.',
      highlights: [
        'Stage, trussing, LED displays, and professional audio/visual production',
        'Popular Sri Lankan live bands, top DJs, and bilingual emcees',
        'VIP protocol, registration desk, and corporate gifting solutions',
        'Venue booking across premier luxury hotel ballrooms and convention halls',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 3,
      isActive: true,
    },
    {
      id: '4',
      slug: 'anniversaries-bawa-estate-galas',
      title: 'Anniversaries & Family Get-Togethers',
      subtitle: 'Intimate gatherings honoring family and lifetime milestones',
      description:
        'Silver jubilees, golden wedding anniversaries, and family reunions held in elegant colonial villas, lush garden estates, or private family residences. We curate warm, heartfelt evenings with nostalgic photo galleries, customized family menus, classical acoustic music, and personalized guest favors.',
      highlights: [
        'Exclusive access to private heritage homes, garden estates & villas',
        'Customized family multi-course banquets and traditional sweet tables',
        'Acoustic violinists, saxophonists, and nostalgic playlist curation',
        'Full photography and videography for lasting family heirlooms',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 4,
      isActive: true,
    },
    {
      id: '5',
      slug: 'bespoke-ceylon-expeditions',
      title: 'Private Beach & Villa Parties',
      subtitle: 'Custom gatherings tailored to your imagination',
      description:
        'Looking for something truly unique? We organize private villa weekend retreats, private catamaran yacht celebrations, luxury safari camping banquets, and scenic hill country bungalow getaways. Tell us your dream and we will bring it to life.',
      highlights: [
        'Complete private villa buyouts and luxury seaside estates',
        'Private catamaran and boat charters for sunset celebrations',
        'Fresh seafood BBQ grill stations and signature Ceylon cocktail bars',
        'Dedicated event coordinator on-site throughout your stay',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 5,
      isActive: true,
    },
    {
      id: '6',
      slug: 'destination-weddings-poruwa',
      title: 'Weddings, Poruwa & Homecoming Receptions',
      subtitle: 'Thoughtful coordination from rituals to evening celebration',
      description:
        'Whether you want a traditional Sri Lankan Poruwa ceremony, an elegant church blessing, or a romantic beachfront reception, we handle every detail. From hand-crafted Poruwa structures and fresh Saman Pichcha (jasmine) garlands to traditional Magul Bera drummers and banquet coordination, your day will be stress-free and unforgettable.',
      highlights: [
        'Custom Poruwa design, traditional Magul Bera drummers & Jayamangala Gatha',
        'Stunning floral arrangements (fresh jasmine, lotus, roses & tropical blooms)',
        'Venue selection & booking across luxury hotel ballrooms, beach villas & heritage estates',
        'Sound, lighting, DJ / live band setup, and reception coordination',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85',
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
          Every event in Sri Lanka is unique in terms of guest count, venue choice, and styling preferences. We provide a clear, itemized quotation with zero hidden markups so you know exactly where every rupee or dollar is invested.
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
