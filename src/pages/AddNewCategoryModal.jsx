import React, { useState, useEffect } from 'react';

const AddNewCategoryModal = ({ closeModal, categoryData, isEdit, saveCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [attributes, setAttributes] = useState({
    attribute1: '',
    attribute2: '',
    attribute3: '',
    attribute4: '',
    attribute5: '',
    attribute6: '',
  });
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (isEdit && categoryData) {
      setCategoryName(categoryData.categoryName);
      setAttributes(categoryData.attributes);
      setStatus(categoryData.status);
    }
  }, [isEdit, categoryData]);

  const handleSave = () => {
    const newCategory = { id: categoryData ? categoryData.id : Date.now(), categoryName, attributes, status };
    saveCategory(newCategory);
    closeModal();
  };

  const handleReset = () => {
    setCategoryName('');
    setAttributes({
      attribute1: '',
      attribute2: '',
      attribute3: '',
      attribute4: '',
      attribute5: '',
      attribute6: '',
    });
    setStatus('Active');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white opacity-100  rounded-lg p-8 w-128 shadow-lg">
        <div className="border-b pb-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{isEdit ? 'Edit Category' : 'Add New Category'}</h3>
        </div>

        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {Object.keys(attributes).map((key, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{`Attribute ${index + 1}`}</label>
              <input
                type="text"
                value={attributes[key]}
                onChange={(e) => setAttributes({ ...attributes, [key]: e.target.value })}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter Attribute ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
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

export default AddNewCategoryModal;
