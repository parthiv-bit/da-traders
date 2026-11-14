import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, CheckCircle2, Sparkles, Send, Loader2, AlertCircle } from 'lucide-react';
import { getApprovedReviews, submitReview, validateReview } from '../services/reviewService';

export default function ReviewsSection({ isReviewModalOpen, onCloseReviewModal, onShowToast }) {
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [filterRating, setFilterRating] = useState('all'); // 'all', '5', '4'
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [serviceType, setServiceType] = useState('Experienced Painters');
  const [formErrors, setFormErrors] = useState({});

  // Fetch approved reviews on mount
  useEffect(() => {
    let mounted = true;
    async function loadReviews() {
      try {
        const data = await getApprovedReviews();
        if (mounted) setReviews(data);
      } catch (err) {
        console.warn('[ReviewsSection] Failed to load reviews:', err);
      } finally {
        if (mounted) setLoadingReviews(false);
      }
    }
    loadReviews();
    return () => {
      mounted = false;
    };
  }, []);

  // Sync external open request
  useEffect(() => {
    if (isReviewModalOpen) {
      setFormOpen(true);
    }
  }, [isReviewModalOpen]);

  const handleRatingSelect = (score) => {
    setNewRating(score);
  };

  const ratingLabels = {
    1: 'Needs Improvement',
    2: 'Fair Experience',
    3: 'Good Service',
    4: 'Great Experience',
    5: 'Exceptional — Highly Recommended!',
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const validation = validateReview({ name, rating: newRating, comment });
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    setFormErrors({});

    try {
      await submitReview({
        name,
        role: role.trim() || 'Customer',
        rating: newRating,
        title: title.trim() || 'Review for DA Traders',
        comment,
        serviceType,
      });

      setSubmitSuccess(true);
      onShowToast?.(
        'Thank you! Your review has been submitted for moderation and will appear once approved.',
        '#821400'
      );

      // Reset Form fields
      setName('');
      setRole('');
      setTitle('');
      setComment('');
      setFormErrors({});
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormOpen(false);
        onCloseReviewModal?.();
      }, 3500);
    } catch (err) {
      console.error('[ReviewsSection] Submission error:', err);
      setFormErrors({ general: err.message || 'Unable to submit review right now.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered reviews
  const displayedReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    if (filterRating === '5') return r.rating === 5;
    if (filterRating === '4') return r.rating >= 4;
    return true;
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white relative border-y border-paint-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paint-surfaceAlt border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Customer Feedback &amp; Experiences</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Customer Reviews
          </h2>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            Read verified feedback from homeowners, decorators, and contractors
            who have used DA Traders for products, services, and equipment.
          </p>
        </div>

        {/* Rating Overview & Action Banner */}
        <div className="bg-paint-surfaceAlt rounded-4xl p-6 sm:p-8 border border-paint-border shadow-soft mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="px-5 py-3 rounded-2xl bg-white border border-paint-border flex flex-col items-center justify-center shadow-2xs">
              <span className="font-display font-black text-4xl text-paint-charcoal">
                {averageRating}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-paint-muted font-bold uppercase tracking-wider">
                Average Rating
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-paint-charcoal">
                Genuine Customer Feedback
              </h3>
              <p className="text-xs sm:text-sm text-paint-muted max-w-md">
                Based on approved community reviews. Have you visited our shop or hired our painters? We would love to hear your experience!
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-6 py-3.5 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{formOpen ? 'Close Review Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Collapsible Interactive "Write a Review" Form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              {submitSuccess ? (
                <div className="bg-white rounded-3xl p-8 border border-emerald-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-paint-charcoal">Review Submitted!</h4>
                  <p className="text-xs text-paint-muted max-w-md mx-auto">
                    Thank you for sharing your feedback with DA Traders. Newly submitted reviews are reviewed by our team before being displayed publicly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitReview}
                  className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-paint-terracotta/40 shadow-card space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-paint-border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-paint-terracotta" />
                      <h3 className="font-display font-bold text-lg text-paint-charcoal">
                        Share Your Experience with DA Traders
                      </h3>
                    </div>
                    <span className="text-xs text-paint-muted">Public reviews undergo moderation</span>
                  </div>

                  {formErrors.general && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formErrors.general}</span>
                    </div>
                  )}

                  {/* 1. Star Rating Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-paint-charcoal block">
                      Your Rating <span className="text-paint-terracotta">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isHoveredOrActive = (hoverRating || newRating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleRatingSelect(star)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                            aria-label={`Rate ${star} star`}
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                                isHoveredOrActive
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300 stroke-stone-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-paint-charcoal ml-2">
                        {ratingLabels[hoverRating || newRating]}
                      </span>
                    </div>
                    {formErrors.rating && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.rating}</p>
                    )}
                  </div>

                  {/* 2. Reviewer Name & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-paint-charcoal block">
                        Your Name <span className="text-paint-terracotta">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors((p) => ({ ...p, name: null }));
                        }}
                        placeholder="e.g. Anand Varma"
                        className={`w-full px-4 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs text-paint-charcoal border ${
                          formErrors.name ? 'border-red-500' : 'border-paint-border'
                        } focus:outline-none focus:border-paint-terracotta`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-paint-charcoal block">
                        Service Experienced
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta"
                      >
                        <option value="Experienced Painters">Experienced Painters</option>
                        <option value="Equipment Rental">Equipment Rental</option>
                        <option value="Wall Painting Artists">Wall Painting Artists</option>
                        <option value="3D Wall Art">3D Wall Art</option>
                        <option value="Delivery Service">Delivery Service</option>
                        <option value="Shop Visit & Products">Shop Visit &amp; Products</option>
                      </select>
                    </div>
                  </div>

                  {/* 3. Review Headline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-paint-charcoal block">
                      Review Summary Headline
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Excellent painters and prompt delivery!"
                      className="w-full px-4 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta"
                    />
                  </div>

                  {/* 4. Review Comment */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-paint-charcoal block">
                      Your Review <span className="text-paint-terracotta">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        if (formErrors.comment) setFormErrors((p) => ({ ...p, comment: null }));
                      }}
                      placeholder="Tell us about your project, the quality of the service, or the finish achieved..."
                      className={`w-full px-4 py-3 rounded-xl bg-paint-surfaceAlt text-xs text-paint-charcoal border ${
                        formErrors.comment ? 'border-red-500' : 'border-paint-border'
                      } focus:outline-none focus:border-paint-terracotta resize-none`}
                    />
                    {formErrors.comment && (
                      <p className="text-[11px] text-red-600 font-medium">{formErrors.comment}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-paint-border text-paint-muted hover:text-paint-charcoal text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit For Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-paint-charcoal">Filter by rating:</span>
            <div className="inline-flex rounded-xl bg-paint-surfaceAlt p-1 border border-paint-border">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterRating === 'all'
                    ? 'bg-white text-paint-charcoal shadow-2xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating('5')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterRating === '5'
                    ? 'bg-white text-paint-charcoal shadow-2xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                5 Stars Only
              </button>
              <button
                onClick={() => setFilterRating('4')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterRating === '4'
                    ? 'bg-white text-paint-charcoal shadow-2xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                4+ Stars
              </button>
            </div>
          </div>

          <span className="text-xs text-paint-muted">
            Showing {displayedReviews.length} approved review{displayedReviews.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Reviews Cards Masonry Grid */}
        {loadingReviews ? (
          <div className="py-12 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-paint-terracotta" />
            <span>Loading customer reviews...</span>
          </div>
        ) : displayedReviews.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-paint-surfaceAlt border border-paint-border text-xs text-paint-muted space-y-2">
            <p className="font-bold text-paint-charcoal">No reviews match the selected filter.</p>
            <p>Be the first to leave a review for DA Traders!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-paint-surfaceAlt rounded-3xl p-6 border border-paint-border hover:border-paint-terracotta/40 hover:shadow-card transition-all flex flex-col justify-between space-y-4 min-w-0 overflow-hidden break-words [overflow-wrap:anywhere]"
              >
                <div className="space-y-3 min-w-0">
                  {/* Header: Stars */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-500 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-200 text-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Headline & Body */}
                  {rev.title && (
                    <h4 className="font-display font-bold text-sm sm:text-base text-paint-charcoal break-words [overflow-wrap:anywhere] [word-break:break-word]">
                      "{rev.title}"
                    </h4>
                  )}

                  <p className="text-xs sm:text-sm text-paint-muted leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word]">
                    {rev.comment}
                  </p>

                  {/* Service Mention Pill if present */}
                  {rev.serviceType && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-paint-border text-[11px] font-semibold text-paint-charcoal max-w-full">
                        <span className="w-2 h-2 rounded-full bg-paint-terracotta shrink-0" />
                        <span className="truncate">{rev.serviceType}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-paint-border/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-paint-terracotta/10 text-paint-terracotta font-bold text-xs flex items-center justify-center border border-paint-terracotta/20 shrink-0">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-paint-charcoal block truncate">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-paint-muted block truncate">
                        {rev.role || 'Customer'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
