import { Request, Response } from "express";
import { Business, BusinessStatus } from "../../models/business";
import { getNextRequiredData } from "../../utils/business-helper";

export const updateBusinessStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { classification, phoneNumber, xMod } = req.body;

    const business = await Business.findById(id);

    if (!business) {
      res.status(404).send("Business not found.");
      return;
    }

    const nextStage = getNextRequiredData(business);

    if (nextStage?.required?.includes("classification") && !classification) {
      res.status(400).json({ business, nextStage });
      return;
    }

    if (classification) {
      const { bureau, classCode } = classification;
      if (bureau === "WCIRB" && ["9079", "8078"].includes(classCode)) {
        business.status = BusinessStatus.MarketApproved;
      } else {
        business.status = BusinessStatus.MarketDeclined;
      }
      business.classification = classification;
    }

    if (phoneNumber && xMod !== undefined) {
      business.status = BusinessStatus.SalesApproved;
      business.phoneNumber = phoneNumber;
      business.xMod = xMod;
    }

    await business.save();
    res.status(200).json({ business, nextStage });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
