import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";

const userModel = sequelize.define(
    'User',{
      UserName :{
            type: DataTypes.STRING,
            // allowNull: true
        },
        Email:{
            type: DataTypes.STRING,
            // allowNull: true
        },
        Password :{
            type: DataTypes.STRING,
            // allowNull: true
        }

        
    },
    {
        timestamps: false
    }
)

export default userModel;