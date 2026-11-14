import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import AboutUsSection from './sections/AboutUsSection';
import ServicesSection from './sections/ServicesSection';
import ShopDetailsSection from './sections/ShopDetailsSection';
import ReviewsSection from './sections/ReviewsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import FloatingAction from './components/FloatingAction';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreen from './components/SplashScreen';
import { useAuth } from './hooks/useAuth';

// Code-split admin portal so public visitors don't load admin bundle
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));

export default function App() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    return (
      window.location.pathname === '/admin' ||
      window.location.hash === '#admin' ||
      window.location.hash === '#/admin'
    );
  });

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [toast, setToast] = useState(null);

  // Cinematic Intro Splash Screen State
  const [showSplash, setShowSplash] = useState(() => {
    const isAdm =
      window.location.pathname === '/admin' ||
      window.location.hash === '#admin' ||
      window.location.hash === '#/admin';
    if (isAdm) return false;
    try {
      return !sessionStorage.getItem('dynamic_splash_completed');
    } catch {
      return true;
    }
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    try {
      sessionStorage.setItem('dynamic_splash_completed', 'true');
    } catch {}
  };

  // Sync route with browser history
  useEffect(() => {
    const handleLocationChange = () => {
      const isAdm =
        window.location.pathname === '/admin' ||
        window.location.hash === '#admin' ||
        window.location.hash === '#/admin';
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    setIsAdminRoute(true);
    window.history.pushState(null, '', '/admin');
  };

  const navigateToSite = () => {
    setIsAdminRoute(false);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, swatchColor = null) => {
    setToast({ message, swatchColor });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const handleOpenReviewModal = () => {
    setReviewModalOpen(true);
    const revEl = document.getElementById('reviews');
    if (revEl) {
      revEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceName) => {
    setSelectedService(serviceName);
  };

  // If currently on /admin route:
  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="min-h-screen bg-paint-surface flex items-center justify-center p-6">
              <div className="text-center space-y-3">
                <div className="w-10 h-10 border-4 border-paint-terracotta border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-paint-charcoal">Loading Staff Portal...</p>
              </div>
            </div>
          }
        >
          {isAuthenticated ? (
            <AdminDashboard onExit={navigateToSite} />
          ) : (
            <AdminLogin onExit={navigateToSite} onLoginSuccess={() => setIsAdminRoute(true)} />
          )}
        </Suspense>
        <Toast toast={toast} onClose={() => setToast(null)} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      {/* Cinematic Brand Introduction Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="cinematic-splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-paint-surface text-paint-charcoal font-sans selection:bg-paint-terracotta selection:text-white">
        {/* 1. Header Navigation */}
        <Navbar onOpenReviewModal={handleOpenReviewModal} />

        {/* Main Content Area */}
        <main id="main-content">
          {/* 2. Hero Section: Studio Welcome */}
          <HeroSection onOpenReviewModal={handleOpenReviewModal} />

          {/* 3. About Us: Craftsmanship, Philosophy & Story */}
          <AboutUsSection />

          {/* 4. Our Services: Painters, Rentals, Wall Art, 3D Art & Delivery */}
          <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

          {/* 5. Details About The Shop: Facilities, Amenities & Opening Hours */}
          <ShopDetailsSection />

          {/* 6. Customer Reviews & Submission */}
          <ReviewsSection
            isReviewModalOpen={reviewModalOpen}
            onCloseReviewModal={() => setReviewModalOpen(false)}
            onShowToast={showToast}
          />

          {/* 7. Contact Us: Address, Opening Hours, Directions & Message Form */}
          <ContactSection
            preselectedService={selectedService}
            onShowToast={showToast}
          />
        </main>

        {/* 8. Footer */}
        <Footer onShowToast={showToast} onNavigateToAdmin={navigateToAdmin} />

        {/* Quick Instant Contact Widget */}
        <FloatingAction />

        {/* Non-intrusive Toast Notifications */}
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </ErrorBoundary>
  );
}
