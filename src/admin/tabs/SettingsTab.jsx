import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Loader2, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { getBusinessSettings, updateBusinessSettings, DEFAULT_BUSINESS_SETTINGS } from '../../services/settingsService';

export default function SettingsTab() {
  const [settings, setSettings] = useState(DEFAULT_BUSINESS_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getBusinessSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await updateBusinessSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Error updating business settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, val) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
        <span>Loading business settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
          Business Information &amp; Contact Settings
        </h2>
        <p className="text-xs text-paint-muted">
          Manage physical address, verified direct lines, opening hours, and Google Maps URL.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Business settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-paint-border shadow-2xs space-y-6">
        {/* Shop Name & Address */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-paint-charcoal pb-2 border-b border-paint-border flex items-center gap-2">
            <MapPin className="w-4 h-4 text-paint-terracotta" />
            <span>Store Location Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Shop Name</label>
              <input
                type="text"
                value={settings.shopName}
                onChange={(e) => handleChange('shopName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-paint-charcoal block">Physical Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-paint-charcoal block">Google Maps Share URL</label>
            <input
              type="url"
              value={settings.googleMapsShareUrl}
              onChange={(e) => handleChange('googleMapsShareUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
            />
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-paint-charcoal pb-2 border-b border-paint-border flex items-center gap-2">
            <Phone className="w-4 h-4 text-paint-terracotta" />
            <span>Direct Phone Numbers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Primary Phone / WhatsApp</label>
              <input
                type="text"
                value={settings.primaryPhone}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Secondary Line</label>
              <input
                type="text"
                value={settings.secondaryPhone}
                onChange={(e) => handleChange('secondaryPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-sm text-paint-charcoal pb-2 border-b border-paint-border flex items-center gap-2">
            <Clock className="w-4 h-4 text-paint-terracotta" />
            <span>Operating Hours</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Monday – Saturday</label>
              <input
                type="text"
                value={settings.workingHoursWeekday}
                onChange={(e) => handleChange('workingHoursWeekday', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Sunday</label>
              <input
                type="text"
                value={settings.workingHoursSunday}
                onChange={(e) => handleChange('workingHoursSunday', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-paint-border flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

