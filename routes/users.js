const express = require("express");

const User = require("../models/User");

const router = express.Router();



//GET ALL
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//GET ONE
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//DELETE ONE
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.remove({ _id: req.params.id });
        res.json(posts);

    } catch (error) {
        res.json({ message: error });
    }

});
//

//UPDATE ONE
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email
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
    const user = new User({
        "name": req.body.name,
        "email": req.body.email
    });

    try {
        const saved = await user.save();
        res.json(saved);
    } catch (error) {
        res.json({ message: error });
    }
}
);
//

module.exports = router;