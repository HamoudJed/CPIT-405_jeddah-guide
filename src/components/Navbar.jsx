import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Heart, Calendar, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/', icon: Home, label: 'الرئيسية' },
    { path: '/places', icon: MapPin, label: 'الأماكن' },
    { path: '/favorites', icon: Heart, label: 'المفضلة' },
    { path: '/plan', icon: Calendar, label: 'خطتي' },
    { path: user ? '/profile' : '/login', icon: User, label: user ? 'الملف الشخصي' : 'تسجيل الدخول' }
  ];

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'var(--primary)',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <MapPin size={32} />
            <span>Jeddah Guide</span>
          </Link>

          {/* Desktop Menu */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }} className="desktop-menu">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--gray)',
                  fontWeight: isActive(link.path) ? '600' : '400',
                  transition: 'color 0.3s'
                }}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary)'
            }}
            className="mobile-menu-btn"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)'
          }} className="mobile-menu">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--gray)',
                  fontWeight: isActive(link.path) ? '600' : '400',
                  padding: '0.5rem'
                }}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
