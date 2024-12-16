import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import db from "./config/db.js";
import { auth } from "./auth/auth.js";
import { paimentRoute } from "./routes/paiement.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "1024mb" }));
app.use(bodyParser.json({ limit: "1024mb" }));
app.use(
  cors({
    origin: [process.env.URL_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.set("views engine", "ejs")
app.set("views", path.join(path.resolve(), "views"))

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/api/admin/auth", auth);
app.use("/payment", paimentRoute);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Le serveur est lancé au http://localhost:${PORT}/`);
});
