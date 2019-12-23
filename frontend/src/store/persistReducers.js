import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers =>
  persistReducer(
    {
      key: 'sisteminha',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );
