import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight } from 'reprism';
import {
  Container,
  Grid,
  Header,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';
import SelectLanguage from '../components/NewSnippet/SelectLanguage';
import SelectCategory from '../components/NewSnippet/SelectCategory';
import '../components/NewSnippet/LanguageSupport';

import './Snippet.css';

const inputStyle = {
  background: 'hsla(360, 100% , 100%, .15)',
  color: 'whitesmoke',
};

const NewSnippet = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [snippet, setSnippet] = useState({
    title: '',
    body: '',
    category: '',
    language: 'javascript',
    isSaved: false,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setCategories(res.categories);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setSnippet({...snippet, title: event.target.value});
  };

  const handleSaveSnippet = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/snippets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(snippet),
    })
      .then((stream) => stream.json())
      .then((res) => {
        console.log(res);
        setSnippet({...snippet, isSaved: true});
        setTimeout(() =>  history.push('/dashboard'), 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    history.push('/dashboard');
  };

  const handleLanguageChange = (event, result) => {
    setSnippet({...snippet, language: result.value});
  };

  const handleCategoryChange = (event, result) => {
    setSnippet({...snippet, category: result.value});
  };

  const handleAddCategory = (newCategory) => {
    console.log('New Category = ', newCategory)
    fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({name: newCategory}),
    })
      .then((stream) => stream.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setCategories([...categories, res.category]);
        }
      })
      .catch((err) => console.log(err));
  };

  const showSaveButton = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon
        name={snippet.isSaved ? 'check' : 'save outline'}
        color='green'
        style={{fontSize: 28, float: 'right', cursor: snippet.isSaved ? 'default' : 'pointer'}}
        onClick={handleSaveSnippet}
      />
      <Icon
        name='times'
        color='grey'
        style={{fontSize: 28, marginRight: '10px', float: 'right', cursor: 'pointer'}}
        onClick={handleCancel}
      />
    </Grid.Column>
  );

  return (
    <Container>
      <Grid centered columns={1} padded>
        <Grid.Column style={{maxWidth: 780}}>
          <Header as='h2' color='yellow'>New Snippet</Header>
        </Grid.Column>
        <Grid.Column style={{maxWidth: 780}}>
          <Form size='huge'>
            <Form.Field>
              <Input placeholder='Title' value={snippet.title} onChange={handleChange}>
                <input style={inputStyle} />
                <SelectLanguage handleChange={handleLanguageChange} />
              </Input>
            </Form.Field>
            <SelectCategory
              categories={categories}
              handleChange={handleCategoryChange}
              handleAddCategory={handleAddCategory}
            />
          </Form>
        </Grid.Column>
        <Grid.Column style={{maxWidth: 780}}>
          <Editor
            value={snippet.body}
            onValueChange={(code) => setSnippet({...snippet, body: code})}
            highlight={(code) => highlight(code, snippet.language)}
            padding={30}
            style={{
              // fontFamily: '"Fira code", "Fira Mono", monospace',
              minHeight: 100,
              fontFamily: 'monospace',
              fontSize: 15,
              border: '2px solid hsla(360, 100% , 100%, .15)',
              backgroundColor: 'hsla(360, 100% , 100%, .05)',
              color: 'lightblue',
            }}
          />
        </Grid.Column>
        {showSaveButton()}
      </Grid>
    </Container>
  )
};

export default withRouter(NewSnippet);
