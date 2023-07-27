const Bootcamp = require ("../models/bootcamp.mod");
const User = require ("../models/user.model.js");

const createUser = async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        res.status(200).send({
            code: 200,
            message: `Se ha creado el usuario ${user}`
        })
    } catch (error) {
        res.status(500).send({ 
            code: 500,
            error: "Ha surgido un problema al crear el usuario", error });
    }
};

const findUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, {
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            }],
        });

        res.send(user);
    } catch (error) {
        res.status(500).send({ 
            code: 500,
            error: "Ha surgido un problema mientras se buscaba el usuario", error});
    }
};

const findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            }],
        });

        res.send(users);
    } catch (error) {
        res.status(500).send({ 
            code: 500,
            error: "Ha surgido un problema mientras se buscaban los usuarios", error });
    }
};

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { firstName, lastName } = req.body;

        const user = await User.update(
            { firstName, lastName },
            { where: { id: userId } }
        );
        
        res.status(200).send({
            code: 200,
            message: `Se ha actualizado el usuario ${user}`
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            error: "Ha surgido un problema mientras se actualizaba el usuario" , error
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.destroy({ where: { id: userId } });

        res.status(200).send({
            code: 200,
            message: `Se ha eliminado el usuario ${user}`
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            error: "Ha surgido un problema mientras se eliminaba el usuario" , error
        });
        
    }}

module.exports = { createUser, findUserById, updateUserById, findAll, deleteUserById }
