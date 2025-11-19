import { useEffect } from "react";

const Cancel = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/cart";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1a14] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-[#221313] border border-[#3a2424] shadow-2xl rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-red-400 mb-4">
          ❌ Payment Cancelled
        </h1>

        <p className="text-[#d1c7c7] text-lg mb-8 leading-relaxed">
          Your payment was not completed, but your cart is safe 🌿 You can try
          again anytime.
        </p>

        <a
          href="/cart"
          className="
            inline-block px-6 py-3 rounded-xl font-semibold
            bg-[#1f3a2d] text-[#e6d9b5] border border-[#2b4a38]
            hover:bg-[#2b4a38] hover:border-[#c3b27d]
            transition shadow-md cursor-pointer
          "
        >
          🛒 Return to Cart
        </a>

        <p className="text-[#a79c9c] text-sm mt-4">
          Redirecting you in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default Cancel;
