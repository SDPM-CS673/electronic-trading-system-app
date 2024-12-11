import React, { useEffect, useState, useRef } from "react";
import { get, post } from "../services/api-call.service";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
  }, []);


  const fetchCategories = () => {
    get("/api/productCategoryWise", "http://localhost:3000")
      .then((response) => {
        const categoryData = response.categories;
        setCategories(categoryData);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch categories");
        setLoading(false);
      });
  }


  const encodeProductData = (product) => {
    // Use URLSearchParams to convert product data into a query string
    const jsonString = JSON.stringify(product);
    return btoa(jsonString);
  };

  const ProductCard = ({ product }) => {
    return (
      <Link to={`/trades/list?product=${encodeProductData(product)}`}>
        <div className="bg-gray-800 rounded-lg shadow-md p-4 w-60 flex-shrink-0 transition-all hover:cursor-pointer">
          <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
          <ul className="text-sm text-gray-300">
            {product.attributes &&
              Object.entries(product.attributes).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <span className="font-medium text-gray-400">{key}: </span>
                  <span>{value}</span>
                </li>
              ))}
          </ul>
        </div>
      </Link>
    );
  };

  const CategorySection = ({ title, products }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
      if (scrollContainerRef.current) {
        const scrollAmount = 300;
        if (direction === "left") {
          scrollContainerRef.current.scrollLeft -= scrollAmount;
        } else if (direction === "right") {
          scrollContainerRef.current.scrollLeft += scrollAmount;
        }
      }
    };

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-black">{title}</h2>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 transform translate-y-1/2 text-white p-4 rounded-full  text-3xl transition-all hover:scale-110"
          >
            &lt;
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 transform translate-y-1/2 text-white p-4 rounded-full  text-3xl transition-all hover:scale-110"
          >
            &gt;
          </button>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex space-x-6 py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 transition-all"
            style={{ scrollBehavior: "smooth" }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-200 text-white min-h-screen w-full p-6">
      <h1 className="text-4xl font-bold text-black mb-8">Product Categories</h1>
      <div className="max-w-screen-xl mx-auto">
        {categories.filter(e => e.products.length > 0).map((category) => (
          <CategorySection
            key={category.id}
            title={category.name}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
