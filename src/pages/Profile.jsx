import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Heart, Calendar, LogOut, Edit } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    favorites: 0,
    plan: 0
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);

    // Get stats
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const plan = JSON.parse(localStorage.getItem('plan') || '[]');
    setStats({
      favorites: favorites.length,
      plan: plan.length
    });
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  if (!user) {
    return null;
  }

  const interestLabels = {
    historical: '🏛️ أماكن تاريخية',
    beach: '🏖️ شواطئ',
    cafe: '☕ كافيهات',
    restaurant: '🍽️ مطاعم',
    mall: '🛍️ مولات',
    entertainment: '🎮 ترفيه'
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '70vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <User size={60} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {user.name}
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: 0.9
        }}>
          <Mail size={18} />
          <span>{user.email}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <Heart size={32} color="#ef4444" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--dark)',
            marginBottom: '0.25rem'
          }}>
            {stats.favorites}
          </h3>
          <p style={{ color: 'var(--gray)' }}>أماكن مفضلة</p>
        </div>

        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <Calendar size={32} color="#10b981" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--dark)',
            marginBottom: '0.25rem'
          }}>
            {stats.plan}
          </h3>
          <p style={{ color: 'var(--gray)' }}>أماكن في الخطة</p>
        </div>
      </div>

      {/* Interests */}
      {user.interests && user.interests.length > 0 && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--dark)',
            marginBottom: '1rem'
          }}>
            اهتماماتي
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {user.interests.map(interest => (
              <div
                key={interest}
                style={{
                  background: '#dbeafe',
                  color: 'var(--primary)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                {interestLabels[interest] || interest}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <button
          onClick={() => navigate('/favorites')}
          style={{
            background: 'white',
            border: '2px solid var(--border)',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            color: 'var(--dark)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.color = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border)';
            e.target.style.color = 'var(--dark)';
          }}
        >
          <Heart size={20} />
          عرض المفضلة
        </button>

        <button
          onClick={() => navigate('/plan')}
          style={{
            background: 'white',
            border: '2px solid var(--border)',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            color: 'var(--dark)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.color = 'var(--primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border)';
            e.target.style.color = 'var(--dark)';
          }}
        >
          <Calendar size={20} />
          عرض الخطة
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            border: 'none',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: '600'
          }}
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
