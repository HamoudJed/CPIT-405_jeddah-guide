import { useState, useEffect } from 'react';
import { Calendar, Trash2, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Plan() {
  const [plan, setPlan] = useState([]);
  const [groupedPlan, setGroupedPlan] = useState({});

  const timeSlots = {
    morning: { label: 'الصباح', icon: '🌅', time: '8:00 - 12:00' },
    afternoon: { label: 'الظهر', icon: '☀️', time: '12:00 - 17:00' },
    evening: { label: 'المساء', icon: '🌆', time: '17:00 - 21:00' },
    night: { label: 'الليل', icon: '🌙', time: '21:00 - 00:00' }
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = () => {
    const savedPlan = JSON.parse(localStorage.getItem('plan') || '[]');
    setPlan(savedPlan);
    
    // Group by time slot
    const grouped = savedPlan.reduce((acc, place) => {
      if (!acc[place.timeSlot]) {
        acc[place.timeSlot] = [];
      }
      acc[place.timeSlot].push(place);
      return acc;
    }, {});
    setGroupedPlan(grouped);
  };

  const removeFromPlan = (placeId) => {
    const newPlan = plan.filter(p => p.id !== placeId);
    localStorage.setItem('plan', JSON.stringify(newPlan));
    loadPlan();
  };

  const changeTimeSlot = (placeId, newSlot) => {
    const newPlan = plan.map(p => 
      p.id === placeId ? { ...p, timeSlot: newSlot } : p
    );
    localStorage.setItem('plan', JSON.stringify(newPlan));
    loadPlan();
  };

  const clearPlan = () => {
    if (window.confirm('هل تريد حذف الخطة بالكامل؟')) {
      localStorage.setItem('plan', JSON.stringify([]));
      loadPlan();
    }
  };

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
            <Calendar size={36} color="#10b981" />
            خطتي في جدة
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.125rem' }}>
            {plan.length} مكان في خطتك
          </p>
        </div>

        {plan.length > 0 && (
          <button
            onClick={clearPlan}
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
            مسح الخطة
          </button>
        )}
      </div>

      {/* Content */}
      {plan.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {Object.entries(timeSlots).map(([slot, info]) => (
            <div key={slot}>
              {groupedPlan[slot] && groupedPlan[slot].length > 0 && (
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  {/* Time Slot Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid var(--border)'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{info.icon}</span>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--dark)',
                        marginBottom: '0.25rem'
                      }}>
                        {info.label}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--gray)',
                        fontSize: '0.875rem'
                      }}>
                        <Clock size={14} />
                        <span>{info.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Places in this time slot */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {groupedPlan[slot].map((place) => (
                      <div
                        key={place.id}
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          padding: '1rem',
                          background: 'var(--light)',
                          borderRadius: '8px',
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Image */}
                        <Link to={`/place/${place.id}`}>
                          <img
                            src={place.image}
                            alt={place.name}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                        </Link>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <Link
                            to={`/place/${place.id}`}
                            style={{
                              textDecoration: 'none',
                              color: 'var(--dark)'
                            }}
                          >
                            <h4 style={{
                              fontSize: '1.125rem',
                              fontWeight: '600',
                              marginBottom: '0.5rem'
                            }}>
                              {place.name}
                            </h4>
                          </Link>
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              background: '#dbeafe',
                              color: 'var(--primary)',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {place.category === 'historical' && 'تاريخي'}
                              {place.category === 'beach' && 'شاطئ'}
                              {place.category === 'cafe' && 'كافيه'}
                              {place.category === 'restaurant' && 'مطعم'}
                              {place.category === 'mall' && 'مول'}
                              {place.category === 'museum' && 'متحف'}
                              {place.category === 'entertainment' && 'ترفيه'}
                              {place.category === 'park' && 'حديقة'}
                              {place.category === 'attraction' && 'معلم سياحي'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          alignItems: 'center'
                        }}>
                          <select
                            value={place.timeSlot}
                            onChange={(e) => changeTimeSlot(place.id, e.target.value)}
                            style={{
                              padding: '0.5rem',
                              border: '2px solid var(--border)',
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              cursor: 'pointer'
                            }}
                          >
                            {Object.entries(timeSlots).map(([value, { label }]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>

                          <button
                            onClick={() => removeFromPlan(place.id)}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '0.5rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            title="حذف من الخطة"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '12px'
        }}>
          <Calendar size={64} color="var(--gray)" style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--dark)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            لا توجد خطة بعد
          </h3>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>
            ابدأ ببناء خطتك اليومية في جدة
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
            اختر الأماكن
          </a>
        </div>
      )}
    </div>
  );
}
