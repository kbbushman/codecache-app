import React from 'react';
import { Select } from 'semantic-ui-react';

const SelectLanguage = ({ handleChange }) => {

  const selectOptions = [
    {key: 'bash', text: 'Bash', value: 'bash'},
    {key: 'basic', text: 'Basic', value: 'basic'},
    {key: 'c', text: 'C', value: 'c'},
    {key: 'csharp', text: 'C#', value: 'csharp'},
    {key: 'cpp', text: 'C++', value: 'cpp'},
    {key: 'coffeescript', text: 'CoffeeScript', value: 'coffeescript'},
    {key: 'clojure', text: 'Clojure', value: 'clojure'},
    {key: 'dart', text: 'Dart', value: 'dart'},
    {key: 'django', text: 'Django', value: 'django'},
    {key: 'docker', text: 'Docker', value: 'docker'},
    {key: 'git', text: 'Git', value: 'git'},
    {key: 'go', text: 'Go', value: 'go'},
    {key: 'graphql', text: 'GraphQL', value: 'graphql'},
    {key: 'haml', text: 'Haml', value: 'haml'},
    {key: 'haskell', text: 'Haskell', value: 'haskell'},
    {key: 'html', text: 'HTML', value: 'html'},
    {key: 'java', text: 'Java', value: 'java'},
    {key: 'javascript', text: 'JavaScript', value: 'javascript'},
    {key: 'jsx', text: 'JSX (React)', value: 'jsx'},
    {key: 'json', text: 'JSON', value: 'json'},
    {key: 'kotlin', text: 'Kotlin', value: 'kotlin'},
    {key: 'less', text: 'LESS', value: 'less'},
    {key: 'lisp', text: 'Lisp', value: 'lisp'},
    {key: 'lua', text: 'lua', value: 'lua'},
    {key: 'markdown', text: 'MarkDown', value: 'markdown'},
    {key: 'nginx', text: 'Nginx', value: 'nginx'},
    {key: 'pascal', text: 'Pascal', value: 'pascal'},
    {key: 'perl', text: 'Perl', value: 'perl'},
    {key: 'pug', text: 'PUG', value: 'pug'},
    {key: 'python', text: 'Python', value: 'python'},
    {key: 'r', text: 'R', value: 'r'},
    {key: 'ruby', text: 'Ruby', value: 'ruby'},
    {key: 'rust', text: 'Rust', value: 'rust'},
    {key: 'sass', text: 'SASS', value: 'sass'},
    {key: 'scss', text: 'SCSS', value: 'scss'},
    {key: 'swift', text: 'Swift', value: 'swift'},
    {key: 'typescript', text: 'TypeScript', value: 'typescript'},
    {key: 'vim', text: 'VIM', value: 'vim'},
    {key: 'vb', text: 'Visual Basic', value: 'vb'},
    {key: 'wasm', text: 'Web Assembly', value: 'wasm'},
    {key: 'yaml', text: 'YAML', value: 'yaml'},
  ];

  const inputStyle = {
    minWidth: '30%',
    background: 'hsla(360, 100% , 100%, .15)',
    fontSize: '18px',
    lineHeight: 1.6,
    color: 'whitesmoke',
  };

  return (
    <Select
      compact
      style={inputStyle}
      options={selectOptions}
      placeholder='Select Syntax'
      onChange={handleChange}
    />
  )
};

export default SelectLanguage;
