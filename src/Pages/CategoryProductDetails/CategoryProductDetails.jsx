import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";

Modal.setAppElement("#root");

const CategoryProductDetails = () => {
  useTitle("Product Details");
  const { id } = useParams();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState({});
  const [buyQty, setBuyQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rupsha-server-side.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setBuyQty(data.minimum_selling_quantity || 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [id]);

  const increaseQty = () => setBuyQty((q) => q + 1);
  const decreaseQty = () => setBuyQty((q) => (q > 1 ? q - 1 : 1));

  const handleBuy = async (e) => {
    e.preventDefault();

    if (buyQty < products.minimum_selling_quantity) {
      toast.error(
        `Minimum quantity to buy is ${products.minimum_selling_quantity}`
      );
      return;
    }

    try {
      const res = await fetch(
        `https://rupsha-server-side.vercel.app/products/buy/${products._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: buyQty,
            buyerName: user.displayName,
            buyerEmail: user.email,
            product: products,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Purchase successful!");
        setModalOpen(false);
      } else {
        toast.error(data.message || "Purchase failed");
      }
    } catch (error) {
      toast.error("Server error", error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-start
       gap-6"
      >
        <img
          src={products.image}
          alt={products.name}
          className="w-full md:w-1/2 h-72 object-cover rounded"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{products.name}</h1>
          <p className="text-gray-700 mb-4">{products.description}</p>
          <p className="text-lg font-semibold text-[#6a9c9f] mb-1">
            ৳ {products.price}
          </p>
          <p className="text-sm text-gray-600">
            Available: {products.main_quantity}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Minimum Selling Quantity: {products.minimum_selling_quantity}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#6a9c9f] hover:bg-[#8fd4d8] text-white px-6 py-2 rounded transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black/80 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleBuy} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Quantity</label>
            <div className="flex items-center mt-1">
              <button
                type="button"
                onClick={decreaseQty}
                className="px-3 py-1 border rounded-l bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={buyQty}
                onChange={(e) => setBuyQty(Math.max(1, +e.target.value))}
                min={1}
                className="w-16 text-center border-t border-b px-2"
              />
              <button
                type="button"
                onClick={increaseQty}
                className="px-3 py-1 border rounded-r bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6a9c9f] hover:bg-[#8dd3d6] text-white py-2 rounded
             font-semibold"
          >
            Confirm Purchase
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryProductDetails;
