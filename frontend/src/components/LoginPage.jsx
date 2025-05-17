import React, { useState, useEffect } from 'react';

const LoginPage = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = document.getElementById('particles-container');

    if (container) {
      const particles = Array.from({ length: 40 }, () => {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;

        Object.assign(particle.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 5}s`,
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '50%',
          position: 'absolute',
        });

        particle.className = 'particle';
        return particle;
      });

      particles.forEach((particle) => container.appendChild(particle));

      return () => {
        particles.forEach((particle) => {
          if (particle.parentNode) container.removeChild(particle);
        });
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Identifiants invalides');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      setView('comingSoon'); // Redirect to Coming Soon page
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden text-white">
      {/* Particle Container */}
      <div id="particles-container" className="absolute inset-0 z-0" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full opacity-20 blur-3xl" />

      {/* Main Form Container */}
      <div
        className={`relative z-10 max-w-md w-full px-8 py-10 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transform transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-center text-3xl font-bold mb-6 tracking-tight">
          Connexion à 404.js
        </h2>

        {errorMessage && (
          <div
            role="alert"
            className="p-3 mb-6 rounded bg-red-500/20 border border-red-500/30 text-red-200 text-center"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedEmail(true)}
              onBlur={() => setFocusedEmail(email !== '')}
              required
              placeholder=" "
              className="w-full p-3 bg-white/5 border border-white/30 rounded-lg text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-gray-300 transition-all duration-300 pointer-events-none ${
                focusedEmail || email
                  ? 'text-xs text-blue-300 -top-2.5 px-1 bg-indigo-900/80 rounded'
                  : 'text-sm top-3'
              }`}
            >
              Adresse e-mail
            </label>
          </div>

          <div className="relative mb-8">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedPassword(true)}
              onBlur={() => setFocusedPassword(password !== '')}
              required
              placeholder=" "
              className="w-full p-3 bg-white/5 border border-white/30 rounded-lg text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 text-gray-300 transition-all duration-300 pointer-events-none ${
                focusedPassword || password
                  ? 'text-xs text-blue-300 -top-2.5 px-1 bg-indigo-900/80 rounded'
                  : 'text-sm top-3'
              }`}
            >
              Mot de passe
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium tracking-wide hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center text-sm mt-6">
          Nouveau chez 404.js ?{' '}
          <button
            onClick={() => setView('register')}
            className="text-blue-300 hover:text-white hover:underline transition-colors"
          >
            Créer un compte
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0.2;
          }
          100% {
            transform: translateY(-10vh) scale(1.2);
            opacity: 0;
          }
        }

        .particle {
          animation: floatUp linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;