import { DataTypes } from "sequelize";
import sequelize from "../config/bd.config.js";

const Bootcamp = sequelize.define(
    "bootcamp",
    {
        title: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Debe ingresar 'title' del Bootcamp"
                },
            },
        },
        cue: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "En cue debe ingresar un rango entre 5 a 20 numeros"
                },
                isIn: {
                    args: true,
                    msg: "Los números deben ser enteros"
                },
                min: 5,
                max: 20,
            },
        },
        description: {
            type: DataTypes.STRING(100),
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Debe ingresarse una introducción del bootcamp"
                },
            },
        },
    },
    {
        timestamps: true,
        tableName: "bootcamp"
    }
);

export default Bootcamp;