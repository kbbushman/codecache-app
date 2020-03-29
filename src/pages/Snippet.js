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
  Dimmer,
  Loader,
  Modal,
  Message,
  Button,
  Icon,
} from 'semantic-ui-react';
import SelectLanguage from '../components/NewSnippet/SelectLanguage';
import SelectCategory from '../components/NewSnippet/SelectCategory';
import '../components/NewSnippet/LanguageSupport';

import './Snippet.css';
// import "prismjs/themes/prism-twilight.css";


const Snippet = ({ match, history }) => {
  const [errors, setErrors] = useState({messageList: []});
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [snippetBackup, setSnippetBackup] = useState({});
  const [snippet, setSnippet] = useState({
    title: '',
    language: 'javascript',
    body: '',
    slug: '',
    category: '',
    user: '',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/snippets/${match.params.snippet}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          setSnippet(res.snippet);
        }
      })
      .catch((err) => {
        setErrors({messageList: ['Please verify your internet connenction and try again']})
      });
  }, [match]);

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
    setSnippetBackup(JSON.parse(JSON.stringify(snippet)));
    getCategories();
  };

  const handleTitleChange = (event) => {
    setSnippet({...snippet, title: event.target.value});
  };

  const handleLanguageChange = (event, result) => {
    setSnippet({...snippet, language: result.value});
  };

  const handleCategoryChange = (event, result) => {
    setSnippet({...snippet, category: result.value});
  };

  const handleCancel = () => {
    setIsReadOnly(!isReadOnly);
    setSnippet(snippetBackup);
  };

  const getCategories = () => {
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
          setSnippet({...snippet, category: res.category._id});
        }
      })
      .catch((err) => {
        setErrors({messageList: ['Please verify your internet connenction and try again']})
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setIsReadOnly(!isReadOnly);
    fetch(`${process.env.REACT_APP_BASE_URL}/snippets/${snippet.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(snippet),
    })
      .then((stream) => stream.json())
      .then((res) => {
        setIsLoading(false);
        setSnippet(res.snippet);
      })
      .catch((err) => {
        setErrors({messageList: [err.toString() || 'Sometthing went wrong. Please verify your internet connenction and try again']});
      });
  };

  const handleDeleteClick = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/snippets/${snippet._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        // setIsLoading(false);
        setIsDeleteMode(false);
        setTimeout(() => history.push('/dashboard'), 200);
      })
      .catch((err) => {
        setErrors({messageList: [err.toString() || 'Sometthing went wrong. Please verify your internet connenction and try again']});
      });
  };

  const showEditDeleteButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon name='edit outline' color='blue' style={{fontSize: 24, float: 'right', cursor: 'pointer'}} onClick={handleEditClick} />
      <Icon name='trash alternate outline' color='red' style={{fontSize: 24, marginRight: '15px', float: 'right', cursor: 'pointer'}} onClick={() => setIsDeleteMode(true)} />
    </Grid.Column>
  );

  const showSaveCancelButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon name='save outline' color='green' style={{fontSize: 28, float: 'right', cursor: 'pointer'}} onClick={handleSubmit} />
      <Icon name='cancel' color='grey' style={{fontSize: 26, marginRight: '10px', float: 'right', cursor: 'pointer'}} onClick={handleCancel} />
    </Grid.Column>
  );

  return (
    <>
      <Container>
        {isLoading 
          ? <Dimmer active>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
          : <Grid centered columns={1} padded stackable>
              <Grid.Column style={{maxWidth: 780}}>
                {isReadOnly
                  ? <Header as='h1' style={{color: '#fbbd08', marginBottom: 20}}>
                      {snippet.title} {!isReadOnly && <Icon name='edit' style={{fontSize: 20, position: 'relative', left: 10, bottom: 10}} />}
                    </Header>
                  : <Form size='huge' style={{marginBottom: 20}}>
                      <Form.Field>
                        <Input placeholder='Title' value={snippet.title} onChange={handleTitleChange}>
                          <input />
                          <SelectLanguage handleChange={handleLanguageChange} language={snippet.language} />
                        </Input>
                      </Form.Field>
                      <SelectCategory
                        categories={categories}
                        handleChange={handleCategoryChange}
                        handleAddCategory={handleAddCategory}
                        categoryId={snippet.category}
                      />
                    </Form>
                }
                <Editor
                  value={snippet.body}
                  onValueChange={code => setSnippet({...snippet, body: code})}
                  highlight={code => highlight(code, snippet.language)}
                  padding={30}
                  style={{
                    // fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontFamily: 'monospace',
                    fontSize: 15,
                    border: isReadOnly ? '2px solid hsla(360, 100% , 100%, .15)' : '2px solid #2185d0',
                    backgroundColor: 'hsla(360, 100% , 100%, .05)',
                    color: 'lightblue',
                  }}
                  readOnly={isReadOnly}
                />
              </Grid.Column>
              {isReadOnly ? showEditDeleteButtons() : showSaveCancelButtons()}
            </Grid>
          }
        </Container>
        <Modal open={errors.messageList.length > 0} basic size='small' >
          <Header size='large' color='red' icon='exclamation triangle' content='Oops! Something went wrong...' />
          <Modal.Content>
            <Message
              error
              list={errors.messageList}
              style={{background: 'none', color: 'white', fontSize: 18, fontWeight: 600}}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={() => setErrors({messageList: []})}>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal open={isDeleteMode} basic size='small'>
          <Header>
            <h2><Icon color="red" name='trash' style={{fontSize: 26}} /> Are you sure you want to delete this snippet?</h2>
          </Header>
          <Modal.Content></Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setIsDeleteMode(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={handleDeleteClick}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
    </>
  )
};

export default withRouter(Snippet);
