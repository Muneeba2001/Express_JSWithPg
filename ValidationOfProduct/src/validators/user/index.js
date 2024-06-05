import Joi from "joi";


const AuthValidators = {
   LogIn: (req,res,next)=>{
        const schema = Joi.object({
            Email: Joi.string().email().required(),
            Password: Joi.string().required(),
        });

       
        const { value, error } = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                message: "Invalid Data", error
            });
        }
        next();
    },
    category:(req,res,next)=>{

        const schema = Joi.object({
            Skin_Care: Joi.string()
            .min(5)
            .max(20),
            Hair_Care: Joi.string()
            .min(5)
            .max(20),
            Perfumary: Joi.string()
            .min(5)
            .max(20),
        })
        const { value, error } = schema.validate(req.body);
        if(error){
            return res.status(400).json({
                message: "Invalid Data", error
            });
        }
        next();
},
product:(req,res,next)=>{

    const schema = Joi.object({
        ProductName: Joi.string()
        .min(5)
        .max(50),
        Stock: Joi.string(),
        Rate: Joi.string(),
    })
    const { value, error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Invalid Data", error
        });
    }
    next();
},
saleProduct:(req,res,next)=>{

    const schema = Joi.object({
        ProductName: Joi.string()
        .min(5)
        .max(50),
        Quantity: Joi.string(),
        Price: Joi.string(),
    })
    const { value, error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Invalid Data", error
        });
    }
    next();
},



}



export default AuthValidators