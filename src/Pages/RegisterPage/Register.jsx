/* eslint-disable no-unused-vars */
import { useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/register.json";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import useTitle from "../../Hooks/useTitle";

const Register = () => {
  useTitle("Register");
  const { createUser, handleUpdateProfile, googleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Check for empty fields
    if (!name || !photo || !email || !password) {
      return setError("All fields are required.");
    }

    // Validation rules
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough) {
      return setError("Password must be at least 6 characters long.");
    }

    if (!hasUpperCase) {
      return setError("Password must contain at least one uppercase letter.");
    }

    if (!hasLowerCase) {
      return setError("Password must contain at least one lowercase letter.");
    }

    try {
      await createUser(email, password);
      await handleUpdateProfile(name, photo);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };
 const handleGoogleLogin = () => {
  googleLogin()
    .then((user) => {
      // Optional: update profile if user adds custom name/photo in your form
      // handleUpdateProfile(customName, customPhoto); 
     handleUpdateProfile(user.displayName, user.photoURL);
      console.log(user);

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
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        {/* Registration form */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Register to Rupsha
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium  "
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium  "
              >
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                id="photo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
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
              className="w-full bg-[#64aab4] cursor-pointer  text-white py-2 px-4 rounded-md transition-colors"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-sm ">
            Already have an account?
            <Link
              className="text-[#64aab4] font-semibold hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
          <div className="divider">continue with</div>

          {/* Google */}
          <div className="mt-4 text-center">
            <button
              className="btn cursor-pointer text-[#64aab4] border-[#e5e5e5] "
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
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
