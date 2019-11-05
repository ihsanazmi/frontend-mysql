import {combineReducers} from 'redux'

let initState = {
    id: 0,
    username: ''
}

let authReducer = (state = initState, action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, id:action.payload.id, username:action.payload.username}
        
        case "LOGOUT_SUCCESS":
            return {...state, ...initState}

        default:
            return state
    }
}

let reducers = combineReducers(
    {
        auth: authReducer
    }
)

export default reducers