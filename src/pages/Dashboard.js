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

const DashboardContainer = () => {
  const [query, setQuery] = useState('');
  const [fetchedCategories, setFetchedCategories] = useState([
    {_id: 1, name: 'Bash', snippets: [
      {_id: 22, title: 'Aliases', body: 'This is the body'},
      {_id: 23, title: 'Set Home Path', body: 'This is the body'},
      {_id: 24, title: 'Grep', body: 'This is the body'},
      {_id: 25, title: 'Kill', body: 'This is the body'},
    ]},
    {_id: 2, name: 'JavaScript', snippets: [
      {_id: 26, title: 'ES6', body: 'This is the body'},
      {_id: 27, title: 'Promises', body: 'This is the body'},
      {_id: 28, title: 'Fetch', body: 'This is the body'},
      {_id: 29, title: 'Babel', body: 'This is the body'},
      {_id: 299, title: 'Grep', body: 'This is the body'},
    ]},
    {_id: 3, name: 'Vim', snippets: [
      {_id: 30, title: 'HOW TO QUIT!!!', body: 'This is the body'},
    ]},
    {_id: 4, name: 'Python', snippets: [
      {_id: 31, title: 'Python', body: 'This is the body'},
      {_id: 32, title: 'Django', body: 'This is the body'},
    ]},
    {_id: 5, name: 'React', snippets: [
      {_id: 33, title: 'Containers & Components', body: 'This is the body'},
      {_id: 34, title: 'Redux', body: 'This is the body'},
      {_id: 35, title: 'Formik', body: 'This is the body'},
      {_id: 36, title: 'State & Props', body: 'This is the body'},
      {_id: 37, title: 'React Router DOM v4', body: 'This is the body'},
      {_id: 38, title: 'React Hooks', body: 'This is the body'},
    ]},
  ]);

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
        <Link style={{fontSize: '1.2em'}} to={`/${category.slug}/${snippet.slug}`}>{snippet.title}</Link>
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

export default DashboardContainer;
