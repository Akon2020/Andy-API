import express from "express";
import db from "../config/db.js";

const router = express.Router();
router.get("/", (req, res) => {
//   return res.json({ Status: true, Result: result });
  return res.send("Hello paiement");
});

export { router as paimentRoute };
