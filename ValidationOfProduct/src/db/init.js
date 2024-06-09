import TokenModel from "../model/token/index.js";
import userModel from "../model/user/index.js";
import sequelize  from "./config.js";

const syncdb = async()=>{
    await sequelize.sync({
        alter: true,
        force: false
    })
    await TokenModel.sync({
        alter: true,
        force: false
    })
    await userModel.sync({
        alter: true,
        force: false
    })
} 

export default syncdb;