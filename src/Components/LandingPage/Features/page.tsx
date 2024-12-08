// components/FeaturesSection.js
const features = [
    {
      title: "Market Data",
      description: "Historical data and live data",
      icon: "/icons/data.svg",
    },
    {
      title: "Order Book",
      description: "Your personalised orders, your favorite trades",
      icon: "/icons/analytics.svg",
    },
    {
      title: "Registration",
      description: "Register for the trade through our website",
      icon: "/icons/security.svg",
    },
    {
      title: "Settlements",
      description: "Close your trade and easily take out money from the wallet",
      icon: "/icons/alerts.svg",
    },
  ];
  
  const FeaturesSection = () => {
    return (
      <section className="py-12 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-300">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-600 text-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                {/* <img src={feature.icon} alt={feature.title} className="h-16 mx-auto" /> */}
                <h3 className="text-xl font-semibold text-gray-300 mt-4">{feature.title}</h3>
                <p className="text-gray-300 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  