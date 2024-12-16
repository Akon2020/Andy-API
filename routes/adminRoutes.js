import express from "express";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import { renderDashboard, renderReports, adminLoginPage } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", verifyAdmin, renderDashboard);
router.get("/reports", verifyAdmin, renderReports);
router.get("/login", adminLoginPage);

export default router;
