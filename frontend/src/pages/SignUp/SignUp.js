
import React, { useState } from 'react';
import './signup.css';
import API from '../../api'; // Importe l'instance Axios
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false, // Case pour accepter les conditions
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Gestion des champs et de la case à cocher
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas !');
      return;
    }
    // Validation des conditions d'utilisation
    if (!formData.termsAccepted) {
      alert('Vous devez accepter les conditions d\'utilisation pour continuer.');
      return;
    }
        try {
             await API.post('/user/register', formData);
            alert('Formulaire soumis avec succès !');
            navigate('/signin')
        } catch (error) {
          //  console.error('Error registering user:', error.response.data.message);
            alert('Error registering user:', error.response.data.message);
        }
    
  };

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Nom */}
        <div>
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Mot de Passe */}
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Confirmer Mot de Passe */}
        <div>
          <label htmlFor="confirmPassword">Confirmer mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Conditions d'utilisation */}
        <div className="terms">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label htmlFor="termsAccepted">
            J'accepte les{' '}
            <a href="/terms.pdf" target="_blank" rel="noopener noreferrer">
              conditions d'utilisation
            </a>
          </label>
        </div>

        {/* Bouton de Soumission */}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;