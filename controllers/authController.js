import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);

  if (rows.length === 0 || !(await bcrypt.compare(password, rows[0].password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
