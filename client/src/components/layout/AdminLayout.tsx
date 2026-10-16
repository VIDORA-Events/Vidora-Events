import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { Logo } from '../ui/Logo.js';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Inquiries Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-luxury-charcoal text-luxury-ivory flex flex-col justify-between p-6">
        <div>
          {/* Brand */}
          <div className="pb-8 border-b border-white/10">
            <Link to="/" className="block group">
              <Logo variant="light" size="sm" subtitle="STAFF PORTAL &bull; SRI LANKA" />
            </Link>
          </div>

          {/* User info */}
          <div className="py-4 border-b border-white/10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/20 text-luxury-gold flex items-center justify-center font-serif text-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">{user?.fullName || 'Atelier Director'}</div>
              <div className="text-[10px] text-luxury-taupe truncate">{user?.email}</div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-sm text-xs font-sans tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-luxury-gold text-white font-medium shadow-sm'
                      : 'text-luxury-ivory/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-luxury-taupe hover:text-white transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-xs text-red-300 hover:text-red-200 hover:bg-white/5 rounded-sm transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
};
