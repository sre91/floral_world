import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.products.products);
  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f1a14] flex items-center justify-center">
        <p className="text-[#e6d9b5] text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1a14] px-6 py-10">
      <button
        onClick={() => navigate("/home")}
        className="
          mb-8 p-3 rounded-full
          bg-[#1f3a2d] text-[#e6d9b5]
          border border-[#2b4a38]
          hover:bg-[#2b4a38] hover:border-[#c3b27d]
          transition shadow-md cursor-pointer text-xl
        "
      >
        🏡
      </button>

      <div
        className="
          max-w-5xl mx-auto
          bg-[#132219] border border-[#2a3c32]
          rounded-2xl shadow-xl
          p-10 flex flex-col md:flex-row gap-10
        "
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full md:w-1/2 h-80 object-cover rounded-2xl
            border border-[#2b4a38] shadow-md
          "
        />

        <div className="flex-1 text-[#e6d9b5]">
          <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>

          <p className="text-[#c3b893] text-lg mb-2">
            Category:{" "}
            <span className="text-[#e6d9b5] font-semibold">
              {product.category}
            </span>
          </p>

          <p className="text-3xl font-semibold text-[#c3b27d] mb-6">
            ${product.price}
          </p>

          <p className="text-[#c3b893] leading-relaxed text-lg">
            {product.description}
          </p>

          <p className="text-[#b9b08d] mt-6 italic">
            *This page is for viewing plant details only.*
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
