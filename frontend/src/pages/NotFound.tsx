import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center">
      <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
      <h2 className="text-2xl text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/home"
        className="mt-6 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
