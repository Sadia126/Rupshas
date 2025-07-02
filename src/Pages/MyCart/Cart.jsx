/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/UseAuth";
import useTitle from "../../Hooks/useTitle";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  useTitle("My Cart");
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://rupsha-server-side.vercel.app/my-orders?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleCancel = async (orderId) => {
    const confirmCancel = confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const res = await fetch(`https://rupsha-server-side.vercel.app/cancel-order/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error cancelling order:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border p-4 rounded shadow bg-white"
              >
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-xl font-semibold">{order.productName}</h3>
                <p>Category: {order.category}</p>
                <p>Brand: {order.brand}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total: ${order.totalPrice}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <button
                  onClick={() => handleCancel(order._id)}
                  className="bg-red-500 text-white mt-3 px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                >
                  Cancel Order
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Cart;
