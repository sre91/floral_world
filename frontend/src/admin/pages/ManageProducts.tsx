import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock?: number;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(
    null
  );

  // Fetch All Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Add Product
  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      if (
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.image ||
        !newProduct.category
      ) {
        alert("Please fill all fields!");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added!");
      setProducts((prev) => [...prev, data.product]);

      setNewProduct({
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "",
      });
    } catch (error) {
      alert("Failed to add product.");
      console.error(error);
    }
  };

  // Update Product
  const handleUpdateProduct = async () => {
    if (!editingProduct?._id) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated!");

      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? data.product : p))
      );

      setEditingProduct(null);
    } catch (error) {
      alert("Failed to update product.");
      console.error(error);
    }
  };

  // Delete Product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted!");
    } catch (error) {
      alert("Delete failed.");
      console.error(error);
    }
  };

  const inputClass =
    "border rounded-lg p-3 text-gray-800 text-base placeholder-gray-500 placeholder-opacity-100 w-full";

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        🌸 Manage Products
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          ➕ Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className={inputClass}
          />

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className={inputClass}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className={`${inputClass} md:col-span-2`}
          />

          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className={`${inputClass} md:col-span-2`}
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
        >
          ➕ Add Product
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🌿 All Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600">No products available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-4 flex flex-col items-center relative"
              >
                {editingProduct?._id !== product._id ? (
                  <>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-40 h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold text-green-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {product.description}
                    </p>
                    <p className="font-bold text-green-700 mt-2">
                      ${product.price}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  // EDIT MODE
                  <div className="w-full bg-green-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">
                      ✏️ Editing: {editingProduct!.name}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editingProduct!.name || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct!,
                            name: e.target.value,
                          })
                        }
                        className={inputClass}
                      />

                      <input
                        type="number"
                        value={editingProduct!.price ?? 0}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct!,
                            price: Number(e.target.value),
                          })
                        }
                        className={inputClass}
                      />

                      <input
                        type="text"
                        value={editingProduct!.category || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct!,
                            category: e.target.value,
                          })
                        }
                        className={inputClass}
                      />

                      <input
                        type="text"
                        value={editingProduct!.image || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct!,
                            image: e.target.value,
                          })
                        }
                        className={`${inputClass} md:col-span-2`}
                      />

                      <textarea
                        value={editingProduct!.description || ""}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct!,
                            description: e.target.value,
                          })
                        }
                        className={`${inputClass} md:col-span-2`}
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleUpdateProduct}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
