import React from "react";
import CategorySection from "./CategorySection";

const ProductListPage = () => {
  const categories = [
    { id: 1, name: "Electronics", products: [...Array(10).keys()].map(i => ({ id: i, name: `Product ${i+1}` })) },
    { id: 2, name: "Clothing", products: [...Array(8).keys()].map(i => ({ id: i + 10, name: `Product ${i+1}` })) },
    { id: 3, name: "Home Appliances", products: [...Array(12).keys()].map(i => ({ id: i + 20, name: `Product ${i+1}` })) },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Product Categories</h1>
      {categories.map(category => (
        <CategorySection key={category.id} title={category.name} products={category.products} />
      ))}
    </div>
  );
};

export default ProductListPage;
