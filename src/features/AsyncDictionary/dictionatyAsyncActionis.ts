import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAgent, IBoat, IRoute } from "interfaces"

export const fetchAllBoats = createAsyncThunk(
  'boats/getAll',
  async () => {
    const response = await fetch(`http://62.217.182.92:4000/boats`)
    const data = await response.json()
    return data as IBoat[]
  }
)
export const fetchAllRoutes = createAsyncThunk(
  'routes/getAll',
  async () => {
    const response = await fetch(`http://62.217.182.92:4000/routes`)
    const data = await response.json()
    return data as IRoute[]
  }
)
export const fetchAllAgents = createAsyncThunk(
  'agents/getAll',
  async () => {
    const response = await fetch(`http://62.217.182.92:4000/agents`)
    const data = await response.json()
    return data as IAgent[]
  }
)