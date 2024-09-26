import { Request, Response, NextFunction } from "express";

export const validateCreateBusiness = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { FEIN, name } = req.body;
  if (!FEIN || !name) {
    return res.status(400).send("FEIN and Name are required.");
  }
  next();
};

export const validateUpdateBusinessStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { classification, phoneNumber, xMod } = req.body;
  if (!classification && !phoneNumber && xMod === undefined) {
    return res
      .status(400)
      .send(
        "At least one field (classification, phoneNumber, xMod) is required."
      );
  }
  next();
};
