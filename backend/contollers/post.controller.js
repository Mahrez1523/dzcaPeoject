const PostModel= require('../models/post.model')
const UserModel= require('../models/user.model')
const ObjectId= require('mongoose').Types.ObjectId
const {uploadImage} = require ('./upload.controller')



module.exports.createPost = async (req,res)=>{

  const file = req.file;
  let filename
  if(file) filename= file.filename
  else filename=""
    const newPost= new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        departureDate :req.body.departureDate,
        picture: file ? `/uploads/posts/${filename}` : "",
        likers: []
    })

    try {
        const post = await newPost.save()
        return res.status(201).json(post)
    }catch(err){
        return res.status(400).json(err)
    }
   
}

module.exports.readPost = async (req,res)=>{
   try{
    const posts= await PostModel.find()
    return res.status(200).send(posts)

   }catch(err){
    return res.status(400).send(err.message)
   }
}


module.exports.updatePost = async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    message: req.body.message,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.send(updatedPost);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}


module.exports.deletePost = async (req,res)=>{

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: "Successfuly delete" })
    }
    catch (err) {
        console.log('error' + err)
        return res.status(500).json({ message: err });
    }
    
}

// Fonction pour liker un post
module.exports.likePost = async (req,res)=>{
  
    

  try {
    const postId = req.params.id;  // ID du post
    const userId = req.body.userId;  // ID de l'utilisateur qui like

    // Trouver le post et ajouter l'ID de l'utilisateur au tableau 'likers' s'il n'est pas déjà présent
    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $addToSet: { likers: userId } },  // $addToSet ajoute seulement si l'ID n'est pas déjà présent
      { new: true }  // Retourne le post mis à jour
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


    
}


// Fonction pour unliker un post
module.exports.unlikePost = async (req, res) => {
    try {
      const postId = req.params.id;  // ID du post
      const userId = req.body.userId;  // ID de l'utilisateur qui unlike
  
      // Trouver le post et retirer l'ID de l'utilisateur du tableau 'likers'
      const post = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likers: userId } },  // $pull enlève l'ID spécifié du tableau
        { new: true }  // Retourne le post mis à jour
      );
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  