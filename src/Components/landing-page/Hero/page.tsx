import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/stock-market-bg.jpg)' }}>
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-5xl font-bold">Your Gateway to Smarter Commodity Trading</h1>
        <p className="text-text text-xl mt-4">Track, analyze, and trade stocks with real-time insights and smart tools.</p>
        <div className="mt-8 flex space-x-4">
          <Link to="/about">
            <button className="px-6 py-3 text-white bg-primary rounded-md text-lg hover:bg-secondary">
              Get Started
            </button>
          </Link>
          <Link to="/features">
            <button className="px-6 py-3 text-primary bg-white border border-primary rounded-md text-lg hover:bg-primary hover:text-white">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
