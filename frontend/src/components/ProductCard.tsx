type ProductProps = {
  name: string;
  price: string;
  image: string;
};

export default function ProductCard({ name, price, image }: ProductProps) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform w-64 sm:w-60 md:w-64 lg:w-72 mx-auto">
      <img
        src={image}
        alt={name}
        className="w-full h-60 object-cover rounded-t-xl"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-green-700">{name}</h3>
        <p className="text-green-600 font-medium mb-2">{price}</p>
        <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
