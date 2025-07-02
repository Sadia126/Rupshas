
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChooseUsSection from "../ChooseUs/ChooseUsSection";
import Newsletter from "../Newsletter/Newsletter";
import useTitle from "../../../Hooks/useTitle";
import Testimonial from "../Testimonial/Testimonial";


const Home = () => {
    useTitle("Home");
    return (
        <>
            <Banner></Banner>
            <Category></Category>
            <ChooseUsSection></ChooseUsSection>
            <Testimonial></Testimonial>
            <Newsletter></Newsletter>
        </>
    );
};

export default Home;