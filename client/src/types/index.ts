export type InquiryStatus = 'NEW' | 'CONTACTED' | 'IN_DISCUSSION' | 'CONFIRMED' | 'CLOSED';

export interface InquiryNote {
  id: string;
  inquiryId: string;
  authorId?: string | null;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  eventType: string;
  preferredDate?: string | null;
  flexibleDate: boolean;
  location?: string | null;
  guestCount?: number | null;
  budgetRange?: string | null;
  preferredContact: 'email' | 'phone';
  vision: string;
  status: InquiryStatus;
  internalNotes?: InquiryNote[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    internalNotes: number;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  highlights: string[];
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  date?: string | null;
  guestCount?: number | null;
  shortDesc: string;
  fullDesc: string;
  coverImage: string;
  galleryImages: string[];
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventTitle: string;
  eventDate?: string | null;
  location?: string | null;
  quote: string;
  rating: number;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface InquiryStats {
  total: number;
  new: number;
  contacted: number;
  inDiscussion: number;
  confirmed: number;
  closed: number;
}

