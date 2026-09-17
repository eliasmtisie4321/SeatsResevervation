const seatMap = document.getElementById("seat-map");
const emailInput = document.getElementById("email");
const selectedSeatText = document.getElementById("selected-seat");
const holdButton = document.getElementById("hold-button");
const message = document.getElementById("message");

// Total number of seats
const totalSeats = 20;

// Temporary seat data
// Later, this data will come from the backend API
const seats = [
  { number: 1, status: "available" },
  { number: 2, status: "available" },
  { number: 3, status: "held" },
  { number: 4, status: "available" },
  { number: 5, status: "confirmed" },
  { number: 6, status: "available" },
  { number: 7, status: "available" },
  { number: 8, status: "available" },
  { number: 9, status: "held" },
  { number: 10, status: "available" },
  { number: 11, status: "available" },
  { number: 12, status: "confirmed" },
  { number: 13, status: "available" },
  { number: 14, status: "available" },
  { number: 15, status: "available" },
  { number: 16, status: "available" },
  { number: 17, status: "held" },
  { number: 18, status: "available" },
  { number: 19, status: "available" },
  { number: 20, status: "confirmed" }
];

// Currently selected seat
let selectedSeat = null;


// ================================
// RENDER SEATS
// ================================

function renderSeats() {
  // Clear the seat map
  seatMap.innerHTML = "";

  // Create seats from 1 to 20
  for (let seatNumber = 1; seatNumber <= totalSeats; seatNumber++) {

    // Find the current seat
    const seatData = seats.find(
      (seat) => seat.number === seatNumber
    );

    // Create button
    const seatButton = document.createElement("button");

    // Display seat number
    seatButton.textContent = seatNumber;

    // Add basic seat class
    seatButton.classList.add("seat");

    // Get seat status
    const status = seatData
      ? seatData.status
      : "available";

    // Add status class
    seatButton.classList.add(status);

    // Accessibility
    seatButton.setAttribute(
      "aria-label",
      `Seat ${seatNumber}`
    );

    // Only available seats can be clicked
    if (status === "available") {

      seatButton.addEventListener("click", () => {
        selectSeat(seatNumber, seatButton);
      });

    } else {

      // Disable held and confirmed seats
      seatButton.disabled = true;
    }

    // Add seat to the page
    seatMap.appendChild(seatButton);
  }
}


// ================================
// SELECT SEAT
// ================================

function selectSeat(seatNumber, seatButton) {

  // Remove selected state from all seats
  document.querySelectorAll(".seat").forEach((seat) => {
    seat.classList.remove("selected");
  });

  // Add selected state to clicked seat
  seatButton.classList.add("selected");

  // Save selected seat
  selectedSeat = seatNumber;

  // Update text
  selectedSeatText.textContent = `Seat ${seatNumber}`;

  // Update hold button
  updateHoldButton();

  // Clear previous message
  clearMessage();
}


// ================================
// UPDATE HOLD BUTTON
// ================================

function updateHoldButton() {

  // Get email
  const email = emailInput.value.trim();

  // Button only works when:
  // 1. Email exists
  // 2. Seat has been selected
  holdButton.disabled = !email || !selectedSeat;
}


// ================================
// EMAIL INPUT
// ================================

emailInput.addEventListener("input", () => {
  updateHoldButton();
});


// ================================
// HOLD BUTTON
// ================================

holdButton.addEventListener("click", () => {

  const email = emailInput.value.trim();

  // Check email and seat
  if (!email || !selectedSeat) {

    showMessage(
      "Please enter your email and select a seat.",
      "error"
    );

    return;
  }

  // Temporary frontend response
  // Later this will send data to the backend

  showMessage(
    `Seat ${selectedSeat} has been selected for ${email}. The backend connection will be added next.`,
    "success"
  );
});


// ================================
// SHOW MESSAGE
// ================================

function showMessage(text, type) {

  message.textContent = text;

  message.className = `message ${type}`;
}


// ================================
// CLEAR MESSAGE
// ================================

function clearMessage() {

  message.textContent = "";

  message.className = "message hidden";
}


// ================================
// START APPLICATION
// ================================

renderSeats();