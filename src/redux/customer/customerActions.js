import axios from 'axios';
import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS
} from "./customerTypes";
import { FETCH_CUSTOMERS_URL } from '../../constants';

export const fetchCustomersRequest = () => {
    return {
        type: FETCH_CUSTOMERS_REQUEST
    }
}

export const fetchCustomersSuccess = (customers) => {
    return {
        type: FETCH_CUSTOMERS_SUCCESS,
        payload: customers
    }
}

// Thunk Middleware reducer to make async API call
export const fetchCustomers = () => {
    return (dispatch) => {
        dispatch(fetchCustomersRequest());
        axios.get(FETCH_CUSTOMERS_URL)
            .then(response => {
                const customers = response.data;
                dispatch(fetchCustomersSuccess(customers));
            })
            .catch(error => {
                console.err('Network error occured - ', error);
            })
    }
}