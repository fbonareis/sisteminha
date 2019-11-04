import styled from "styled-components";
import { Form as FormBase, Input } from "@rocketseat/unform";

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(FormBase)`
  background: lightgray;
  flex: 1;
  padding: 20px;
  max-width: 300px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  span {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export const FieldLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Field = styled(Input)`
  padding: 5px;
  font-size: 12px;
`;
