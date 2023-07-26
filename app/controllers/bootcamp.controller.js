import Bootcamp from "../models/bootcamp.model.js";
import User from "../models/user.model.js";



//CREAR BOOTCAMP

export const createBootcamp = async (req,res) => {
    try {
        let { title, cue, description } = req.body;
        const nuevoBootcamp = await Bootcamp.create({
            title,
            cue,
            description,
        });
        res.status(201).send({
            code: 201,
            message: "Se ha creado el Bootcamp: " + nuevoBootcamp.title,
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al crear el Bootcamp: " + error
        });

    }
};

//LISTAR BOOTCAMP POR ID

export const findById = async (req,res) => {
    try {
        const bootcamps = await Bootcamp.findByPk(req.params.Id, {
            include: [{
                model: UserActivation,
                as: "users",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: [],
                }
            }],
        });
        if(bootcamps) {
            res.status(200).send({
                code: 200,
                message: bootcamps
            })
        } else {
            res.status(404).send({ error: "Bootcamp no encontrado"});
        };
    } catch(error) {
        res.status(500).send({
            code: 500,
            message: "Error mientras se buscaba el bootcamp " + error,
        })

    };
};

// AGREGAR USUARIO A BOOTCAMP

export const addUser = async (req, res) => {
    try {
        const bootcampId = req.params.bootcampId;
        const usuariosrId = req.body.usuariosrId;

        const bootcamps = await Bootcamp.findByPk(bootcampId);
        if(!bootcamps) {
            return res.status(404).send({
                code: 404,
                error: "No se encontro el Bootcamp"
            });
        }

        const usuarios = await User.findByPk(usuariosrId);
        if (!usuarios) {
            return res.status(404).send({
                code: 404,
                error: "No se encontro el Usuario"
            });
        }

        await bootcamps.agregarUsuario(usuarios);
        res.status(200).send({
            code:200,
            message: "El usuario " + usuarios.id + " agregado con éxito al Bootcamp " + bootcamps.id
        });

    } catch (error) {
        res.status(500).send({
            code: 500,
            error: "Error al agregar el Usuario al Bootcamp"
        })
    };
};

// LISTAR USUARIOS y BOOTCAMP

export const findAll = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: [{
                model: User,
                as: "users",
                attributes: [
                    "id",
                    "firstName",
                    "lastName"
                ],
                through: {
                    attributes: [],
                }
            }],
        });
        res.send(bootcamps);
    } catch (error) {
        res.status(500).send({
            code: 500,
            error: "Error al listar los Bootcamps"
        });
    }
};