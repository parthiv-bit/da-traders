import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Loader2, 
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../services/inquiryService';

export default function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const filtered = inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.email && item.email.toLowerCase().includes(term)) ||
      (item.phone && item.phone.includes(term)) ||
      (item.inquiryType && item.inquiryType.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">New</span>;
      case 'contacted':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Contacted</span>;
      case 'in_progress':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">In Progress</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Completed</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
            Customer Inquiries ({inquiries.length})
          </h2>
          <p className="text-xs text-paint-muted">
            Manage inquiries submitted via the website contact form.
          </p>
        </div>

        <button
          onClick={fetchItems}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-paint-border text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-paint-muted absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, email or service..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-paint-border text-xs text-paint-charcoal focus:outline-none focus:border-paint-terracotta"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-paint-border text-xs text-paint-charcoal focus:outline-none focus:border-paint-terracotta"
          >
            <option value="all">All Inquiries</option>
            <option value="new">New Only</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="py-20 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
          <span>Loading inquiries...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-paint-border text-xs text-paint-muted space-y-2">
          <Inbox className="w-8 h-8 mx-auto text-paint-muted/50" />
          <p className="font-bold text-paint-charcoal">No inquiries found.</p>
          <p>Any incoming inquiries from the website will appear here in real time.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-paint-border overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-paint-surfaceAlt/80 border-b border-paint-border text-[11px] font-bold text-paint-muted uppercase">
                <tr>
                  <th className="px-5 py-3.5">Customer</th>
                  <th className="px-5 py-3.5">Service Requested</th>
                  <th className="px-5 py-3.5">Contact Details</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paint-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-paint-surfaceAlt/40 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-bold text-paint-charcoal block">{item.name}</span>
                      <span className="text-[10px] text-paint-muted">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-medium text-paint-charcoal bg-paint-surfaceAlt px-2.5 py-1 rounded-lg border border-paint-border inline-block">
                        {item.inquiryType}
                      </span>
                    </td>
                    <td className="px-5 py-4 space-y-0.5">
                      <a href={`tel:${item.phone}`} className="text-paint-terracotta font-semibold hover:underline block">
                        {item.phone}
                      </a>
                      <a href={`mailto:${item.email}`} className="text-paint-muted hover:underline block text-[11px]">
                        {item.email}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        <select
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className="text-[11px] border border-paint-border rounded-lg px-2 py-1 bg-white focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="p-1.5 rounded-lg bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                            item.name
                          )},%20this%20is%20DA%20Traders%20following%20up%20on%20your%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Reply via WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-paint-border shadow-floating">
            <div className="flex items-center justify-between pb-3 border-b border-paint-border">
              <h3 className="font-display font-bold text-lg text-paint-charcoal">
                Inquiry from {selectedInquiry.name}
              </h3>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl hover:bg-paint-surfaceAlt text-paint-muted hover:text-paint-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-paint-surfaceAlt">
                <div>
                  <span className="text-[10px] uppercase font-bold text-paint-muted block">Service</span>
                  <span className="font-bold text-paint-charcoal">{selectedInquiry.inquiryType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-paint-muted block">Status</span>
                  <span className="font-bold">{getStatusBadge(selectedInquiry.status)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-paint-muted block">Phone</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-paint-terracotta">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-paint-muted block">Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-paint-charcoal">
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div>
                <span className="font-bold text-paint-charcoal block mb-1.5">Project Message:</span>
                <div className="p-4 rounded-2xl bg-stone-50 border border-paint-border text-paint-charcoal whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                  selectedInquiry.name
                )},%20this%20is%20DA%20Traders%20following%20up%20on%20your%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl bg-paint-charcoal text-white text-xs font-bold hover:bg-paint-charcoalSoft"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

