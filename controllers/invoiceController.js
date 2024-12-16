import { generatePDF } from "../utils/pdfGenerator.js";

export const createInvoice = (req, res) => {
  const { orderID, user, items, total } = req.body;
  const filePath = `./invoices/invoice_${orderID}.pdf`;

  generatePDF({ user, items, total }, filePath);
  res.json({ message: "Invoice generated", path: filePath });
};
