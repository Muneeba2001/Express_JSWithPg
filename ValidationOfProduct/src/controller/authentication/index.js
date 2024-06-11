import { compare, hash } from "bcrypt";
import userModel from "../../model/user/index.js";
import jwt from "jsonwebtoken";
import TokenModel from "../../model/token/index.js";
let key = process.env.secret_key;
const userAuthenticationController = {

    SignUp : async(req,res)=> {
        try {
            const payload = req.body;
            const userCheck = await userModel.findOne({
                where : {
                     Email : payload.Email,
                }
            })
            if(userCheck){
                return res.status(400).json({message: "Already exist"})
            }
          //hashing ... SHA 256
            const hPassword = await hash(payload.Password, 10);

            const data = await userModel.create ({
                ...payload,
                Password : hPassword
            })
            return res.status(201).json({message:"Registered successfully", data: data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    },
    
    LogIn : async (req,res)=>{
        try {
            const payload = req.body;
            let userCheck = await userModel.findOne({
                where : {
                     Email : payload.Email,
                }
            })
            if(!userCheck){
                return res.status(400).json({message: "Invalid Credentials"})
            }
            //checkPassword 
            userCheck = userCheck.toJSON();
            const isValid = await compare(payload.Password, userCheck.Password)
            if(!isValid){
                return res.status(400).json({message: "Invalid Credentials"})
            }
            //token Data
            // const tokenData = {
            //     id : userCheck.id,
            //     Email : userCheck.Email,
            //     //password : checkPost.password
            // }
            delete userCheck.Password;
            const token = jwt.sign(userCheck,key,{
                expiresIn : "1hr"
            });
           await TokenModel.create({
                token,
            })
            console.log(token);
            res.status(200).json({data: userCheck, token});
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})  
        }
    }
}

export default userAuthenticationController;