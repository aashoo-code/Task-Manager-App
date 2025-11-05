const ensureAuthenticated = require("../Middleware/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.send("Product Route is working");
});

module.exports = router;
