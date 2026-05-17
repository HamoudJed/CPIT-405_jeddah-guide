import { Star, MapPin, Heart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PlaceCard({ place }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(place.id));
  }, [place.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== place.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(place.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const getPriceSymbol = (range) => {
    const symbols = {
      free: 'مجاني',
      low: '$',
      medium: '$$',
      expensive: '$$$'
    };
    return symbols[range] || range;
  };

  return (
    <Link to={`/place/${place.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Image */}
        <div style={{
          height: '200px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img
            src={place.image}
            alt={place.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Heart
              size={20}
              fill={isFavorite ? '#ef4444' : 'none'}
              color={isFavorite ? '#ef4444' : '#64748b'}
            />
          </button>

          {/* Type Badge */}
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: place.type === 'indoor' ? '#10b981' : '#0ea5e9',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {place.type === 'indoor' ? 'داخلي' : 'خارجي'}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            color: 'var(--dark)',
            fontSize: '1.125rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            {place.name}
          </h3>

          <p style={{
            color: 'var(--gray)',
            fontSize: '0.875rem',
            marginBottom: '1rem',
            lineHeight: '1.5',
            flexGrow: 1
          }}>
            {place.description.substring(0, 80)}...
          </p>

          {/* Info Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border)'
          }}>
            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#fbbf24'
            }}>
              <Star size={16} fill="#fbbf24" />
              <span style={{
                color: 'var(--dark)',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}>
                {place.rating}
              </span>
            </div>

            {/* Location */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--gray)',
              fontSize: '0.75rem'
            }}>
              <MapPin size={14} />
              <span>{place.location.split('،')[0]}</span>
            </div>

            {/* Price */}
            <div style={{
              background: '#dbeafe',
              color: 'var(--primary)',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {getPriceSymbol(place.priceRange)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
