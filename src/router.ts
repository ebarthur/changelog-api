import { Router } from "express";

const router = Router();

/*
 * Products
 */
router.get("/product", (req, res) => {
  res.json({ message: "Products" });
});
router.get("/product/:id", (req, res) => {});
router.post("/product", (req, res) => {});
router.put("/product/:id", (req, res) => {});
router.delete("/product/:id", (req, res) => {});

/*
 * Updates
 */
router.get("/update", (req, res) => {
  res.json({ message: "Updates" });
});
router.get("/update/:id", (req, res) => {});
router.post("/update", (req, res) => {});
router.put("/update/:id", (req, res) => {});
router.delete("/update/:id", (req, res) => {});

export default router;
