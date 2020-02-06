import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs/prism';
import {
  Container,
  Grid,
  Header,
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
    category: 'JavaScript',
    language: 'javascript',
  });

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
    setSnippetBackup(JSON.parse(JSON.stringify(snippet)));
  };

  const handleSubmit = () => {
    console.log(snippet);
    setIsReadOnly(!isReadOnly);
  };

  const handleCancel = () => {
    setIsReadOnly(!isReadOnly);
    setSnippet(snippetBackup);
  };

  const handleDeleteClick = () => {
    const deleteConfirmed = window.confirm(`Are you sure you want to delete ${snippet.title}?`);
    if (deleteConfirmed) {
      console.log('DELETE...');
    }
  };

  const showEditDeleteButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon name='edit outline' color='blue' style={{fontSize: 24, float: 'right', cursor: 'pointer'}} onClick={handleEditClick} />
      <Icon name='trash alternate outline' color='red' style={{fontSize: 24, marginRight: '15px', float: 'right', cursor: 'pointer'}} onClick={handleDeleteClick} />
    </Grid.Column>
  );

  const showSaveCancelButtons = () => (
    <Grid.Column style={{maxWidth: 780}}>
      <Icon name='save outline' color='green' style={{fontSize: 28, float: 'right', cursor: 'pointer'}} onClick={handleSubmit} />
      <Icon name='cancel' color='grey' style={{fontSize: 26, marginRight: '10px', float: 'right', cursor: 'pointer'}} onClick={handleCancel} />
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
