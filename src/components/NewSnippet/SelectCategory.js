import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

const categoryOptions = [
  { key: 'bash', text: 'Bash', value: 'bash' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'c', text: 'C', value: 'c' },
  { key: 'csharp', text: 'C#', value: 'csharp' },
  { key: 'cplusplus', text: 'C++', value: 'cplusplus' },
  { key: 'dart', text: 'Dart', value: 'dart' },
  { key: 'django', text: 'Django', value: 'django' },
  { key: 'docker', text: 'Docker', value: 'docker' },
  { key: 'git', text: 'Git', value: 'git' },
  { key: 'go', text: 'Go', value: 'go' },
  { key: 'graphql', text: 'GraphQL', value: 'graphql' },
  { key: 'java', text: 'Java', value: 'java' },
  { key: 'javascript', text: 'JavaScript', value: 'javascript' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'python', text: 'Python', value: 'python' },
];

const inputStyle = {
  background: 'hsla(360, 100% , 100%, .15)',
  fontSize: '18px',
  color: 'whitesmoke',
};

const SelectCategory = ({ handleChange }) => {
  const handleAddItem = (event, result) => {
    const { value } = result;
    console.log(result.value);
    categoryOptions.push(
      {
        key: value.toLowerCase(),
        text: value,
        value: value,
      }
    );
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
    />  
  )
};

export default SelectCategory;
