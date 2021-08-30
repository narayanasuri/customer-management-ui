import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS
} from "./customerTypes";

// Initial State
const initialState = {
    loading: false,
    customers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_REQUEST: return {
            ...state,
            loading: true
        };
        case FETCH_CUSTOMERS_SUCCESS: return {
            ...state,
            loading: false,
            customers: action.payload
        };
        default: return state;
    }
}

export default reducer;