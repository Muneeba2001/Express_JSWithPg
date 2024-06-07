import productModel from "../product/index.js"
import CategoryModel from "../Category/index.js";

productModel.belongsToMany(CategoryModel,{through: "categoryProduct"})
CategoryModel.belongsToMany(productModel, {through: "categoryProduct"})


export {productModel, CategoryModel}