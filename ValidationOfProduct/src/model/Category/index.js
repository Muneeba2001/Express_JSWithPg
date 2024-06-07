import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import productModel from "../product/index.js";

const CategoryModel = sequelize.define(
    'Category',{
        Name:{
            type: DataTypes.STRING,
            // allowNull: true
        },
    },
    {
        timestamps: false
    }
)


export default CategoryModel;