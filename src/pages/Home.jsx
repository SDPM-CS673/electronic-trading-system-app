
import Header from "../Components/Header";
const Home = () => {
  const heading = "E-Trading System";

  return (
    <>
      <div className="w-full h-[calc(100vh-2rem)] overflow-y-auto">
        <Header heading={heading} />
      </div>
    </>
  );
};

export default Home;
