import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';

import { Input, Label } from '~/components/Form';
import { forgotPasswordRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Form,
  FieldGroup,
  Heading,
  Footer,
  Submit,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Custom invalid email message')
    .required('Custom required message'),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleSubmit = ({ email }) => dispatch(forgotPasswordRequest(email));

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Heading>Forgot Password</Heading>

          <p>{auth.error}</p>

          <FieldGroup>
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" placeholder="your@email.com" />
          </FieldGroup>

          <Footer>
            <Submit>{auth.loading ? 'Loading...' : 'Send'}</Submit>
          </Footer>
        </Form>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
