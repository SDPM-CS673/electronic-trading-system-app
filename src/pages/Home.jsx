
import LandingPage from "../components/landingpage";


const Home = () => {
  const heading = "UniTrade";

  return (
    <>
      <div className="w-full h-[calc(100vh-2rem)] overflow-y-auto">
        {/* <Header heading={heading} /> */}
        <LandingPage />
      </div>
    </>
  );
};

export default Home;
