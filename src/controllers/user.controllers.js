const catchError = require("../utils/catchError");
const Users = require("../models/users");

const getAll = catchError(async (req, res) => {
  const users = await Users.findAll();
  return res.status(201).json(users);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  return res.status(201).json(user);
});

const create = catchError(async (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  const user = await Users.create({
    first_name,
    last_name,
    email,
    password,
    birthday,
  });
  return res.json(user);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Users.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password, birthday } = req.body;
  const user = await Users.update(
    { first_name, last_name, email, password, birthday },
    { where: { id }, returning: true }
  );
  return res.json(user);
});

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
