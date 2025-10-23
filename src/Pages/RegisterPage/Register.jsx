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
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(""); // Stores uploaded image URL
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const VITE_IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY; // Your ImgBB key

  // Handle image upload to ImgBB
  const handleImageUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setImageURL(data.data.url); // Set uploaded image URL
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Image upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validation
    if (!name || !email || !password || !imageURL) {
      return setError("All fields including photo are required.");
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough)
      return setError("Password must be at least 6 characters long.");
    if (!hasUpperCase)
      return setError("Password must contain at least one uppercase letter.");
    if (!hasLowerCase)
      return setError("Password must contain at least one lowercase letter.");

    try {
      await createUser(email, password);
      await handleUpdateProfile(name, imageURL);
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
        handleUpdateProfile(user.displayName, user.photoURL);
        navigate(location?.state ? location.state : "/");
        toast.success("Login successful");
      })
      .catch(() => setError("Google login failed"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0 ">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center shadow-xl rounded-2xl p-6 md:p-12 ">
        <div>
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-6">
            Register to Rupsha
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
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

            {/* Image Upload */}
            <div>
              <label htmlFor="photo" className="block text-sm font-medium">
                Upload Photo
              </label>
              <div className="mt-1 relative rounded-md shadow-sm border border-gray-300">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="block w-full p-2 rounded-md cursor-pointer"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    handleImageUpload(e.target.files[0]);
                  }}
                />
              </div>
              {loading && <p className="text-sm text-gray-500">Uploading...</p>}
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Uploaded"
                  className="w-20 h-20 rounded-full mt-2"
                />
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
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
              <label htmlFor="password" className="block text-sm font-medium">
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
              className="w-full bg-[#64aab4] cursor-pointer text-white py-2 px-4 rounded-md transition-colors"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link
              className="text-[#64aab4] font-semibold hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>

          <div className="divider">continue with</div>

          <div className="mt-4 text-center">
            <button
              className="btn cursor-pointer text-[#64aab4] border-[#e5e5e5]"
              onClick={handleGoogleLogin}
            >
              {/* Google SVG here */}
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
