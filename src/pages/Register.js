import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Register = ({ history }) => {
  const [errors, setErrors] = useState({messageList: []});
  const [values, setValues] = useState({
    name: '',
    email: '',
    github: '',
    password: '',
    password2: '',
  });

  const { name, email, github, password, password2 } = values;

  const validateForm = () => {
    const errors = {messageList: []};
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let formIsValid = true;

    for (let key in values) {
      if (values[key] === '' && key !== 'github' && key !== 'password2') {
        formIsValid = false;
        errors[key] = true;
        errors.messageList.push(`${key} is required`);
      }
    }

    if (name.length < 3 && name.length > 0) {
      formIsValid = false;
      errors.name = true;
      errors.messageList.push('Name is too short');
    }

    if (!emailIsValid && email.length > 0) {
      formIsValid = false;
      errors.name = true;
      errors.messageList.push('Please enter a valid email address');
    }

    if (password.length < 6) {
      formIsValid = false;
      errors.password = true;
      errors.messageList.push('Password must be at least 6 characters');
    }

    if (password !== password2) {
      formIsValid = false;
      errors.password = true;
      errors.messageList.push('Passwords do not match');
    }

    setErrors(errors);

    return formIsValid;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({...errors, [name]: false});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formIsValid = validateForm();

    if (formIsValid) {
      fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((stream) => stream.json())
        .then((response) => {
          if (response.status === 201) {
            history.push('/login');
          } else {
            setErrors({messageList: [response.error]})
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid textAlign='center' style={{marginTop: 100}}>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='yellow' textAlign='center'>
          Register Your Account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              name='name'
              value={name}
              placeholder='Name'
              onChange={handleChange}
              error={errors.name ? true : false}
            />
            <Form.Input
              fluid icon='envelope'
              iconPosition='left'
              name='email'
              value={email}
              placeholder='E-mail address'
              onChange={handleChange}
              error={errors.email ? true : false}
            />
            <Form.Input
              fluid
              icon='github'
              iconPosition='left'
              name='github'
              value={github}
              placeholder='Github Account'
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={handleChange}
              error={errors.password ? true : false}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              type='password'
              name='password2'
              value={password2}
              placeholder='Confirm Password'
              onChange={handleChange}
              error={errors.password ? true : false}
            />
            
            <Button color='blue' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        {errors.messageList.length > 0 && <Message
          error
          header='There were some errors with your submission'
          list={errors.messageList}
        />}
        <Message>
          Already have an account? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
};

export default withRouter(Register);
