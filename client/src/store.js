import { legacy_createStore as createStore} from 'redux'
import rootreducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['manageExamdata','manageStudentExamId','manageExamAnalysis'],
  };
  const persistedReducer = persistReducer(persistConfig, rootreducer);
   const store = createStore(persistedReducer);
  export const persistor = persistStore(store);

  export default store;