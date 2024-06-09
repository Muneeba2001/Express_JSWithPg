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
           const sales = await saleModel.findByPk(id, {
            model: saleproductModel,
            include: [productModel]
           });
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
       
        const { ProductName, Price } = req.body;
        const payload = req.body;
        const sale = await saleModel.create({ totalAmount: 0 });
        const salesProduct = [];
        console.log("request payload:", req.body);
  
        for (let i = 0; i < payload.salesProducts.length; i++) {
          const ele = payload.salesProducts[i];
          console.log("Processing product:", ele);
  
          const product = await productModel.findByPk(ele.ProductId);
          if (!product) {
            return res.status(400).json({
              message: "Product not found",
            });
          }
  
          if (ele.productQuantity > product.Stock) {
            return res.status(400).json({
              message: "The product " + product.name + " has insufficient stock",
            });
          }
  
          salesProduct.push({
            ...ele,
            // price: product.price,
            SaleId: sale.id, // Assign the SaleId
          });
        }
  
        console.log("Sales Product data before bulk create:", salesProduct);
  
        await saleproductModel.bulkCreate(salesProduct);
  
      
  
        const totalAmount = salesProduct.reduce((sum, current) => {
          // Log current values for debugging
          console.log(
            `Price: ${current.Price}, Quantity: ${current.Quantity}`
          );
  
          // Add defensive checks for undefined, null, or non-numeric values
          const Price = Number(current.Price);
          const Quantity = Number(current.Quantity);
          console.log(Price)
          console.log(Quantity)
          if (isNaN(Price) || isNaN(Quantity)) {
            // Handle invalid or missing values
            console.error("Invalid or missing price or quantity:", current);
            return sum;
          }
  
          // Perform the calculation
          console.log(`Calculating sum: ${sum} + (${Price} * ${Quantity})`);
          return sum + Price * Quantity;
        }, 0);
  
        console.log("Total Amount calculated:", totalAmount);
  
        // Assuming the existence of a Sale model and the creation of a new sale
        // Replace Sale.create(...) with your actual code to save the sale to the database
  
        const newSale = await saleModel.create({
          totalAmount: isNaN(totalAmount) ? null : totalAmount,
          // Other properties of the sale...
        });
  
        console.log("Sale saved with total amount:", newSale.totalAmount);
  
        for (const sp of salesProduct) {
          const product = await productModel.findByPk(sp.ProductId);
          product.Stock -= sp.Quantity;
          await product.save();
        }
  
        res.status(200).json({ message: "Sale created", sale,totalAmount });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
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