import express from "express";
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.json({
      loginStatus: false,
      Error: "L'email et le mot de passe sont réquis",
    });
  }

  const sql =
    "SELECT * FROM utilisateur WHERE email = ? AND mot_de_passe = ?";

  try {
    db.query(sql, [email, mot_de_passe], (err, result) => {
      if (err) {
        return res.json({ loginStatus: false, Error: "Erreur de la requête" });
      }

      if (result.length > 0) {
        const userEmail = result[0].email;
        const token = jwt.sign(
          { role: "userCredy", email: userEmail },
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 6 * 60 * 60 * 1000,
        });
        return res.json({ loginStatus: true, identifiant: result[0].nom[0] });
      } else {
        return res.json({
          loginStatus: false,
          Error: "Email ou mot de passe incorrect!",
        });
      }
    });
  } catch (error) {
    return res.json({ loginStatus: false, Error: "Erreur de serveur" });
  }
});

router.get("/verifytoken", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Utilisateur authentifié" });
});

export { router as auth };
