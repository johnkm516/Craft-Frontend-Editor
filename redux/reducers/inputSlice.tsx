import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ComponentInput {
    nodeID: string,
    data: string | number
}

interface NodeMap {
  [nodeID: string]: string | number
}

export const inputSlice = createSlice({
  name: 'InputEvent',
  initialState: {
    nodes: {}
  } as { nodes: NodeMap},
  reducers: {
    commit(state, action: PayloadAction<ComponentInput>) {
      if (action.payload.nodeID && action.payload.nodeID != '') {
        console.log(action.payload.nodeID + " : " + action.payload.data);
        state.nodes[action.payload.nodeID] = action.payload.data;
        return state;
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { commit } = inputSlice.actions

export default inputSlice.reducer