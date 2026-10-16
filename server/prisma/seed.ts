import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\nSeeding VIDORA EVENTS SRI LANKA database with authentic Sri Lankan events...');

  // 1. Services
  console.log('Seeding Sri Lanka services...');
  const services = [
    {
      slug: 'destination-weddings-poruwa',
      title: 'Weddings, Poruwa & Homecoming Receptions',
      subtitle: 'Complete coordination from morning traditions to midnight dancing',
      description:
        'Whether you want a traditional Sri Lankan Poruwa ceremony, an elegant church wedding, or a romantic beachfront reception, we handle every detail. From hand-crafted Poruwa structures and fresh Saman Pichcha (jasmine) garlands to traditional Magul Bera drummers and full banquet coordination, your wedding will be stress-free and unforgettable.',
      highlights: [
        'Custom Poruwa design, traditional Magul Bera drummers & Jayamangala Gatha',
        'Stunning floral arrangements (fresh jasmine, lotus, roses & tropical blooms)',
        'Venue selection & booking across luxury hotel ballrooms, beach villas & heritage estates',
        'Sound, lighting, DJ / live band setup, and reception coordination',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 1,
      isActive: true,
    },
    {
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
      slug: 'milestone-birthdays-island-celebrations',
      title: 'Birthday Parties & Milestone Celebrations',
      subtitle: 'Memorable 21st, 50th, and milestone celebrations',
      description:
        'Celebrate big birthdays with great music, vibrant decor, and delicious food. Whether you are hosting an intimate 50th birthday dinner for family or an energetic 21st birthday poolside party with a top DJ, we manage the styling, catering, sound systems, bar setup, and entertainment from start to finish.',
      highlights: [
        'Custom theme styling, photobooth backdrops & entrance decor',
        'Top DJs, live acoustic singers, and professional sound & lighting',
        'Delicious catering: BBQ stations, Sri Lankan fusion, and cocktail bars',
        'Private villa, lawn, or boutique hotel reservations',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85',
      sortOrder: 3,
      isActive: true,
    },
    {
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
      sortOrder: 5,
      isActive: true,
    },
    {
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
      sortOrder: 6,
      isActive: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 2. Portfolio Projects
  console.log('Seeding Sri Lanka portfolio projects...');
  const projects = [
    {
      slug: 'galle-fort-dutch-colonial-wedding',
      title: 'Dilshan & Nimara’s Wedding at Galle Fort',
      category: 'Weddings',
      location: 'Galle Fort, Sri Lanka',
      date: 'January 2025',
      guestCount: 150,
      shortDesc: 'A traditional morning Poruwa ceremony followed by a lively dinner dance overlooking the Galle Fort ramparts.',
      fullDesc:
        'Dilshan and Nimara live in Melbourne and wanted a wedding in Sri Lanka that honored their roots while providing their international guests with an unforgettable vacation.\n\nThe morning began with an auspicious Nekath Poruwa ceremony on the lawns of a Dutch colonial courtyard in Galle Fort. The custom Poruwa was hand-carved in Moratuwa and swathed in fresh Saman Pichcha (jasmine) garlands and pink lotus flowers. Master Magul Bera drummers and traditional Kandyan dancers led the couple onto the Poruwa as the auspicious Jayamangala Gatha blessings were chanted.\n\nIn the evening, the celebration transitioned into an open-air dinner dance beneath hundreds of fairy lights. Guests enjoyed fresh king coconut cocktails, an authentic hoppers live action station alongside a gourmet seafood buffet, and danced until 2:00 AM to a popular Sri Lankan 7-piece live band.',
      coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      slug: 'cape-weligama-sunset-proposal',
      title: 'Sunset Beachfront Proposal in Weligama',
      category: 'Proposals',
      location: 'Cape Weligama, Sri Lanka',
      date: 'December 2024',
      guestCount: 2,
      shortDesc: 'A surprise candlelit proposal on the cliffs of Weligama with live acoustic flute and a private beach dinner.',
      fullDesc:
        'Kavinda contacted us three weeks before his holiday to plan the perfect surprise proposal for Shannon. He wanted a setting that was romantic, completely private, and breathtaking.\n\nWe reserved a private headland overlooking the Weligama bay and set up over 200 traditional brass oil lamps and a walkway covered in white frangipani blossoms. A private acoustic flutist was tucked away playing her favorite melody as Kavinda guided Shannon to the edge at sunset.\n\nOur discreet photographer captured the exact moment on film. Afterwards, the newly engaged couple sat down to a private seafood dinner and celebrated with champagne under the stars.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
    },
    {
      slug: 'bentota-beachfront-homecoming',
      title: 'Amanda & Roshan’s Homecoming in Bentota',
      category: 'Weddings',
      location: 'Bentota Beach, Sri Lanka',
      date: 'November 2024',
      guestCount: 180,
      shortDesc: 'A stylish seaside homecoming reception with traditional Sri Lankan welcome drinks and a live 7-piece band.',
      fullDesc:
        'Held at a private beachfront lawn in Bentota, guests enjoyed fresh King Coconut (thambili) welcome drinks, a mouthwatering seafood buffet, and non-stop dancing under palm trees strung with warm festoon lights.',
      coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
    },
    {
      slug: 'colombo-cinnamon-gardens-birthday',
      title: '50th Birthday Party at Colombo 07',
      category: 'Celebrations',
      location: 'Cinnamon Gardens, Colombo',
      date: 'October 2024',
      guestCount: 80,
      shortDesc: 'An intimate garden birthday dinner with live acoustic jazz and a custom dessert and sweet table.',
      fullDesc:
        'A private heritage residence in Cinnamon Gardens transformed into an ambient evening soirée with customized lighting, live jazz, and a custom dessert bar featuring both traditional sweet delicacies and artisan cakes.',
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 4,
    },
    {
      slug: 'port-city-colombo-annual-gala',
      title: 'Annual Corporate Gala at Colombo Port City',
      category: 'Corporate',
      location: 'Colombo Port City',
      date: 'August 2024',
      guestCount: 250,
      shortDesc: 'A grand company dinner dance and awards ceremony featuring an LED stage, top live band, and full production.',
      fullDesc:
        'Full event production including stage fabrication, intelligent lighting, sound engineering, bilingual emcees, and seamless dinner coordination for over 250 corporate executives.',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: false,
      isPublished: true,
      sortOrder: 5,
    },
    {
      slug: 'nuwara-eliya-tea-estate-anniversary',
      title: '25th Anniversary in Nuwara Eliya',
      category: 'Celebrations',
      location: 'Nuwara Eliya / Hatton',
      date: 'July 2024',
      guestCount: 40,
      shortDesc: 'A cozy family silver jubilee in a colonial tea planter bungalow with a bonfire and roast dinner.',
      fullDesc:
        'An intimate hill-country family celebration with outdoor fire pits, acoustic guitar melodies, and a formal three-course dinner inside a restored heritage tea bungalow.',
      coverImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      ],
      isFeatured: false,
      isPublished: true,
      sortOrder: 6,
    },
  ];

  for (const p of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 3. Testimonials
  console.log('Seeding Sri Lanka testimonials...');
  const testimonials = [
    {
      clientName: 'Dilshan & Nimara Perera',
      eventTitle: 'Destination Coastal Wedding',
      location: 'Southern Coast, Sri Lanka',
      quote:
        'We were living in Melbourne and planning our destination wedding in Sri Lanka. VIDORA took care of everything from the Poruwa ceremony to the dinner dance. Our families and overseas guests had the time of their lives!',
      rating: 5,
      isPublished: true,
      sortOrder: 1,
    },
    {
      clientName: 'Kavinda & Shannon W.',
      eventTitle: 'Sunset Beach Proposal',
      location: 'Sri Lanka',
      quote:
        'The surprise proposal setup on the beach was beyond what I imagined. The lanterns, the flower walkway, and the private dinner were set up in complete secret. She said YES!',
      rating: 5,
      isPublished: true,
      sortOrder: 2,
    },
    {
      clientName: 'Dr. Mahesh & Family',
      eventTitle: '70th Milestone Birthday Celebration',
      location: 'Private Heritage Residence, Sri Lanka',
      quote:
        'They organized my father’s 70th birthday celebration at our private family garden. The food, lighting, and live acoustic music were top-notch. Highly recommended for any family event.',
      rating: 5,
      isPublished: true,
      sortOrder: 3,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // 4. FAQs
  console.log('Seeding Sri Lanka FAQs...');
  const faqs = [
    {
      category: 'Planning From Overseas',
      question: 'Can you plan our wedding if we live abroad (Australia, UK, Canada, Dubai)?',
      answer:
        'Yes, absolutely! More than half of our couples live overseas. We coordinate everything around your time zone via WhatsApp, voice notes, and Zoom calls. We send you photo and video updates of venues and decor options, and if your parents or relatives are in Sri Lanka, we happily meet them in person to finalize details smoothly.',
      sortOrder: 1,
      isPublished: true,
    },
    {
      category: 'Traditions & Rituals',
      question: 'Do you arrange traditional Poruwa ceremonies as well as church weddings?',
      answer:
        'Yes, we manage traditional Sinhala Poruwa ceremonies, Tamil Hindu weddings, Christian church weddings, and civil registrations. For Poruwa ceremonies, we provide custom wooden Poruwas decorated with fresh Saman Pichcha (jasmine) and lotus flowers, coordinated traditional Magul Bera drummers, Kandyan dancers, Jayamangala Gatha, and Ashtaka reciters.',
      sortOrder: 2,
      isPublished: true,
    },
    {
      category: 'Best Months & Monsoons',
      question: 'When is the best time for beach and outdoor weddings in Sri Lanka?',
      answer:
        'The best weather for beach and outdoor coastal celebrations is from December to late April, offering sunny skies, calm waters, and dry evening breezes. If you are planning an event during other months, we recommend climate-controlled luxury ballrooms or scenic hill-country estates.',
      sortOrder: 3,
      isPublished: true,
    },
    {
      category: 'Budgets & Fees',
      question: 'How do your planning fees and payments work?',
      answer:
        'We do not push rigid, overpriced packages. We charge a fair, transparent planning fee to manage your event from start to finish. All hotel bookings, catering, florists, and band fees are billed transparently with zero hidden markups. You can make payments conveniently in Sri Lankan Rupees (LKR) or foreign currency (USD, AUD, GBP, EUR) via direct bank transfer or card.',
      sortOrder: 4,
      isPublished: true,
    },
    {
      category: 'Vendors & Bands',
      question: 'Can we bring our own photographers, DJ, or live band?',
      answer:
        'Yes, of course! You are free to bring in your own favorite vendors. If you need recommendations, we also connect you with Sri Lanka’s top wedding photographers, videographers, popular live bands, and DJs who we know and trust for reliable quality.',
      sortOrder: 5,
      isPublished: true,
    },
    {
      category: 'Booking Timeline',
      question: 'How far in advance should we start planning?',
      answer:
        'For peak wedding seasons in Sri Lanka (December, January, February, August), popular hotels and venues get reserved 6 to 12 months in advance. For birthday parties, marriage proposals, or corporate dinners, we can organize everything smoothly on 3 to 6 weeks’ notice.',
      sortOrder: 6,
      isPublished: true,
    },
  ];

  await prisma.faq.deleteMany();
  for (const f of faqs) {
    await prisma.faq.create({ data: f });
  }

  // 5. Business Settings
  console.log('Seeding Sri Lanka business settings...');
  const settings = [
    { key: 'brand_name', value: 'VIDORA EVENTS SRI LANKA', description: 'Brand Name' },
    { key: 'tagline', value: 'Making Your Special Day Unforgettable.', description: 'Brand Tagline' },
    { key: 'concierge_email', value: 'hello@vidoraevents.lk', description: 'Customer Inquiries Email' },
    { key: 'concierge_phone', value: '+94 77 123 4567', description: 'Hotline / WhatsApp' },
    { key: 'atelier_address', value: 'Ward Place, Cinnamon Gardens, Colombo 07, Sri Lanka', description: 'Colombo Office' },
    { key: 'southern_pavilion', value: 'Church Street, Galle Fort, Sri Lanka', description: 'Galle Office' },
    { key: 'instagram_handle', value: '@vidora.events.lk', description: 'Official Instagram' },
  ];

  for (const set of settings) {
    await prisma.businessSetting.upsert({
      where: { key: set.key },
      update: set,
      create: set,
    });
  }

  console.log('✓ Seeding complete! Database is populated with authentic Sri Lankan events.');
}

main()
  .catch((e) => {
    console.error('✗ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
