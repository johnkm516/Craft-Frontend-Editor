import { combineReducers, configureStore } from '@reduxjs/toolkit'

//Middleware
import { logger } from './middleware/logger'
import inputSlice from './reducers/inputSlice'

const rootReducer = combineReducers({ 
    Inputs: inputSlice
})

export const store: any = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch