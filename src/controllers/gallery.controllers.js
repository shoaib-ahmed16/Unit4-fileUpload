const express = require("express");

const Gallery = require("../models/gallery.models");

// const { uploadFiles } = require("../middlewares/uploads");
const upload = require("../middlewares/uploads")

const router = express.Router();


// GET GALLERY
router.get("", async (req, res) => {
  try {
    const gallerys = await Gallery.find().populate({path:"profile_Id",select:{_id:0,firstName:1,lastName:1,profilePic:1}}).lean().exec();

    return res.status(200).send(gallerys);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// GET GALLERY by id
router.get("/:id", async (req, res) => {
  try {
    const gallerys = await Gallery.findById(req.params.id).populate({path:"profile_Id",select:{_id:0,firstName:1,lastName:1,profilePic:1}}).lean().exec();

    return res.status(200).send(gallerys);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//POST GALLERY PICS
router.post("", upload.array("galleryPic",5), async (req, res) => {
    try {
      const filePath =req.files.map((file)=>{
        console.log({file})
        return file.path;
      })
      const gallerys = await Gallery.create({
        profile_Id: req.body.profile_Id,
        galleryPic:filePath
      });
      return res.status(201).send(gallerys);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });



// UPDATE THE GALLERY
router.patch("/:id",upload.single("profilePic"), async (req, res) => {
  try {
    //   const Gallery = await Gallery.create(req.body)
    const gallerys = await Gallery.findByIdAndUpdate({
      galleryPic: 1,
    },{_id:0,firstName:0,lastName:0});
    const galleryUpdate = await Gallery.findByIdAndUpdate({
      galleryPic: req.file.path,
    });
    return res.status(201).send(galleryUpdate);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//DELETE Gallery GALLERY BY USING ID
router.delete("/:id", async (req, res) => {
  try {
    //   const Gallery = await Gallery.create(req.body)
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    return res.status(201).send({Deleted_Record:gallery});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;





//POST GALLERY FILES MAXIMUM 5 FILES
// router.post("/gallery", upload.array("galleryPics", 5), async (req, res) => {
//   try {
//     const filePaths = req.files.map((file) => {
//       return file.path;
//     });

//     const Gallery = await Gallery.create({
//       firstName: req.body.firstName,
//       profilePic: filePaths,
//     });

//     return res.status(200).send(Gallery);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });






// --- Refactor code ------

// router.post("", uploadFiles("galleryPic", "single"), async (req, res) => {
//     try {
//       //   const Gallery = await Gallery.create(req.body)
//       const Gallery = await Gallery.create({
//         firstName: req.body.firstName,
//         profilePic: req.file.path,
//       });
//       return res.status(200).send(Gallery);
//     } catch (err) {
//       return res.status(500).send({ message: err.message });
//     }
//   });

// router.post(
//   "/multiple",
//   uploadFiles("profilePic", "multiple"),
//   async (req, res) => {
//     try {
//       const filePaths = req.files.map((file) => {
//         return file.path;
//       });

//       const Gallery = await Gallery.create({
//         firstName: req.body.firstName,
//         profilePic: filePaths,
//       });

//       return res.status(200).send(Gallery);
//     } catch (err) {
//       return res.status(500).send({ message: err.message });
//     }
//   }
// );

