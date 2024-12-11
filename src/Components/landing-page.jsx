
import HeroSection from "./landing-page/Hero/page";
import FeaturesSection from "./landing-page/Features/page";
import ChartSection from "./landing-page/chartSection/page";
import AboutSection from "./landing-page/About/page";
import { get, post } from "../services/api-call.service";
import { useEffect, useState } from "react";


const RecentCategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCategories = () => {
    get("/api/recentCategories", "http://localhost:3000").then((response) => {
      // setCategories(response.categories)
      setCategories(["Electronics", "Clothing", "Books", "Home & Kitchen", "Sports"])
      console.log("Categories fetched", response.categories);
    }).catch((error) => {
      console.error("Failed to fetch categories", error);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchCategories();
    console.log("Fetching categories");
  }, []); // Empty dependency array means this will run once after component mounts


  return (
    <section className="py-12 bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">Recent Product Categories </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mt-10">
          {!loading ? (
            categories.map((category, index) => (
              <div key={index} className="bg-gray-700 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow animate fade-in"  style={{ animationDelay: `${index * 0.3}s` }}>
                <h3 className="text-xl font-semibold mt-4">{category}</h3>
              </div>
            ))
          ) : (
            <p className="text-white">Loading categories...</p>
          )}
        </div>
      </div>
    </section>
  );
};


export default function LandingPage() {
  return (
    <div>

      <main>
        <HeroSection />
        <FeaturesSection />
        <RecentCategoriesSection />
        <AboutSection />
      </main>

    </div>



  );
}


