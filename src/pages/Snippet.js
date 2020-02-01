import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs/prism';
import {
  Container,
  Grid,
  Header,
  Button,
  Icon,
} from 'semantic-ui-react';

// import "prismjs/themes/prism-twilight.css";
import './Snippet.css';

const Snippet = ({ match }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [snippetBackup, setSnippetBackup] = useState({});
  const [snippet, setSnippet] = useState({
    _id: 22,
    title: 'Some Snippet',
    body: `class App extends Component {\n  state = {\n    users: [],\n  };\n}\n\nconst person = {\n  firstName: 'John',\n  lastName: 'Doe',\n  age: 22,\n  active: false,\n};`,
    slug: 'some-snippet',
    language: 'javascript'
  });

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
    setSnippetBackup(JSON.parse(JSON.stringify(snippet)));
  };

  const handleSubmit = () => {
    console.log('submit');
    setIsReadOnly(!isReadOnly);
  };

  const handleCancel = () => {
    setIsReadOnly(!isReadOnly);
    setSnippet(snippetBackup);
  }

  const handleDeleteClick = () => {
    const deleteConfirmed = window.confirm(`Are you sure you want to delete ${snippet.title}?`);
    if (deleteConfirmed) {
      console.log('DELETE...');
    }
  }

  const showEditDeleteButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Button onClick={handleEditClick} basic compact color='blue' floated='right'>Edit</Button>
      <Button onClick={handleDeleteClick} basic compact color='red' floated='right' style={{marginRight: 10}}>Delete</Button>
    </Grid.Column>
  );

  const showSaveCancelButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Button onClick={handleSubmit} basic compact positive floated='right'>Save</Button>
      <Button onClick={handleCancel} basic compact color='grey' floated='right' style={{marginRight: 10}}>Cancel</Button>
    </Grid.Column>
  );

  return (
    <Container>
      <Grid centered columns={1} padded stackable>
        <Grid.Column style={{maxWidth: 780}}>
          <Header as='h1' style={{color: '#fbbd08', marginBottom: 20}}>
            {match.params.snippet.toUpperCase()} {!isReadOnly && <Icon name='edit' style={{fontSize: 20, position: 'relative', left: 10, bottom: 10}} />}
          </Header>
          <Editor
            value={snippet.body}
            onValueChange={code => setSnippet({...snippet, body: code})}
            highlight={code => Prism.highlight(code, Prism.languages[snippet.language], `${snippet.language}`)}
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
    </Container>
  )
};

export default withRouter(Snippet);
