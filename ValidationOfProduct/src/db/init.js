import sequelize  from "./config.js";

const syncdb = async()=>{
    await sequelize.sync({
        alter: true,
        force: false
    })
} 

export default syncdb;