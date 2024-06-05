import { Router } from "express";
const categoryRouter = Router();
import CategoryController from "../../controller/Category/index.js";
import AuthValidators from "../../validators/user/index.js"

categoryRouter.get("/categories", AuthValidators.category,CategoryController.getAll)
categoryRouter.get("/category/:id",AuthValidators.category, CategoryController.getSingle)
categoryRouter.post("/category",AuthValidators.category, CategoryController.create)
categoryRouter.put("/category/:id",AuthValidators.category, CategoryController.update)
categoryRouter.delete("/category/:id", AuthValidators.category,CategoryController.delete)

export default categoryRouter;