import React, { useState, useEffect } from 'react';
import ComingSoon from './components/ComingSoon';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const App = () => {
  const [view, setView] = useState('comingSoon'); // Initial view
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 6 + 2;
      generatedParticles.push({
        size,
        left: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 5}s`,
        background: Math.random() > 0.5 ? '#00ffe0' : '#0ff',
      });
    }
    setParticles(generatedParticles);
  }, []);

  const renderParticles = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-floatUp"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            background: p.background,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative">
      {renderParticles()}
      {view === 'comingSoon' && <ComingSoon setView={setView} />}
      {view === 'login' && <LoginPage setView={setView} />}
      {view === 'register' && <RegisterPage setView={setView} />}
    </div>
  );
};

export default App;
