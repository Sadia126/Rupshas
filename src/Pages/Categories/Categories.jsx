import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import Loading from "../../Components/Loading/Loading";

const Categories = () => {
  useTitle("All Products");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]); //  Favourite state

  const navigate = useNavigate();

  //  Load products
  useEffect(() => {
    setLoading(true);
    fetch("https://rupsha-server-side.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  //  Load favourites from localStorage on first render
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavs);
  }, []);

  //  Save favourites to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  //  Toggle favourite
  const handleToggleFavourite = (product) => {
    const alreadyFav = favourites.some((fav) => fav._id === product._id);
    if (alreadyFav) {
      // Remove from favourites
      const updated = favourites.filter((fav) => fav._id !== product._id);
      setFavourites(updated);
    } else {
      // Add to favourites
      setFavourites([...favourites, product]);
    }
  };

  const handleDetails = (id) => {
    navigate(`/product/${id}`);
  };

  //  Render rating stars
  const renderStars = (rating) => {
    const totalStars = 5;
    const filled = Math.round(rating || 0);
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      stars.push(
        i < filled ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }

    return <div className="flex mt-1">{stars}</div>;
  };

  //  Search filter logic
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product?.name?.toLowerCase().includes(term) ||
      product?.brand?.toLowerCase().includes(term) ||
      product?.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="All Products"
        subtitle="Discover amazing deals on all products"
      />

      {/*  Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by name, brand, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-2/3 md:w-1/2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6b9fa1]"
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <Loading />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favourites.some((fav) => fav._id === product._id);
            return (
              <div
                key={product?._id}
                className="relative flex flex-col justify-between h-full rounded shadow hover:shadow-md p-4 transition"
              >
                {/*  Favourite Button */}
                <button
                  onClick={() => handleToggleFavourite(product)}
                  className="absolute top-3 right-3 text-xl"
                >
                  {isFav ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400 hover:text-red-400" />
                  )}
                </button>

                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{product?.name}</h2>
                    <p className="text-sm">Brand: {product?.brand}</p>
                    <p className="text-sm">Category: {product?.category}</p>
                    <p className="text-sm">
                      Quantity: {product?.minimum_selling_quantity}
                    </p>
                    <p className="text-sm my-2">
                      {product?.description?.slice(0, 60)}...
                    </p>
                    <p className="text-lg font-bold">৳ {product?.price}</p>
                    {renderStars(product?.rating)}
                  </div>
                  <button
                    onClick={() => handleDetails(product?._id)}
                    className="mt-4 btn btn-sm bg-[#6b9fa1] text-white hover:bg-[#92d6d8]"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
