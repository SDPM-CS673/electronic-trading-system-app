import React, { useState, useEffect } from 'react';
import AddNewProductModal from './AddNewProductModal'; // Import the modal component
import { post, get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";

const Product = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState(null); // For holding data when editing
    const [isEdit, setIsEdit] = useState(false); // Track if we are editing a product

    useEffect(() => { getData() }, [])

    const getData = () => {
        get("/api/productWithCategory", "http://localhost:3000")
            .then((response) => {
                console.log(response);
                setProducts(response.products);
                setFilteredProducts(response.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleEdit = (product) => {
        setProductData(product);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleSaveProduct = (newProduct) => {
        getData();
    };

    const filterTableData = (searchText) => {
        if (searchText === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(filteredProducts.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase())));
        }
    }

    return (
        <div className='p-6 bg-gray-50'>
            <div className='text-4xl font-bold text-gray-900 pb-6'>
                Product List
            </div>
            {/* Search and Add New Product Button */}
            <div className="mb-6 flex justify-between">
                <div>
                    <Input
                        type="text"
                        label="Search products"
                        onChange={(e) => filterTableData(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => {
                        setIsEdit(false);
                        setIsModalOpen(true);
                    }}

                >
                    Add New Product
                </Button>
            </div>

            {/* Products Table */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-3 text-left">Sr No</th>
                        <th className="border p-3 text-left">Product Name</th>
                        <th className="border p-3 text-left">Category Name</th>
                        <th className="border p-3 text-left">Attribute 1 (Key: Value)</th>
                        <th className="border p-3 text-left">Attribute 2 (Key: Value)</th>
                        <th className="border p-3 text-left">Attribute 3 (Key: Value)</th>
                        <th className="border p-3 text-left">Attribute 4 (Key: Value)</th>
                        <th className="border p-3 text-left">Description</th>
                        <th className="border p-3 text-left">Status</th>
                        <th className="border p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-100 transition-all">
                            <td className="border p-3">{index + 1}</td>
                            <th className="border p-3 text-left">{product.name}</th>
                            <td className="border p-3">{product.categoryName}</td>
                            <td className="border p-3">
                                {/* Displaying key: value for Attribute 1 */}
                                <div><strong>{product.attributes.attribute1.key}:</strong> {product.attributes.attribute1.value}</div>
                            </td>
                            <td className="border p-3">
                                {/* Displaying key: value for Attribute 2 */}
                                <div><strong>{product.attributes.attribute2.key}:</strong> {product.attributes.attribute2.value}</div>
                            </td>
                            <td className="border p-3">
                                {/* Displaying key: value for Attribute 3 */}
                                <div><strong>{product.attributes.attribute3.key}:</strong> {product.attributes.attribute3.value}</div>
                            </td>
                            <td className="border p-3">
                                {/* Displaying key: value for Attribute 4 */}
                                <div><strong>{product.attributes.attribute4.key}:</strong> {product.attributes.attribute4.value}</div>
                            </td>
                            <td className="border p-3">{product.description}</td>
                            <td className="border p-3">{product.status}</td>
                            <td className="border p-3">
                                <Button
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </Button>
                                {/* <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                >
                  Delete
                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Add/Edit Product */}
            {isModalOpen && (
                <AddNewProductModal
                    closeModal={() => setIsModalOpen(false)}
                    productData={productData}
                    isEdit={isEdit}
                    saveProduct={handleSaveProduct}
                />
            )}
        </div>
    );
};

export default Product;
