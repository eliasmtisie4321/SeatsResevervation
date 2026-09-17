const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/reservations", reservationRoutes);
