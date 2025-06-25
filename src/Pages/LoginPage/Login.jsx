
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";

import { useNavigate, useLocation, Link } from "react-router-dom";

import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import useTitle from "../../Hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { login, googleLogin,handleUpdateProfile } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        toast.success("Login successful");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  const handleGoogleLogin = () => {
  googleLogin()
    .then((user) => {
      // Optional: You can also call handleUpdateProfile here if needed
      handleUpdateProfile(user.displayName, user.photoURL);
      navigate(location?.state ? location.state : "/");
      toast.success("Login successful");
    })
    .catch(() => setError("Google login failed"));
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0 ">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center shadow-xl rounded-2xl p-6 md:p-12 ">
        {/* Lottie animation */}
        <div>
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login form */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Login to Rupsha
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium  "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#64aab4] hover:bg-[#64aab4]
               text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm ">
            Don’t have an account?{" "}
            <Link
              className="text-[#64aab4] font-semibold hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
          <div className="divider">continue with</div>
          {/* Google */}
          <div className="mt-4 text-center">
            <button
              className="btn  text-[#64aab4] border-[#e5e5e5] cursor-pointer"
              onClick={handleGoogleLogin}
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
