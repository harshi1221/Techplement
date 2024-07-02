//created an initialstate
const initialState = {
    user: {},
}

//reducer takes state and action arguments
export const userReducer = (state = initialState, action) => {
    //switch case
    //taking a type of action 
    switch (action.type) {
        //for successful login return the updated state 
        case "LOGIN_SUCCESS":
            console.log('Previous state:', state);
            console.log('Action payload:', action.payload);
            return {
                ...state,
                user: action.payload
            }
        //for error return existing state
        case "LOGIN_ERROR":
            return initialState;
        //default is to return existing state
        default:
            return initialState;
    }
}