import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

// Images
import category1 from "../../../assets/Category/category1.jpg";
import category2 from "../../../assets/Category/category2.jpg";
import category3 from "../../../assets/Category/category3.jpg";
import category4 from "../../../assets/Category/category4.jpg";
import category5 from "../../../assets/Category/category5.jpg";
import category6 from "../../../assets/Category/category6.jpg";

// Category data with short descriptions
const categories = [
  {
    name: "Electronics & Gadgets",
    image: category1,
    description: "Find wholesale electronics, gadgets, and accessories for your tech store.",
  },
  {
    name: "Home & Kitchen Appliances",
    image: category2,
    description: "Explore cooking appliances, cleaning tools, and more at great prices.",
  },
  {
    name: "Fashion & Apparel",
    image: category3,
    description: "Bulk clothing, accessories, and fashion items for every season.",
  },
  {
    name: "Industrial Machinery & Tools",
    image: category4,
    description: "Heavy-duty machines, workshop tools and industrial-grade supplies.",
  },
  {
    name: "Health & Beauty",
    image: category5,
    description: "Personal care, skincare products, and beauty tools in bulk.",
  },
  {
    name: "Office Supplies & Stationery",
    image: category6,
    description: "Paper, pens, printers and everything your office needs.",
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    const categorySlug = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="Browse by Product Category"
        subtitle="Explore a wide range of wholesale categories tailored for your business needs."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition duration-300 hover:-translate-y-1"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="flex flex-col justify-between flex-1 p-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">{category.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{category.description}</p>
              </div>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className="mt-auto btn btn-sm bg-[#6b9fa1] hover:bg-[#92d6d8] text-white"
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
