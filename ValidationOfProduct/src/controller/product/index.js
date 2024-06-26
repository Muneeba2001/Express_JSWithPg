import CategoryModel from "../../model/Category/index.js";
import productModel from "../../model/product/index.js"


const productController = {
    getAll: async(req, res)=>{
       try {
        const products = await productModel.findAll({
          include: [{
            model: CategoryModel,
            attributes: ['Name']
        }]
        });

        res.json({
            data: products
        });
       } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!!", error
        });
       }
    },

    getSingle: async(req, res)=>{
        try {
           const {id} = req.params;
           const product = await productModel.findByPk(id);
           if(!product){
            res.status(400).json({
                message: "No product Find!!"
            })
           }
           res.status(200).json({
            data : product
           })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error!!"
            })
        }
    },
    create: async(req, res)=>{
        try {
            // const payload = req.body;
            // console.log(payload,"Payload");
            let {Category, ProductName, Rate, Stock} = req.body;  //Both data attributes are fetching through body
            console.log(req.body,"Alldata")
            const productData = {ProductName, Rate, Stock}; // products data is being store in new array
            const newproduct = await productModel.create(productData); // in new variable data is created through product table
            await newproduct.save();

            if(Category && Category.length > 0){
              const categories = await CategoryModel.findAll({
                where:
                {
                  id: Category
                }
              })
              if(Category.length > 0){
                await newproduct.addCategory(categories);
              }
            }
           else{
           return res.status(400).json({
              message: "Category not found."
            })
           }
           
            await newproduct.save();

            res.status(200).json({
                message: "Product Created.", newproduct
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
    update: async(req, res) => {
        try {
          const { id } = req.params;
          const payload = req.body;
    console.log(payload,"Hello")
          const productIndex = await productModel.findByPk(id)
          if (productIndex == -1) {
            return res.status(404).json({
              message: "No record found",
            });
          }
          if (payload.id) {
            productIndex.id = payload.id;}
            if (payload.productName) {
              productIndex.productName = payload.productName;}
              if (payload.Stock) {
                productIndex.Stock = payload.Stock;}
                if (payload.Rate) {
                 productIndex.Rate = payload.Rate;}
                
                res.status(200).json({
                  message: "product Updated",
                });
        } catch (error) {
          res.status(500).json({
            message: "Internal server error",
          });
        }
      },
    
      delete: async (req, res) => {
        
          try {
            const { id } = req.params;
            const productIndex = await productModel.destroy({
              where:{
                  id: id
              }
            })
            if (productIndex == -1) {
              return res.status(404).json({
                message: "No Product founded.",
              });
            }
            res.status(200).json({
              message: "Product Deleted",
            });
          }
           catch (error) {
            res.status(500).json({
              message: "Internal Server Error",
            });
          }
    }
  }


export default productController;