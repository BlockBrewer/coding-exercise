import { Request, Response, NextFunction } from "express";

export const handleErrors = (err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
