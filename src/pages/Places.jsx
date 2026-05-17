import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { places, categories, priceRanges, typeFilters } from '../data/places';
import PlaceCard from '../components/PlaceCard';

export default function Places() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState(places);

  useEffect(() => {
    let result = places;

    // Search filter
    if (searchQuery) {
      result = result.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(place => place.category === selectedCategory);
    }

    // Price filter
    if (selectedPrice !== 'all') {
      result = result.filter(place => place.priceRange === selectedPrice);
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter(place => place.type === selectedType);
    }

    setFilteredPlaces(result);
  }, [searchQuery, selectedCategory, selectedPrice, selectedType]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSelectedType('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrice !== 'all' || selectedType !== 'all';

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--dark)',
          marginBottom: '0.5rem'
        }}>
          اكتشف الأماكن
        </h1>
        <p style={{ color: 'var(--gray)', fontSize: '1.125rem' }}>
          استكشف أفضل {places.length} مكان في جدة
        </p>
      </div>

      {/* Search Bar */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray)'
            }}
          />
          <input
            type="text"
            placeholder="ابحث عن مكان، مطعم، كافيه..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 3rem 0.875rem 1rem',
              border: '2px solid var(--border)',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>
      </div>

      {/* Filters Toggle Button (Mobile) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '600'
          }}
        >
          <Filter size={20} />
          {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--dark)' }}>
              الفلاتر
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontWeight: '600'
                }}
              >
                <X size={16} />
                مسح الكل
              </button>
            )}
          </div>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}>
            {/* Category Filter */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--dark)'
              }}>
                الفئة
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--dark)'
              }}>
                السعر
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                {priceRanges.map(price => (
                  <option key={price.id} value={price.id}>{price.name}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: 'var(--dark)'
              }}>
                النوع
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  background: 'white'
                }}
              >
                {typeFilters.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div style={{
        marginBottom: '1.5rem',
        color: 'var(--gray)',
        fontSize: '0.875rem'
      }}>
        عرض {filteredPlaces.length} من {places.length} مكان
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-2">
          {filteredPlaces.map(place => (
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
          <Search size={64} color="var(--gray)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            لم يتم العثور على نتائج
          </h3>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
            جرب تغيير البحث أو الفلاتر
          </p>
          <button
            onClick={clearFilters}
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            مسح الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}
