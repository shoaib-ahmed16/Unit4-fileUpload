const express = require("express");

const userController = require("./controllers/user.controllers");

const galleryController=require("./controllers/gallery.controllers");

const app = express();

app.use(express.json());

app.use("/user", userController);

app.use("/gallery", galleryController);


module.exports = app;
