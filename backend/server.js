const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Reservation API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});