import db from "../config/db.js";

export const renderDashboard = async (req, res) => {
  const [orders] = await db.query("SELECT COUNT(*) as totalOrders, SUM(total) as totalRevenue FROM orders");
  const { totalOrders, totalRevenue } = orders[0];

  res.render("index", { totalOrders, totalRevenue });
};

export const renderReports = async (req, res) => {
  const [reports] = await db.query("SELECT * FROM reports");
  res.render("reports", { reports });
};

export const adminLoginPage = (req, res) => {
  res.render("login");
};
