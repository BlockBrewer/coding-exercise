import { Request, Response } from "express";
import { Business } from "../../models/business";

export const getAllBusinessList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const businesses = await Business.find();
    res.status(200).json(businesses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
