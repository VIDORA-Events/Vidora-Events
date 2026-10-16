import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light'; // 'dark' text for ivory/white backgrounds, 'light' for charcoal/black
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitle?: string;
  iconOnly?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  subtitle = 'EVENTS • SRI LANKA',
  iconOnly = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const titleSizes = {
    sm: 'text-xl sm:text-2xl tracking-[0.22em]',
    md: 'text-2xl sm:text-3xl md:text-[32px] tracking-[0.25em]',
    lg: 'text-3xl sm:text-4xl md:text-5xl tracking-[0.28em]',
  };

  const subtitleSizes = {
    sm: 'text-[9px] sm:text-[10px] tracking-[0.28em]',
    md: 'text-[10px] sm:text-[11.5px] tracking-[0.32em]',
    lg: 'text-xs sm:text-sm tracking-[0.34em]',
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3.5 sm:gap-4 select-none ${className}`}>
      {/* Custom Brand Logo */}
      <img
        src="/images/logo.png"
        alt="VIDORA Events Logo"
        className={`${iconSizes[size]} object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={`font-serif ${titleSizes[size]} uppercase font-medium transition-colors duration-200 ${
              isLight ? 'text-white' : 'text-luxury-charcoal'
            } group-hover:text-luxury-gold`}
          >
            Vidora
          </span>
          {showSubtitle && (
            <span
              className={`font-sans ${subtitleSizes[size]} uppercase font-medium mt-1 transition-colors duration-200 ${
                isLight ? 'text-luxury-taupe' : 'text-luxury-taupe'
              } group-hover:text-luxury-gold`}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

