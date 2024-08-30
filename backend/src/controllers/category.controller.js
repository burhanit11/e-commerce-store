import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({
      name,
    });
    res
      .status(200)
      .json({ message: "category create successdully.", category });
  } catch (error) {
    console.log(error);
  }
};

export { createCategory };
