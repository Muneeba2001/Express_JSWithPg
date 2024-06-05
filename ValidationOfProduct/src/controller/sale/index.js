import saleModel from "../../model/sale/index.js"
import saleproductModel from "../../model/saleProduct/index.js";


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
    create: async(req, res)=>{
        try {
            const payload = req.body;
            console.log(payload,"Payload");

            const sale = new saleModel();
            sale.totalAmount = 1;
            await sale.save();
            const saleProduct = payload.saleProduct.map((ele)=>{
                return {
                    ...ele,
                    saleID: sale.id
                }
            })
            await saleproductModel.bulkCreate(saleProduct)

            res.status(200).json({
                message: "sale Created.", sale
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    },
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