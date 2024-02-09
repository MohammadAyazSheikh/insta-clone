import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import { mmkvStorage } from '../utils/functions/asyncStorage';
import storage from '@react-native-async-storage/async-storage'
import themeSlice from './features/theme/themeSlice';
import userSlice from './features/user/userSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: [

  ]
}


const appReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
});



const rootReducer = (state: any, action: any) => {
  //if user logs out reset all stats except theme
  if (action.type === 'user/logoutSuccess') {
    const { theme } = state;
    const resetState = {
      theme: theme,
    };
    return appReducer(resetState, action);
  }

  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export default store;
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


