import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

const inputStyle = {
  background: 'hsla(360, 100% , 100%, .15)',
  fontSize: '18px',
  color: 'whitesmoke',
};

const SelectCategory = ({ categories, handleChange, handleAddCategory, categoryId }) => {
  let selectedCategory;
  const categoryOptions = categories.map((category) => {
    if (category._id === categoryId) {
      selectedCategory = category._id;
    }

    return {
      key: category._id,
      text: category.name,
      value: categoryId ? category._id : category.name
    }
  });

  const handleAddItem = (event, result) => {
    const { value } = result;
    handleAddCategory(value)
  };

  return (
    <Dropdown
      selection
      fluid
      search
      allowAdditions
      options={categoryOptions}
      placeholder='Filter/Add Category'
      style={inputStyle}
      onChange={handleChange}
      onAddItem={handleAddItem}
      value={selectedCategory}
    />  
  )
};

export default SelectCategory;
