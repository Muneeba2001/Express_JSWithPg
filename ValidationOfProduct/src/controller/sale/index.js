import saleModel from "../../model/sale/index.js"
import saleproductModel from "../../model/saleProduct/index.js";
import productModel from "../../model/product/index.js";


const saleController = {
    getAll: async(req, res)=>{
       try {
        const sales = await saleModel.findAll();

        res.json({
            data: sales
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
           const sales = await saleModel.findByPk(id);
           if(!sales){
            res.status(400).json({
                message: "No sale Find!!"
            })
           }
           res.status(200).json({
            data : sales
           })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error!!"
            })
        }
    },
    create: async (req, res) => {
      try {
        const payload = req.body;
        const sale = await saleModel.create({ totalAmount: 0 }); // Save sale first to generate id
        const salesProduct = [];
        console.log("request", payload);
  
        for (let index = 0; index < payload.salesProducts.length; index++) {
          const ele = payload.salesProducts[index];
  
          const product = await productModel.findByPk(ele.ProductId);
          if (!product) {
            return res.status(400).json({
              message: "Product not found",
            });
          }
  
          if (ele.productQuantity > product.Stock) {
            return res.status(400).json({
              message: "The product " + product.name + " has in-sufficient stock",
            });
          }
  
          salesProduct.push({
            ...ele,
            price: product.price,
            SaleId: sale.id, // Assign the SaleId
          });
        }
  
        await saleproductModel.bulkCreate(salesProduct);
        const totalAmount = salesProduct.reduce((sum, current) => {
          return sum + (current.Price * current.productQuantity);
        }, 0);
  
        sale.totalAmount = totalAmount;
        await sale.save();
  
        for (const sp of salesProduct) {
          const product = await productModel.findByPk(sp.ProductId);
          product.Stock -= sp.productQuantity;
          await product.save();
        }
  
        res.status(200).json({ message: "sale created", sale });
  
      } catch (error) {
          console.log(error);
          res.status(500).json({
              message: "Internal Server Error"
          });
      }
  },
  
      
            // const salesProduct = payload.saleProducts.map((ele) => {
            //   return {
            //     ...ele,
            //     SaleId: sale.id,
            //   };
            // });
            // console.log(payload.saleProducts, " payload.saleProducts");
            // console.log(salesProduct, "salesProduct");
            // await saleproductModel.bulkCreate(salesProduct);
            // res.status(200).json({ message: "sale created", sale });
    update: async (req, res) => {
        try {
          const { id } = req.params;
          const payload = req.body;
    
          const saleIndex = await saleModel.findByPk(id)
          if (saleIndex == -1) {
            return res.status(404).json({
              message: "No record found",
            });
          }
          if (payload.id) {
            saleIndex.id = payload.id;}
            if (payload.totalAmount) {
              saleIndex.totalAmount = payload.totalAmount;}
                res.status(200).json({
                  message: "sale Updated",
                });
              }
        catch (error) {
          res.status(500).json({
            message: "Internal server error",
          });
        }
      },

      delete: async (req, res) => {
        try {
          const { id } = req.params;
          const saleIndex = await saleModel.destroy({
            where:{
                id: id
            }
          })
          if (saleIndex == -1) {
            return res.status(404).json({
              message: "No sale founded.",
            });
          }
         
          res.status(200).json({
            message: "sale Deleted",
          });
        } catch (error) {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }
      },
}

export default saleController;