import { Typewriter } from "react-simple-typewriter";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center my-10 ">
      <h2 className="text-3xl md:text-4xl font-bold text-[#64aab4]">
        <Typewriter
          words={[title]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
      {subtitle && (
        <p className="text-text-secondary mt-2 text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
