import React from "react";

const ProductCard = ({ product }) => {
  console.log(product);  // Check the individual product data

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-40 flex-shrink-0 transition-all hover:cursor-pointer">
      <div className="h-24 bg-gray-600 rounded-lg mb-4"></div>
      <h3 className="text-sm font-medium">{product.name}</h3>
    </div>
  );
};

export default ProductCard;
