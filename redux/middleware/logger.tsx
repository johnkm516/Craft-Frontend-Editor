import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "redux/store"

export const logger: Middleware<
{}, // Most middleware do not modify the dispatch return value
RootState
> = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
  }
  