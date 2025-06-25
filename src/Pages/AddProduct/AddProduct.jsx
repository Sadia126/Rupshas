import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/UseAuth";
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

const AddProduct = () => {
  useTitle("Add Product");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // send data to your backend API or Firebase
      const res = await fetch("https://rupsha-server-side-bvxho16mk-sadia126s-projects.vercel.app/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Product added successfully!");
        reset();
      } else {
        toast.error("Failed to add product!");
      }
    } catch (err) {
      toast.error("Error occurred!");
      console.error(err);
    }
  };
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <SectionTitle
        title="Add a New Product"
        subtitle="Fill the form below to add a product to the marketplace."
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
            {...register("image", { required: "Image is required" })}
            className="input input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="font-medium">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Main Quantity */}
        <div>
          <label className="font-medium">Main Quantity</label>
          <input
            type="number"
            {...register("main_quantity", {
              required: true,
              min: 1,
            })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Minimum Selling Quantity */}
        <div>
          <label className="font-medium">Minimum Selling Quantity</label>
          <input
            type="number"
            {...register("minimum_selling_quantity", {
              required: true,
              min: 1,
            })}
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

        {/* Short Description */}
        <div>
          <label className="font-medium">Short Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-medium">Price (per unit)</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true })}
            className="input input-bordered w-full"
          />
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

        {/* Email (pre-filled and read-only) */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            value={user?.email}
            readOnly
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Static Product Content */}
        <div className="bg-base-200 p-4 rounded">
          <h4 className="font-semibold mb-2">Product Content</h4>
          <p className="text-gray-600">
            This product will be listed on Rupsha for verified buyers. Ensure
            all information provided is accurate and suitable for B2B
            visibility.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-[#6b9fa1] text-white hover:bg-[#92d6d8]"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
