import React, { useEffect } from 'react';

const ComingSoon = ({ setView }) => {
  useEffect(() => {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 6 + 2;
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${3 + Math.random() * 5}s`,
        background: '#fff',
      });
      container.appendChild(particle);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-black via-neutral-900 to-zinc-800 relative overflow-hidden text-white">
      {/* Particles container */}
      <div id="particles" className="absolute inset-0 z-0"></div>

      {/* Main Content */}
      <div className="container text-center p-8 sm:p-10 bg-black/80 border-2 border-gray-300 rounded-xl shadow-[0_0_20px_#ffffff33,0_0_40px_#ffffff22] z-10 animate-fadeInUp max-w-lg">
        <h1
          className="glitch-title text-4xl sm:text-5xl font-bold text-white tracking-wide relative"
          data-text="Coming Soon"
        >
          Coming Soon
        </h1>
        <p className="text-gray-300 mt-5 text-lg opacity-0 animate-fadeIn delay-[500ms]">
          We’re working hard behind the scenes to bring you something amazing.
        </p>
        <button
          onClick={() => setView('login')}
          className="btn mt-8 px-8 py-3 rounded-full bg-white text-black font-medium shadow-[0_0_10px_#ffffff55] relative overflow-hidden"
        >
          Notify Me
        </button>
      </div>

      {/* Styles */}
      <style>{`
        .glitch-title::before,
        .glitch-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
        }
        .glitch-title::before {
          color: #888;
          left: 2px;
          animation: glitchTop 2s infinite linear;
        }
        .glitch-title::after {
          color: #ccc;
          left: -2px;
          animation: glitchBottom 2s infinite linear;
        }

        .particle {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.15;
          animation: floatUp linear infinite;
        }

        @keyframes glitchTop {
          0% { clip-path: inset(0 0 90% 0); }
          100% { clip-path: inset(0 0 0% 0); }
        }

        @keyframes glitchBottom {
          0% { clip-path: inset(90% 0 0 0); }
          100% { clip-path: inset(0% 0 0 0); }
        }

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

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 2s ease-out forwards;
        }

        .btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          background: rgba(0, 0, 0, 0.1);
          z-index: -1;
          transform: scale(0);
          transition: transform 0.3s ease;
        }

        .btn:hover::after {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
