// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import CartModal from "./components/CartModal";

function App() {
  const [movies, setMovies] = useState([]);    // array
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log("Movies:", res.data);
        setMovies(res.data); // MUST be array
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (movie) => {
    const existing = cart.find((item) => item.id === movie.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === movie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const checkout = async () => {
    try {
      const bookingData = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity
      }));

      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        { cart: bookingData }
      );

      alert(res.data.message);
      setCart([]);
      setShowCart(false);
    } catch (error) {
      console.error(error);
      alert("Booking failed!");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Movie Ticket Booking
          </h1>

          <button
            onClick={() => setShowCart(true)}
            className="bg-yellow-500 text-white hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg shadow"
          >
            Cart ({cart.length})
          </button>
        </header>

        {movies.length === 0 && (
          <p className="text-center text-gray-300 text-lg">
            No movies available
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                addToCart={addToCart}
              />
            ))}
        </div>

        {showCart && (
          <CartModal
            cart={cart}
            closeCart={() => setShowCart(false)}
            updateQuantity={updateQuantity}
            checkout={checkout}
          />
        )}
      </div>
    </div>
  );
}

export default App;
