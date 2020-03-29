import React from 'react';
import { Dropdown } from 'semantic-ui-react';

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
    <>
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
      <p style={{display: 'block', minHeight: 'auto', background: 'none', fontSize: 14, color: 'whitesmoke', marginTop: 15, marginBottom: 0, paddingLeft: 5}}>Click to select a category. Type to filter or add a new category</p>
    </>  
  )
};

export default SelectCategory;
