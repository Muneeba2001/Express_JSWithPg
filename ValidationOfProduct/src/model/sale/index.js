import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const saleModel = sequelize.define(
    'Sale',{
        totalAmount:{
            type: DataTypes.STRING,
            // allowNull: false
        }
    },
    {
        timestamps: false
    }
)

export default saleModel;