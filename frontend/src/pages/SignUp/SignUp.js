// import React, {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'

// function SignUp() {
//     const navigate = useNavigate();

//     const [nom, setNom] = useState("");
//     const [prenom, setPrenom] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [controlPassword, setControlPassword] = useState("");
   
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const emailError = document.querySelector(".email.error");
//       const passwordError = document.querySelector(".password.error");
//       const passwordConfirmError = document.querySelector(
//         ".password-confirm.error"
//       );
//       if (password !== controlPassword)
//         passwordConfirmError.innerHTML =
//           "Les mots de passe ne correspondent pas";
    
  
//       await axios({
//         method: "post",
//         url: "http://localhost:5000/api/user/register",
//         data: {
//           nom,
//           prenom,
//           email,
//           password
//         },
//       })
//         .then((res) => {
//           console.log(res);
//           if (res.data.errors) { 
//             emailError.innerHTML = res.data.errors.email;
//             passwordError.innerHTML = res.data.errors.password;
//           } else {
           
//           }
//         })
//         .catch((err) => console.log(err));
//     };
//     return (
//         <div className="signup-container">
//         <h2>S'inscrire</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div>
//             <label htmlFor="name">Nom:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={nom}
//                 onChange={(e) => setNom(e.target.value)}
//               required
//             />
//           </div>
//             {/* prenom Field */}
//             <div>
//             <label htmlFor="name">Prenom:</label>
//             <input
//               type="text"
//               id="prenom"
//               name="name"
//               value={prenom}
//                 onChange={(e) => setPrenom(e.target.value)}
//               required
//             />
//           </div>
  
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="email error"></div>
  
//           {/* Password Field */}
//           <div>
//             <label htmlFor="password">Mot de passe:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="password error"></div>
  
//           {/* Confirm Password Field */}
//           <div>
//             <label htmlFor="confirmPassword">Confirmer mot de passe:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={controlPassword}
//               onChange={(e) => setControlPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="password-confirm error" ></div>
  
//           {/* Submit Button */}
//           <button type="submit">S'inscrire</button>
//         </form>

//         {/* <div>
//             <h1>Sign Up</h1>
//             <button onClick={() => navigate('/signin')}>Aller à Sign In</button>
//         </div> */}
//       </div>
       
//     );
// }

// export default SignUp;


import React, { useState } from 'react';
import './signup.css';

const SignUp = () => {
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

  const handleSubmit = (e) => {
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
    // Soumission réussie
    console.log('Données utilisateur :', formData);
    alert('Formulaire soumis avec succès !');
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