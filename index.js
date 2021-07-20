const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/users");
const PORT = 8001;
const config = require("config");
const sharp = require("sharp");

app.use(express.json());
app.use("/api", userRoutes);
app.use(express.urlencoded({ extended: false }));

app.get("/image", (req, res) => {
  sharp("image.jpg")
    .resize(100, 700)
    .toFile("jj.jpg", function (err) {});
});

mongoose
  .connect("mongodb://localhost/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("Error of mongodb: ", err));

app.listen(PORT);
