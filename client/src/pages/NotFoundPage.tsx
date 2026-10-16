import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <span className="font-sans text-xs uppercase tracking-luxury-wide text-luxury-gold font-medium block">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-luxury-charcoal font-normal">
          Page Not Found
        </h1>
        <div className="w-12 h-[1px] bg-luxury-gold mx-auto"></div>
        <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/70 leading-relaxed font-light">
          The occasion or page you were seeking appears to have moved or does not exist within our atelier archives.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-luxury-charcoal text-luxury-ivory hover:bg-black font-sans text-xs tracking-luxury uppercase transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Return to Atelier Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

