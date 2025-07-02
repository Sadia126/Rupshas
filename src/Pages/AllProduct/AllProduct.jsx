import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Loading from "../../Components/Loading/Loading";
import useTitle from "../../Hooks/useTitle";

const AllProduct = () => {
  useTitle("All Products");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const [sortBy, setSortBy] = useState(""); // sorting field

  useEffect(() => {
    fetch("https://rupsha-server-side.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    showAvailableOnly ? product.minimum_selling_quantity > 100 : true
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceLowHigh") return a.price - b.price;
    if (sortBy === "priceHighLow") return b.price - a.price;
    if (sortBy === "ratingHighLow") return b.rating - a.rating;
    return 0;
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="All Products"
        subtitle="View and update all listed products here."
      />

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setShowAvailableOnly((prev) => !prev)}
            className="btn bg-[#6b9fa1] hover:bg-[#92d6d8] text-white"
          >
            {showAvailableOnly ? "Show All Products" : "Show Available Products"}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="ratingHighLow">Rating: High to Low</option>
          </select>
        </div>

        <div>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>
      </div>

      {/* Render Products */}
      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600">
                  Brand: <span className="font-medium">{product.brand}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Category: <span className="font-medium">{product.category}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Price: ৳{product.price} | Rating: {product.rating}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.main_quantity}
                </p>
                <div className="mt-4 text-right">
                  <Link
                    to={`/update-product/${product._id}`}
                    className="btn btn-sm bg-[#6b9fa1] hover:bg-[#92d6d8] text-white"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead className="bg-[#6b9fa1] text-white">
              <tr>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Brand</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Rating</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.brand}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">৳{product.price}</td>
                  <td className="py-2 px-4">{product.rating}</td>
                  <td className="py-2 px-4">{product.main_quantity}</td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/update-product/${product._id}`}
                      className="text-sm text-white bg-[#6b9fa1] px-2 py-1 rounded hover:bg-[#92d6d8]"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
