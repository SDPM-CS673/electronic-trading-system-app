import React, { useState, useEffect } from 'react';
import { post, get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";
import { showMessage } from '../services/message.service';

const AddNewCategoryModal = ({ closeModal, categoryData, isEdit, saveCategory }) => {
  const [categoryId, setCategoryId] = useState('');
  const [discription, setdescription] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [attributes, setAttributes] = useState({
    attribute1: '',
    attribute2: '',
    attribute3: '',
    attribute4: '',
  });
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (isEdit && categoryData) {
      setCategoryId(categoryData.id);
      setCategoryName(categoryData.categoryName);
      setAttributes(categoryData.attributes);
      setStatus(categoryData.status);
      setdescription(categoryData.description);
    }
  }, [isEdit, categoryData]);

  const handleSave = () => {
    const statusPayload = status === 'Active' ? 'A' : 'I';
    if (isEdit) {
      const category = { id: categoryData.id, name: categoryName.trim(), discription: discription.trim(), attribute1: attributes.attribute1.trim(), attribute2: attributes.attribute2.trim(), attribute3: attributes.attribute3.trim(), attribute4: attributes.attribute4.trim(), status: statusPayload };
      console.log('Edit Category', category);
      post('/api/category/' + categoryData.id, category, 'http://localhost:3000')
        .then((response) => {
          console.log(response);
          saveCategory(category);
          showMessage(response.message, 'success')
          closeModal();
        })
        .catch((error) => {
          console.log(error);
          showMessage(error, 'error')
        });
    } else {

      const category = { name: categoryName.trim().toLowerCase(), discription: discription.trim(), attribute1: attributes.attribute1.trim(), attribute2: attributes.attribute2.trim(), attribute3: attributes.attribute3.trim(), attribute4: attributes.attribute4.trim(), status: statusPayload };
      console.log('Save Category', category);
      post('/api/categories', category, 'http://localhost:3000')
        .then((response) => {
          console.log(response);
          saveCategory(category);
          showMessage(response.message, 'success')
          closeModal();
        })
        .catch((error) => {
          showMessage(error, 'error')
          console.log(error);
        });
    }

  };




  const handleReset = () => {
    if (isEdit) {
      setStatus('Active');
      setdescription(categoryData.description || '');
    } else {
      setCategoryName('');
      setAttributes({
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
      });
      setStatus('Active');
      setdescription('');
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white opacity-100  rounded-lg p-8 w-128 shadow-lg">
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{isEdit ? 'Edit Category' : 'Add New Category'}</h3>
        </div>

        <div>
          <Input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            label="Enter category name"
            disabled={isEdit}
          />
        </div>

        <div className="grid grid-cols-4 gap-6 mt-6">
          {Object.keys(attributes).map((key, index) => (
            <div key={index} className="space-y-2">
              <Input
                type="text"
                value={attributes[key]}
                onChange={(e) => setAttributes({ ...attributes, [key]: e.target.value })}
                label={`Enter Attribute ${index + 1}`}
                disabled={isEdit}
              />
            </div>
          ))}
        </div>

        <div className='mt-4'>

          <Input
            id="description"
            type="text"
            value={discription}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full p-3"
            label="Enter description"
          />
        </div>


        <div className="mt-6">
          <Select
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

export default AddNewCategoryModal;
