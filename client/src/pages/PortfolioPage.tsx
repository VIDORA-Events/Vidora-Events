import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { fetchPortfolioProjects } from '../services/api.js';
import { PortfolioProject } from '../types/index.js';

export const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Weddings', 'Proposals', 'Celebrations', 'Corporate'];

  const fallbackProjects: PortfolioProject[] = [
    {
      id: 'p1',
      slug: 'galle-fort-dutch-colonial-wedding',
      title: 'Dilshan & Nimara’s Wedding at Galle Fort',
      category: 'Weddings',
      location: 'Galle Fort, Sri Lanka',
      date: 'January 2025',
      guestCount: 150,
      shortDesc: 'A traditional morning Poruwa ceremony followed by a lively dinner dance overlooking the Galle Fort ramparts.',
      fullDesc: 'Set against the historic ramparts of Galle Fort, this three-day celebration featured a traditional teak Poruwa swathed in fresh Saman Pichcha (jasmine), Magul Bera drummers, and a magical open-air dinner dance under fairy lights.',
      coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      slug: 'cape-weligama-sunset-proposal',
      title: 'Sunset Beachfront Proposal in Weligama',
      category: 'Proposals',
      location: 'Cape Weligama, Sri Lanka',
      date: 'December 2024',
      guestCount: 2,
      shortDesc: 'A surprise candlelit proposal on the cliffs of Weligama with live acoustic flute and a private beach dinner.',
      fullDesc: 'Organized in complete secret, a cliffside promontory was decorated with over 200 traditional brass oil lamps, fresh white lotus flowers, and a hidden photographer to capture the magical moment.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p3',
      slug: 'bentota-beachfront-homecoming',
      title: 'Amanda & Roshan’s Homecoming in Bentota',
      category: 'Weddings',
      location: 'Bentota Beach, Sri Lanka',
      date: 'November 2024',
      guestCount: 180,
      shortDesc: 'A stylish seaside homecoming reception with traditional Sri Lankan welcome drinks and a live 7-piece band.',
      fullDesc: 'Held at a private beachfront lawn in Bentota, guests enjoyed fresh King Coconut (thambili) welcome drinks, a mouthwatering seafood buffet, and non-stop dancing under palm trees strung with warm festoon lights.',
      coverImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p4',
      slug: 'colombo-cinnamon-gardens-birthday',
      title: '50th Birthday Party at Colombo 07',
      category: 'Celebrations',
      location: 'Cinnamon Gardens, Colombo',
      date: 'October 2024',
      guestCount: 80,
      shortDesc: 'An intimate garden birthday dinner with live acoustic jazz and a custom dessert and sweet table.',
      fullDesc: 'A private heritage residence in Cinnamon Gardens transformed into an ambient evening soirée with customized lighting, live jazz, and a custom dessert bar featuring both traditional sweet delicacies and artisan cakes.',
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: true,
      isPublished: true,
      sortOrder: 4,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p5',
      slug: 'port-city-colombo-annual-gala',
      title: 'Annual Corporate Gala at Colombo Port City',
      category: 'Corporate',
      location: 'Colombo Port City',
      date: 'August 2024',
      guestCount: 250,
      shortDesc: 'A grand company dinner dance and awards ceremony featuring an LED stage, top live band, and full production.',
      fullDesc: 'Full event production including stage fabrication, intelligent lighting, sound engineering, bilingual emcees, and seamless dinner coordination for over 250 corporate executives.',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: false,
      isPublished: true,
      sortOrder: 5,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p6',
      slug: 'nuwara-eliya-tea-estate-anniversary',
      title: '25th Anniversary in Nuwara Eliya',
      category: 'Celebrations',
      location: 'Nuwara Eliya / Hatton',
      date: 'July 2024',
      guestCount: 40,
      shortDesc: 'A cozy family silver jubilee in a colonial tea planter bungalow with a bonfire and roast dinner.',
      fullDesc: 'An intimate hill-country family celebration with outdoor fire pits, acoustic guitar melodies, and a formal three-course dinner inside a restored heritage tea bungalow.',
      coverImage: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      isFeatured: false,
      isPublished: true,
      sortOrder: 6,
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchPortfolioProjects(activeCategory);
        if (res.success && res.data.projects?.length) {
          setProjects(res.data.projects);
        } else {
          if (activeCategory === 'All') {
            setProjects(fallbackProjects);
          } else {
            setProjects(fallbackProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()));
          }
        }
      } catch (err) {
        if (activeCategory === 'All') {
          setProjects(fallbackProjects);
        } else {
          setProjects(fallbackProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()));
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCategory]);

  return (
    <div className="py-16 md:py-24 space-y-14">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-3.5">
        <span className="font-sans text-xs uppercase tracking-wider text-luxury-gold font-semibold block">
          Our Portfolio
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-charcoal">
          Past Weddings & Events
        </h1>
        <p className="font-sans text-sm sm:text-base text-luxury-charcoal/75 max-w-2xl mx-auto leading-relaxed">
          Take a look at some of the weddings, proposals, birthdays, and parties we have brought to life across Sri Lanka.
        </p>

        {/* Category Filters */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-sans tracking-wider uppercase transition-all duration-200 rounded-sm ${
                activeCategory === cat
                  ? 'bg-luxury-charcoal text-luxury-ivory font-semibold shadow-sm'
                  : 'bg-transparent text-luxury-charcoal/70 hover:text-luxury-charcoal hover:bg-luxury-taupe/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        {loading ? (
          <div className="py-20 text-center text-xs tracking-wider uppercase text-luxury-taupe">
            Loading events...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-xl text-luxury-charcoal">No events found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs uppercase tracking-wider text-luxury-gold hover:underline font-semibold"
            >
              Show all events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.slug}`}
                className="group block space-y-3.5"
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-200 relative shadow-sm rounded-sm">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-luxury-charcoal/85 backdrop-blur-sm text-white px-3 py-1 text-[10px] tracking-wider uppercase rounded-sm">
                    {project.category}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center space-x-3 text-[11px] font-sans tracking-wide uppercase text-luxury-taupe font-medium">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{project.location}</span>
                    </span>
                    {project.guestCount && (
                      <span className="flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-luxury-taupe" />
                        <span>{project.guestCount} Guests</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs text-luxury-charcoal/75 line-clamp-2 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  <div className="pt-1.5 font-sans text-xs uppercase tracking-wider text-luxury-charcoal group-hover:text-luxury-gold inline-flex items-center space-x-1 transition-colors font-semibold">
                    <span>Read Event Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
