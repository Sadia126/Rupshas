import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaHeart } from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";

const Favorite = () => {
  useTitle("Favorite Products");

  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage only once on mount
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites"));
    if (Array.isArray(storedFavs)) {
      setFavourites(storedFavs);
    }
  }, []);

  // Remove from favorites safely
  const handleRemoveFavourite = (productId) => {
    const updatedFavs = favourites.filter((fav) => fav._id !== productId);
    setFavourites(updatedFavs);
    // Update localStorage immediately
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
  };

  const handleDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="Your Favorites"
        subtitle="Products you have added to your favorites"
      />

      {favourites.length === 0 ? (
        <p className="text-center text-gray-500">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((product) => (
            <div
              key={product._id}
              className="relative flex flex-col justify-between h-full rounded shadow hover:shadow-md p-4 transition"
            >
              <button
                onClick={() => handleRemoveFavourite(product._id)}
                className="absolute top-3 right-3 text-xl text-red-500"
              >
                <FaHeart />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm">Brand: {product.brand}</p>
                  <p className="text-sm">Category: {product.category}</p>
                  <p className="text-sm">
                    Quantity: {product.minimum_selling_quantity}
                  </p>
                  <p className="text-sm my-2">
                    {product.description?.slice(0, 60)}...
                  </p>
                  <p className="text-lg font-bold">৳ {product.price}</p>
                </div>
                <button
                  onClick={() => handleDetails(product._id)}
                  className="mt-4 btn btn-sm bg-[#6b9fa1] text-white hover:bg-[#92d6d8]"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
