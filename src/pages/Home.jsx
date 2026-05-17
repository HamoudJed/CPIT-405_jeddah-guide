import { Link } from 'react-router-dom';
import { MapPin, Search, Heart, Calendar, TrendingUp, Cloud, Sun, CloudRain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { places, categories } from '../data/places';
import PlaceCard from '../components/PlaceCard';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    // Simulate weather data (في المستقبل استخدم OpenWeatherMap API)
    const simulatedWeather = {
      temp: 32,
      description: 'حار',
      icon: 'sunny'
    };
    setWeather(simulatedWeather);

    // Weather-based recommendations
    if (simulatedWeather.temp > 30) {
      // Hot weather - recommend indoor places
      const indoorPlaces = places.filter(p => p.type === 'indoor').slice(0, 3);
      setRecommendations(indoorPlaces);
    } else {
      // Nice weather - recommend outdoor places
      const outdoorPlaces = places.filter(p => p.type === 'outdoor').slice(0, 3);
      setRecommendations(outdoorPlaces);
    }
  }, []);

  const featuredPlaces = places.filter(p => p.rating >= 4.7).slice(0, 6);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud size={48} />;
    if (weather.temp > 30) return <Sun size={48} />;
    return <Cloud size={48} />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            اكتشف جدة
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            دليلك السياحي الشامل لأفضل الأماكن في عروس البحر الأحمر
          </p>
          <Link to="/places">
            <button style={{
              background: 'white',
              color: 'var(--primary)',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Search size={20} />
              استكشف الأماكن
            </button>
          </Link>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 1rem' }}>
        {/* Weather Widget */}
        {weather && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div>
                {getWeatherIcon()}
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {weather.temp}°C
                </h2>
                <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                  الطقس في جدة: {weather.description}
                </p>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'right'
              }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>💡 اقتراحنا لك</p>
                <p style={{ fontWeight: '600' }}>
                  {weather.temp > 30 
                    ? 'الجو حار، ننصحك بزيارة الأماكن الداخلية مثل المولات والمتاحف والكافيهات'
                    : 'الجو مناسب، استمتع بالأماكن الخارجية مثل الشواطئ والكورنيش والحدائق'
                  }
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Weather-Based Recommendations */}
        {recommendations.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: 'var(--dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <TrendingUp size={28} color="var(--primary)" />
                مقترحة لك حسب الطقس
              </h2>
            </div>
            <div className="grid grid-2">
              {recommendations.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'var(--dark)',
            marginBottom: '1.5rem'
          }}>
            تصفح حسب الفئة
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            {categories.slice(1, 7).map(category => (
              <Link
                key={category.id}
                to={`/places?category=${category.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid var(--border)'
                }}
                className="card"
                >
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem'
                  }}>
                    {category.id === 'historical' && '🏛️'}
                    {category.id === 'beach' && '🏖️'}
                    {category.id === 'cafe' && '☕'}
                    {category.id === 'restaurant' && '🍽️'}
                    {category.id === 'mall' && '🛍️'}
                    {category.id === 'museum' && '🎨'}
                  </div>
                  <h3 style={{
                    color: 'var(--dark)',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Places */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'var(--dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MapPin size={28} color="var(--primary)" />
              أماكن مميزة
            </h2>
            <Link to="/places" style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              عرض الكل ←
            </Link>
          </div>
          <div className="grid grid-2">
            {featuredPlaces.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <Link to="/favorites" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
                color: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Heart size={48} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  المفضلة
                </h3>
                <p style={{ opacity: 0.9 }}>
                  الأماكن التي أعجبتك
                </p>
              </div>
            </Link>

            <Link to="/plan" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Calendar size={48} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  خطتي
                </h3>
                <p style={{ opacity: 0.9 }}>
                  خطط ليومك في جدة
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
