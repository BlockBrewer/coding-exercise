import { Request, Response } from "express";
import { Business, BusinessStatus } from "../../models/business";

export const createBusiness = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { FEIN, name, classification, phoneNumber, xMod } = req.body;

    if (!FEIN || !name) {
      res.status(400).send("FEIN and Name are required.");
      return;
    }

    const status: BusinessStatus = BusinessStatus.New;

    const business = new Business({
      FEIN,
      name,
      classification,
      phoneNumber,
      xMod,
      status,
    });

    await business.save();
    res.status(201).json(business);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
