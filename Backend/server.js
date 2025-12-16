const express = require("express");
const cors = require("cors");
const movies = require("./movies");

const app = express();
app.use(cors());
app.use(express.json());
 
const bookings = [];      // simple in‑memory store

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/count", (req, res) => {
  res.json({ count: movies.length });
});

// called from React checkout
app.post("/api/checkout", (req, res) => {
  const { cart } = req.body;

  const newBooking = {
    id: bookings.length + 1,
    items: cart,                 // [{id, quantity}]
    createdAt: new Date().toISOString(),
    status: "CONFIRMED",
  };

  bookings.push(newBooking);
  console.log("New movie booking:", newBooking);

  res.json({ message: "Movie tickets booked successfully!", booking: newBooking });
});

// ADMIN endpoint: list all confirmed bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.get("/", (req, res) => {
  res.send("Movie Ticket Booking backend is running");
});

app.listen(5000, () =>
  console.log("Movie backend running at http://localhost:5000")
);
