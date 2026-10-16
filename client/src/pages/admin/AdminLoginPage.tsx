import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Logo } from '../../components/ui/Logo.js';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-ivory flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-luxury-white p-8 sm:p-12 border border-luxury-taupe/30 shadow-md space-y-8 animate-fadeIn">
        {/* Brand header */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Link to="/" className="group inline-flex justify-center" aria-label="VIDORA Events Home">
            <Logo variant="dark" size="lg" subtitle="STAFF PORTAL &bull; SRI LANKA" />
          </Link>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-sans uppercase tracking-luxury text-luxury-charcoal/80 mb-2">
              Staff Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="director@vidoraevents.lk"
                className="w-full pl-10 pr-4 py-3 bg-luxury-ivory/40 border border-luxury-taupe/30 text-luxury-charcoal text-xs focus:outline-none focus:border-luxury-charcoal"
              />
              <Mail className="w-4 h-4 text-luxury-taupe absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-luxury text-luxury-charcoal/80 mb-2">
              Secure Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-luxury-ivory/40 border border-luxury-taupe/30 text-luxury-charcoal text-xs focus:outline-none focus:border-luxury-charcoal"
              />
              <Lock className="w-4 h-4 text-luxury-taupe absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-luxury-charcoal hover:bg-black text-luxury-ivory font-sans text-xs tracking-luxury uppercase transition-all duration-300 shadow-sm disabled:opacity-60 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-luxury-gold" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 text-center border-t border-luxury-taupe/20">
          <Link
            to="/"
            className="text-[11px] font-sans tracking-luxury uppercase text-luxury-taupe hover:text-luxury-charcoal transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
