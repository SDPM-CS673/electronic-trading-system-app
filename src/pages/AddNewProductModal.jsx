import React, { useState, useEffect } from 'react';
import { post, get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";
import { showMessage } from '../services/message.service';

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
                setCategoryId(response.categories[0].id);
                console.log('Categories:', response.categories);
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
                productName: productName.trim(),
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
                    showMessage(response.message, 'success');
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                    showMessage(error, 'error');
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
            post('/api/products', product, 'http://localhost:3000')
                .then((response) => {
                    console.log(response);
                    saveProduct(product);
                    showMessage(response.message, 'success');
                    closeModal();
                })
                .catch((error) => {
                    console.log(error);
                    showMessage(error, 'error');
                });
        }
    };

    const handleReset = () => {
        if (isEdit) {
            setDescription(isEdit ? productData.description : '');
            setStatus('Active');
        } else {
            setProductName('');
            setDescription('');
            setCategory('');
            setCategoryId('');
            setAttribute1Value('');
            setAttribute2Value('');
            setAttribute3Value('');
            setAttribute4Value('');
            setStatus('Active');
        }

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
                        <Input
                            id="productName"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}

                            label="Enter product name"
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <Select
                            id="category"
                            label='Category'
                            value={category}
                            disabled={isEdit}
                        >
                            {categoriesList.map((cat) => (
                                <Option onClick={() => {
                                    setAttribute1Key(cat.attributes.attribute1);
                                    setAttribute2Key(cat.attributes.attribute2);
                                    setAttribute3Key(cat.attributes.attribute3);
                                    setAttribute4Key(cat.attributes.attribute4);
                                    // setCategoryId(selectedCategory.id);

                                }} key={cat.id} value={cat.categoryName}>
                                    {cat.categoryName}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Attribute Fields */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <div>
                        <Input
                            id="attribute1Value"
                            type="text"
                            value={attribute1Value}
                            onChange={(e) => setAttribute1Value(e.target.value)}
                            label={attribute1Key}
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <Input
                            id="attribute2Value"
                            type="text"
                            value={attribute2Value}
                            onChange={(e) => setAttribute2Value(e.target.value)}
                            label={attribute2Key}
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <Input
                            id="attribute3Value"
                            type="text"
                            value={attribute3Value}
                            onChange={(e) => setAttribute3Value(e.target.value)}
                            label={attribute3Key}
                            disabled={isEdit}
                        />
                    </div>

                    <div>
                        <Input
                            id="attribute4Value"
                            type="text"
                            value={attribute4Value}
                            onChange={(e) => setAttribute4Value(e.target.value)}
                            label={attribute4Key}
                            disabled={isEdit}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className='mt-6'>
                    <Input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label="Enter product description"
                    />
                </div>

                {/* Status */}
                <div className='mt-6'>
                    <Select
                        id="status"
                        label='Status'
                        value={status}
                        onChange={(e) => setStatus(e)}
                    >
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>

                <div className="mt-6 flex justify-between border-t pt-4 space-x-4">
                    <Button
                        onClick={closeModal}

                    >
                        Close
                    </Button>
                    <div className='flex gap-4'>
                        <Button
                            onClick={handleReset}

                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleSave}

                        >
                            {isEdit ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProductModal;
