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
  Message,
  Dimmer,
  Loader,
  Modal,
  Button,
  Icon,
} from 'semantic-ui-react';
import SelectLanguage from '../components/NewSnippet/SelectLanguage';
import SelectCategory from '../components/NewSnippet/SelectCategory';
import '../components/NewSnippet/LanguageSupport';

import './Snippet.css';

const NewSnippet = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({messageList: []});
  const [categories, setCategories] = useState([]);
  const [snippet, setSnippet] = useState({
    title: '',
    body: '',
    category: '',
    language: '',
    isSaved: false,
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setCategories(res.categories);
        }
      })
      .catch((err) => {
        setErrors({messageList: ['Please verify your internet connenction and try again']});
      });
  }, []);

  const handleChange = (event) => {
    setSnippet({...snippet, title: event.target.value});
  };

  const handleSaveSnippet = () => {
    const errors = {messageList: []};
    let formIsValid = true;

    for (let key in snippet) {
      if (snippet[key] === '') {
        formIsValid = false;
        errors[key] = true;
        errors.messageList.push(`${key === 'language' ? 'syntax' : key} is required`);
      }
    }

    setErrors(errors);

    if (formIsValid) {
      setIsLoading(true);
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
          setSnippet({...snippet, isSaved: true});
          setIsLoading(false);
          setTimeout(() =>  history.push('/dashboard'), 2000);
        })
        .catch((err) => {
          setErrors({messageList: ['Please verify your internet connenction and try again']});
        });
    }
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
    setIsLoading(true);
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
        if (res.status === 201) {
          setIsLoading(false);
          setCategories([...categories, res.category]);
        }
      })
      .catch((err) => {
        setErrors({messageList: ['Please verify your internet connenction and try again']});
      });
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
    <>
      {isLoading 
        ? <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        : <Container>
            <Grid centered columns={1} padded>
              <Grid.Column style={{maxWidth: 780}}>
                <Header as='h2' color='yellow'>New Snippet</Header>
              </Grid.Column>
              <Grid.Column style={{maxWidth: 780}}>
                <Form size='huge'>
                  <Form.Field>
                    <Input placeholder='Title' value={snippet.title} onChange={handleChange}>
                      <input />
                      <SelectLanguage handleChange={handleLanguageChange} />
                    </Input>
                  </Form.Field>
                  <SelectCategory
                    categories={categories}
                    handleChange={handleCategoryChange}
                    handleAddCategory={handleAddCategory}
                  />
                  <p style={{display: 'block', minHeight: 'auto', background: 'none', fontSize: 14, color: 'whitesmoke', marginTop: 15, marginBottom: 0, paddingLeft: 5}}>Click to select a category. Type to filter or add a new category</p>
                </Form>
              </Grid.Column>
              <Grid.Column style={{maxWidth: 780}}>
                <Editor
                  value={snippet.body}
                  onValueChange={(code) => setSnippet({...snippet, body: code})}
                  highlight={(code) => highlight(code, snippet.language || 'javascript')}
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
      }
      <Modal open={errors.messageList.length > 0} basic size='small'>
        <Header size='large' color='red' icon='exclamation triangle' content='Oops! Someting went wrong...' />
        <Modal.Content>
          <Message
            error
            list={errors.messageList}
            style={{background: 'none', color: 'white', fontSize: 18}}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => setErrors({messageList: []})}>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
};

export default withRouter(NewSnippet);
