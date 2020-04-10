const express = require("express");

const Post = require("../models/Post");

const router = express.Router();

//GET ALL
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//GET ONE
router.get("/:id", async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id);
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//DELETE ONE
router.delete("/:id", async (req, res) => {
    try {
        const posts = await Post.remove({ _id: req.params.id });
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//UPDATE ONE
router.patch("/:id", async (req, res) => {
    try {
        const posts = await Post.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            });
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//POST A NEW ONE
router.post("/", async (req, res) => {
    const post = new Post({
        "title": req.body.title,
        "description": req.body.description
    });

    try {
        const saved = await post.save();
        res.json(saved);
    } catch (error) {
        res.json({ message: error });
    }
}
);
//

module.exports = router;