const express = require("express");

const router = express.Router();

let reservations = [];

// POST - Create reservation
router.post("/", (req, res) => {
    console.log("POST request received");
    console.log("Request body:", req.body);

    const { name, email, seatNumber } = req.body || {};

    if (!name || !email || !seatNumber) {
        return res.status(400).json({
            message: "Name, email and seat number are required"
        });
    }

    const reservation = {
        id: reservations.length + 1,
        name,
        email,
        seatNumber,
        status: "confirmed"
    };

    reservations.push(reservation);

    res.status(201).json({
        message: "Reservation created successfully",
        reservation
    });
});

// GET - Get all reservations
router.get("/", (req, res) => {
    res.json(reservations);
});

module.exports = router;