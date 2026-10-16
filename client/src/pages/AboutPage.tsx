import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Users, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
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

  return (
    <div className="py-16 md:py-24 space-y-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-3.5">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          About VIDORA Events
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal leading-tight">
          Thoughtfully Planned Celebrations, Beautifully Remembered.
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-2xl mx-auto leading-relaxed">
At Vidora Events, we believe every celebration deserves to be extraordinary. We plan and coordinate weddings, engagements, surprise proposals, birthdays, and corporate events across Sri Lanka, bringing your vision to life with creativity, care, and attention to every detail. From the initial idea to the final moments of your event, we're here to make the entire experience seamless, meaningful, and truly memorable.        </p>
      </section>

      {/* Brand Story with Picture */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden bg-stone-200 shadow-md rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
                alt="Sri Lankan celebration dinner table with ambient candles and florals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Our Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
              Celebrations in Sri Lanka Are About Family, Laughter, and Lasting Memories.
            </h2>
            <div className="space-y-3.5 font-sans text-sm text-luxury-charcoal/80 leading-relaxed">
              <p>
                In Sri Lanka, celebrations are about more than just the occasion. From milestone birthdays and surprise proposals to corporate galas and weddings, they bring together the people who matter most, creating moments filled with love, laughter, and memories to cherish for years to come.
              </p>
              <p>
                Yet, behind every beautiful celebration, there's often weeks of planning. Coordinating decorators, communicating with venues, arranging sound and lighting, managing budgets, and handling last-minute changes can quickly turn an exciting occasion into a stressful experience for hosts and their families.
              </p>
              <p>
                That's why we created VIDORA Events: to make every celebration as enjoyable to plan as it is to experience. We bring the details together through thoughtful planning, trusted coordination, and personal attention, allowing you to spend less time worrying about arrangements and more time celebrating with the people who matter most.
              </p>
            </div>

            <div className="pt-3 border-t border-luxury-taupe/20 grid grid-cols-2 gap-4">
              {/* <div>
                <span className="font-serif text-3xl text-luxury-charcoal block">100+</span>
                <span className="font-sans text-xs text-luxury-taupe uppercase tracking-wide block mt-0.5">
                  Celebrations & Events Managed
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-luxury-charcoal block">Islandwide</span>
                <span className="font-sans text-xs text-luxury-taupe uppercase tracking-wide block mt-0.5">
                  Coverage Across Sri Lanka
                </span> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Our 3 Promises */}
      <section className="bg-luxury-white py-20 border-y border-luxury-taupe/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Our Promises To You
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
             Thoughtful Planning. Personal Care. Peace of Mind.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <ShieldCheck className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">A Stress-Free Experience</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                Your special day should be about making memories, not managing last-minute arrangements. We coordinate with vendors, oversee event-day details, and help keep everything on schedule so you can relax and enjoy every moment.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <Heart className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">Respect for Your Traditions</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                Every celebration has its own meaning. Whether you're planning an auspicious Nekath Poruwa ceremony, a church wedding, a traditional homecoming, or a modern cocktail reception, we approach your customs and family preferences with care and respect.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <Users className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">Planning Made Easy, Wherever You Are</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                Planning a celebration in Sri Lanka while living in the UK, Australia, Canada, or the Middle East? We help you stay connected throughout the process with regular WhatsApp updates, virtual venue walk-throughs where available, and clear digital checklists, making it easier to plan from overseas with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Steps: What We Bring to Your Day */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
            Our Method
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
            What We Bring to Your Day
          </h2>
          <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75">
            Six steps to a stress-free celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
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
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-5">
        <Sparkles className="w-6 h-6 text-luxury-gold mx-auto" />
        <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
          Let’s Plan Something Unforgettable.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 max-w-xl mx-auto leading-relaxed">
          Whether you have every detail in mind or are just beginning to dream about your special occasion, we’re here to help. Tell us your vision, and let’s bring it to life with thoughtful planning and personal care.
        </p>
        <div className="pt-2">
          <Link
            to="/inquire"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-luxury-charcoal text-luxury-ivory hover:bg-black font-sans text-xs tracking-wider uppercase transition-all duration-200 font-semibold rounded-sm"
          >
            <span>Message Our Team</span>
            <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
          </Link>
        </div>
      </section>
    </div>
  );
};
