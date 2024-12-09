import React from "react";
import ProductCard from "./ProductCard";

const CategorySection = ({ title, products }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
