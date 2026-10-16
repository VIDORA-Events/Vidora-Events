import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitInquiry } from '../services/api.js';
import { CheckCircle2, AlertCircle, Sparkles, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';

const inquiryFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your name (at least 2 characters).')
    .max(100, 'Name is too long.')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(7, 'Please enter your phone or WhatsApp number.')
    .max(30, 'Phone number is too long.'),
  eventType: z
    .string()
    .min(2, 'Please select what kind of event you are planning.'),
  preferredDate: z
    .string()
    .optional(),
  flexibleDate: z.boolean().default(false),
  location: z
    .string()
    .optional(),
  guestCount: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
      message: 'Please enter a valid guest count number.',
    }),
  budgetCurrency: z.string().default('LKR'),
  minBudget: z
    .string()
    .min(1, 'Please enter your estimated minimum budget or starting point.')
    .max(80, 'Budget value is too long.')
    .trim(),
  maxBudget: z
    .string()
    .max(80, 'Budget value is too long.')
    .optional()
    .or(z.literal('')),
  budgetRange: z
    .string()
    .optional(),
  preferredContact: z
    .enum(['email', 'phone'])
    .default('phone'),
  vision: z
    .string()
    .min(10, 'Please tell us a few details about your event (at least 10 characters).')
    .max(3000, 'Message is too long.')
    .trim(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Please agree to let us contact you regarding this event.',
  }),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

