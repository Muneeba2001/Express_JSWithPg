import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import productModel from "../product/index.js";
import saleModel from "../sale/index.js";

const saleproductModel = sequelize.define(
    'saleProduct',{
      ProductName :{
            type: DataTypes.STRING,
            // allowNull: true
        },
        Quantity :{
            type: DataTypes.STRING,
            // allowNull: true
        },
       

        
    },
    {
        timestamps: false
    }
)

productModel.hasMany(saleproductModel)
saleproductModel.belongsTo(productModel)

saleModel.hasMany(saleproductModel)
saleproductModel.belongsTo(saleModel)

export default saleproductModel;