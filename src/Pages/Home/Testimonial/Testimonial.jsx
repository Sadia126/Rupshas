import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Kawsar Enterprise",
      username: "@kawsar_b2b",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Rupsha helped us connect with manufacturers directly. Bulk ordering is now smoother than ever. The inventory tracking feature is a game-changer for our warehouse!",
    },
    {
      name: "Sayti Traders",
      username: "@sayti_traders",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "We used to struggle managing B2B invoices and communication. Rupsha makes it seamless. We saved both time and money!",
    },
    {
      name: "Hossain Industries",
      username: "@hossain_ind",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Thanks to Rupsha, we reached wholesale buyers outside our district. Our product visibility increased and so did our sales!",
    },
  ];

  return (
    <section className="py-16 my-16">
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle
          title="Trusted by Businesses"
          subtitle="Hear what our vendors & buyers say about Rupsha"
        />
      </div>

      <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className=" shadow-md rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <p className="italic ">“{testimonial.text}”</p>
            <div className="flex items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h4 className="font-semibold ">{testimonial.name}</h4>
                <p className="text-sm ">{testimonial.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
