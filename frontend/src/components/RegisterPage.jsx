import React, { useState } from 'react';

const RegisterPage = ({ setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Erreur lors de l’inscription');
      }

      setSuccessMessage("Compte créé avec succès !");
      setTimeout(() => setView('login'), 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-900 font-orbitron">
      <div className="bg-white/5 p-10 rounded-xl backdrop-blur-md border border-white/10 text-white w-full max-w-md shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        <h2 className="text-center text-white text-2xl mb-6">Créer un compte</h2>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-400 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedName(true)}
              onBlur={() => setFocusedName(name !== '')}
              required
              placeholder=" "
              className="w-full p-3 bg-transparent border border-white/30 rounded text-white outline-none focus:ring-2 focus:ring-white"
            />
            <label
              htmlFor="name"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-black px-1 text-gray-400 text-sm transition-all pointer-events-none ${
                focusedName || name ? 'top-[-10px] left-2 text-white text-xs' : ''
              }`}
            >
              Nom complet
            </label>
          </div>

          {/* Email */}
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
              className="w-full p-3 bg-transparent border border-white/30 rounded text-white outline-none focus:ring-2 focus:ring-white"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-black px-1 text-gray-400 text-sm transition-all pointer-events-none ${
                focusedEmail || email ? 'top-[-10px] left-2 text-white text-xs' : ''
              }`}
            >
              Adresse e-mail
            </label>
          </div>

          {/* Mot de passe */}
          <div className="relative mb-6">
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
              className="w-full p-3 bg-transparent border border-white/30 rounded text-white outline-none focus:ring-2 focus:ring-white"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-black px-1 text-gray-400 text-sm transition-all pointer-events-none ${
                focusedPassword || password ? 'top-[-10px] left-2 text-white text-xs' : ''
              }`}
            >
              Mot de passe
            </label>
          </div>

          {/* Confirmer mot de passe */}
          <div className="relative mb-6">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setFocusedConfirmPassword(true)}
              onBlur={() => setFocusedConfirmPassword(confirmPassword !== '')}
              required
              placeholder=" "
              className="w-full p-3 bg-transparent border border-white/30 rounded text-white outline-none focus:ring-2 focus:ring-white"
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 bg-black px-1 text-gray-400 text-sm transition-all pointer-events-none ${
                focusedConfirmPassword || confirmPassword ? 'top-[-10px] left-2 text-white text-xs' : ''
              }`}
            >
              Confirmez le mot de passe
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-2 p-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
          >
            S'inscrire
          </button>
        </form>

        <div className="text-center text-sm mt-6">
          Déjà inscrit ?{' '}
          <button
            className="text-white underline"
            onClick={() => setView('login')}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
