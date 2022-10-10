import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { Navbar } from "../components/Navbar";
import { Product } from "../components/Product";

const DATA = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
  in reprehenderit in voluptate velit esse cillum dolore eu
  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
  sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  thumbnailUrl: `https://picsum.photos/id/1060/536/354`,
  thumbnailAlt: `Random photo`,
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Main>
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;