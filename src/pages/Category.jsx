import React, { useState, useEffect } from 'react';
import AddNewCategoryModal from './AddNewCategoryModal'; // Import the modal component
import { post, get } from "../services/api-call.service";
import { Button, Card, Dialog, Input, Option, Select, Typography } from "@material-tailwind/react";
import { showMessage } from '../services/message.service';


const Category = () => {


  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState(null); // For holding data when editing
  const [isEdit, setIsEdit] = useState(false); // Track if we are editing a category

  useEffect(() => { getData() }, [])

  const getData = () => {
    get("/api/allCategories", "team1")
      .then((response) => {
        console.log(response);
        if (response.categories) {
          setCategories(response.categories);
          setFilteredCategories(response.categories);
        } else {
          showMessage(error, 'error');
        }
      })
      .catch((error) => {
        console.log(error);
        showMessage(error, 'error')
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
        <div>
          <Input
            type="text"
            label="Search categories"
            onChange={(e) => filterTableData(e.target.value)}
          /></div>
        <Button
          onClick={() => {
            setIsEdit(false);
            setIsModalOpen(true);
          }}
        >
          Add New Category
        </Button>
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
                <Button
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </Button>
                {/* <Button
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
