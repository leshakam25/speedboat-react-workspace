import { configureStore, combineReducers } from '@reduxjs/toolkit'
import asyncDictionarySlice from 'features/AsyncDictionary/asyncDictionatySlice'
import dictionarySlice from 'features/Dictionary/dictionarySlice'

const rootReducer = combineReducers({
  dictionary: dictionarySlice,
  asyncDictionary: asyncDictionarySlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch