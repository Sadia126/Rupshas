import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/404.json";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#f0f8ff]">
      <Lottie
        animationData={animationData}
        style={{ height: "300px", width: "300px" }}
      />
      <h1 className="text-4xl font-bold text-[#64aab4] mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#64aab4] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#54929c] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
