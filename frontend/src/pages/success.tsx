import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    localStorage.removeItem("cartState");
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0f1a14] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-[#132219] border border-[#2b3c30] shadow-2xl rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-[#e6d9b5] mb-4">
          🌸 Payment Successful
        </h1>

        <p className="text-[#c3b893] text-lg mb-8 leading-relaxed">
          Thank you for shopping with{" "}
          <span className="text-[#e6d9b5] font-bold">Floral World</span>! Your
          order has been placed successfully.
        </p>

        <a
          href="/home"
          className="
            inline-block px-6 py-3 rounded-xl font-semibold
            bg-[#1f3a2d] text-[#e6d9b5] border border-[#2b4a38]
            hover:bg-[#2b4a38] hover:border-[#c3b27d]
            transition shadow-md cursor-pointer
          "
        >
          🌿 Back to Home
        </a>
      </div>
    </div>
  );
};

export default Success;
