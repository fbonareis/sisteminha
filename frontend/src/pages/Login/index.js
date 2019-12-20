import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

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

function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Heading>Login</Heading>

          <p>{auth.error}</p>

          <FieldGroup>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Field name="email" type="email" placeholder="your@email.com" />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Field name="password" type="password" placeholder="mysecret" />
          </FieldGroup>

          <Footer>
            <Submit>{auth.loading ? 'Loading...' : 'Sign In'}</Submit>
            <ForgotPassword href="#">Forgot Password?</ForgotPassword>
          </Footer>
        </Form>

        <Copyright> &copy;2019 Acme Corp. All rights reserved.</Copyright>
      </Content>
    </Container>
  );
}

export default Login;
