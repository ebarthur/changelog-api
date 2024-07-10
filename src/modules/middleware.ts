import { validationResult } from 'express-validator';
import type{ Request, Response, NextFunction } from "express";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return;
  }
    next();
};
