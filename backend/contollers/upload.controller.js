const UserModel = require("../models/user.model");
// const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

// module.exports.uploadProfileImage = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'Aucun fichier trouvé' });
//       }
//   try {
//     // Vérifier le type de fichier
//     // if (
//     //   req.file.detectedMimeType  "jpg" &&
//     //   req.file.detectedMimeType != "image/png" &&
//     //   req.file.detectedMimeType != "image/jpeg"
//     // ) {
//     //   return res.status(400).json({ message: "Format de fichier invalide. Les fichiers doivent être au format JPG, PNG ou JPEG." });
//     // }

//     // Vérifier la taille du fichier
//     if (req.file.size > 2000000) {
//       return res.status(400).json({ message: "Le fichier dépasse la taille maximale de 2M." });
//     }

//     const fileName = req.body.name + ".jpg";

//     // Enregistrer le fichier sur le serveur
//     await pipeline(
//       req.file.stream,
//       fs.createWriteStream(
//         `${__dirname}/../backend/uploads/profil/${fileName}`
//       )
//     );
//   }catch (err){
//     return res.status(500).json(err.message);
//   }
//     try{

    
//     // Mettre à jour l'utilisateur dans la base de données
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       req.body.userId,
//       { $set: { picture: `./uploads/profil/${fileName}` } },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     );

//     // Vérifier si l'utilisateur a été trouvé
//     if (!updatedUser) {
//       return res.status(404).json({ message: "Utilisateur non trouvé." });
//     }

//     // Retourner l'utilisateur mis à jour
//     return res.status(200).json(updatedUser);
//   } catch (err) {
//     return res.status(500).json({ message: "Erreur lors de l'upload du profil." });
//   }
// };


module.exports.uploadProfileImage= async(req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Aucun fichier trouvé' });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { profiliePicture: `./uploads/profile/${file.filename}` } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );
      
          // Vérifier si l'utilisateur a été trouvé
          if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
          }else return res.status(200).json(updatedUser);
        
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

     