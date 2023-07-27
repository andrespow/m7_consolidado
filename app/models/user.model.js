const { DataTypes } = require ("sequelize");
const sequelize  = require ("../config/bd.config.js");

const User = sequelize.define(
    "users" , {
        firstName: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty:{
                    args: true,
                    msg: "Debe ingresar el Nombre del usuario"
                },
            },
        },
        lastName: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Debe ingresar el Apellido del usuario"
                },
            },
        },
        email: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Debe ingresar el correo electronico"
                },
                isEmail: {
                    args: true,
                    msg: "El formato de correo es invalido, debe tener @ y .com o .cl"
                }
            },
            unique: {
                args: true,
                msg: "Este correo se encuentra registrado"
            }
        }
    },
    {
        timestamps: true,
        tableName: "users"
    }
);

module.exports = { User }