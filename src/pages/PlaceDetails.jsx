import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign, Heart, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { places } from '../data/places';
import PlaceCard from '../components/PlaceCard';

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = places.find(p => p.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInPlan, setIsInPlan] = useState(false);

  useEffect(() => {
    if (!place) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(place.id));

    const plan = JSON.parse(localStorage.getItem('plan') || '[]');
    setIsInPlan(plan.some(p => p.id === place.id));
  }, [place]);

  if (!place) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>المكان غير موجود</h2>
        <button onClick={() => navigate('/places')} className="btn btn-primary">
          العودة للأماكن
        </button>
      </div>
    );
  }

  const toggleFavorite = () => {
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

  const addToPlan = () => {
    const plan = JSON.parse(localStorage.getItem('plan') || '[]');
    
    if (!isInPlan) {
      plan.push({
        id: place.id,
        name: place.name,
        category: place.category,
        image: place.image,
        timeSlot: 'morning'
      });
      localStorage.setItem('plan', JSON.stringify(plan));
      setIsInPlan(true);
      alert('تمت إضافة المكان إلى خطتك!');
    }
  };

  const getPriceSymbol = (range) => {
    const symbols = {
      free: 'مجاني',
      low: 'اقتصادي ($)',
      medium: 'متوسط ($$)',
      expensive: 'غالي ($$$)'
    };
    return symbols[range] || range;
  };

  const nearbyPlaces = places.filter(p => place.nearby?.includes(p.id));

  return (
    <div>
      {/* Back Button */}
      <div className="container" style={{ padding: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          <ArrowLeft size={20} />
          رجوع
        </button>
      </div>

      {/* Hero Image */}
      <div style={{
        height: '400px',
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
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)'
        }} />
      </div>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          marginTop: '-4rem',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--dark)',
                marginBottom: '0.5rem'
              }}>
                {place.name}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: '#fbbf24'
                }}>
                  <Star size={20} fill="#fbbf24" />
                  <span style={{ color: 'var(--dark)', fontWeight: '600' }}>
                    {place.rating}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--gray)'
                }}>
                  <MapPin size={18} />
                  <span>{place.location}</span>
                </div>
              </div>
              
              {/* Tags */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {place.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: '#dbeafe',
                      color: 'var(--primary)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <button
                onClick={toggleFavorite}
                style={{
                  background: isFavorite ? '#ef4444' : 'white',
                  color: isFavorite ? 'white' : '#ef4444',
                  border: `2px solid #ef4444`,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
              >
                <Heart size={20} fill={isFavorite ? 'white' : 'none'} />
                {isFavorite ? 'محفوظ' : 'حفظ'}
              </button>

              <button
                onClick={addToPlan}
                disabled={isInPlan}
                style={{
                  background: isInPlan ? '#10b981' : 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: isInPlan ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '600',
                  opacity: isInPlan ? 0.7 : 1
                }}
              >
                <Calendar size={20} />
                {isInPlan ? 'في الخطة' : 'أضف للخطة'}
              </button>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {/* Info */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--dark)',
              marginBottom: '1rem'
            }}>
              معلومات المكان
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'var(--light)',
                borderRadius: '8px'
              }}>
                <DollarSign size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>السعر</div>
                  <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                    {getPriceSymbol(place.priceRange)}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'var(--light)',
                borderRadius: '8px'
              }}>
                <Clock size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>أفضل وقت للزيارة</div>
                  <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                    {place.bestTimeToVisit}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'var(--light)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: place.type === 'indoor' ? '#10b981' : '#0ea5e9'
                }} />
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>النوع</div>
                  <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                    {place.type === 'indoor' ? 'داخلي' : 'خارجي'}
                  </div>
                </div>
              </div>

              <a
                href={place.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  marginTop: '0.5rem'
                }}
              >
                <MapPin size={18} />
                عرض على الخريطة
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Description */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--dark)',
              marginBottom: '1rem'
            }}>
              عن المكان
            </h3>
            <p style={{
              color: 'var(--gray)',
              lineHeight: '1.8',
              fontSize: '1rem'
            }}>
              {place.description}
            </p>
          </div>
        </div>

        {/* Nearby Places */}
        {nearbyPlaces.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'var(--dark)',
              marginBottom: '1.5rem'
            }}>
              أماكن قريبة
            </h2>
            <div className="grid grid-2">
              {nearbyPlaces.map(nearbyPlace => (
                <PlaceCard key={nearbyPlace.id} place={nearbyPlace} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
