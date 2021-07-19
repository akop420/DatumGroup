import { combineReducers } from "redux"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import pointsReducer from "./pointsreducer"

const rootReducer = combineReducers({
    points: pointsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))