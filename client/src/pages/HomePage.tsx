import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Sparkles, Shield, Clock } from 'lucide-react';
import { fetchPortfolioProjects } from '../services/api.js';
import { PortfolioProject } from '../types/index.js';

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetchPortfolioProjects();
        if (res.success && res.data.projects) {
          setFeaturedProjects(res.data.projects.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to load portfolio preview:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    loadPortfolio();
  }, []);

  const categories = [
    {
      title: 'Birthdays & Milestone Celebrations',
      description: 'Big 21st birthdays, 50th milestone parties, silver anniversaries, and private family dinners with great food, vibrant decor, and live entertainment.',
      image: '/images/birthday.jpeg',
      link: '/services#celebrations',
    },
    {
      title: 'Surprise Marriage Proposals',
      description: 'Dreamy candlelit setups on coastal cliffs, private beach dinners under the stars, acoustic musicians, and romantic moments organized in 100% secrecy.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      link: '/services#proposals',
    },
    {
      title: 'Corporate Functions & Annual Galas',
      description: 'Company annual dinner dances, awards nights, product launches, and brand conferences organized smoothly with complete A/V and stage production.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      link: '/services#corporate',
    },
    {
      title: 'Weddings & Poruwa Ceremonies',
      description: 'Grand Poruwa rituals, church ceremonies, and lively dinner dances at premier hotels, beachfront villas, and heritage estates.',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      link: '/services#weddings',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Vision & Theme',
      subtitle: 'Crafting your unique celebration aesthetic',
      description:
        'We begin by getting to know your celebration vision, occasion, and personal style. Whether you are throwing a milestone birthday party, planning an unforgettable sunset proposal, hosting a corporate gala, or organizing a wedding, we define a cohesive concept tailored just for you.',
    },
    {
      number: '02',
      title: 'Budget & Timeline',
      subtitle: 'Clear planning with zero surprises',
      description:
        'No hidden markups or sudden expenses. We build an honest, itemized budget and a clear preparation timeline so you always know what is coming next, whether you are paying in LKR or foreign currency.',
    },
    {
      number: '03',
      title: 'Vendor Curation',
      subtitle: 'Sri Lanka’s finest, hand-selected for you',
      description:
        'We connect you with Sri Lanka’s most trusted venues, renowned photographers, DJs, top live bands, decorators, master drummers, and caterers that match your exact style and budget.',
    },
    {
      number: '04',
      title: 'Design & Styling',
      subtitle: 'Every little detail intentionally crafted',
      description:
        'From custom backdrops, ambient lighting, and floral styling to entrance arches, dessert tables, and personalized stationery, we transform spaces into breathtaking celebration settings.',
    },
    {
      number: '05',
      title: 'Coordination',
      subtitle: 'Seamless multi-vendor orchestration',
      description:
        'We manage all vendor coordination, schedules, and floorplans so everything aligns smoothly. For clients living locally or overseas, we handle time-zone-friendly WhatsApp updates and regular check-ins.',
    },
    {
      number: '06',
      title: 'Day-Of Management',
      subtitle: 'We run the show, you enjoy the moment',
      description:
        'On your big day, our dedicated coordinators are on-site from early morning until the last song ends. We manage timings, cues, guests, and vendors behind the scenes so you and your family can simply celebrate.',
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
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-luxury-white text-xs tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Sri Lanka’s Bespoke Event Curators & Planners</span>
          </div>

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
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white border border-white/40 backdrop-blur-sm font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 rounded-sm"
            >
              See Our Recent Work
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
          Planning a birthday party, surprise proposal, company annual dinner, or special celebration in Sri Lanka should be an exciting time with the people you love, not weeks of exhausting stress. Whether you live locally or are organizing an event from overseas, our dedicated team manages everything smoothly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Shield className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">Zero Stress for You</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              We coordinate all vendors, decorators, sounds, caterers, and venues. You and your family can just relax and enjoy.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Heart className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">Custom to Your Style</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              Every Poruwa, stage backdrop, and floral setup is customized for you—whether you want a traditional look or modern chic.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2.5">
            <Clock className="w-5 h-5 text-luxury-gold" />
            <h3 className="font-serif text-xl text-luxury-charcoal">All Across the Island</h3>
            <p className="font-sans text-xs text-luxury-charcoal/70 leading-relaxed">
              From premier hotel ballrooms to private beachfront villas, heritage estates, and scenic hill-country bungalows.
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

      {/* 4. Curated Portfolio Preview */}
      <section className="bg-luxury-white py-20 border-y border-luxury-taupe/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Recent Work
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
              Weddings & Events We’ve Organized
            </h2>
            <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70">
              A glimpse into some of our favorite recent celebrations across Sri Lanka.
            </p>
          </div>

          {loadingProjects ? (
            <div className="py-12 text-center text-xs tracking-wider uppercase text-luxury-taupe">
              Loading recent events...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group block space-y-3.5"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative shadow-sm rounded-sm">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-luxury-charcoal/85 backdrop-blur-sm text-white px-3 py-1 text-[10px] tracking-wider uppercase rounded-sm">
                      {project.category}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-sans tracking-wide uppercase text-luxury-taupe font-medium">
                      {project.location}
                    </div>
                    <h3 className="font-serif text-2xl text-luxury-charcoal group-hover:text-luxury-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs text-luxury-charcoal/75 line-clamp-2 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center space-x-2 font-sans text-xs uppercase tracking-wider text-luxury-charcoal border-b border-luxury-charcoal pb-1 hover:text-luxury-gold hover:border-luxury-gold transition-colors font-semibold"
            >
              <span>View All Past Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
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

      {/* 6. Client Reviews */}
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
      </section>

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
              We would love to hear your ideas. Send us an inquiry or message us on WhatsApp to set up a friendly conversation.
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
