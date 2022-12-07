import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ComponentInput {
    nodeID: string,
    data: string | number
}

export const inputSlice = createSlice({
  name: 'InputEvent',
  initialState: {
    nodes: new Map()
  } as { nodes: Map<string, string | number>},
  reducers: {
    commit(state, action: PayloadAction<ComponentInput>) {
      if (action.payload.nodeID && action.payload.nodeID != '') {
        console.log(action.payload.nodeID + " : " + action.payload.data);
        state.nodes.set(action.payload.nodeID, action.payload.data);
        return state;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { commit } = inputSlice.actions

export default inputSlice.reducer