export const InquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledType = searchParams.get('type') || '';
  const prefilledNotes = searchParams.get('notes') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      eventType: prefilledType || 'Birthday Parties & Milestone Celebrations',
      preferredDate: '',
      flexibleDate: false,
      location: 'Flexible / Across Sri Lanka',
      guestCount: '',
      budgetCurrency: 'LKR',
      minBudget: '',
      maxBudget: '',
      preferredContact: 'phone',
      vision: prefilledNotes ? `${prefilledNotes}\n\n` : '',
      privacyConsent: false,
    },
  });

  useEffect(() => {
    if (prefilledType) {
      setValue('eventType', prefilledType);
    }
  }, [prefilledType, setValue]);

  const onSubmit = async (data: InquiryFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const formattedBudget = data.minBudget
        ? `${data.budgetCurrency} ${data.minBudget}${data.maxBudget ? ` – ${data.budgetCurrency} ${data.maxBudget}` : ' (Flexible Maximum)'}`
        : 'Open for Discussion';

      const payload = {
        ...data,
        budgetRange: formattedBudget,
        guestCount: data.guestCount ? parseInt(data.guestCount, 10) : null,
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setSubmissionSuccess(res.data);
      }
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      setServerError(
        err.message || 'We could not submit your details right now. Please call or WhatsApp us on +94 77 123 4567.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Confirmation Screen
  if (submissionSuccess) {
    return (
      <div className="py-20 md:py-28 max-w-2xl mx-auto px-6">
        <div className="bg-luxury-white p-8 sm:p-14 border border-luxury-taupe/30 text-center space-y-5 shadow-sm rounded-sm animate-fadeIn">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
            Ayubowan! Message Received
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-luxury-charcoal">
            Thank you, {submissionSuccess.fullName}!
          </h1>

          <div className="w-12 h-[2px] bg-luxury-gold mx-auto"></div>

          <p className="font-sans text-sm sm:text-base text-luxury-charcoal/80 leading-relaxed">
            We have received your event details. One of our event coordinators will call or WhatsApp you within 24 hours to have a friendly chat and discuss your ideas.
          </p>

          <div className="bg-luxury-ivory p-4 border border-luxury-taupe/20 max-w-sm mx-auto text-left space-y-1 text-xs font-sans rounded-sm">
            <div className="text-luxury-taupe uppercase text-[10px] font-semibold">
              Reference Number:
            </div>
            <div className="text-luxury-charcoal font-mono font-medium">
              {submissionSuccess.inquiryId}
            </div>
            <div className="text-stone-600">
              Event: {submissionSuccess.eventType}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Directly</span>
            </a>
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-50 font-sans text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-14 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 text-center space-y-3">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-luxury-charcoal">
          Plan Your Event With Us
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-xl mx-auto leading-relaxed">
          Tell us about your upcoming wedding, proposal, party, or function. We will get back to you quickly with helpful advice and ideas.
        </p>
      </section>

      {/* Main Form Container */}
      <section className="max-w-3xl mx-auto px-6">
        <div className="bg-luxury-white p-6 sm:p-10 md:p-12 border border-luxury-taupe/25 shadow-sm rounded-sm">
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2.5 rounded-sm">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-luxury-charcoal border-b border-luxury-taupe/20 pb-2">
                1. Your Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="e.g. Dilshan Perera"
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-[11px] mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. dilshan@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-[11px] mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="e.g. +94 77 123 4567 or +61 412 345 678"
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-[11px] mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Preferred Way to Contact You
                  </label>
                  <div className="flex items-center space-x-5 pt-2">
                    <label className="flex items-center space-x-1.5 text-xs text-luxury-charcoal cursor-pointer">
                      <input
                        type="radio"
                        value="phone"
                        {...register('preferredContact')}
                        className="text-luxury-charcoal"
                      />
                      <span>WhatsApp / Phone Call</span>
                    </label>
                    <label className="flex items-center space-x-1.5 text-xs text-luxury-charcoal cursor-pointer">
                      <input
                        type="radio"
                        value="email"
                        {...register('preferredContact')}
                        className="text-luxury-charcoal"
                      />
                      <span>Email</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Event Scope */}
            <div className="space-y-4 pt-3">
              <h2 className="font-serif text-xl sm:text-2xl text-luxury-charcoal border-b border-luxury-taupe/20 pb-2">
                2. Event Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    What Kind of Event? <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('eventType')}
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  >
                    <option value="Birthday Parties & Milestone Celebrations">Birthday Party & Milestone Celebration (21st, 50th, etc.)</option>
                    <option value="Surprise Marriage Proposals">Surprise Marriage Proposal & Romantic Setup</option>
                    <option value="Anniversaries & Family Get-Togethers">Anniversary or Family Gathering</option>
                    <option value="Corporate Functions & Annual Dinner Dances">Corporate Function, Gala or Product Launch</option>
                    <option value="Private Beach & Villa Parties">Private Beach or Villa Party</option>
                    <option value="Weddings, Poruwa & Homecoming Receptions">Wedding, Poruwa & Reception</option>
                    <option value="Custom Bespoke Event">Other Custom Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Preferred Location / Area
                  </label>
                  <select
                    {...register('location')}
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  >
                    <option value="Flexible / Across Sri Lanka">Flexible / Across Sri Lanka</option>
                    <option value="Western Province (Hotels & Venues)">Western Province (Hotels & Venues)</option>
                    <option value="Southern Coastal Belt (Beachfront Villas & Resorts)">Southern Coastal Belt (Beachfront Villas & Resorts)</option>
                    <option value="Central & Hill Country (Tea Estates & Mountain Retreats)">Central & Hill Country (Tea Estates & Mountain Retreats)</option>
                    <option value="North-Western & Cultural Triangle">North-Western & Cultural Triangle</option>
                    <option value="Private Family Residence / Villa">Private Family Residence / Villa</option>
                    <option value="Not Decided Yet / Open for Suggestions">Not Decided Yet / Open for Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Preferred Event Date
                  </label>
                  <input
                    type="date"
                    {...register('preferredDate')}
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  />
                  <div className="pt-1.5">
                    <label className="flex items-center space-x-2 text-xs text-stone-600 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('flexibleDate')}
                        className="rounded border-stone-300 text-stone-900"
                      />
                      <span>Date is flexible depending on hall / venue availability</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                    Estimated Guest Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register('guestCount')}
                    placeholder="e.g. 50 or 150"
                    className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                  />
                  {errors.guestCount && (
                    <p className="text-red-600 text-[11px] mt-1">{errors.guestCount.message}</p>
                  )}
                </div>

                {/* Minimum and Maximum Budget Section */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold">
                      Your Budget Range
                    </label>
                    <span className="text-[11px] text-luxury-taupe font-sans">
                      Maximum budget is optional
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-sans text-stone-600 mb-1">
                        Currency
                      </label>
                      <select
                        {...register('budgetCurrency')}
                        className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                      >
                        <option value="LKR">LKR (Rs)</option>
                        <option value="USD">USD ($)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-[11px] font-sans text-stone-600 mb-1">
                        Minimum Budget <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('minBudget')}
                        placeholder="e.g. 500,000 or 2,000"
                        className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                      />
                      {errors.minBudget && (
                        <p className="text-red-600 text-[11px] mt-1">{errors.minBudget.message}</p>
                      )}
                    </div>

                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-sans text-stone-600 mb-1">
                        Maximum Budget <span className="text-stone-400 font-light">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        {...register('maxBudget')}
                        placeholder="e.g. 1,500,000 or 5,000 (optional)"
                        className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 font-sans leading-tight">
                    Enter the starting budget you have in mind. If your maximum is flexible or you would like to see options, you can leave the maximum field empty.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Details & Ideas */}
            <div className="space-y-4 pt-3">
              <h2 className="font-serif text-xl sm:text-2xl text-luxury-charcoal border-b border-luxury-taupe/20 pb-2">
                3. Tell Us About Your Event
              </h2>
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-luxury-charcoal font-semibold mb-1.5">
                  Share Your Ideas or Questions <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  {...register('vision')}
                  placeholder="Tell us what you have in mind: e.g. looking for a beach hotel in Bentota, need a traditional Poruwa with jasmine flowers, live band suggestions, or catering requirements..."
                  className="w-full px-3.5 py-2.5 bg-luxury-ivory/50 border border-luxury-taupe/30 text-luxury-charcoal text-xs rounded-sm focus:outline-none focus:border-luxury-charcoal leading-relaxed"
                ></textarea>
                {errors.vision && (
                  <p className="text-red-600 text-[11px] mt-1">{errors.vision.message}</p>
                )}
              </div>
            </div>

            {/* Agreement */}
            <div className="pt-2 border-t border-luxury-taupe/20 space-y-2">
              <div className="flex items-start space-x-2.5">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  {...register('privacyConsent')}
                  className="mt-0.5 rounded border-stone-300 text-stone-900"
                />
                <label htmlFor="privacyConsent" className="text-xs text-stone-700 leading-relaxed cursor-pointer">
                  Yes, please have a VIDORA event planner contact me via WhatsApp or email regarding this event. We keep all your details strictly private.
                </label>
              </div>
              {errors.privacyConsent && (
                <p className="text-red-600 text-[11px]">{errors.privacyConsent.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-luxury-charcoal hover:bg-black text-luxury-ivory font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm rounded-sm disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Sending Details...</span>
                ) : (
                  <>
                    <span>Submit Event Inquiry</span>
                    <ArrowRight className="w-4 h-4 text-luxury-gold" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
