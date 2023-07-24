const express = require("express");
const router = express.Router();

const userRouter = require("../controllers/user.controller");
const {
	getAll,
	create,
	getOne,
	destroy,
	update,
} = require("../controllers/user.controller");

router.use("/users", userRouter);

router.get("/", (req, res) => {
	res.render("home")
})

router.get("/users", (req, res) => {
	res.render("users") // ? agregar ', {User}'
})



module.exports = router;
