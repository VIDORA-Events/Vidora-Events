import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar.js';
import { Navbar } from './components/layout/Navbar.js';
import { Footer } from './components/layout/Footer.js';
import { AdminLayout } from './components/layout/AdminLayout.js';

// Public Pages
import { HomePage } from './pages/HomePage.js';
import { ServicesPage } from './pages/ServicesPage.js';
import { PortfolioPage } from './pages/PortfolioPage.js';
import { ProjectDetailPage } from './pages/ProjectDetailPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { InquiryPage } from './pages/InquiryPage.js';
import { FaqPage } from './pages/FaqPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage.js';
import { AdminDashboard } from './pages/admin/AdminDashboard.js';
import { AdminPortfolio } from './pages/admin/AdminPortfolio.js';

// Context
import { useAuth } from './context/AuthContext.js';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Protected Route Guard for Admin portal
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center text-xs tracking-luxury uppercase text-stone-500">
        Verifying administrator session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Public Chrome: AnnouncementBar & Navbar (only on public routes) */}
      {!isAdminRoute && (
        <>
          <AnnouncementBar />
          <Navbar />
        </>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<Navigate to="/services" replace />} />
          <Route path="/portfolio/:slug" element={<Navigate to="/services" replace />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/inquire" element={<InquiryPage />} /> */}
          <Route path="/inquire" element={<Navigate to="/" replace />} />
          <Route path="/faq" element={<FaqPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <ProtectedAdminRoute>
                <AdminPortfolio />
              </ProtectedAdminRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Public Chrome: Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};
export default App;

