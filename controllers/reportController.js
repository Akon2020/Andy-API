import db from "../config/db.js";

export const getReports = async (req, res) => {
  const { startDate, endDate } = req.query;

  const [rows] = await db.query(
    "SELECT * FROM orders WHERE date BETWEEN ? AND ?",
    [startDate, endDate]
  );

  res.json(rows);
};
