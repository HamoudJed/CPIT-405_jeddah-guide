import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: []
  });

  const interestOptions = [
    { id: 'historical', label: 'أماكن تاريخية', icon: '🏛️' },
    { id: 'beach', label: 'شواطئ', icon: '🏖️' },
    { id: 'cafe', label: 'كافيهات', icon: '☕' },
    { id: 'restaurant', label: 'مطاعم', icon: '🍽️' },
    { id: 'mall', label: 'مولات', icon: '🛍️' },
    { id: 'entertainment', label: 'ترفيه', icon: '🎮' }
  ];

  const toggleInterest = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }

    // Save user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.email === formData.email)) {
      alert('البريد الإلكتروني مسجل مسبقاً');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      interests: formData.interests,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));

    navigate('/');
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'white',
        padding: '2.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, var(--secondary), #ea580c)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <UserPlus size={40} color="white" />
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'var(--dark)',
            marginBottom: '0.5rem'
          }}>
            إنشاء حساب جديد
          </h2>
          <p style={{ color: 'var(--gray)' }}>
            انضم إلى مجتمع مستكشفي جدة
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              الاسم
            </label>
            <div style={{ position: 'relative' }}>
              <User
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
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك"
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              البريد الإلكتروني
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
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
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
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
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              تأكيد كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
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
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.875rem 3rem 0.875rem 1rem',
                  border: '2px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontWeight: '600',
              color: 'var(--dark)'
            }}>
              ما هي اهتماماتك؟ (اختياري)
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem'
            }}>
              {interestOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleInterest(option.id)}
                  style={{
                    padding: '0.75rem',
                    border: `2px solid ${formData.interests.includes(option.id) ? 'var(--primary)' : 'var(--border)'}`,
                    background: formData.interests.includes(option.id) ? '#dbeafe' : 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: formData.interests.includes(option.id) ? 'var(--primary)' : 'var(--gray)',
                    transition: 'all 0.3s'
                  }}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              background: 'var(--secondary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            إنشاء الحساب
          </button>
        </form>

        {/* Footer */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          color: 'var(--gray)'
        }}>
          <p>
            لديك حساب؟{' '}
            <Link
              to="/login"
              style={{
                color: 'var(--secondary)',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              سجل دخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
