import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import CateogryModel from "../Category/index.js";

const productModel = sequelize.define(
    'Product',{
      ProductName :{
            type: DataTypes.STRING,
    
        },
        Stock :{
            type: DataTypes.STRING,
            // validate : {
            //     isNumeric : true
            // }
            // allowNull: false
        },
        Rate :{
            type: DataTypes.STRING,
        },

        
    },
    {
        timestamps: false
    }
)

productModel.hasMany(CateogryModel)
CateogryModel.belongsTo(productModel)
export default productModel;