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

      console.log(payload, "payload");

      const Category = new CategoryModel();
      Category.Skin_Care = payload.Skin_Care;
      Category.Hair_Care = payload.Hair_Care;
      Category.Perfumary = payload.Perfumary;
      await Category.save();

      res.status(200).json({ message: "Category created", Category });
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
        if (payload.Skin_Care) {
          CategoryIndex.Skin_Care = payload.Skin_Care;
          if (payload.Hair_Care) {
            CategoryIndex.Hair_Care = payload.Hair_Care;
            if (payload.Perfumary) {
             CategoryIndex.Perfumary = payload.Perfumary;
            }
            res.status(200).json({
              message: "Category Updated",
            });
          }
        }
      }
    } catch (error) {
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
