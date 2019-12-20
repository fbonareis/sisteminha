import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AUTH_REQUEST } from '~/store/modules/auth/types';

export default function Dashboard() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <h1>
      Dashboard {auth.email}
      <button
        type="button"
        onClick={() => dispatch({ type: AUTH_REQUEST, email: 'teste' })}
      >
        New value
      </button>
    </h1>
  );
}
