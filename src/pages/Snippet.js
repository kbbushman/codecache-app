import React, { useState, useEffect } from 'react';
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

const Snippet = ({ match, history }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
    fetch(`${process.env.REACT_APP_BASE_URL}/snippets/${match.params.snippet}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setSnippet(res.snippet);
        }
      })
      .catch((err) => console.log(err));
  }, [match]);

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
    setSnippetBackup(JSON.parse(JSON.stringify(snippet)));
  };

  const handleSubmit = () => {
    console.log(snippet);
    setIsReadOnly(!isReadOnly);
    setIsLoading(true);
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
        console.log(res);
        setIsLoading(false);
        setSnippet(res.snippet);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setIsReadOnly(!isReadOnly);
    setSnippet(snippetBackup);
  };

  const handleDeleteClick = () => {
    const deleteConfirmed = window.confirm(`Are you sure you want to delete ${snippet.title}?`);
    if (deleteConfirmed) {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_BASE_URL}/snippets/${snippet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((stream) => stream.json())
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          history.push('/dashboard');
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
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
            {snippet.title} {!isReadOnly && <Icon name='edit' style={{fontSize: 20, position: 'relative', left: 10, bottom: 10}} />}
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
