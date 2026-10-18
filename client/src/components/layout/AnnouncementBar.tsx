import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-luxury-charcoal text-luxury-ivory text-xs tracking-wider py-2 px-4 relative z-50 border-b border-luxury-charcoal/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-luxury-gold shrink-0" />
          <span>
            Now taking bookings for 2026 & 2027 events across Sri Lanka.{' '}
            {/* <Link to="/inquire">Get in touch with us &rarr;</Link> commented for direct WhatsApp */}
            <a
              href="https://wa.me/94775364603?text=Hello%20VIDORA%20Events,%20I%20would%20like%20to%20inquire%20about%20planning%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-gold underline hover:text-white transition-colors ml-1 font-medium"
            >
              WhatsApp us &rarr;
            </a>
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Close message"
          className="text-luxury-taupe hover:text-white transition-colors ml-4"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
