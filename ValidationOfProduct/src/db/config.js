import { Sequelize }  from 'sequelize';

const dbname = process.env.DBNAME
const dbusername = process.env.DBUSERNAME
const dbpassword = process.env.DBPASSWORD
const dbhost = process.env.DBHOST

const sequelize = new Sequelize(dbname, dbusername, dbpassword, {

  host: dbhost,
  dialect: 'postgres', 
  logging: console.log
});

console.log(dbpassword)

const connectDB = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully!")
    } catch (error) {
        console.log("Unable to connect to database.", error)
    }
}
export {connectDB}
export default sequelize;