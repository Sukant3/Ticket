function MovieCard({ movie, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition flex flex-col h-full">

      {/* Image */}
      <img
        src={movie.image}
        alt={movie.title}
        className="h-56 w-full object-fit p-2 rounded-2xl"
      />

      {/* Middle Content */}
      <div className="p-2 flex-grow">
        <h3 className="text-xl font-semibold text-black">
          {movie.title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {movie.description}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {movie.language} • {movie.duration} mins • {movie.rating}
        </p>
      </div>

      {/* Bottom Section (Price + Button) */}
      <div className="p-4 border-t">
        <p className="font-bold text-black mb-3">
          ₹{movie.price} / ticket
        </p>

        <button
          onClick={() => addToCart(movie)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
