// src/App.js
import React, { useState } from 'react';
import './home.css';
import { FaImage, FaHeart, FaExclamationTriangle } from 'react-icons/fa'; // Import the image, heart, and warning icons

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showLikes, setShowLikes] = useState(null);

  const handlePost = () => {
    if (editingPost) {
      const updatedPosts = posts.map(post =>
        post.id === editingPost.id
          ? { ...post, title, content, postImg: image || post.postImg }
          : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
    } else {
      const newPost = {
        id: posts.length + 1,
        title,
        content,
        author: 'Aya Celyne',
        date: new Date().toLocaleString(),
        profileImg: 'https://via.placeholder.com/50',
        postImg: image,
        likes: [],
      };
      setPosts([newPost, ...posts]);
    }
    setTitle('');
    setContent('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setImage(post.postImg);
    setEditingPost(post);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes('Current User');
        const newLikes = isLiked
          ? post.likes.filter(user => user !== 'Current User')
          : [...post.likes, 'Current User'];
        return { ...post, likes: newLikes };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const toggleShowLikes = (postId) => {
    setShowLikes(showLikes === postId ? null : postId);
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <img src="https://img.freepik.com/photos-premium/algerie-contre-canada-deux-drapeaux_2239-2699.jpg" alt="Logo" className="logo" />
        <input type="text" placeholder="Rechercher..." className="search-input" />
      </header>
      <div className="content-wrapper">
        <aside className="profile-sidebar">
          <div className="profile">
            <img src="https://png.pngtree.com/png-vector/20240601/ourmid/pngtree-casual-man-flat-design-avatar-profile-picture-vector-png-image_12593008.png" alt="Profile" className="profile-img" />
            <h2>Aya Celyne</h2>
            <button className="settings-button">Voir profil</button>
            <button className="view-posts-button">Mes Publication</button>
            <div className="sidebar-comment">
              <FaExclamationTriangle className="warning-icon" />
              <p>
              N'oubliez pas d'indiquer le vol (ville - ville) ainsi que la date dans le titre. Pensez également à ajouter votre numéro de téléphone ou votre adresse courriel pour être contacté. Merci !
              </p>
            </div>
          </div>
        </aside>
        <main className="post-section">
          <div className="post-form">
            <input
              type="text"
              placeholder="Titre"
              className="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Avez-vous de l'espace ou voulez-vous envoyer quelque chose ?"
              className="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input type="file" id="file-input" onChange={handleImageChange} hidden />
            <label htmlFor="file-input" className="file-input-label">
              <FaImage />
            </label>
            <button className="post-button" onClick={handlePost}>
              {editingPost ? 'Modifier' : 'Partager'}
            </button>
          </div>
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post">
                <img src={post.profileImg} alt="Profile" className="profile-img" />
                <div className="post-details">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  {post.postImg && <img src={post.postImg} alt="Post" className="post-img" />}
                  <small>Posted by {post.author} on {post.date}</small>
                  <button className="edit-button" onClick={() => handleEdit(post)}>Modifier</button>
                  <button className="like-button" onClick={() => handleLike(post.id)}>
                    <FaHeart />
                  </button>
                  <div className="likes-info" onClick={() => toggleShowLikes(post.id)}>
                    {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                  </div>
                  {showLikes === post.id && (
                    <div className="liked-by">
                      Liked by: {post.likes.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
        <aside className="ads-sidebar">
          <img src="https://via.placeholder.com/150" alt="Ad 1" className="ad-img" />
          <img src="https://via.placeholder.com/150" alt="Ad 2" className="ad-img" />
          <img src="https://via.placeholder.com/150" alt="Ad 3" className="ad-img" />
        </aside>
      </div>
    </div>
  );
}

export default Home;
