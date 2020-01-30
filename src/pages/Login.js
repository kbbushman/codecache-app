import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = ({ handleLogin, history }) => {
  const [errors, setErrors] = useState({messageList: []});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const validateForm = () => {
    const errors = {messageList: []};
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let formIsValid = true;

    for (let key in values) {
      if (values[key] === '') {
        formIsValid = false;
        errors[key] = true;
        errors.messageList.push(`${key} is required`);
      }
    }

    if (!emailIsValid && email.length > 0) {
      formIsValid = false;
      errors.name = true;
      errors.messageList.push('Please enter a valid email address');
    }

    if (password.length < 6 && password > 0) {
      formIsValid = false;
      errors.password = true;
      errors.messageList.push('Password must be at least 6 characters');
    }

    setErrors(errors);

    return formIsValid;
  };

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
      fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((stream) => stream.json())
        .then((response) => {
          if (response.status === 200) {
            handleLogin(response.token);
            history.push('/dashboard');
          } else {
            setErrors({messageList: [response.error]});
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid textAlign='center' style={{marginTop: 100}}>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='yellow' textAlign='center'>
          Welcome Back!
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
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
              icon='lock'
              iconPosition='left'
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={handleChange}
              error={errors.password ? true : false}
            />
            <Button color='blue' fluid size='large'>
              Log In
            </Button>
          </Segment>
        </Form>
        {errors.messageList.length > 0 && <Message
          error
          header='There were some errors with your submission'
          list={errors.messageList}
        />}
        <Message>
          Don't have an account? <Link to='/register'>Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
};

export default withRouter(Login);
