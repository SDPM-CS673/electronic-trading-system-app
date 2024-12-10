import React, { useState, useEffect } from 'react';
import { post, get } from "../services/api-call.service";

const AddNewProductModal = ({ closeModal, productData, isEdit, saveProduct, categories }) => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [attribute1Key, setAttribute1Key] = useState('');
    const [attribute1Value, setAttribute1Value] = useState('');
    const [attribute2Key, setAttribute2Key] = useState('');
    const [attribute2Value, setAttribute2Value] = useState('');
    const [attribute3Key, setAttribute3Key] = useState('');
    const [attribute3Value, setAttribute3Value] = useState('');
    const [attribute4Key, setAttribute4Key] = useState('');
    const [attribute4Value, setAttribute4Value] = useState('');
    const [status, setStatus] = useState('Active');
    const [categoriesList, setCategories] = useState([]);

    useEffect(() => { getData() }, [])


    useEffect(() => {
        console.log('Product Data:', productData);
        if (isEdit && productData) {
            setProductId(productData.id);
            setProductName(productData.name);
            setDescription(productData.description);
            setCategory(productData.categoryName);
            setCategoryId(productData.categoryId);
            setAttribute1Key(productData.attributes.attribute1.key);
            setAttribute1Value(productData.attributes.attribute1.value);
            setAttribute2Key(productData.attributes.attribute2.key);
            setAttribute2Value(productData.attributes.attribute2.value);
            setAttribute3Key(productData.attributes.attribute3.key);
            setAttribute3Value(productData.attributes.attribute3.value);
            setAttribute4Key(productData.attributes.attribute4.key);
            setAttribute4Value(productData.attributes.attribute4.value);
            setStatus(productData.status);
        }
    }, [isEdit, productData]);


    const getData = () => {
        get("/api/allCategories", "http://localhost:3000")
            .then((response) => {
                console.log(response);
                setCategories(response.categories);
                if (!category && !productName) {
                    setAttribute1Key(response.categories[0].attributes.attribute1 || 'Key 1');
                    setAttribute2Key(response.categories[0].attributes.attribute2 || 'Key 2');
                    setAttribute3Key(response.categories[0].attributes.attribute3 || 'Key 3');
                    setAttribute4Key(response.categories[0].attributes.attribute4 || 'Key 4');
                    setCategoryId(response.categories[0].id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleSave = () => {
        const statusPayload = status === 'Active' ? 'A' : 'I';

        if (isEdit) {
            const product = {
                category: categoryId.trim(),
                productName: productName.trim().toLowerCase(),
                description: description.trim(),
                attribute1Value: attribute1Value.trim(),
                attribute2Value: attribute2Value.trim(),
                attribute3Value: attribute3Value.trim(),
                attribute4Value: attribute4Value.trim(),
                status: statusPayload,
            };
            console.log('Edit Product', product);
            post('/api/product/' + productId, product, 'http://localhost:3000')
                .then((response) => {
                    console.log(response);
                    saveProduct(product);
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            const product = {
                category: categoryId.trim(),
                productName: productName.trim().toLowerCase(),
                description: description.trim(),
                attribute1: attribute1Value.trim(),
                attribute2: attribute2Value.trim(),
                attribute3: attribute3Value.trim(),
                attribute4: attribute4Value.trim(),
                status: statusPayload,
            };
            console.log('Save Product', product);
            post('/api/products', product,'http://localhost:3000')
                .then((response) => {
                    console.log(response);
                    saveProduct(product);
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleReset = () => {
        setProductName(isEdit ? productData.name : '');
        setDescription(isEdit ? productData.description : '');
        setCategory(isEdit ? productData.category : '');
        setAttribute1Value(isEdit ? productData.attribute1Value : '');
        setAttribute2Value(isEdit ? productData.attribute2Value : '');
        setAttribute3Value(isEdit ? productData.attribute3Value : '');
        setAttribute4Value(isEdit ? productData.attribute4Value : '');
        setStatus('Active');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white opacity-100 rounded-lg p-8 w-128 shadow-lg">
                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h3>
                </div>

                {/* Product Name and Category */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Product Name*
                        </label>
                        <input
                            id="productName"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category*
                        </label>
                        <select
                            id="category"
                            value={category}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                const selectedCategory = categoriesList.find(cat => cat.categoryName === e.target.value);
                                setCategoryId(selectedCategory.id);
                                if (selectedCategory) {
                                    setAttribute1Key(selectedCategory.attributes.attribute1 || 'Key 1');
                                    setAttribute2Key(selectedCategory.attributes.attribute2 || 'Key 2');
                                    setAttribute3Key(selectedCategory.attributes.attribute3 || 'Key 3');
                                    setAttribute4Key(selectedCategory.attributes.attribute4 || 'Key 4');
                                    setCategoryId(selectedCategory.id);
                                }
                            }}
                            disabled={isEdit}
                        >
                            {categoriesList.map((cat) => (
                                <option key={cat.id} value={cat.categoryName}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Attribute Fields */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <div>
                        <label htmlFor="attribute1Value" className="block text-sm font-medium text-gray-700">
                            {attribute1Key}
                        </label>
                        <input
                            id="attribute1Value"
                            type="text"
                            value={attribute1Value}
                            onChange={(e) => setAttribute1Value(e.target.value)}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter attribute 1 value"
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <label htmlFor="attribute2Value" className="block text-sm font-medium text-gray-700">
                            {attribute2Key}
                        </label>
                        <input
                            id="attribute2Value"
                            type="text"
                            value={attribute2Value}
                            onChange={(e) => setAttribute2Value(e.target.value)}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter attribute 2 value"
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <label htmlFor="attribute3Value" className="block text-sm font-medium text-gray-700">
                            {attribute3Key}
                        </label>
                        <input
                            id="attribute3Value"
                            type="text"
                            value={attribute3Value}
                            onChange={(e) => setAttribute3Value(e.target.value)}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter attribute 3 value"
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <label htmlFor="attribute4Value" className="block text-sm font-medium text-gray-700">
                            {attribute4Key}
                        </label>
                        <input
                            id="attribute4Value"
                            type="text"
                            value={attribute4Value}
                            onChange={(e) => setAttribute4Value(e.target.value)}
                            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter attribute 4 value"
                            disabled={isEdit}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mt-6 text-gray-700">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                    />
                </div>

                {/* Status */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium mt-6 text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="mt-6 flex justify-between border-t pt-4 space-x-4">
                    <button
                        onClick={closeModal}
                        className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all"
                    >
                        Close
                    </button>
                    <div className='flex gap-4'>
                        <button
                            onClick={handleReset}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-all"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
                        >
                            {isEdit ? 'Update' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProductModal;
