import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBoat, IRoute } from 'interfaces'

export interface CounterState {
  value: number
  boats: IBoat[]
  routes: IRoute[]
}

const initialState: CounterState = {
  value: 0,
  boats: [],
  routes: []
}


export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setBoats: (state, action: PayloadAction<IBoat[]>) => {
      state.boats = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setBoats } = dictionarySlice.actions

export default dictionarySlice.reducer