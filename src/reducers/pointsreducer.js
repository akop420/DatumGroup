
const ADD_ITEM = "ADD_ITEM"

//InitialState
const InitialState = {
    data: [],
}

// Reduces
export default function functionName(state = InitialState, action) {
    const { payload } = action
    switch (action.type) {
        case ADD_ITEM: 
            return {
                ...state,
                data: state.data.concat({name: payload[0], description: payload[1], coordinate: payload[2]}),
            }

        default:
            return state
    }
}


//action
export const addPoint = (name, description, coordinate) => ({ type: ADD_ITEM, payload: [name, description, coordinate] })