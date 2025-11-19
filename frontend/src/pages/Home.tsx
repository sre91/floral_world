import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import type { RootState, AppDispatch } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [category, setCategory] = useState("All");

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Dynamic categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter logic
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) =>
          (p.category || "").toLowerCase().includes(category.toLowerCase())
        );

  useEffect(() => {
    setPage(1);
  }, [category]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return (
      <p className="text-center text-[#c3b27d] mt-10">Loading plants...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-[#0f1a14] py-12 px-6 text-[#e6d9b5]">
      <h1 className="text-5xl font-extrabold text-center mb-4 tracking-wide text-[#e6d9b5]">
        Floral World Plants
      </h1>

      <p className="text-center text-[#b9b08d] mb-10 text-lg">
        Discover nature's beauty in our premium plant collection.
      </p>

      {/* Category Filter */}
      <div className="flex justify-center mb-10">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            bg-[#132219] text-[#e6d9b5] 
            border border-[#2a3c32] 
            p-3 rounded-xl 
            shadow-lg 
            hover:border-[#c3b27d] 
            transition
          "
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "Uncategorized"}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {paginatedProducts.length === 0 && (
          <p className="text-center text-[#b9b08d]">
            No products found in this category.
          </p>
        )}

        {paginatedProducts.map((p) => (
          <div
            key={p._id}
            className="
              group
              bg-[#132219]
              border border-[#1e2e25]
              rounded-2xl 
              shadow-xl shadow-black/40 
              p-4 w-64 cursor-pointer

              transform transition-all duration-300 ease-out
              hover:-translate-y-2 
              hover:scale-[1.04]
              hover:shadow-2xl hover:shadow-black/70
              hover:border-[#c3b27d]
            "
          >
            {/* CLICK TO GO TO PRODUCT DETAILS */}
            <Link to={`/product/${p._id}`}>
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="
                    w-full h-44 object-cover rounded-xl mb-4
                    transition-all duration-500 
                    group-hover:brightness-110 
                    group-hover:contrast-110
                  "
                />

                {/* Soft Glow Overlay */}
                <div
                  className="
                    absolute inset-0 rounded-xl 
                    opacity-0 group-hover:opacity-30 
                    transition-all duration-500
                    bg-[#d6c48e]/20 blur-xl
                  "
                ></div>
              </div>
            </Link>

            <h2 className="text-xl font-semibold text-[#e6d9b5]">{p.name}</h2>

            <p className="text-sm text-[#a29878]">
              {p.category || "Uncategorized"}
            </p>

            <p className="text-lg font-bold text-[#d6c48e] mt-2">${p.price}</p>

            {/* Add to Cart */}
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: p._id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    quantity: 1,
                  })
                )
              }
              className="
                mt-4 w-full 
                bg-[#1f3a2d] 
                text-[#e6d9b5] 
                px-4 py-2 
                rounded-xl 
                border border-[#2b4a38] 
                hover:border-[#c3b27d] 
                hover:bg-[#2b4a38] 
                transition-all duration-300
                cursor-pointer
                hover:shadow-lg hover:shadow-[#c3b27d]/20
              "
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              px-4 py-2 
              bg-[#132219]
              text-[#e6d9b5]
              border border-[#2a3c32] 
              rounded-lg 
              hover:border-[#c3b27d]
              transition
              cursor-pointer
              disabled:opacity-40
            "
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg cursor-pointer border transition ${
                page === i + 1
                  ? "bg-[#2b4a38] text-[#e6d9b5] border-[#c3b27d]"
                  : "bg-[#132219] text-[#e6d9b5] border-[#2a3c32]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
              px-4 py-2 
              bg-[#132219]
              text-[#e6d9b5]
              border border-[#2a3c32] 
              rounded-lg 
              hover:border-[#c3b27d]
              transition
              cursor-pointer
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
