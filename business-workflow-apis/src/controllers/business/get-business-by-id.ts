import { Request, Response } from "express";
import { Business } from "../../models/business";
import { getNextRequiredData } from "../../utils/business-helper";

export const getBusinessById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
      res.status(404).send("Business not found.");
      return;
    }

    const nextData = getNextRequiredData(business);
    res.status(200).json({
      business,
      nextRequiredData: nextData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
