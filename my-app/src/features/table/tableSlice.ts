import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'
import {fetchData } from './tableAPI'

export interface tableState {
  userdata: any
  status: 'idle' | 'loading' | 'failed',
  error:unknown
  
}

const initialState: tableState = {
  userdata: [],
  status: 'idle',
  error:''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchdataAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchdataAsync = createAsyncThunk(
  'table/fetchData',
  async () => {
    const response =  fetchData()
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
/*     increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    }, */

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchdataAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchdataAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userdata = action.payload
      })
      .addCase(fetchdataAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

//export const { increment, decrement, incrementByAmount } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectData = (state: AppState) => state.counter.userdata

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default counterSlice.reducer
