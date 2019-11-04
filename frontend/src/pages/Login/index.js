import React from "react";
import api from "./../../services/api";

import * as Yup from "yup";

import { Container, Form, FieldGroup, FieldLabel, Field } from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Custom invalid email message")
    .required("Custom required message"),
  password: Yup.string()
    .min(6)
    .required()
});

function Login() {
  async function handleSubmit(data) {
    const response = await api.post("sessions", data);

    const { token } = response.data.token;

    console.log(token);
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <FieldGroup>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Field name="email" type="email" />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Field name="password" type="password" />
        </FieldGroup>

        <button type="submit">Sign In</button>
      </Form>
    </Container>
  );
}

export default Login;
