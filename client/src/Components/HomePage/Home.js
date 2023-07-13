import Banner from './Banner';
import Discover from './Discover/Discover';
import Explore from './Explore/Explore';
import Review from './Review/Review';
import Tours from './Tours/Tours';
import Service from './Service/Service';
import Contact from './Contact/Contact';

const Home = () => {
  return (
    <>
      <Banner />
      <Discover />
      <Review />
      <Explore />
      <Tours />
      <Service />
      <Contact />
    </>
  );
};

export default Home;
