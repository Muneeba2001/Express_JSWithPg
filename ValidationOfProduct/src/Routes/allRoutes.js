import categoryRouter from "./category/index.js";
import productRouter from "./product/index.js";
import saleRouter from "./sale/index.js";
import saleproductRouter from "./saleProduct/index.js";
import userAuthenticationRouter from "./Authentication/index.js"

const allRoutes =[
    saleRouter,
    productRouter,
    saleproductRouter,
    categoryRouter,
    userAuthenticationRouter,
   
]

export default allRoutes;