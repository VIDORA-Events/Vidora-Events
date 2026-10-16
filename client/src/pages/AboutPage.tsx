import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Users, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 space-y-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-3.5">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          About VIDORA Events
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal leading-tight">
          Creating Joyful, Stress-Free Celebrations in Sri Lanka
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-2xl mx-auto leading-relaxed">
          We are a team of passionate event planners and celebration coordinators serving families, couples, and corporate clients across Sri Lanka.
        </p>
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
              Celebrations in Sri Lanka are about family, laughter, and great memories.
            </h2>
            <div className="space-y-3.5 font-sans text-sm text-luxury-charcoal/80 leading-relaxed">
              <p>
                In Sri Lanka, a milestone birthday, surprise proposal, annual corporate gala, or wedding is more than just an event—it is a proud gathering of loved ones, colleagues, and lifelong friends coming together to celebrate life.
              </p>
              <p>
                Too often, hosts and their families spend the weeks leading up to their special occasion stressed out: chasing decorators, negotiating with hotels, coordinating lighting and sounds, and solving last-minute headaches.
              </p>
              <p>
                That is why we started VIDORA. We wanted to give clients a trusted, reliable partner who manages every vendor, budget detail, and timeline with care and precision, so you can simply arrive, laugh, dance, and make memories with the people you love.
              </p>
            </div>

            <div className="pt-3 border-t border-luxury-taupe/20 grid grid-cols-2 gap-4">
              <div>
                <span className="font-serif text-3xl text-luxury-charcoal block">100+</span>
                <span className="font-sans text-xs text-luxury-taupe uppercase tracking-wide block mt-0.5">
                  Celebrations & Events Managed
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-luxury-charcoal block">Islandwide</span>
                <span className="font-sans text-xs text-luxury-taupe uppercase tracking-wide block mt-0.5">
                  Coverage Across Sri Lanka
                </span>
              </div>
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
              Why Couples & Families Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <ShieldCheck className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">Zero Stress for You</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                You won’t have to spend your special day answering calls from suppliers or worrying about delays. Our coordinators are on-site ensuring everything happens seamlessly.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <Heart className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">Respect for Traditions</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                Whether you are having an auspicious Nekath Poruwa ceremony, a church blessing, or a modern cocktail reception, we honor your family’s traditions with warmth and respect.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-luxury-ivory/50 border border-luxury-taupe/25 rounded-sm">
              <Users className="w-6 h-6 text-luxury-gold" />
              <h3 className="font-serif text-2xl text-luxury-charcoal">Easy Overseas Planning</h3>
              <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 leading-relaxed">
                Living in the UK, Australia, Canada, or the Middle East? We work around your time zones with regular WhatsApp updates, video walk-throughs, and clear digital checklists.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">01</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Vision & Theme</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              Crafting your unique celebration aesthetic, blending traditional Poruwa beauty with modern island elegance.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">02</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Budget & Timeline</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              Clear planning with zero surprises, honest transparent costs, and month-by-month preparation checklists.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">03</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Vendor Curation</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              Sri Lanka’s finest florists, master drummers, bands, and caterers, hand-selected to fit your exact style and budget.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">04</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Design & Styling</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              Every detail intentionally designed: fresh jasmine garlands, ambient brass oil lamps, and beautiful stage backdrops.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">05</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Coordination</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              Seamless multi-vendor management and regular WhatsApp updates for couples living in Sri Lanka or overseas.
            </p>
          </div>
          <div className="p-6 bg-luxury-white border border-luxury-taupe/20 rounded-sm space-y-2 shadow-sm">
            <span className="font-serif text-3xl text-luxury-gold font-light block">06</span>
            <h4 className="font-serif text-lg text-luxury-charcoal font-medium">Day-Of Management</h4>
            <p className="font-sans text-xs text-luxury-charcoal/75 leading-relaxed">
              We run the show from morning till midnight behind the scenes, so you simply live in the moment with your guests.
            </p>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-5">
        <Sparkles className="w-6 h-6 text-luxury-gold mx-auto" />
        <h2 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
          Let’s start planning your special occasion.
        </h2>
        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 max-w-xl mx-auto leading-relaxed">
          Whether you have a clear plan or just a date in mind, we would love to talk and see how we can help.
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
