import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  {
    /*Keep your existing checkout logic exactly same */
  }
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://floral-world.onrender.com/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        }
      );

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1a14] px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-[#e6d9b5] mb-10">
        🛒 Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-[#c3b893] text-lg">
          <p>Your cart is empty 🌿</p>
          <Link
            to="/home"
            className="
              mt-4 inline-block px-6 py-3 rounded-xl
              bg-[#1f3a2d] text-[#e6d9b5]
              border border-[#2b4a38]
              hover:bg-[#2b4a38] hover:border-[#c3b27d]
              transition cursor-pointer font-semibold
            "
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="
                flex items-center justify-between
                bg-[#132219] border border-[#2a3c32]
                p-5 rounded-2xl shadow-md
                hover:shadow-xl transition
              "
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl border border-[#2b4a38]"
                />

                <div>
                  <h2 className="text-xl font-bold text-[#e6d9b5]">
                    {item.name}
                  </h2>
                  <p className="text-[#c3b893] text-sm">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="
                        w-8 h-8 rounded-lg text-[#e6d9b5]
                        bg-[#1f3a2d] border border-[#2b4a38]
                        hover:bg-[#2b4a38] transition cursor-pointer
                      "
                    >
                      -
                    </button>

                    <span className="text-[#e6d9b5] text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="
                        w-8 h-8 rounded-lg text-[#e6d9b5]
                        bg-[#1f3a2d] border border-[#2b4a38]
                        hover:bg-[#2b4a38] transition cursor-pointer
                      "
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="
                  bg-red-600 hover:bg-red-700
                  text-white px-3 py-1 rounded-lg transition cursor-pointer
                "
              >
                Remove
              </button>
            </div>
          ))}

          <div
            className="
              bg-[#132219] border border-[#2a3c32]
              rounded-2xl p-6 mt-10 shadow-md
            "
          >
            <div className="flex justify-between text-[#e6d9b5] text-xl font-semibold mb-4">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="
                  px-5 py-2 rounded-xl
                  bg-[#3a3a3a] text-[#e6d9b5]
                  hover:bg-[#4a4a4a] transition cursor-pointer
                "
              >
                Clear Cart
              </button>

              <button
                onClick={handleCheckout}
                className="
                  px-6 py-2 rounded-xl font-semibold
                  bg-[#1f3a2d] text-[#e6d9b5] border border-[#2b4a38]
                  hover:bg-[#2b4a38] hover:border-[#c3b27d]
                  transition cursor-pointer
                "
              >
                Checkout 🌿
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
