import React, { useState } from 'react';

import * as Yup from 'yup';

import api from '~/services/api';
import { authRequest, authRequestSuccess } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Form,
  FieldGroup,
  FieldLabel,
  Field,
  Heading,
  Submit,
  Footer,
  ForgotPassword,
  Copyright,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Custom invalid email message')
    .required('Custom required message'),
  password: Yup.string()
    .min(6)
    .required(),
});

function Login({ history }) {
  const [error, setError] = useState('');

  async function handleSubmit(data) {
    try {
      setError('');
      const response = await api.post('sessions', data);
      const { token } = response.data.token;

      history.push('/dashboard');
    } catch (e) {
      setError('ops, unable to login');
    }
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Heading>Login</Heading>

          <p>{error}</p>

          <FieldGroup>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Field name="email" type="email" placeholder="your@email.com" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Field name="password" type="password" placeholder="mysecret" />
          </FieldGroup>

          <Footer>
            <Submit>Sign In</Submit>
            <ForgotPassword href="#">Forgot Password?</ForgotPassword>
          </Footer>
        </Form>

        <Copyright> &copy;2019 Acme Corp. All rights reserved.</Copyright>
      </Content>
    </Container>
  );
}

export default Login;
