import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '../ui/Logo.js';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxury-charcoal text-luxury-ivory border-t border-luxury-charcoal pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-luxury-ivory/15">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-block group" aria-label="VIDORA Events Home">
              <Logo variant="light" size="md" subtitle="LUXURY EVENTS &bull; SRI LANKA" />
            </Link>
            <p className="font-serif text-luxury-ivory/85 text-base sm:text-lg max-w-sm leading-relaxed">
              We plan and coordinate beautiful weddings, Poruwa ceremonies, surprise proposals, and private celebrations across Sri Lanka, bringing every vision to life with care, creativity, and attention to detail.
            </p>
            <div className="pt-1 text-xs font-sans tracking-wide text-luxury-taupe">
              Bespoke Celebrations &bull; Islandwide Planning &bull; Sri Lanka
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-sans text-luxury-ivory/75">
              <li>
                <Link to="/services" className="hover:text-luxury-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-luxury-white transition-colors">
                  Recent Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-luxury-white transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-luxury-white transition-colors">
                  Common Questions
                </Link>
              </li>
              <li>
                <Link to="/inquire" className="hover:text-luxury-white transition-colors">
                  Plan Your Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Contact 
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-luxury-ivory/80">
              {/* <div className="flex items-start space-x-2"> */}
                {/* <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> */}
                {/* <span>
                  <strong>Colombo Office:</strong><br />
                  Ward Place, Cinnamon Gardens, Colombo 07
                </span> */}
              {/* </div> */}
              {/* <div className="flex items-start space-x-2"> */}
                {/* <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" /> */}
                {/* <span>
                  <strong>Galle Office:</strong><br />
                  Church Street, Galle Fort
                </span> */}
              {/* </div> */}
              <div className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>
                  <strong>Hotline / WhatsApp:</strong><br />
                  <a href="tel:+94771234567" className="hover:text-luxury-white underline">
                    +94 77 123 4567
                  </a> / +94 11 268 9400
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <a
                  href="mailto:hello@vidoraevents.lk"
                  className="hover:text-luxury-gold transition-colors underline"
                >
                  hello@vidoraevents.lk
                </a>
              </div>
            </div>
          </div>

          {/* Social & Admin */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold">
              Connect With Us
            </h4>
            <ul className="space-y-2 text-xs font-sans text-luxury-ivory/75">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-luxury-white inline-flex items-center space-x-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-luxury-taupe" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-luxury-white inline-flex items-center space-x-1"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-luxury-taupe" />
                </a>
              </li>
              <li className="pt-3">
                <Link
                  to="/admin/login"
                  className="text-[11px] text-luxury-taupe hover:text-luxury-gold uppercase tracking-wider block transition-colors"
                >
                  Staff Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-luxury-taupe tracking-wider space-y-3 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} VIDORA Events (Pvt) Ltd. Sri Lanka.
          </div>
          <div className="flex space-x-5">
            {/* <span>Privacy Policy</span>
            <span>Terms & Conditions</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
