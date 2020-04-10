const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const postsRoute = require("./routes/posts");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("hello"));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/posts", postsRoute);

const atlas = process.env.ATLAS_URL;

const run = async () => {
    await mongoose.connect(atlas, { useUnifiedTopology: true, useNewUrlParser: true });
}
run().catch(err => console.log(err));

mongoose.connection.on("connected", () => console.log("Connected!"));
app.listen(port, () => console.log("Listening at " + port));


