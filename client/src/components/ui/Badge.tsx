import React from 'react';
import { InquiryStatus } from '../../types/index.js';

interface BadgeProps {
  status: InquiryStatus | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'CONTACTED':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'IN_DISCUSSION':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'CLOSED':
        return 'bg-stone-200 text-stone-700 border-stone-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'NEW':
        return 'New Inquiry';
      case 'CONTACTED':
        return 'Contacted';
      case 'IN_DISCUSSION':
        return 'In Discussion';
      case 'CONFIRMED':
        return 'Confirmed';
      case 'CLOSED':
        return 'Archived / Closed';
      default:
        return status;
    }
  };

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-sans font-medium uppercase tracking-wider rounded-sm border ${sizeStyles} ${getStyles()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {getLabel()}
    </span>
  );
};

