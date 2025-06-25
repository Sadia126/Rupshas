import { FaShieldAlt, FaTags, FaTruck, FaUserCheck } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ChooseUsSection = () => {
  const features = [
    {
      icon: <FaUserCheck size={30} className="text-green-600" />,
      title: "Verified Suppliers",
      desc: "We connect you only with trusted and verified wholesalers.",
    },
    {
      icon: <FaShieldAlt size={30} className="text-blue-600" />,
      title: "Secure Transactions",
      desc: "End-to-end encryption ensures safe and reliable payments.",
    },
    {
      icon: <FaTags size={30} className="text-yellow-600" />,
      title: "Bulk Discounts",
      desc: "Get the best price for every large order you place.",
    },
    {
      icon: <FaTruck size={30} className="text-purple-600" />,
      title: "Fast Logistics",
      desc: "Efficient delivery system to save your time and money.",
    },
    {
      icon: <MdSupportAgent size={30} className="text-red-600" />,
      title: "24/7 Support",
      desc: "Our dedicated support team is here whenever you need us.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <SectionTitle
        title="Why Choose Rupsha?"
        subtitle="We make wholesale simple, secure, and scalable."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="bg-white shadow p-6 rounded text-center">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUsSection;
