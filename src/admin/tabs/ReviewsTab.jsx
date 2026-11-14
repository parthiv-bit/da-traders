import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  X, 
  Trash2, 
  RefreshCw, 
  Loader2, 
  AlertCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { getAllReviewsForAdmin, updateReviewStatus, deleteReview } from '../../services/reviewService';

export default function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved', 'rejected'
  const [actingId, setActingId] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getAllReviewsForAdmin();
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatus = async (id, status) => {
    setActingId(id);
    try {
      await updateReviewStatus(id, status);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      alert('Error updating review: ' + err.message);
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('Error deleting review: ' + err.message);
    }
  };

  const filtered = reviews.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-paint-charcoal flex items-center gap-2">
            <span>Customer Reviews Moderation</span>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                {pendingCount} Pending
              </span>
            )}
          </h2>
          <p className="text-xs text-paint-muted">
            Newly submitted customer reviews remain pending until approved here. Only approved reviews appear on the website.
          </p>
        </div>

        <button
          onClick={fetchReviews}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-paint-border text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="inline-flex rounded-xl bg-paint-surfaceAlt p-1 border border-paint-border">
        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
              filter === tab
                ? 'bg-white text-paint-charcoal shadow-2xs'
                : 'text-paint-muted hover:text-paint-charcoal'
            }`}
          >
            {tab} ({tab === 'all' ? reviews.length : reviews.filter((r) => r.status === tab).length})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
          <span>Loading reviews...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-paint-border text-xs text-paint-muted space-y-2">
          <p className="font-bold text-paint-charcoal">No reviews found in this view.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`p-6 rounded-3xl bg-white border transition-all space-y-4 flex flex-col justify-between ${
                r.status === 'pending'
                  ? 'border-amber-300 ring-2 ring-amber-100'
                  : 'border-paint-border'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-paint-charcoal ml-1">({r.rating}/5)</span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      r.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                {r.title && (
                  <h4 className="font-display font-bold text-sm text-paint-charcoal">
                    "{r.title}"
                  </h4>
                )}

                <p className="text-xs text-paint-muted leading-relaxed whitespace-pre-wrap">
                  {r.comment}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-paint-charcoal">{r.name}</span>
                  <span className="text-[10px] text-paint-muted">({r.serviceType || 'Service'})</span>
                  <span className="text-[10px] text-stone-400 ml-auto">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              </div>

              {/* Moderation Controls */}
              <div className="pt-3 border-t border-paint-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {r.status !== 'approved' && (
                    <button
                      disabled={actingId === r.id}
                      onClick={() => handleStatus(r.id, 'approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors disabled:opacity-60"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {r.status !== 'rejected' && (
                    <button
                      disabled={actingId === r.id}
                      onClick={() => handleStatus(r.id, 'rejected')}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold inline-flex items-center gap-1 transition-colors disabled:opacity-60"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

