import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const CategoryModel = sequelize.define(
    'Complete_Care',{
        Skin_Care:{
            type: DataTypes.STRING,
            allowNull: true
        },
        Hair_Care:{
            type: DataTypes.STRING,
            allowNull: true
        },
        Perfumary:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
)

export default CategoryModel;