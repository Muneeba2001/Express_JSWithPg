
import TokenModel from "../model/token/index.js";
import jwt from "jsonwebtoken"
let key = process.env.secret_key;
const userAuthMiddleWare = async(req,res,next) =>{
   
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(400).json({data: "UnAuthorized Access"})
        }
        console.log(token,'token');
    
      token = token.replace("Bearer ", "");
      const findToken=await TokenModel.findOne({
        where:{
          token:token,
        }
       })
       if(!findToken){
        return res.status(401).json({message: "Unauthorized Access"})
    }
       console.log(token,'token')
       try {
        const decoded = jwt.verify(token,key); 
        req.user=decoded
        return res.status(200).json({
          message:"User Authorized.",
          decoded
        })
    }
        catch(error){
            console.log(error)
            return res.status(401).json({message: "Unauthorized"})
        }
       
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
    next();
}

export default userAuthMiddleWare;