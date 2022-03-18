const express = require("express");

const User = require("../models/user.models");

// const { uploadFiles } = require("../middlewares/uploads");
const upload = require("../middlewares/uploads")

const router = express.Router();


// GET USERS PROFILES
router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



// GET USERS PROFILES BY ID
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});



//POST USER NAME AND PROFILE
router.post("", upload.single("profilePic"), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.create({
      firstName: req.body.firstName,
      lastName:req.body.lastName,
      profilePic: req.file.path,
    });
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


// UPDATE THE USER PROFILE
router.patch("/:id",upload.single("profilePic"), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.findByIdAndUpdate({
      profilePic: 1,
    },{_id:0,firstName:0,lastName:0});
    const userUpdate = await User.findByIdAndUpdate({
      profilePic: req.file.path,
    });
    return res.status(201).send(userUpdate);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//DELETE USER PROFILE BY USING ID
router.delete("/:id", async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(201).send({Deleted_Record:user});
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


//POST GALLERY FILES MAXIMUM 5 FILES
// router.post("/gallery", upload.array("galleryPics", 5), async (req, res) => {
//   try {
//     const filePaths = req.files.map((file) => {
//       return file.path;
//     });

//     const user = await User.create({
//       firstName: req.body.firstName,
//       profilePic: filePaths,
//     });

//     return res.status(200).send(user);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });






// --- Refactor code ------
// router.post("", uploadFiles("profilePic", "single"), async (req, res) => {
//   try {
//     //   const user = await User.create(req.body)
//     const user = await User.create({
//       firstName: req.body.firstName,
//       profilePic: req.file.path,
//     });
//     return res.status(200).send(user);
//   } catch (err) {
//     return res.status(500).send({ message: err.message });
//   }
// });

// router.post(
//   "/multiple",
//   uploadFiles("profilePic", "multiple"),
//   async (req, res) => {
//     try {
//       const filePaths = req.files.map((file) => {
//         return file.path;
//       });

//       const user = await User.create({
//         firstName: req.body.firstName,
//         profilePic: filePaths,
//       });

//       return res.status(200).send(user);
//     } catch (err) {
//       return res.status(500).send({ message: err.message });
//     }
//   }
// );

module.exports = router;
