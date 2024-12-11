import React, { useRef } from "react";
import ProductCard from "./ProductCard";  // Import ProductCard component

const CategorySection = ({ title, products }) => {
  const scrollContainerRef = useRef(null);

  // Function to handle the scroll
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Number of pixels to scroll
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
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 transform translate-y-1/2 text-white p-4 rounded-full shadow-md text-3xl transition-all hover:scale-110"
        >
          &lt;
        </button>

        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 transform translate-y-1/2 text-white p-4 rounded-full shadow-md text-3xl transition-all hover:scale-110"
        >
          &gt;
        </button>

        {/* Product cards container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto flex space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-800 transition-all"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;  
