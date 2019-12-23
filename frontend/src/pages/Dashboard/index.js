import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOutRequest } from '~/store/modules/auth/actions';
import { fetchRequest } from '~/store/modules/users/actions';

import { Container } from './styles';

export default function Dashboard() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  return (
    <Container>
      <h1>Dashboard {users.loading ? 'loading ' : 'ready!'}</h1>

      <button type="button" onClick={() => dispatch(signOutRequest())}>
        SignOut
      </button>

      <ul>
        {users.data.map(user => (
          <li
            key={user.id}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <strong>{user.username}</strong>
            <code>{user.email}</code>
          </li>
        ))}
      </ul>
    </Container>
  );
}
