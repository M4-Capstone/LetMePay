import { Request, Response } from "express";
import createNewCategoryService from "../services/categories/createNewCategory.service";
import getAllCategoriesService from "../services/categories/getAllCategories.service";

const createCategoryController = async (req: Request, res: Response) => {
  const { type } = req.body;
  const newCategory = await createNewCategoryService(type);
  return res.status(201).json(newCategory);
};
const getAllCategoriesController = async (req: Request, res: Response) => {
  const listCategories = await getAllCategoriesService()
  return res.json(listCategories)
};

export { createCategoryController, getAllCategoriesController };
