import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Message,
  Modal,
  Dimmer,
  Loader,
  Header,
  Form,
  Input,
  Divider,
  Icon,
  Button,
} from 'semantic-ui-react';

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({messageList: []});
  const [query, setQuery] = useState('');
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((stream) => stream.json())
      .then((res) => {
        console.log(res)
        setIsLoading(false);
        setFetchedCategories(res.categories);
        setCategories(res.categories);
      })
      .catch((err) => {
        console.log(err)
        setErrors({messageList: ['Please verify your internet connenction and try again']});
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const query = value.toLowerCase();

    setQuery(value);
    
    if (query.length) {
      // Deep clone array of objects for filterig snippets
      const categoriesClone = JSON.parse(JSON.stringify(fetchedCategories));
      const filteredCategories = categoriesClone.filter((category) => {
        if (category.name.toLowerCase().includes(query)) {
          return true;
        } else {
          let snippetIncludesQuery;
          category.snippets = category.snippets.filter((snippet) => {
            snippetIncludesQuery = snippet.title.toLowerCase().includes(query) || snippetIncludesQuery;
            return snippet.title.toLowerCase().includes(query);
          });
          return snippetIncludesQuery;
        }
      });
      setCategories(filteredCategories);
    } else {
      // Reset Categories
      setCategories(fetchedCategories);
    }
  };

  const showSearch = () => (
    <Grid centered columns={1} padded stackable>
      <Grid.Column style={{maxWidth: 780}}>
        <Form size='huge' style={{marginTop: 60}}>
          <Form.Field>
            <Input icon placeholder='Filter category or snippet title' value={query} onChange={handleChange}>
              <input style={{background: 'hsla(360, 100% , 100%, .15)', color: 'whitesmoke'}} />
              <Icon inverted name='search' />
            </Input>
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );

  const showSnippets = (category) => (
    category.snippets.map((snippet) => (
      <Grid.Column key={snippet._id}>
        <Link to={`/${category.slug}/${snippet.slug}`} style={{fontSize: '1.2em'}} >
          {snippet.title}
        </Link>
      </Grid.Column>
    ))
  );

  const showCategories = () => {
    return categories.length
    ? categories.map((category) => (
        <Grid key={category._id} centered columns={1} padded stackable>
          <Grid.Column style={{ maxWidth: 780, marginTop: 60}}>
            <Header as='h2' color='yellow'>{category.name}</Header>
            <Divider />
            <Grid columns={3} padded>
              {showSnippets(category)}
            </Grid>
          </Grid.Column>
        </Grid>
      ))
    : <Grid centered columns={1} padded stackable>
        <Grid.Column style={{ maxWidth: 780, marginTop: 0, textAlign: 'center'}}>
          <p style={{background: 'none', color: 'whitesmoke', fontSize: 20, marginBottom: 0}}>
            No matching results
          </p>
        </Grid.Column>
      </Grid>
  };

  return (
    <>
      {isLoading 
        ? <Dimmer active>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        : <Container>
            {fetchedCategories.length && showSearch()}
            {fetchedCategories.length
              ? showCategories()
              : <Grid centered columns={1} padded stackable>
                  <Grid.Column style={{ maxWidth: 780, marginTop: 0, textAlign: 'center'}}>
                    <p style={{background: 'none', color: 'whitesmoke', fontSize: 20, marginBottom: 0}}>
                      Add a new snippet to get started
                    </p>
                    <Link to='/new-snippet'><Button color='green'>Add Snippet</Button></Link>
                  </Grid.Column>
                </Grid>
            }
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

export default DashBoard;
