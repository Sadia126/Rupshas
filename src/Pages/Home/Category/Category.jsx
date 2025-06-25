import React from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import category1 from "../../../assets/Category/category1.jpg";
import category2 from "../../../assets/Category/category2.jpg";
import category3 from "../../../assets/Category/category3.jpg";
import category4 from "../../../assets/Category/category4.jpg";
import category5 from "../../../assets/Category/category5.jpg";
import category6 from "../../../assets/Category/category6.jpg";

const categories = [
  {
    name: "Electronics & Gadgets",
    image: category1,
  },
  {
    name: "Home & Kitchen Appliances",
    image: category2,
  },
  {
    name: "Fashion & Apparel",
    image: category3,
  },
  {
    name: "Industrial Machinery & Tools",
    image: category4,
  },
  {
    name: "Health & Beauty",
    image: category5,
  },
  {
    name: "Office Supplies & Stationery",
    image: category6,
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    const categorySlug = name
      .toLowerCase()

      .replace(/\s+/g, "-");
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="Browse by Product Category"
        subtitle="Explore a wide range of wholesale categories tailored for your business needs."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
           className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:scale-105"

          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
