import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAgent, IBoat, IRoute } from 'interfaces'
import { fetchAllAgents, fetchAllBoats, fetchAllRoutes } from './dictionatyAsyncActionis'

type AsyncDictionaryState = {
  status: 'idle' | 'loading' | 'finished' | 'error',
  boats: IBoat[],
  routes: IRoute[],
  agents: IAgent[],

}

const initialState: AsyncDictionaryState = {
  status: 'idle',
  boats: [],
  routes: [],
  agents: []
}


export const asyncDictionarySlice = createSlice({
  name: 'asyncDictionary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBoats.fulfilled, (state, action) => {
        state.boats = action.payload
      })
      .addCase(fetchAllRoutes.fulfilled, (state, action) => {
        state.routes = action.payload
      })
      .addCase(fetchAllAgents.fulfilled, (state, action) => {
        state.agents = action.payload
      })
  },
})

export default asyncDictionarySlice.reducer