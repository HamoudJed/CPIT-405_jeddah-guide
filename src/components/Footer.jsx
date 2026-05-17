import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark)',
      color: 'white',
      padding: '3rem 0 1rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* About */}
          <div>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              fontSize: '1.25rem'
            }}>
              <MapPin size={24} />
              Jeddah Guide
            </h3>
            <p style={{
              color: '#94a3b8',
              lineHeight: '1.6'
            }}>
              دليلك السياحي الشامل لاكتشاف أفضل الأماكن في جدة. من الأماكن التاريخية إلى الشواطئ والمطاعم والكافيهات.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1rem' }}>روابط سريعة</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <a href="/places" style={{ color: '#94a3b8', textDecoration: 'none' }}>الأماكن</a>
              <a href="/favorites" style={{ color: '#94a3b8', textDecoration: 'none' }}>المفضلة</a>
              <a href="/plan" style={{ color: '#94a3b8', textDecoration: 'none' }}>خطتي</a>
              <a href="/login" style={{ color: '#94a3b8', textDecoration: 'none' }}>تسجيل الدخول</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ marginBottom: '1rem' }}>تواصل معنا</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                <Mail size={18} />
                <span>info@jeddahguide.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8' }}>
                <Phone size={18} />
                <span>+966 12 345 6789</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #334155',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.875rem'
        }}>
          <p>© 2024 Jeddah Guide. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
