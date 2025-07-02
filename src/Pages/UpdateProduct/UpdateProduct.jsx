import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Loading from "../../Components/Loading/Loading";
import useTitle from "../../Hooks/useTitle";

const categories = [
  "Electronics & Gadgets",
  "Home & Kitchen Appliances",
  "Fashion & Apparel",
  "Industrial Machinery & Tools",
  "Health & Beauty",
  "Automotive Parts & Accessories",
  "Office Supplies & Stationery",
];

const UpdateProduct = () => {
    useTitle("Update Product");
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // Fetch product data by ID
  useEffect(() => {
    fetch(`https://rupsha-server-side.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        reset(data); 
        console.log("Product loaded:", data);
        console.log("Product ID:", id);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`https://rupsha-server-side.vercel.app/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Product updated successfully!");
        navigate("/allProduct");
      } else {
        console.error("Failed to update product:", res.statusText);
        toast.error("Failed to update product.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  if (loading) {
    return (
     <Loading></Loading>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SectionTitle
        title="Update Product"
        subtitle="Edit product details and save changes."
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        {/* Image */}
        <div>
          <label className="font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Name */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Brand Name */}
        <div>
          <label className="font-medium">Brand Name</label>
          <input
            type="text"
            {...register("brand", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="font-medium">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            {...register("rating", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Main Quantity */}
        <div>
          <label className="font-medium">Main Quantity</label>
          <input
            type="number"
            {...register("main_quantity", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Minimum Selling Quantity */}
        <div>
          <label className="font-medium">Minimum Selling Quantity</label>
          <input
            type="number"
            {...register("minimum_selling_quantity", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn bg-[#6b9fa1] text-white hover:bg-[#92d6d8]"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
