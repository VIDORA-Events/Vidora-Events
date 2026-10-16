import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Sparkles, Shield, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {

  const categories = [
    {
      title: 'Birthdays & Milestone Celebrations',
      description: 'From milestone birthdays and silver anniversaries to intimate family dinners, we create unforgettable celebrations with beautiful décor, exceptional dining, and entertainment tailored to your style.',
      image: '/images/birthday.jpeg',
      link: '/services#celebrations',
    },
    {
      title: 'Surprise Marriage Proposals',
      description: 'From dreamy candlelit settings and private beach dinners under the stars to acoustic music and thoughtful details, we create unforgettable proposal experiences while keeping every surprise a secret.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      link: '/services#proposals',
    },
    {
      title: 'Corporate Functions & Annual Galas',
      description: 'From annual dinners and awards ceremonies to product launches and brand conferences, we deliver seamless corporate events with professional sound, lighting, and stage production.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      link: '/services#corporate',
    },
    {
      title: 'Weddings & Poruwa Ceremonies',
      description: 'From traditional Poruwa ceremonies and elegant church weddings to grand receptions, we bring your vision to life with thoughtful styling and beautiful venues, from luxury hotels to beachfront villas and heritage estates.',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      link: '/services#weddings',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Vision & Theme',
      subtitle: 'Your vision, thoughtfully brought to life.',
      description:
        'We start by understanding your occasion, ideas, and personal style. Whether you are planning a milestone birthday, a romantic sunset proposal, a corporate gala, or a wedding, we develop a cohesive concept that reflects your vision.',
    },
    {
      number: '02',
      title: 'Budget & Timeline',
      subtitle: 'Clear planning, every step of the way.',
      description:
        'We create a detailed budget and a practical planning timeline tailored to your needs. With transparent cost breakdowns and clear communication, you will know what to expect at every stage, whether you are paying in Sri Lankan rupees or foreign currency.',
    },
    {
      number: '03',
      title: 'Vendor Curation',
      subtitle: 'The right people to make it happen.',
      description:
        'We help you find suitable venues and trusted event professionals, from photographers, DJs, and live bands to decorators, caterers, and traditional drummers. Every recommendation is guided by your style, requirements, and budget.',
    },
    {
      number: '04',
      title: 'Design & Styling',
      subtitle: 'Every detail, beautifully considered.',
      description:
        'From bespoke backdrops, atmospheric lighting, and floral arrangements to elegant entrance displays, dessert tables, and personalized stationery, we bring your event concept to life with thoughtful styling and attention to detail.',
    },
    {
      number: '05',
      title: 'Planning & Coordination',
      subtitle: 'Everything working together seamlessly.',
      description:
        'We coordinate vendors, schedules, logistics, and event layouts to keep everything on track. For clients planning from overseas, we provide convenient WhatsApp updates and scheduled check-ins to keep communication simple across time zones.',
    },
    {
      number: '06',
      title: 'Event-Day Management',
      subtitle: 'You enjoy the moment. We handle the details.',
      description:
        'On the day, we oversee the schedule, vendor arrivals, key moments, and on-site coordination. Our goal is to keep everything running smoothly behind the scenes, so you and your loved ones can focus on celebrating.',
    },
  ];

  const testimonials = [
    {
      quote:
        'We were living in Melbourne and planning our destination wedding in Sri Lanka. VIDORA took care of everything from the Poruwa ceremony to the dinner dance. Our families and overseas guests had the time of their lives!',
      client: 'Dilshan & Nimara Perera',
      event: 'Destination Coastal Wedding',
    },
    {
      quote:
        'The surprise proposal setup on the beach was beyond what I imagined. The lanterns, the flower walkway, and the private dinner were set up in complete secret. She said YES!',
      client: 'Kavinda & Shannon W.',
      event: 'Sunset Beach Proposal',
    },
    {
      quote:
        'They organized my father’s 70th birthday celebration at our private family garden. The food, lighting, and live acoustic music were top-notch. Highly recommended for any family event.',
      client: 'Dr. Mahesh & Family',
      event: '70th Milestone Birthday Celebration',
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* 1. Warm & Natural Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/birthday.jpeg"
            alt="luxury birthday celebration with festive party decor and glowing lights"
            className="w-full h-full object-cover object-center brightness-[0.68] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-ivory via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-10">
          {/* <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-luxury-white text-xs tracking-wider uppercase"> */}
            {/* <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> */}
            {/* <span>Sri Lanka’s Bespoke Event Curators & Planners</span> */}
          {/* </div> */}

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white leading-[1.15]">
            Unforgettable Celebrations & <br />
            <span className="italic font-light">Extraordinary Moments.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
            Thoughtfully curated birthday parties, milestone celebrations, surprise proposals, corporate events, and bespoke weddings across Sri Lanka. We take care of every detail so you can simply enjoy the moment.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/inquire"
              className="w-full sm:w-auto px-8 py-4 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md rounded-sm"
            >
              Plan Your Event With Us
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 rounded-sm"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Welcome & Why Choose Us */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          Welcome to VIDORA Events
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-charcoal leading-snug">
          Making your celebration effortless, personal, <br />
          <span className="italic">and filled with genuine Sri Lankan warmth.</span>
        </h2>
        <div className="w-16 h-[2px] bg-luxury-gold mx-auto"></div>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/80 max-w-3xl mx-auto leading-relaxed">
          Planning a birthday party, surprise proposal, corporate dinner, or special celebration should be an exciting experience, not weeks of stressful planning. Whether you're in Sri Lanka or organizing an event from overseas, our dedicated team takes care of every detail to make your event seamless and memorable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Shield className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">Zero Stress for You</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              We coordinate every detail, from vendors, decorators, and caterers to sound and lighting and venue arrangements. You and your loved ones can simply relax and enjoy the celebration.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Heart className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">Custom to Your Style</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              Every Poruwa ceremony, stage backdrop, and floral arrangement is thoughtfully designed around your vision, whether you prefer timeless tradition or modern elegance.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Clock className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">All Across the Island</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              From luxury hotel ballrooms and private beachfront villas to heritage estates and scenic hill-country retreats, we bring your dream event to life anywhere in Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Event Categories Showcase */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-luxury-taupe/25 pb-5">
          <div className="space-y-1.5">
            <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              What We Do
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
              Events We Plan & Manage
            </h2>
          </div>
          <Link
            to="/services"
            className="mt-3 md:mt-0 font-sans text-xs uppercase tracking-wider text-luxury-charcoal hover:text-luxury-gold flex items-center space-x-1.5 font-semibold transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative h-96 overflow-hidden bg-luxury-charcoal block shadow-sm rounded-sm"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2 text-white">
                <span className="font-sans text-[11px] tracking-wider uppercase text-luxury-gold font-semibold">
                  0{idx + 1} &bull; Service
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal group-hover:translate-x-1 transition-transform duration-200">
                  {cat.title}
                </h3>
                <p className="font-sans text-xs text-white/85 font-light leading-relaxed max-w-md">
                  {cat.description}
                </p>
                <div className="pt-1.5 font-sans text-xs uppercase tracking-wider text-luxury-gold inline-flex items-center space-x-1 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* 5. What We Bring to Your Day — 6 Steps to a Stress-Free Celebration */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-luxury-charcoal">
            What We Bring to Your Day
          </h2>
          <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 font-light">
            Six steps to a stress-free celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="group p-7 bg-luxury-white border border-luxury-taupe/20 hover:border-luxury-gold/50 rounded-sm space-y-3.5 shadow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-baseline justify-between border-b border-luxury-taupe/15 pb-3">
                <span className="font-serif text-3xl sm:text-4xl text-luxury-gold font-light tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {step.number}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-luxury-taupe font-semibold">
                  Step 0{idx + 1}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-luxury-charcoal font-medium group-hover:text-luxury-gold transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="font-sans text-xs uppercase tracking-wider text-luxury-taupe font-semibold">
                  {step.subtitle}
                </p>
              </div>
              <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Client Reviews
      <section className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
            Customer Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
            What Our Couples & Families Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 bg-luxury-white border border-luxury-taupe/25 rounded-sm flex flex-col justify-between space-y-5"
            >
              <p className="font-serif italic text-base text-luxury-charcoal/90 leading-relaxed">
                “{t.quote}”
              </p>
              <div className="border-t border-luxury-taupe/20 pt-3.5 space-y-0.5">
                <div className="font-sans text-xs font-semibold text-luxury-charcoal">
                  {t.client}
                </div>
                <div className="font-sans text-[11px] text-luxury-taupe">
                  {t.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* 7. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-luxury-charcoal text-luxury-ivory p-8 sm:p-14 md:p-16 text-center space-y-5 rounded-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3.5">
            <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Get Started Today
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-luxury-white font-normal leading-snug">
              Let’s Plan Your Big Day Together.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-luxury-ivory/80 leading-relaxed font-light">
             Every unforgettable celebration starts with an idea. Tell us what you have in mind, and let’s bring it to life. Send us an inquiry or reach out on WhatsApp to start planning your special occasion with us.
            </p>
            <div className="pt-3">
              <Link
                to="/inquire"
                className="inline-block px-9 py-3.5 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md rounded-sm"
              >
                Inquire For Your Date
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
