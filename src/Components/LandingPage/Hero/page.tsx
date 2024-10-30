// components/HeroSection.js
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-cover bg-center h-dvh" style={{ backgroundImage: 'url(/stock-market-bg.jpg)' }}>
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-white text-5xl font-bold">Your Gateway to Smarter Commodity Trading</h1>
        <p className="text-gray-200 text-xl mt-4">Track, analyze, and trade stocks with real-time insights and smart tools.</p>
        <div className="mt-8">
          <Link href="#about">
            <button className="text-white bg-blue-600 px-6 py-3 rounded-md text-lg hover:bg-blue-700">
              Get Started
            </button>
          </Link>
          <Link href="/features">
            <button className="text-blue-600 bg-white border border-blue-600 px-6 py-3 rounded-md text-lg ml-4 hover:bg-blue-600 hover:text-white">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
