import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Form,
  Input,
  Divider,
} from 'semantic-ui-react';

// TEMP DATA: REMOVE
import tempSnippets from '../config/data/snippets.json';


const DashBoard = () => {
  const [query, setQuery] = useState('');
  const [fetchedCategories, setFetchedCategories] = useState(tempSnippets);
  const [categories, setCategories] = useState([...fetchedCategories]);

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
      setCategories([...fetchedCategories]);
    }
  };

  const showSearch = () => (
    <Grid centered columns={1} padded stackable>
      <Grid.Column style={{maxWidth: 780}}>
        <Form size='huge' style={{marginTop: 60}}>
          <Form.Field>
            <Input
              icon='search'
              placeholder='Search...'
              value={query}
              onChange={handleChange} />
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );

  const showSnippets = (category) => (
    category.snippets.map((snippet) => (
      <Grid.Column key={snippet._id}>
        <Link to={`/categories/${category.slug}/${snippet.slug}`} style={{fontSize: '1.2em'}} >
          {snippet.title}
        </Link>
      </Grid.Column>
    ))
  );

  const showCategories = () => (
    categories.map((category) => (
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
  );

  return (
    <Container>
      {showSearch()}
      {showCategories()}
    </Container>
  )
};

export default DashBoard;
