import React from 'react';
import './accueil.css'; // External CSS for styling
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage">
      {/* Navigation Header */}
      <header className="homepage-header">
        <div className="header-left">
          <img src="https://via.placeholder.com/40x30?text=🇩🇿" alt="Algerian Flag" />
          <img src="https://via.placeholder.com/40x30?text=🇨🇦" alt="Canadian Flag" />
        </div>
        <div className="header-right">
          <nav>
            <ul>
              <li><a  onClick={() => scrollToSection('hero')}>Accueil</a></li>
              <li><a  onClick={() => scrollToSection('about')}>À propos</a></li>
              <li><a  onClick={() => scrollToSection('contact')}>Contactez-nous</a></li>
              <li><a  className="login-button" onClick={() => navigate('/signin')}>Se connecter</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Bienvenue sur notre application web</h1>
          <p>Algériens au Canada ? Connectons-nous !</p>
          <button className="cta-button">S'inscrire</button>
        </div>
        <div className="hero-image">
          <img src="https://i.pinimg.com/originals/da/cc/3d/dacc3db70dee6abd165e662a643c100d.png" alt="Home Illustration" />
        </div>
      </section>

      {/* Main Content */}
      <main>
        {/* À propos Section */}
        <section id="about" className="content-section">
          <div className="content-text">
            <h2>À propos</h2>
            <p>
            Bienvenue sur notre application web dédiée à la communauté algérienne au Canada.
            Notre plateforme a pour mission de rapprocher les Algériens vivant au Canada en facilitant les échanges et les connexions. Que vous prépariez un voyage en Algérie ou que vous ayez de la place dans vos bagages, notre application vous permet de rendre service en transportant des affaires pour les familles.

            </p>
            <p>
              Ensemble, nous renforçons notre solidarité et facilitons la communication. Rejoignez-nous et contribuez à tisser des liens plus forts entre le Canada et l'Algérie.
            </p>
          </div>
          <div className="content-image">
            <img src="https://im.qccdn.fr/node/guide-d-achat-valise-54625/thumbnail_800x480px-121314.jpg" alt="About Illustration" />
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2>Services</h2>
          <div className="services-grid">
            <div className="service">
              <h3>Transport d'affaires</h3>
              <p>
                Facilitez le transport d'affaires entre le Canada et l'Algérie. 
                Aidez les familles à envoyer ou recevoir des colis en toute simplicité.
              </p>
            </div>
            <div className="service">
              <h3>Réseautage</h3>
              <p>
                Connectez-vous avec d'autres Algériens vivant au Canada.
                Échangez des conseils et partagez vos expériences.
              </p>
            </div>
            <div className="service">
              <h3>Support</h3>
              <p>
                Bénéficiez d'une assistance en cas de questions ou de problèmes.
                Nous sommes là pour vous aider !
              </p>
            </div>
          </div>
        </section>

        {/* Contactez-nous Section */}
        <section id="contact" className="contact-section">
          <h2>Contactez-nous</h2>
          <p>Pour plus d'informations ou des problèmes, contactez-nous via :</p>
          <ul>
            <li>Courriel : contact@dzca.com</li>
            <li>Téléphone : +1 123 456 7890</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Accueil;