import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Star, 
  Users, 
  Package, 
  Settings, 
  LogOut, 
  ArrowLeft, 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X,
  Bell,
  Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import InquiriesTab from './tabs/InquiriesTab';
import ReviewsTab from './tabs/ReviewsTab';
import SubscribersTab from './tabs/SubscribersTab';
import ServicesTab from './tabs/ServicesTab';
import SettingsTab from './tabs/SettingsTab';
import { getInquiries } from '../services/inquiryService';
import { getAllReviewsForAdmin } from '../services/reviewService';
import { getSubscribers } from '../services/newsletterService';

export default function AdminDashboard({ onExit }) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Overview stats
  const [stats, setStats] = useState({
    inquiriesTotal: 0,
    inquiriesNew: 0,
    reviewsTotal: 0,
    reviewsPending: 0,
    subscribersTotal: 0,
  });

  const loadStats = async () => {
    try {
      const [inqs, revs, subs] = await Promise.all([
        getInquiries(),
        getAllReviewsForAdmin(),
        getSubscribers(),
      ]);
      setStats({
        inquiriesTotal: inqs.length,
        inquiriesNew: inqs.filter((i) => i.status === 'new').length,
        reviewsTotal: revs.length,
        reviewsPending: revs.filter((r) => r.status === 'pending').length,
        subscribersTotal: subs.filter((s) => s.status === 'subscribed').length,
      });
    } catch (e) {
      console.warn('Failed to load stats:', e);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'inquiries', label: 'Customer Inquiries', icon: Inbox, badge: stats.inquiriesNew },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star, badge: stats.reviewsPending },
    { id: 'subscribers', label: 'Newsletter Subscribers', icon: Users },
    { id: 'services', label: 'Services & Offerings', icon: Package },
    { id: 'settings', label: 'Business Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    onExit?.();
  };

  return (
    <div className="min-h-screen bg-paint-surface flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-paint-border flex flex-col justify-between shrink-0">
        <div>
          {/* Top Brand */}
          <div className="p-6 border-b border-paint-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#821400]/10 flex items-center justify-center text-paint-terracotta border border-paint-terracotta/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-base text-paint-charcoal">
                  DA Traders
                </h1>
                <span className="text-[10px] text-paint-muted uppercase tracking-wider block">
                  Staff Control Panel
                </span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-xl text-paint-muted hover:text-paint-charcoal"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`p-4 space-y-1 ${mobileNavOpen ? 'block' : 'hidden md:block'}`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-paint-terracotta text-white shadow-2xs'
                      : 'text-paint-charcoal hover:bg-paint-surfaceAlt'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge) && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-paint-terracotta' : 'bg-paint-terracotta text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-paint-border space-y-2 ${mobileNavOpen ? 'block' : 'hidden md:block'}`}>
          <div className="px-3 py-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-paint-muted block">Signed in as</span>
            <span className="font-bold text-paint-charcoal truncate block">{user?.email || 'Administrator'}</span>
          </div>

          <button
            onClick={onExit}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-paint-muted" />
            <span>Return to Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-paint-charcoal">
                Business Overview
              </h2>
              <p className="text-xs text-paint-muted mt-1">
                Real-time activity and pending tasks for DA Traders.
              </p>
            </div>

            {/* Overview Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('inquiries')}
                className="p-5 rounded-3xl bg-white border border-paint-border shadow-2xs space-y-3 cursor-pointer hover:border-paint-terracotta/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-paint-muted">Inquiries</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Inbox className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-black text-3xl text-paint-charcoal">
                    {stats.inquiriesTotal}
                  </span>
                  {stats.inquiriesNew > 0 && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      {stats.inquiriesNew} New
                    </span>
                  )}
                </div>
              </div>

              <div
                onClick={() => setActiveTab('reviews')}
                className="p-5 rounded-3xl bg-white border border-paint-border shadow-2xs space-y-3 cursor-pointer hover:border-paint-terracotta/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-paint-muted">Reviews</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-black text-3xl text-paint-charcoal">
                    {stats.reviewsTotal}
                  </span>
                  {stats.reviewsPending > 0 && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      {stats.reviewsPending} Pending
                    </span>
                  )}
                </div>
              </div>

              <div
                onClick={() => setActiveTab('subscribers')}
                className="p-5 rounded-3xl bg-white border border-paint-border shadow-2xs space-y-3 cursor-pointer hover:border-paint-terracotta/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-paint-muted">Subscribers</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display font-black text-3xl text-paint-charcoal">
                    {stats.subscribersTotal}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold">Active</span>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('settings')}
                className="p-5 rounded-3xl bg-white border border-paint-border shadow-2xs space-y-3 cursor-pointer hover:border-paint-terracotta/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-paint-muted">Shop Status</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-sm text-emerald-600">Open Mon–Sat</span>
                  <span className="text-[11px] text-paint-muted">7:30 AM–9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="p-6 rounded-3xl bg-white border border-paint-border space-y-4">
              <h3 className="font-display font-bold text-lg text-paint-charcoal">
                Quick Administrative Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="p-4 rounded-2xl bg-paint-surfaceAlt hover:bg-stone-100 border border-paint-border text-left transition-colors"
                >
                  <span className="font-bold text-xs text-paint-charcoal block">Review Inquiries</span>
                  <span className="text-[11px] text-paint-muted">Check recent customer messages</span>
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="p-4 rounded-2xl bg-paint-surfaceAlt hover:bg-stone-100 border border-paint-border text-left transition-colors"
                >
                  <span className="font-bold text-xs text-paint-charcoal block">Moderate Reviews</span>
                  <span className="text-[11px] text-paint-muted">Approve or reject community feedback</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-4 rounded-2xl bg-paint-surfaceAlt hover:bg-stone-100 border border-paint-border text-left transition-colors"
                >
                  <span className="font-bold text-xs text-paint-charcoal block">Update Contact Details</span>
                  <span className="text-[11px] text-paint-muted">Change phone numbers or opening hours</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && <InquiriesTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
        {activeTab === 'subscribers' && <SubscribersTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

