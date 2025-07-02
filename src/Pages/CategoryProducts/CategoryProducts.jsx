import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaStar, FaRegStar } from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import Loading from "../../Components/Loading/Loading";

const CategoryProducts = () => {
    useTitle("Category Products");
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://rupsha-server-side.vercel.app/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("Products loaded:", data);
      });
  }, [categoryName]);

  const handleDetails = (id) => {
    navigate(`/product/${id}`);
  };

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

    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title={`Products in "${categoryName.replace(/-/g, " ")}"`}
        subtitle="Discover amazing deals in this category"
      />

      {products.length === 0 ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product?._id}
              className="bg-white rounded shadow hover:shadow-md p-4 transition"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{product?.name}</h2>
              <p className="text-sm text-gray-600">Brand: {product?.brand}</p>
              <p className="text-sm text-gray-600">
                Category: {product?.category}
              </p>
              <p className="text-sm text-gray-600">
                Minimum Quantity: {product?.minimum_selling_quantity}
              </p>
              <p className="text-sm my-2">
                {product?.description?.slice(0, 60)}...
              </p>
              <p className="text-lg font-bold">৳ {product?.price}</p>

              {/* ⭐ Custom Rating Stars */}
              {renderStars(product?.rating)}

              <button
                onClick={() => handleDetails(product?._id)}
                className="mt-3 btn btn-sm bg-[#6b9fa1] text-white hover:bg-[#92d6d8]"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
