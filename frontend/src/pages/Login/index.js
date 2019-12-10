import React, { useState } from "react";
import api from "./../../services/api";

import * as Yup from "yup";

import {
  Container,
  Form,
  FieldGroup,
  FieldLabel,
  Field,
<<<<<<< HEAD
  Heading
=======
  Submit
>>>>>>> 78a9a6bded3805a171c06c7d90495410e7e45ef6
} from "./styles";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Custom invalid email message")
    .required("Custom required message"),
  password: Yup.string()
    .min(6)
    .required()
});

function Login({ history }) {
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    try {
      setError("");
      const response = await api.post("sessions", data);
      const { token } = response.data.token;

      history.push("/dashboard");
    } catch (e) {
      setError("ops, unable to login");
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Heading>Login</Heading>

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
