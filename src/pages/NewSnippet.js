import React, { useState } from 'react';
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
// import "prismjs/themes/prism-twilight.css";

const inputStyle = {
  background: 'hsla(360, 100% , 100%, .15)',
  color: 'whitesmoke',
};

const NewSnippet = ({ history }) => {
  const [snippet, setSnippet] = useState({
    title: '',
    body: '',
    category: '',
    language: 'javascript',
    isSaved: false,
  });

  const handleChange = (event) => {
    setSnippet({...snippet, title: event.target.value});
  };

  const handleSaveSnippet = () => {
    setSnippet({...snippet, isSaved: true});
    setTimeout(() =>  history.push('/dashboard'), 2000);
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

  const handleAddCategory = (event) => {
    setSnippet({...snippet, category: event.target.value});
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

  console.log(snippet);

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
