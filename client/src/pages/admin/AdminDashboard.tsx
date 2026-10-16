import React, { useState, useEffect } from 'react';
import {
  adminGetInquiries,
  adminGetInquiryStats,
  adminGetInquiryById,
  adminUpdateInquiryStatus,
  adminAddInquiryNote,
} from '../../services/api.js';
import { Inquiry, InquiryStats, InquiryStatus } from '../../types/index.js';
import { Badge } from '../../components/ui/Badge.js';
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Clock,
  X,
  Send,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    inDiscussion: 0,
    confirmed: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Selected inquiry for detail modal/drawer
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, inqRes] = await Promise.all([
        adminGetInquiryStats().catch(() => null),
        adminGetInquiries({
          page: currentPage,
          limit: 10,
          status: statusFilter,
          search: searchQuery,
        }).catch(() => null),
      ]);

      if (statsRes?.success && statsRes.data.stats) {
        setStats(statsRes.data.stats);
      }

      if (inqRes?.success && inqRes.data.inquiries) {
        setInquiries(inqRes.data.inquiries);
        setTotalPages(inqRes.data.pagination.totalPages || 1);
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, currentPage]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadData();
  };

  const handleOpenDetail = async (id: string) => {
    setLoadingDetail(true);
    try {
      const res = await adminGetInquiryById(id);
      if (res.success && res.data.inquiry) {
        setSelectedInquiry(res.data.inquiry);
      }
    } catch (err) {
      console.error('Failed to load inquiry details:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedInquiry) return;
    setStatusUpdating(true);
    try {
      const res = await adminUpdateInquiryStatus(selectedInquiry.id, newStatus);
      if (res.success && res.data.inquiry) {
        setSelectedInquiry({
          ...selectedInquiry,
          status: res.data.inquiry.status,
        });
        // Update item in inquiries list
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === selectedInquiry.id ? { ...item, status: res.data.inquiry.status } : item
          )
        );
        // Refresh stats
        adminGetInquiryStats().then((s) => s.success && setStats(s.data.stats));
      }
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNoteContent.trim() || submittingNote) return;

    setSubmittingNote(true);
    try {
      const res = await adminAddInquiryNote(selectedInquiry.id, newNoteContent.trim());
      if (res.success && res.data.note) {
        const updatedNotes = [res.data.note, ...(selectedInquiry.internalNotes || [])];
        setSelectedInquiry({
          ...selectedInquiry,
          internalNotes: updatedNotes,
        });
        setNewNoteContent('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-charcoal">Inquiry Management</h1>
          <p className="font-sans text-xs text-stone-500 mt-1">
            Review incoming commission requests, update client statuses, and maintain internal notes.
          </p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white border border-stone-300 text-stone-700 text-xs uppercase tracking-wider rounded-sm hover:bg-stone-50 transition-colors self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 border border-stone-200 rounded-sm shadow-sm space-y-1">
          <span className="text-[11px] font-sans uppercase tracking-wider text-stone-500">
            Total Inquiries
          </span>
          <div className="text-2xl font-serif text-stone-900">{stats.total}</div>
        </div>
        <div className="bg-white p-5 border-l-4 border-l-amber-500 border border-stone-200 rounded-sm shadow-sm space-y-1">
          <span className="text-[11px] font-sans uppercase tracking-wider text-amber-700 font-medium">
            New Requests
          </span>
          <div className="text-2xl font-serif text-amber-900">{stats.new}</div>
        </div>
        <div className="bg-white p-5 border-l-4 border-l-sky-500 border border-stone-200 rounded-sm shadow-sm space-y-1">
          <span className="text-[11px] font-sans uppercase tracking-wider text-sky-700 font-medium">
            Contacted
          </span>
          <div className="text-2xl font-serif text-sky-900">{stats.contacted}</div>
        </div>
        <div className="bg-white p-5 border-l-4 border-l-purple-500 border border-stone-200 rounded-sm shadow-sm space-y-1">
          <span className="text-[11px] font-sans uppercase tracking-wider text-purple-700 font-medium">
            In Discussion
          </span>
          <div className="text-2xl font-serif text-purple-900">{stats.inDiscussion}</div>
        </div>
        <div className="bg-white p-5 border-l-4 border-l-emerald-500 border border-stone-200 rounded-sm shadow-sm space-y-1">
          <span className="text-[11px] font-sans uppercase tracking-wider text-emerald-700 font-medium">
            Confirmed Commissions
          </span>
          <div className="text-2xl font-serif text-emerald-900">{stats.confirmed}</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 border border-stone-200 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or destination..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 text-xs rounded-sm focus:outline-none focus:border-stone-500"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 shrink-0">Status:</span>
          {['ALL', 'NEW', 'CONTACTED', 'IN_DISCUSSION', 'CONFIRMED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                statusFilter === st
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-xs text-stone-500 uppercase tracking-widest">
            Loading inquiries data...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-16 text-center text-stone-500 space-y-2">
            <p className="font-serif text-lg text-stone-800">No Inquiries Found</p>
            <p className="text-xs">
              {statusFilter !== 'ALL' || searchQuery
                ? 'Try clearing your search query or status filter.'
                : 'New submissions from the public website will appear here instantly.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Occasion & Location</th>
                  <th className="py-3 px-4">Preferred Date</th>
                  <th className="py-3 px-4">Budget Range</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-stone-50/80 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(inq.id)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-stone-900">{inq.fullName}</div>
                      <div className="text-[11px] text-stone-500">{inq.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-stone-800 font-medium">{inq.eventType}</div>
                      <div className="text-[11px] text-stone-500">{inq.location || 'Undisclosed'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {inq.preferredDate || 'Flexible'}
                      {inq.flexibleDate && (
                        <span className="block text-[10px] text-amber-700 italic">Flexible Date</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {inq.budgetRange || 'Unspecified'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={inq.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(inq.id);
                        }}
                        className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded transition-colors"
                        title="View Full Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex space-x-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="space-y-1">
                <div className="text-[10px] font-sans uppercase tracking-wider text-stone-400">
                  Inquiry ID: {selectedInquiry.id}
                </div>
                <h2 className="font-serif text-2xl text-stone-900">
                  {selectedInquiry.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {/* Status Update bar */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-500 block">
                    Current Status:
                  </span>
                  <div className="mt-1">
                    <Badge status={selectedInquiry.status} />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-500">Update:</span>
                  <select
                    disabled={statusUpdating}
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="text-xs border border-stone-300 rounded px-2.5 py-1.5 bg-white text-stone-800 focus:outline-none focus:border-stone-500"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="IN_DISCUSSION">In Discussion</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="CLOSED">Closed / Archived</option>
                  </select>
                </div>
              </div>

              {/* Client & Event info grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Email</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-stone-900 font-medium hover:underline flex items-center space-x-1"
                  >
                    <Mail className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span className="truncate">{selectedInquiry.email}</span>
                  </a>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Telephone</span>
                  <div className="text-stone-900 font-medium flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{selectedInquiry.phone || 'Not provided'}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Occasion</span>
                  <div className="text-stone-900 font-medium">{selectedInquiry.eventType}</div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Destination / Venue</span>
                  <div className="text-stone-900 font-medium flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{selectedInquiry.location || 'Undisclosed'}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Target Date</span>
                  <div className="text-stone-900 font-medium flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    <span>{selectedInquiry.preferredDate || 'Flexible'}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm space-y-1">
                  <span className="text-[10px] uppercase text-stone-400 block">Guest Count & Budget</span>
                  <div className="text-stone-900 font-medium">
                    {selectedInquiry.guestCount ? `${selectedInquiry.guestCount} guests` : 'TBD'} &bull;{' '}
                    {selectedInquiry.budgetRange || 'Open'}
                  </div>
                </div>
              </div>

              {/* Vision Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-sans uppercase tracking-wider text-stone-500">
                  Client Narrative & Event Vision
                </h4>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                  {selectedInquiry.vision}
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-wider text-stone-700 font-medium">
                  <MessageSquare className="w-4 h-4 text-stone-500" />
                  <span>Internal Atelier Staff Notes</span>
                </div>

                {/* New note input form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder="Add an internal confidential note regarding this client or quote..."
                    className="w-full p-3 bg-white border border-stone-300 rounded text-xs focus:outline-none focus:border-stone-600"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={submittingNote || !newNoteContent.trim()}
                    className="px-4 py-2 bg-stone-900 text-white rounded text-xs uppercase tracking-wider hover:bg-black disabled:opacity-50 flex items-center space-x-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>{submittingNote ? 'Saving Note...' : 'Add Internal Note'}</span>
                  </button>
                </form>

                {/* Notes thread */}
                <div className="space-y-2 pt-2">
                  {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 ? (
                    selectedInquiry.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 bg-amber-50/60 border border-amber-200/70 rounded text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-amber-900/80 font-medium">
                          <span>{note.authorName}</span>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-stone-800">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-stone-400 italic">No internal notes added yet.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-stone-200 text-stone-800 text-xs rounded hover:bg-stone-300"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

