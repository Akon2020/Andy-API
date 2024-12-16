import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (data, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Facture", { align: "center" });
  doc.text(`Client : ${data.user.name}`);
  doc.text(`Email : ${data.user.email}`);

  data.items.forEach((item) => {
    doc.text(`${item.name} - ${item.price} x ${item.quantity}`);
  });

  doc.text(`Total : ${data.total}`);
  doc.end();
};
