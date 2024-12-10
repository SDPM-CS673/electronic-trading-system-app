import React, { useState, useEffect } from 'react';
import AddNewCategoryModal from './AddNewCategoryModal'; // Import the modal component
import { post, get } from "../services/api-call.service";

const Category = () => {


  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState(null); // For holding data when editing
  const [isEdit, setIsEdit] = useState(false); // Track if we are editing a category

  useEffect(() => { getData() }, [])

  const getData = () => {
    get("/api/allCategories", "http://localhost:3000")
      .then((response) => {
        console.log(response);
        setCategories(response.categories);
        setFilteredCategories(response.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEdit = (category) => {
    setCategoryData(category);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSaveCategory = (newCategory) => {
    getData()
  };

  const filterTableData = (searchText) => {
    if (searchText === '') {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(filteredCategories.filter(category => category.categoryName.toLowerCase().includes(searchText.toLowerCase())));
    }
  }

  return (
    <div className='p-6 bg-gray-50'>
      <div className='text-4xl font-bold text-gray-900 pb-6'>
        Category List
      </div>
      {/* Search and Add New Category Button */}
      <div className="mb-6 flex justify-between">
        <input
          type="text"
          placeholder="Search categories"
          onChange={(e) => filterTableData(e.target.value)}
          className="p-3 border rounded-md w-1/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            setIsEdit(false);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3 text-left">Sr No</th>
            <th className="border p-3 text-left">Category Name</th>
            <th className="border p-3 text-left">Attribute 1</th>
            <th className="border p-3 text-left">Attribute 2</th>
            <th className="border p-3 text-left">Attribute 3</th>
            <th className="border p-3 text-left">Attribute 4</th>
            <th className="border p-3 text-left">Description</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category, index) => (
            <tr key={category.id} className="hover:bg-gray-100 transition-all">
              <td className="border p-3">{index + 1}</td>
              <td className="border p-3">{category.categoryName}</td>
              <td className="border p-3">{category.attributes.attribute1}</td>
              <td className="border p-3">{category.attributes.attribute2}</td>
              <td className="border p-3">{category.attributes.attribute3}</td>
              <td className="border p-3">{category.attributes.attribute4}</td>
              <td className="border p-3">{category.description}</td>
              <td className="border p-3">{category.status}</td>
              <td className="border p-3">
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-yellow-600 transition-all"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                >
                  Delete
                </button> */}
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
