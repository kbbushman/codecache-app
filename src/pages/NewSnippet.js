import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs/prism';
import {
  Container,
  Grid,
  Header,
  Form,
  Input,
  Icon,
} from 'semantic-ui-react';

import './Snippet.css';

const NewSnippet = ({ history }) => {
  const [snippet, setSnippet] = useState({
    title: '',
    body: '',
    language: 'javascript',
    isSaved: false,
  });

  const handleChange = (event) => {
    setSnippet({...snippet, title: event.target.value})
  };

  const handleSave = () => {
    // Update Save Success
    setSnippet({...snippet, isSaved: true});
    setTimeout(() => {
      history.push('/dashboard');
    }, 2000)
  };

  const showSaveButton = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon
        name={snippet.isSaved ? 'check' : 'save'}
        color='green'
        floated='right'
        style={{fontSize: 36, float: 'right', cursor: snippet.isSaved ? 'default' : 'pointer'}}
        onClick={handleSave}
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
                <input style={{background: 'hsla(360, 100% , 100%, .15)', color: 'whitesmoke'}} />
              </Input>
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column style={{maxWidth: 780}}>
          <Editor
            value={snippet.body}
            onValueChange={(code) => setSnippet({...snippet, body: code})}
            highlight={(code) => Prism.highlight(code, Prism.languages[snippet.language], `${snippet.language}`)}
            padding={30}
            style={{
              // fontFamily: '"Fira code", "Fira Mono", monospace',
              minHeight: 400,
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
