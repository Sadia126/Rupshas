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
  const [viewMode, setViewMode] = useState("table");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  //  Filter for available products
  const filteredProducts = products.filter((product) =>
    showAvailableOnly ? product.minimum_selling_quantity > 100 : true
  );

  //  Search filter by name, brand, or category
  const searchedProducts = filteredProducts.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  //  Sorting logic
  const sortedProducts = [...searchedProducts].sort((a, b) => {
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
        subtitle="View, search, and sort all listed products here."
      />

      {/*  Top Control Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-[#f4f8f8] p-4 rounded-lg shadow">
        {/* Search Box */}
        <input
          type="text"
          placeholder=" Search by name, brand, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2
           bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6b9fa1]"
        />

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <button
            onClick={() => setShowAvailableOnly((prev) => !prev)}
            className="btn bg-[#6b9fa1] hover:bg-[#92d6d8] text-white rounded-md
             px-4 py-2"
          >
            {showAvailableOnly ? "Show All Products" : "Show Available Only"}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6b9fa1]"
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
            <option value="ratingHighLow">Rating: High → Low</option>
          </select>

          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="border rounded px-4 py-2 bg-white text-gray-700 
            focus:outline-none focus:ring-2 focus:ring-[#6b9fa1]"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>
      </div>

      {/*  Render Products */}
      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Brand: <span className="font-medium">{product.brand}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-medium">{product.category}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Price: ৳{product.price} | ⭐ {product.rating}
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
          <table className="min-w-full shadow rounded bg-white">
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
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
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
