import { Router } from "express";
import {
  createBusiness,
  updateBusinessStatus,
  getBusinessById,
  getAllBusinessList,
} from "../controllers/business";
import {
  validateCreateBusiness,
  validateUpdateBusinessStatus,
  handleErrors,
} from "../middlewares";

const router = Router();

/**
 * @route GET /api/businesses
 * @desc Get all businesses
 * @access Public
 */
router.get("/businesses", getAllBusinessList);

/**
 * @route POST /api/business
 * @desc Create a new business
 * @access Public
 */
router.post("/business", validateCreateBusiness, createBusiness);

/**
 * @route GET /api/business/:id
 * @desc Get a business by ID
 * @access Public
 */
router.get("/business/:id", getBusinessById);

/**
 * @route PUT /api/business/:id
 * @desc Update the business status
 * @access Public
 */
router.put("/business/:id", validateUpdateBusinessStatus, updateBusinessStatus);

// Error handling middleware
router.use(handleErrors);

export default router;
