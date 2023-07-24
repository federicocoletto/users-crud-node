const catchError = require("../utils/catchError");
const User = require("../models/User");

const getAll = catchError(async (req, res) => {
	// guardamos todo el json
	const user = await User.findAll();
	return res.json(user);
});

const create = catchError(async (req, res) => {
	// guardamos el usuario creado en el body>raw>json de postman
	const user = await User.create(req.body);
	return res.json(user);
});

const getOne = catchError(async (req, res) => {
	const { id } = req.params;
	// guardamos el usuario cuya primary key === id
	const user = await User.findByPk(id);
	return res.json(user);
});

const destroy = catchError(async (req, res) => {
	const { id } = req.params;
	// destruimos el usuario cuyo id = id
	const userDestroy = await User.destroy({
		where: { id },
	});
	// retornamos solo el error, si es que hay
	if (!userDestroy) return res.sendStatus(400)
});

const update = catchError(async (req, res) => {
	const { id } = req.params;
	// guardamos actualizamos el usuario cuyo id = id y rotornamos el modelo ya actualizado
	const userUpdate = await User.update(req.body, {
		where: { id },
		returning: true,
	});
	// si hay error retornamos el status, sino el json completo
	if (userUpdate[0] === 0) return res.sendStatus(400)
	return res.json(userUpdate)
});



module.exports = {
	getAll,
	create,
	getOne,
	destroy,
	update
};
