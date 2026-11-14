import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  RefreshCw, 
  Loader2, 
  Copy, 
  Check, 
  Mail,
  UserX
} from 'lucide-react';
import { getSubscribers, unsubscribeNewsletter, deleteSubscriber } from '../../services/newsletterService';

export default function SubscribersTab() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (err) {
      console.error('Failed to load subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleUnsubscribe = async (email) => {
    if (!window.confirm(`Unsubscribe ${email}?`)) return;
    try {
      await unsubscribeNewsletter(email);
      setSubscribers((prev) =>
        prev.map((s) => (s.email === email ? { ...s, status: 'unsubscribed' } : s))
      );
    } catch (err) {
      alert('Error unsubscribing: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this subscriber entry?')) return;
    try {
      await deleteSubscriber(id);
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert('Error deleting subscriber: ' + err.message);
    }
  };

  const copyAllEmails = () => {
    const activeEmails = subscribers
      .filter((s) => s.status === 'subscribed')
      .map((s) => s.email)
      .join(', ');
    navigator.clipboard.writeText(activeEmails);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const filtered = subscribers.filter((s) =>
    !search || s.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = subscribers.filter((s) => s.status === 'subscribed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-paint-charcoal flex items-center gap-2">
            <span>Newsletter Subscribers ({activeCount} Active)</span>
          </h2>
          <p className="text-xs text-paint-muted">
            Manage customers who subscribed to DA Traders painting tips and service updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyAllEmails}
            disabled={subscribers.length === 0}
            className="px-3.5 py-2 rounded-xl bg-paint-charcoal text-white hover:bg-paint-charcoalSoft text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs disabled:opacity-60"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy All Active Emails</span>
          </button>

          <button
            onClick={fetchSubscribers}
            className="px-3.5 py-2 rounded-xl bg-white border border-paint-border text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-paint-muted absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-paint-border text-xs text-paint-charcoal focus:outline-none focus:border-paint-terracotta"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
          <span>Loading subscriber records...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-paint-border text-xs text-paint-muted space-y-2">
          <Users className="w-8 h-8 mx-auto text-paint-muted/50" />
          <p className="font-bold text-paint-charcoal">No subscribers found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-paint-border overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-paint-surfaceAlt/80 border-b border-paint-border text-[11px] font-bold text-paint-muted uppercase">
                <tr>
                  <th className="px-5 py-3.5">Email Address</th>
                  <th className="px-5 py-3.5">Subscribed Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paint-border">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-paint-surfaceAlt/40 transition-colors">
                    <td className="px-5 py-4 font-bold text-paint-charcoal flex items-center gap-2">
                      <Mail className="w-4 h-4 text-paint-muted" />
                      <span>{s.email}</span>
                    </td>
                    <td className="px-5 py-4 text-paint-muted">
                      {s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'subscribed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {s.status === 'subscribed' && (
                          <button
                            onClick={() => handleUnsubscribe(s.email)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                            title="Unsubscribe"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete record"
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
    </div>
  );
}

