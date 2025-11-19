export default function Cart() {
  // sample cart data (temporary)
  const cartItems = [
    { name: "Peace Lily", price: 25, quantity: 1 },
    { name: "Snake Plant", price: 30, quantity: 2 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // if empty cart means
  if (cartItems.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center py-20 text-green-700">
        <h2 className="text-3xl font-bold mb-4">🛒 Your Cart is Empty</h2>
        <p className="text-green-600 mb-6">
          Looks like you haven't added any plants yet.
        </p>
        <a
          href="/shop"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Go to Shop 🌿
        </a>
      </section>
    );
  }

  // if not empty run this cart
  return (
    <section className="px-8 py-10 text-green-800">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 Your Cart
      </h2>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center bg-green-50 p-4 rounded-md shadow-sm"
          >
            <p className="font-medium">{item.name}</p>
            <p>Qty: {item.quantity}</p>
            <p className="font-semibold">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-8 flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <div className="text-center mt-8">
        <button className="bg-green-600 text-white px-8 py-2 rounded-md hover:bg-green-700">
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}
