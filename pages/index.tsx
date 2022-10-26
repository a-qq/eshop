import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div>Home page</div>
      <Footer />
    </div>
  );
};

export default Home;
