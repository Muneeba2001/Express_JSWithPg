import CategoryModel from "../../model/Category/index.js";

const CategoryController = {
  getAll: async (req, res) => {
    try {
      const Categories = await CategoryModel.findAll({});

      res.json({
        data: Categories,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;

      const Category = await CategoryModel.findByPk(id);
      if (!Category) {
        return res.status(404).json({ message: "No Category with this name" });
      }
      res.status(200).json({ data: Category });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      // console.log(payload, "payload");
      // const { Name } = payload;
      // console.log(payload)
      // const Category = new CategoryModel().create({Name})
      //   await Category.save();
      const category = new CategoryModel;
      category.Name = payload.Name;
      await category.save();
      if(!category){
        res.status(404).json({
          message: "Not Found"
        })
      }
      res.status(200).json({ message: "Category created", category });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      const CategoryIndex = await CategoryModel.findByPk(id)
      if (CategoryIndex == -1) {
        return res.status(404).json({
          message: "No record found",
        });
      }
      if (payload.id) {
        CategoryIndex.id = payload.id;
        if (payload.name) {
          CategoryIndex.name = payload.name;}
    
            res.status(200).json({
              message: "Category Updated",
            });
          }
        }
      
    catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  delete:async (req, res) => {
    try {
      const { id } = req.params;
      const CategoryIndex = await CategoryModel.destroy({
        where:{
            id: id
        }
      })
      if (CategoryIndex == -1) {
        return res.status(404).json({
          message: "No Category founded.",
        });
      }
      res.status(200).json({
        message: "Category Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
export default CategoryController;
