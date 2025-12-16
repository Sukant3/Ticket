// src/components/CartModal.jsx
function CartModal({ cart, closeCart, updateQuantity, checkout }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl text-black font-bold mb-4">
          Your Movie Tickets
        </h2>

        {cart.length === 0 && (
          <p className="text-gray-600 mb-4">
            No tickets in cart yet.
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex text-black justify-between mb-2 items-center"
          >
            <span className="text-black font-bold">
              {item.title}
            </span>
            <input type="number" min="0" value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.id, Number(e.target.value))
              }
              className="w-16 border px-2"
            />
          </div>
        ))}

        <p className="font-bold text-black mt-3">
          Total: {total}
        </p>

        <div className="flex justify-between mt-4">
          <button   onClick={closeCart}  className="bg-gray-400 text-white px-4 py-2 rounded" >
            Close
          </button>
          <button  onClick={checkout} className="bg-blue-600 text-white px-4 py-2 rounded"  >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
