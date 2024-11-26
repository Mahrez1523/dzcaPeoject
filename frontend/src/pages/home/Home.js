import React, { useState, useEffect,useCallback  } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom'
import { FaImage, FaHeart, FaExclamationTriangle } from 'react-icons/fa'; // Import icons
import API from '../../api'; // Assurez-vous que vous avez configuré Axios ou un équivalent dans ce fichier
import { useSelector,useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [myPosts, setmyPosts] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showLikes, setShowLikes] = useState(null);

  const navigate= useNavigate();
  const dispatch = useDispatch();
  
 const userData =  useSelector((state) => state.user.userData);



  const fetchUserData = useCallback(async (userId) => {
    try {
      const response = await API.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des données de l'utilisateur avec l'ID ${userId}`, error);
      return null;
    }
  }, []); // Ce tableau vide signifie que la fonction sera créée une seule fois au début et ne sera pas recréée lors des autres rendus.

  



 

  useEffect(() => {
   
   

    if (!userData || !userData._id) return;
  
    const fetchPostsWithUserData = async () => {
      try {
        const response = await API.get(
          myPosts ? `post/user/${userData._id}` : '/post/'
        );
  
        // Récupérer les données utilisateur pour chaque post
        const postsWithUserData = await Promise.all(
          response.data.map(async (post) => {
            const userData = await fetchUserData(post.posterId); // Une requête par utilisateur
            return {
              ...post,
              userName: userData?.name || 'Utilisateur inconnu',
              userPicture: userData?.profilePicture || null,
            };
          })
        );
  
        setPosts(postsWithUserData); // Mettre à jour les posts enrichis
      } catch (error) {
        console.error('Erreur lors du chargement des posts enrichis', error);
      }
    };
  
    fetchPostsWithUserData();
  }, [myPosts,userData,fetchUserData,navigate]); // Pas d'autres dépendances
  
  
  

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Mettre à jour les posts dans l'état
      } else {
        console.error('Erreur lors de la récupération des posts');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };
  
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('message', message);
      formData.append('posterId', userData._id);
      if (image) {
        formData.append('file', image); // Ajout de l'image
      }
  
      if (editingPost) {
        await API.put(`/post/${editingPost._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        const response = await API.post('/post/createpost', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setPosts([response.data, ...posts]);
      }
      fetchPosts();
      setTitle('');
      setMessage('');
      setImage(null);
      setEditingPost(null);
    } catch (error) {
      console.error('Erreur lors de la gestion du post', error);
    }
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Garde le fichier brut pour l'envoi
    }
  };
  

  const handleEdit = (post) => {
    setTitle(post.title);
    setMessage(post.message);
    setImage(post.postImg);
    setEditingPost(post);
  };

 const checkProfile= ()=>{
    navigate('/profile')
 }
  

  const handleLike = async (postId) => {
    try {
      const response = await API.patch(`/post/like-post/${postId}`, { userId: userData._id });
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, likes: response.data.likes } : post
      );
      setPosts(updatedPosts);
      fetchPosts();
    } catch (error) {
      console.error('Erreur lors du like du post', error);
    }
  };
  

  const toggleShowLikes = (postId) => {
    setShowLikes(showLikes === postId ? null : postId);
  };
  
  
  if (!userData) {
    return (<div>Chargement</div>)
  }

  const handleLogout = async () => {
    try {
      // Appel à l'API pour se déconnecter
      const response = await API.post('/user/logout');
      if (response.status === 200) {
        alert('Déconnexion réussie');
      } else {
        console.error('Problème lors de la déconnexion :', response.status);
      }
  
      // Suppression des données utilisateur
      dispatch(clearUser());
      localStorage.removeItem('token');
  
      // Redirection vers la page de connexion
      navigate('/signin');
    } catch (error) {
      // Affichage de l'erreur pour débogage
      console.error('Erreur lors de la déconnexion :', error.message || error);
  
      // Optionnel : informer l'utilisateur en cas d'erreur
      alert('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
    }
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
            <img src= {`${process.env.REACT_APP_API_URL + userData.profiliePicture}`} alt="Profile" className="profile-img" />
            <h2>{userData.name }</h2>
            <button className="settings-button" onClick = {checkProfile}>Voir profil</button>
            <button className="view-posts-button" onClick={() => setmyPosts((prev) => !prev)}>{myPosts ? 'Tous les posts' : 'Mes Publications'}</button>
            <div className="sidebar-comment">
              <FaExclamationTriangle className="warning-icon" />
              <p>
              N'oubliez pas d'indiquer le vol (ville - ville) ainsi que la date dans le titre. Pensez également à ajouter votre numéro de téléphone ou votre adresse courriel pour être contacté. Merci !
              </p>
            </div>
            <div>
            <button className="settings-button" onClick = {handleLogout}>Déconnecter</button>

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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              <div key={post._id} className="post">
                <img src={`${process.env.REACT_APP_API_URL + post.picture}`} alt="Profile" className="profile-img" />
                <div className="post-details">
                  <h3>{post.title}</h3>
                  <p>{post.message}</p>
                  {post.picture && <img src={`${process.env.REACT_APP_API_URL+post.picture}`} alt="Post" className="post-img" />}
                  <small>Posted by {post.userName || 'Utilisateur inconnu'} on {post.createdAt}</small>
                  {myPosts? <button className="edit-button" onClick={() => handleEdit(post)}>Modifier</button>:'' }
                  <button className="like-button" onClick={() => handleLike(post._id,'673fa5a9b984yeb93d57a6ac')}>
                    <FaHeart />
                  </button>
                  <div className="likes-info" onClick={() => toggleShowLikes(post._id)}>
                   {post.likers.length} {post.likers.length === 1 ? 'Like' : 'Likes'}
                  </div>
                  {/* {showLikes === post.id && (
                    <div className="liked-by">
                      Liked by: {post.likes.join(', ')}
                    </div>
                  )} */}
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
