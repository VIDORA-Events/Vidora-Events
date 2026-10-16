import React, { useState, useEffect } from 'react';
import {
  adminGetAllProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
} from '../../services/api.js';
import { PortfolioProject } from '../../types/index.js';
import { Plus, Trash2, Edit, Check, X, Image as ImageIcon, ExternalLink, RefreshCw } from 'lucide-react';

export const AdminPortfolio: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Weddings',
    location: '',
    date: '',
    guestCount: '',
    shortDesc: '',
    fullDesc: '',
    coverImage: '',
    isFeatured: false,
    isPublished: true,
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await adminGetAllProjects();
      if (res.success && res.data.projects) {
        setProjects(res.data.projects);
      }
    } catch (err) {
      console.error('Failed to load admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Weddings',
      location: '',
      date: '',
      guestCount: '',
      shortDesc: '',
      fullDesc: '',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
      isFeatured: false,
      isPublished: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: PortfolioProject) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      category: p.category,
      location: p.location,
      date: p.date || '',
      guestCount: p.guestCount ? p.guestCount.toString() : '',
      shortDesc: p.shortDesc,
      fullDesc: p.fullDesc,
      coverImage: p.coverImage,
      isFeatured: p.isFeatured,
      isPublished: p.isPublished,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Auto-generate slug if creating new
      slug: !editingProject ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const payload: any = {
        ...formData,
        guestCount: formData.guestCount ? parseInt(formData.guestCount, 10) : null,
      };

      if (editingProject) {
        const res = await adminUpdateProject(editingProject.id, payload);
        if (res.success) {
          setIsModalOpen(false);
          loadProjects();
        }
      } else {
        const res = await adminCreateProject(payload);
        if (res.success) {
          setIsModalOpen(false);
          loadProjects();
        }
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to save project. Please check required fields.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (project: PortfolioProject) => {
    try {
      await adminUpdateProject(project.id, { isPublished: !project.isPublished });
      setProjects((prev) =>
        prev.map((item) => (item.id === project.id ? { ...item, isPublished: !item.isPublished } : item))
      );
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio project from the archive?')) return;

    try {
      await adminDeleteProject(id);
      setProjects((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-charcoal">Portfolio Curation</h1>
          <p className="font-sans text-xs text-stone-500 mt-1">
            Create, edit, publish, and curate portfolio projects displayed on the public gallery.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadProjects}
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white border border-stone-300 text-stone-700 text-xs uppercase tracking-wider rounded-sm hover:bg-stone-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-luxury-charcoal text-white text-xs uppercase tracking-wider rounded-sm hover:bg-black transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-luxury-gold" />
            <span>Add New Commission</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-xs text-stone-500 uppercase tracking-widest">
            Loading portfolio archives...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-16 text-center text-stone-500 space-y-3">
            <ImageIcon className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-serif text-lg text-stone-800">No Projects in Archive</p>
            <button
              onClick={openCreateModal}
              className="text-xs uppercase tracking-wider text-luxury-gold hover:underline"
            >
              Add your first portfolio showcase
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-14 h-10 bg-stone-200 rounded overflow-hidden">
                        <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-900">{proj.title}</div>
                      <div className="text-[11px] text-stone-400 font-mono">/{proj.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-stone-700 rounded text-[10px] uppercase tracking-wider">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-stone-600">{proj.location}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded border font-medium ${
                          proj.isPublished
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-stone-100 text-stone-500 border-stone-300'
                        }`}
                      >
                        {proj.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="font-serif text-2xl text-stone-900">
                {editingProject ? 'Edit Commission Showcase' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Villa Balbiano"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="villa-balbiano-lake-como"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Proposals">Proposals</option>
                    <option value="Celebrations">Celebrations</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Lake Como, Italy"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="September 2024"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                  />
                </div>

                <div>
                  <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder="120"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="A one-sentence summary for cards and search..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600"
                />
              </div>

              <div>
                <label className="block uppercase text-[10px] text-stone-500 tracking-wider mb-1 font-medium">
                  Full Story & Orchestration Narrative *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Describe the aesthetic concept, architecture, floral design, culinary curation..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-stone-600 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded border-stone-300 text-stone-900"
                  />
                  <span>Published on Website</span>
                </label>
                <label className="flex items-center space-x-2 text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-stone-300 text-stone-900"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-stone-900 text-white rounded uppercase tracking-wider hover:bg-black disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Commission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

