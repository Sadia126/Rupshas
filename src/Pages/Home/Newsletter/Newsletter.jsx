import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Newsletter = () => {
  return (
    <div className="bg-base-200 py-10">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <SectionTitle
          title="Subscribe to Our Newsletter"
          subtitle="Get updates on new products, exclusive deals, and more."
        />
        <form className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-2/3"
            required
          />
          <button
            type="submit"
            className="btn bg-[#6a9c9f] hover:bg-[#95dadd] text-white"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
