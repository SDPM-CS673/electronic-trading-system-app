const features = [
  { title: "Market Data", description: "Historical data and live data" },
  { title: "Order Book", description: "Your personalized orders, your favorite trades" },
  { title: "Registration", description: "Register for the trade through our website" },
  { title: "Settlements", description: "Close your trade and easily take out money from the wallet" },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
