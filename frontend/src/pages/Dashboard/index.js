import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Dashboard() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <Container>
      <h1>Dashboard</h1>

      <button type="button" onClick={() => dispatch(signOut())}>
        SignOut
      </button>
    </Container>
  );
}
