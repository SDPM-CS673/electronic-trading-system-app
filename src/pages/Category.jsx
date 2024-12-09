import React, { useState, useEffect } from 'react';
import AddNewCategoryModal from './AddNewCategoryModal'; // Import the modal component

const Category = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      categoryName: 'Category 1',
      attributes: { attribute1: 'Value 1', attribute2: 'Value 2', attribute3: 'Value 3', attribute4: 'Value 4', attribute5: 'Value 5', attribute6: 'Value 6' },
      status: 'Active',
    },
    {
      id: 2,
      categoryName: 'Category 2',
      attributes: { attribute1: 'Value A', attribute2: 'Value B', attribute3: 'Value C', attribute4: 'Value D', attribute5: 'Value E', attribute6: 'Value F' },
      status: 'Inactive',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState(null); // For holding data when editing
  const [isEdit, setIsEdit] = useState(false); // Track if we are editing a category

  const handleEdit = (category) => {
    setCategoryData(category);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSaveCategory = (newCategory) => {
    if (isEdit) {
      // Update the existing category
      setCategories(categories.map((category) =>
        category.id === newCategory.id ? newCategory : category
      ));
    } else {
      // Create new category
      setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
    }
  };

  return (
    <div className='p-4'>
      <div className='bold text-4xl pb-4'>
        Category List
      </div>
      {/* Search and Add New Category Button */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search categories"
          className="p-2 border rounded-md w-1/3"
        />
        <button
          onClick={() => {
            setIsEdit(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Sr No</th>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Attribute 1</th>
            <th className="border p-2">Attribute 2</th>
            <th className="border p-2">Attribute 3</th>
            <th className="border p-2">Attribute 4</th>
            <th className="border p-2">Attribute 5</th>
            <th className="border p-2">Attribute 6</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{category.categoryName}</td>
              <td className="border p-2">{category.attributes.attribute1}</td>
              <td className="border p-2">{category.attributes.attribute2}</td>
              <td className="border p-2">{category.attributes.attribute3}</td>
              <td className="border p-2">{category.attributes.attribute4}</td>
              <td className="border p-2">{category.attributes.attribute5}</td>
              <td className="border p-2">{category.attributes.attribute6}</td>
              <td className="border p-2">{category.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Category */}
      {isModalOpen && (
        <AddNewCategoryModal
          closeModal={() => setIsModalOpen(false)}
          categoryData={categoryData}
          isEdit={isEdit}
          saveCategory={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default Category;
