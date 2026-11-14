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
    <section id="reviews" className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#FBF8F5] to-white relative border-y border-paint-border">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full blur-[140px] opacity-15 bg-paint-terracotta pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full blur-[140px] opacity-15 bg-amber-500/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Customer Feedback &amp; Experiences</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Customer Reviews
          </h2>

          <div className="w-12 h-1 bg-gradient-to-r from-paint-terracotta to-paint-sunshine rounded-full mx-auto" />

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            Read verified feedback from homeowners, decorators, and contractors
            who have used DA Traders for products, services, and equipment.
          </p>
        </div>

        {/* Rating Overview & Action Banner */}
        <div className="bg-white rounded-4xl p-6 sm:p-8 border border-paint-border shadow-card mb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-paint-terracotta to-paint-sunshine" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="px-6 py-4 rounded-3xl bg-paint-surfaceAlt border border-paint-border flex flex-col items-center justify-center shadow-2xs">
              <span className="font-display font-black text-4xl text-paint-charcoal">
                {averageRating}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-paint-muted font-bold uppercase tracking-wider">
                Average Rating
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Client Experiences</span>
              </div>
              <h3 className="font-display font-bold text-xl text-paint-charcoal">
                Genuine Customer Feedback
              </h3>
              <p className="text-xs sm:text-sm text-paint-muted max-w-md leading-relaxed">
                Based on approved community reviews. Have you visited our shop or hired our painters? We would love to hear your experience!
              </p>
            </div>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-paint-terracotta to-[#B01E00] hover:from-[#5E0E00] hover:to-paint-terracotta text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-card hover:shadow-card-hover transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
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
                <div className="bg-white rounded-4xl p-8 border border-emerald-300 text-center space-y-3 shadow-card">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-paint-charcoal">Review Submitted!</h4>
                  <p className="text-xs text-paint-muted max-w-md mx-auto leading-relaxed">
                    Thank you for sharing your feedback with DA Traders. Newly submitted reviews are reviewed by our team before being displayed publicly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitReview}
                  className="bg-white rounded-4xl p-6 sm:p-8 border border-paint-terracotta/30 shadow-card space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-paint-terracotta via-paint-sunshine to-amber-400" />

                  <div className="flex items-center justify-between pb-4 border-b border-paint-border">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-paint-terracotta" />
                      <h3 className="font-display font-bold text-lg text-paint-charcoal">
                        Share Your Experience with DA Traders
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-paint-muted bg-paint-surfaceAlt px-2.5 py-1 rounded-full border border-paint-border">Public reviews undergo moderation</span>
                  </div>

                  {formErrors.general && (
                    <div className="p-3.5 rounded-2xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
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
                                  ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                                  : 'text-stone-300 stroke-stone-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs font-bold text-paint-charcoal ml-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
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
                        className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs text-paint-charcoal border transition-colors ${
                          formErrors.name ? 'border-red-500' : 'border-paint-border'
                        } focus:outline-none focus:border-paint-terracotta focus:ring-2 focus:ring-paint-terracotta/20`}
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
                        className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta focus:ring-2 focus:ring-paint-terracotta/20"
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
                      className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs text-paint-charcoal border border-paint-border focus:outline-none focus:border-paint-terracotta focus:ring-2 focus:ring-paint-terracotta/20"
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
                      className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-xs text-paint-charcoal border transition-colors ${
                        formErrors.comment ? 'border-red-500' : 'border-paint-border'
                      } focus:outline-none focus:border-paint-terracotta focus:ring-2 focus:ring-paint-terracotta/20 resize-none`}
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
                      className="px-5 py-2.5 rounded-2xl border border-paint-border text-paint-muted hover:text-paint-charcoal text-xs font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-paint-terracotta to-[#B01E00] hover:from-[#5E0E00] hover:to-paint-terracotta text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-60"
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
            <div className="inline-flex rounded-2xl bg-white p-1 border border-paint-border shadow-2xs">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterRating === 'all'
                    ? 'bg-paint-terracotta text-white shadow-xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                All ({reviews.length})
              </button>
              <button
                onClick={() => setFilterRating('5')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterRating === '5'
                    ? 'bg-paint-terracotta text-white shadow-xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                5 Stars Only
              </button>
              <button
                onClick={() => setFilterRating('4')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterRating === '4'
                    ? 'bg-paint-terracotta text-white shadow-xs'
                    : 'text-paint-muted hover:text-paint-charcoal'
                }`}
              >
                4+ Stars
              </button>
            </div>
          </div>

          <span className="text-xs font-medium text-paint-muted">
            Showing {displayedReviews.length} approved review{displayedReviews.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Reviews Cards Masonry Grid */}
        {loadingReviews ? (
          <div className="py-16 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
            <span className="font-medium">Loading customer reviews...</span>
          </div>
        ) : displayedReviews.length === 0 ? (
          <div className="p-12 text-center rounded-4xl bg-white border border-paint-border text-xs text-paint-muted space-y-2 shadow-2xs">
            <p className="font-bold text-paint-charcoal text-sm">No reviews match the selected filter.</p>
            <p>Be the first to leave a review for DA Traders!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((rev, index) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-paint-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 min-w-0 overflow-hidden break-words [overflow-wrap:anywhere] group relative"
              >
                <div className="space-y-3.5 min-w-0">
                  {/* Header: Stars & Verified Badge */}
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
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>Verified Review</span>
                    </span>
                  </div>

                  {/* Review Headline & Body */}
                  {rev.title && (
                    <h4 className="font-display font-bold text-sm sm:text-base text-paint-charcoal break-words [overflow-wrap:anywhere] [word-break:break-word] leading-snug">
                      "{rev.title}"
                    </h4>
                  )}

                  <p className="text-xs sm:text-sm text-paint-muted leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word]">
                    {rev.comment}
                  </p>

                  {/* Service Mention Pill if present */}
                  {rev.serviceType && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-paint-surfaceAlt border border-paint-border text-[11px] font-semibold text-paint-charcoal max-w-full">
                        <span className="w-2 h-2 rounded-full bg-paint-terracotta shrink-0" />
                        <span className="truncate">{rev.serviceType}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Author Footer */}
                <div className="pt-4 border-t border-paint-border/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-paint-surfaceAlt to-paint-linen text-paint-terracotta font-extrabold text-xs flex items-center justify-center border border-paint-border shrink-0 shadow-2xs">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-paint-charcoal block truncate">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-paint-muted block truncate font-medium">
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
