import saleproductModel from "../../model/saleProduct/index.js"


const saleproductController = {
    getAll: async(req, res)=>{
       try {
        const saleproducts = await saleproductModel.findAll();

        res.json({
            data: saleproducts
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
           const saleproduct = await saleproductModel.findByPk(id);
           if(!saleproduct){
            res.status(400).json({
                message: "No saleproduct Find!!"
            })
           }
           res.status(200).json({
            data : saleproduct
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

            const saleproduct = new saleproductModel();
            saleproduct.ProductName = payload.ProductName;
            saleproduct.Quantity = payload.Quantity;
            saleproduct.Price = payload.Price;
            await saleproduct.save();

            res.status(200).json({
                message: "saleproduct Created.", saleproduct
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
    
          const saleproductIndex = await saleproductModel.findByPk(id)
          if (saleproductIndex == -1) {
            return res.status(404).json({
              message: "No record found",
            });
          }
          if (payload.id) {
            saleproductIndex.id = payload.id;}
            if (payload.ProductName) {
              saleproductIndex.ProductName = payload.ProductName;}
              if (payload.Quantity) {
                saleproductIndex.Quantity = payload.Quantity;}
                if (payload.Price) {
                  saleproductIndex.Price = payload.Price;
                }
                res.status(200).json({
                  message: "saleproduct Updated",
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
          const saleproductIndex = await saleproductModel.destroy({
            where:{
                id: id
            }
          })
          if (saleproductIndex == -1) {
            return res.status(404).json({
              message: "No saleproduct founded.",
            });
          }
          res.status(200).json({
            message: "saleproduct Deleted",
          });
        } catch (error) {
          res.status(500).json({
            message: "Internal Server Error",
          });
        }
      },
}

export default saleproductController;