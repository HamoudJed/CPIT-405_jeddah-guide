import { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { places } from '../data/places';
import PlaceCard from '../components/PlaceCard';

export default function Favorites() {
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const filtered = places.filter(place => favorites.includes(place.id));
    setFavoritePlaces(filtered);
  }, []);

  const clearAll = () => {
    if (window.confirm('هل تريد حذف جميع المفضلات؟')) {
      localStorage.setItem('favorites', JSON.stringify([]));
      setFavoritePlaces([]);
    }
  };

  // Refresh when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const filtered = places.filter(place => favorites.includes(place.id));
        setFavoritePlaces(filtered);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1rem', minHeight: '70vh' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--dark)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Heart size={36} color="#ef4444" fill="#ef4444" />
            أماكني المفضلة
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.125rem' }}>
            {favoritePlaces.length} مكان محفوظ
          </p>
        </div>

        {favoritePlaces.length > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: '#ef4444',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            <Trash2 size={18} />
            حذف الكل
          </button>
        )}
      </div>

      {/* Content */}
      {favoritePlaces.length > 0 ? (
        <div className="grid grid-2">
          {favoritePlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '12px'
        }}>
          <Heart size={64} color="var(--gray)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            لا توجد أماكن مفضلة بعد
          </h3>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
            ابدأ بإضافة الأماكن التي تعجبك إلى المفضلة
          </p>
          <a
            href="/places"
            style={{
              display: 'inline-block',
              background: 'var(--primary)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            استكشف الأماكن
          </a>
        </div>
      )}
    </div>
  );
}
