import React, { useState } from 'react';
import './profile.css';

function App() {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [profile, setProfile] = useState({
    name: 'Massyl',
    surname: 'Massyl',
    phone: '+1 585 585 5858',
    email: 'Massyl@example.com',
    image: 'https://via.placeholder.com/150', // Default profile image
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value }); // Update profile dynamically
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, image: reader.result }); // Update profile image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleSaveClick = () => {
    setIsEditing(false); // Exit editing mode
    alert('Profil mis à jour avec succès !');
  };

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={profile.image} alt="Profile" />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />
        )}
      </div>
      <div className="profile-info">
        <h1>{profile.name} {profile.surname}</h1>
        <p>Email: {profile.email}</p>
        {!isEditing ? (
          <>
            <p>Nom: {profile.name}</p>
            <p>Prénom: {profile.surname}</p>
            <p>Telephone: {profile.phone}</p>
          </>
        ) : (
          <>
            <p>
              Nom: <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
            </p>
            <p>
              Prénom: <input type="text" name="surname" value={profile.surname} onChange={handleInputChange} />
            </p>
            <p>
              Telephone: <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
            </p>
          </>
        )}
      </div>
      <button className="edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? 'Enregistrer' : 'Modifier profil'}
      </button>
    </div>
  );
}

export default App;