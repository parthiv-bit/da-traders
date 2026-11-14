import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Loader2
} from 'lucide-react';
import { submitInquiry, validateInquiry } from '../services/inquiryService';

export default function ContactSection({ onShowToast, preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: preselectedService || 'Experienced Painters',
    message: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, inquiryType: preselectedService }));
    }
  }, [preselectedService]);

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Field Validation
  const validationResult = validateInquiry(formData);
  const errors = validationResult.errors;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Emmanual Cottage, Myloor, Mannamkonum P.O.');
    setCopiedAddress(true);
    onShowToast?.('Address copied to clipboard!');
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      inquiryType: true,
      message: true,
    });

    if (!validationResult.isValid) {
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      await submitInquiry(formData);
      setSubmitted(true);
      onShowToast?.(
        'Thank you! Your inquiry has been sent to DA Traders. We will get back to you shortly.',
        '#821400'
      );
    } catch (err) {
      console.error('[ContactForm] Submission error:', err);
      setSubmitError(
        err.message || 'Unable to submit your message right now. Please try again or reach out directly via WhatsApp.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-paint-surface relative overflow-hidden">
      {/* Subtle ambient glow in #821400 */}
      <div className="absolute top-1/3 -right-60 w-96 h-96 rounded-full blur-[140px] opacity-20 bg-paint-terracotta pointer-events-none" />
      <div className="absolute bottom-10 -left-60 w-96 h-96 rounded-full blur-[140px] opacity-15 bg-paint-terracotta pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-paint-border text-xs font-bold text-paint-charcoal shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-paint-terracotta" />
            <span>Connect &amp; Visit DA Traders</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paint-charcoal tracking-tight">
            Get In Touch &amp; Find Us
          </h2>

          <p className="text-base sm:text-lg text-paint-muted leading-relaxed">
            Whether you need experienced painters, equipment rentals, wall art, or paint delivery,
            our team is ready to assist you.
          </p>
        </div>

        {/* 2. Quick Action & Contacts Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Quick Call */}
          <div className="p-4 rounded-3xl bg-white border border-paint-border shadow-2xs flex items-center gap-3.5 hover:border-paint-terracotta/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-paint-surfaceAlt flex items-center justify-center text-paint-terracotta shrink-0 border border-paint-border">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-paint-muted uppercase tracking-wider block">Call Directly</span>
              <a href="tel:+919497622571" className="text-xs sm:text-sm font-bold text-paint-charcoal hover:text-paint-terracotta transition-colors block truncate">
                +91 94976 22571
              </a>
            </div>
          </div>

          {/* Quick WhatsApp */}
          <div className="p-4 rounded-3xl bg-white border border-paint-border shadow-2xs flex items-center gap-3.5 hover:border-emerald-400 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Instant Chat</span>
              <a 
                href="https://wa.me/919497622571?text=Hello%20DA%20Traders,%20I%20need%20information%20about%20your%20services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs sm:text-sm font-bold text-paint-charcoal hover:text-emerald-700 transition-colors block truncate"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Email */}
          <div className="p-4 rounded-3xl bg-white border border-paint-border shadow-2xs flex items-center gap-3.5 hover:border-paint-terracotta/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-paint-surfaceAlt flex items-center justify-center text-paint-terracotta shrink-0 border border-paint-border">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-paint-muted uppercase tracking-wider block">Email Us</span>
              <a href="mailto:donaemmanual347@gmail.com" className="text-xs sm:text-sm font-bold text-paint-charcoal hover:text-paint-terracotta transition-colors block truncate">
                donaemmanual347@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Hours */}
          <div className="p-4 rounded-3xl bg-white border border-paint-border shadow-2xs flex items-center gap-3.5 hover:border-paint-terracotta/40 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-paint-surfaceAlt flex items-center justify-center text-paint-charcoal shrink-0 border border-paint-border">
              <Clock className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-paint-muted uppercase tracking-wider block">Hours</span>
              <span className="text-xs sm:text-sm font-bold text-paint-charcoal block truncate">
                7:30 AM – 9:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* 3. Main Grid: Left Map & Details, Right Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column (6 Cols): Location, Hours & Live Google Map */}
          <div className="lg:col-span-6 bg-white rounded-4xl p-6 sm:p-8 lg:p-10 border border-paint-border shadow-card flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-paint-border">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-paint-terracotta block">
                    Our Location &amp; Workshop
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-paint-charcoal">
                    DA Traders
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Mon – Sat Open
                </span>
              </div>

              {/* Address with Copy Pill */}
              <div className="p-4 rounded-2xl bg-paint-surfaceAlt border border-paint-border flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-paint-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-paint-muted uppercase tracking-wider block">Shop Address</span>
                    <p className="text-sm font-bold text-paint-charcoal mt-0.5 leading-snug">
                      Emmanual Cottage, Myloor, Mannamkonum P.O.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-paint-charcoal border border-paint-border shadow-2xs transition-colors shrink-0"
                  title="Copy address"
                  aria-label="Copy address"
                >
                  {copiedAddress ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-paint-muted" />
                  )}
                </button>
              </div>

              {/* Contact Info Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Phones */}
                <div className="p-3.5 rounded-2xl bg-paint-surfaceAlt border border-paint-border space-y-1">
                  <span className="font-bold text-paint-muted flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-paint-terracotta" />
                    Direct Lines
                  </span>
                  <div className="flex flex-col gap-0.5 font-bold text-paint-charcoal">
                    <a href="tel:+919497622571" className="hover:text-paint-terracotta transition-colors">
                      +91 94976 22571
                    </a>
                    <a href="tel:+919188452571" className="hover:text-paint-terracotta transition-colors">
                      +91 91884 52571
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-3.5 rounded-2xl bg-paint-surfaceAlt border border-paint-border space-y-1">
                  <span className="font-bold text-paint-muted flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-paint-charcoal" />
                    Opening Hours
                  </span>
                  <div className="font-bold text-paint-charcoal">
                    <span>Mon – Sat: 7:30 AM – 9:00 PM</span>
                    <span className="text-[11px] text-paint-muted font-normal block">Sunday: On Request</span>
                  </div>
                </div>
              </div>

              {/* Live Interactive Google Map Container */}
              <div className="rounded-3xl border border-paint-border overflow-hidden bg-stone-100 shadow-2xs relative flex flex-col">
                <div className="w-full h-72 sm:h-80 relative bg-stone-200">
                  <iframe
                    title="DA Traders Google Map Location"
                    src="https://maps.google.com/maps?q=D.A+TRADERS+Emmanual+Cottage+Myloor+Mannamkonum&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="p-3.5 bg-white border-t border-paint-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-paint-terracotta shrink-0" />
                    <span className="font-bold text-paint-charcoal truncate">
                      D.A TRADERS · Myloor, Mannamkonum
                    </span>
                  </div>

                  <a
                    href="https://share.google/JdaeUc0MMDbNtK5hT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (6 Cols): Inquiry & Service Booking Form */}
          <div className="lg:col-span-6 bg-white rounded-4xl p-6 sm:p-8 lg:p-10 border border-paint-border shadow-card flex flex-col justify-between">
            
            {submitted ? (
              <div className="my-auto py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-paint-charcoal">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm text-paint-muted max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong>{formData.inquiryType}</strong> has been successfully received by <strong>DA Traders</strong>.
                  We will contact you via email at <strong>{formData.email}</strong> or phone at <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Experienced Painters',
                        message: '',
                      });
                      setTouched({});
                    }}
                    className="px-6 py-2.5 rounded-full bg-paint-charcoal text-white text-xs font-bold hover:bg-paint-charcoalSoft transition-colors"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={`https://wa.me/919497622571?text=Hello%20DA%20Traders,%20I%20just%20submitted%20an%20inquiry%20regarding%20${encodeURIComponent(
                      formData.inquiryType
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Follow Up on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Form Header */}
                  <div className="pb-4 border-b border-paint-border flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-paint-terracotta block">
                        Quick Inquiry &amp; Booking
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-paint-charcoal">
                        Send Us a Message
                      </h3>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hidden sm:inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Fast Response</span>
                    </span>
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <div className="flex-1">
                        <span className="font-bold block">Submission Note:</span>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  {/* Field: Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-paint-charcoal flex items-center justify-between">
                      <span>Your Full Name <span className="text-paint-terracotta">*</span></span>
                      {touched.name && errors.name && (
                        <span className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs sm:text-sm border transition-colors focus:outline-none ${
                        touched.name && errors.name
                          ? 'border-red-400 bg-red-50/40'
                          : 'border-paint-border focus:border-paint-terracotta'
                      }`}
                    />
                  </div>

                  {/* 2-Col: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-paint-charcoal flex items-center justify-between">
                        <span>Email Address <span className="text-paint-terracotta">*</span></span>
                        {touched.email && errors.email && (
                          <span className="text-[11px] font-semibold text-red-600">
                            {errors.email}
                          </span>
                        )}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="yourname@gmail.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs sm:text-sm border transition-colors focus:outline-none ${
                          touched.email && errors.email
                            ? 'border-red-400 bg-red-50/40'
                            : 'border-paint-border focus:border-paint-terracotta'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-paint-charcoal flex items-center justify-between">
                        <span>Phone Number <span className="text-paint-terracotta">*</span></span>
                        {touched.phone && errors.phone && (
                          <span className="text-[11px] font-semibold text-red-600">
                            Required
                          </span>
                        )}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="+91 94976 22571"
                        className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs sm:text-sm border transition-colors focus:outline-none ${
                          touched.phone && errors.phone
                            ? 'border-red-400 bg-red-50/40'
                            : 'border-paint-border focus:border-paint-terracotta'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field: Service Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-paint-charcoal block">
                      Select Service / Purpose <span className="text-paint-terracotta">*</span>
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleChange('inquiryType', e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs sm:text-sm border border-paint-border focus:outline-none focus:border-paint-terracotta"
                    >
                      <option value="Experienced Painters">Experienced Painters (Residential &amp; Commercial)</option>
                      <option value="Equipment Rental">Equipment Rental (Compressor Machines &amp; Tools)</option>
                      <option value="Wall Painting Artists">Wall Painting Artists (Murals &amp; Decor)</option>
                      <option value="3D Wall Art">3D Wall Art (Dimensional Designs)</option>
                      <option value="Delivery Service">Delivery Service (Paint Products &amp; Accessories)</option>
                      <option value="General Inquiry">General Inquiry / Shop Visit</option>
                    </select>
                  </div>

                  {/* Field: Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-paint-charcoal flex items-center justify-between">
                      <span>Project Details / Notes <span className="text-paint-terracotta">*</span></span>
                      {touched.message && errors.message && (
                        <span className="text-[11px] font-semibold text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </span>
                      )}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Share your requirements (e.g. rooms to paint, equipment needed, preferred timeline)..."
                      className={`w-full px-4 py-3 rounded-2xl bg-paint-surfaceAlt text-paint-charcoal text-xs sm:text-sm border resize-none transition-colors focus:outline-none ${
                        touched.message && errors.message
                          ? 'border-red-400 bg-red-50/40'
                          : 'border-paint-border focus:border-paint-terracotta'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit CTA & WhatsApp Quick Option */}
                <div className="pt-4 border-t border-paint-border space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-card hover:shadow-card-hover transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry to DA Traders</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-paint-muted">
                    <span>Prefer direct chat?</span>
                    <a
                      href="https://wa.me/919497622571?text=Hello%20DA%20Traders,%20I%20have%20an%20inquiry%20regarding%20your%20services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-600" />
                      <span>Message on WhatsApp (+91 94976 22571)</span>
                    </a>
                  </div>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
