import React, { useState } from "react";
import api from "./../../services/api";

import * as Yup from "yup";

import {
  Container,
  Form,
  FieldGroup,
  FieldLabel,
  Field,
  Submit
} from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Custom invalid email message")
    .required("Custom required message"),
  password: Yup.string()
    .min(6)
    .required()
});

function Login() {
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    try {
      setError("");
      const response = await api.post("sessions", data);
      const { token } = response.data.token;
      console.log(token);
    } catch (e) {
      setError("ops, unable to login");
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <p>{error}</p>

        <FieldGroup>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Field name="email" type="email" />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Field name="password" type="password" />
        </FieldGroup>

        <Submit>Sign In</Submit>
      </Form>
    </Container>
  );
}

export default Login;
