import { Router } from "express";
import userAuthenticationController from "../../controller/authentication/index.js";
import AuthValidators from "../../validators/user/index.js"
import userAuthMiddleWare from "../../middleware/index.js"

const userAuthenticationRouter = Router();

// userAuthenticationRouter.post("/SignUp",userAuthenticationController.SignUp);
// userAuthenticationRouter.post("/LogIn", userAuthenticationController.LogIn);

userAuthenticationRouter.post("/SignUp",userAuthenticationController.SignUp);
userAuthenticationRouter.post("/LogIn", AuthValidators.LogIn, userAuthMiddleWare,userAuthenticationController.LogIn);

export default userAuthenticationRouter;