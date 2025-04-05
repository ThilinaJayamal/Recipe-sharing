import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-8xl font-bold text-blue-700">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
