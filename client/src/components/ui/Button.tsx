import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans tracking-luxury uppercase text-xs transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-[13px]',
  };

  const variantStyles = {
    primary:
      'bg-luxury-charcoal text-luxury-ivory hover:bg-black active:scale-[0.99] border border-luxury-charcoal',
    secondary:
      'bg-luxury-white text-luxury-charcoal border border-luxury-taupe/40 hover:border-luxury-charcoal hover:bg-luxury-ivory',
    outline:
      'bg-transparent text-luxury-charcoal border border-luxury-charcoal/30 hover:border-luxury-charcoal hover:bg-luxury-charcoal/5',
    gold:
      'bg-luxury-gold text-white hover:bg-luxury-gold-dark active:scale-[0.99] shadow-sm',
    ghost:
      'bg-transparent text-luxury-charcoal hover:text-luxury-gold underline-offset-4 hover:underline p-0',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

