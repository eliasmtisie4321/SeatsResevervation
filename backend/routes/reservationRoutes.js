const express = require("express");

const router = express.Router();

let reservations = [];

// Create a reservation
router.post("/", (req, res) => {
    const { name, email, seatNumber } = req.body;

    // Check required information
    if (!name || !email || !seatNumber) {
        return res.status(400).json({
            message: "Name, email and seat number are required"
        });
    }

    // Create reservation
    const reservation = {
        id: reservations.length + 1,
        name,
        email,
        seatNumber,
        status: "confirmed"
    };

    // Save reservation
    reservations.push(reservation);

    // Send response
    res.status(201).json({
        message: "Reservation created successfully",
        reservation
    });
});

// Get all reservations
router.get("/", (req, res) => {
    res.json(reservations);
});

module.exports = router;