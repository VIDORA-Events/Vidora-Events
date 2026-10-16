import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { fetchPortfolioProjectBySlug } from '../services/api.js';
import { PortfolioProject } from '../types/index.js';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fallbacks with genuine Sri Lankan wedding and event narratives
  const fallbackProjects: Record<string, PortfolioProject> = {
    'galle-fort-dutch-colonial-wedding': {
      id: 'p1',
      slug: 'galle-fort-dutch-colonial-wedding',
      title: 'Dilshan & Nimara’s Wedding at Galle Fort',
      category: 'Weddings',
      location: 'Galle Fort, Sri Lanka',
      date: 'January 2025',
      guestCount: 150,
      shortDesc: 'A traditional morning Poruwa ceremony followed by a lively dinner dance overlooking the Galle Fort ramparts.',
      fullDesc:
        'Dilshan and Nimara live in Melbourne and wanted a wedding in Sri Lanka that honored their roots while providing their international guests with an unforgettable vacation.\n\nThe morning began with an auspicious Nekath Poruwa ceremony on the lawns of a Dutch colonial courtyard in Galle Fort. The custom Poruwa was hand-carved in Moratuwa and swathed in fresh Saman Pichcha (jasmine) garlands and pink lotus flowers. Master Magul Bera drummers and traditional Kandyan dancers led the couple onto the Poruwa as the auspicious Jayamangala Gatha blessings were chanted.\n\nIn the evening, the celebration transitioned into an open-air dinner dance beneath hundreds of fairy lights. Guests enjoyed fresh king coconut cocktails, an authentic hoppers live action station alongside a gourmet seafood buffet, and danced until 2:00 AM to a popular Sri Lankan 7-piece live band.',
      coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1800&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
    },
    'cape-weligama-sunset-proposal': {
      id: 'p2',
      slug: 'cape-weligama-sunset-proposal',
      title: 'Sunset Beachfront Proposal in Weligama',
      category: 'Proposals',
      location: 'Cape Weligama, Sri Lanka',
      date: 'December 2024',
      guestCount: 2,
      shortDesc: 'A surprise candlelit proposal on the cliffs of Weligama with live acoustic flute and a private beach dinner.',
      fullDesc:
        'Kavinda contacted us three weeks before his holiday to plan the perfect surprise proposal for Shannon. He wanted a setting that was romantic, completely private, and breathtaking.\n\nWe reserved a private headland overlooking the Weligama bay and set up over 200 traditional brass oil lamps and a walkway covered in white frangipani blossoms. A private acoustic flutist was tucked away playing her favorite melody as Kavinda guided Shannon to the edge at sunset.\n\nOur discreet photographer captured the exact moment on film. Afterwards, the newly engaged couple sat down to a private seafood dinner and celebrated with champagne under the stars.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85',
      ],
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
    },
  };

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const res = await fetchPortfolioProjectBySlug(slug);
        if (res.success && res.data.project) {
          setProject(res.data.project);
        } else if (fallbackProjects[slug]) {
          setProject(fallbackProjects[slug]);
        }
      } catch (err) {
        if (slug && fallbackProjects[slug]) {
          setProject(fallbackProjects[slug]);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-xs tracking-wider uppercase text-luxury-taupe">
        Loading event details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center space-y-4 px-6">
        <h2 className="font-serif text-3xl text-luxury-charcoal">Event Not Found</h2>
        <p className="font-sans text-xs text-luxury-charcoal/70">
          The requested event could not be found in our records.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-luxury-gold underline font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Past Events</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 space-y-14">
      {/* Back Link & Header */}
      <section className="max-w-5xl mx-auto px-6 space-y-6">
        <Link
          to="/portfolio"
          className="inline-flex items-center space-x-2 text-xs font-sans tracking-wider uppercase text-luxury-taupe hover:text-luxury-charcoal transition-colors font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Past Events</span>
        </Link>

        <div className="space-y-3.5">
          <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-wider text-luxury-gold font-semibold">
            <span>{project.category}</span>
            <span>&bull;</span>
            <span>{project.location}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-luxury-charcoal font-normal">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-1 text-xs font-sans tracking-wide text-luxury-charcoal/80 border-y border-luxury-taupe/20 py-3.5">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Location: {project.location}</span>
            </span>
            {project.date && (
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Date: {project.date}</span>
              </span>
            )}
            {project.guestCount && (
              <span className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-luxury-gold" />
                <span>Guest Count: {project.guestCount} Guests</span>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Cover Image */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="aspect-[16/10] overflow-hidden bg-stone-200 shadow-md rounded-sm">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-3xl mx-auto px-6 space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal">
          How We Planned This Event
        </h2>
        <div className="w-12 h-[2px] bg-luxury-gold"></div>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/80 leading-relaxed font-light whitespace-pre-line">
          {project.fullDesc}
        </p>
      </section>

      {/* Gallery Section */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 space-y-5">
          <h3 className="font-serif text-xl sm:text-2xl text-luxury-charcoal">
            Event Photos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.galleryImages.map((imgUrl, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden bg-stone-200 shadow-sm rounded-sm">
                <img
                  src={imgUrl}
                  alt={`${project.title} photo ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inquire CTA */}
      <section className="max-w-4xl mx-auto px-6 pt-8">
        <div className="bg-luxury-white p-8 md:p-12 border border-luxury-taupe/20 text-center space-y-3.5 rounded-sm">
          <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
            Plan Your Wedding or Event
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-luxury-charcoal">
            Want an event like this for yourself?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-luxury-charcoal/75 max-w-xl mx-auto leading-relaxed">
            Reach out to our team today. We will sit down with you, listen to your ideas, and put together a customized plan for your dates and budget.
          </p>
          <div className="pt-2">
            <Link
              to={`/inquire?type=${encodeURIComponent(project.category)}&notes=${encodeURIComponent(`Inspired by ${project.title}`)}`}
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-luxury-charcoal text-luxury-ivory hover:bg-black font-sans text-xs tracking-wider uppercase transition-all duration-200 font-semibold rounded-sm"
            >
              <span>Get in Touch With Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
