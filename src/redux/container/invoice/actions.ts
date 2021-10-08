import axios from 'axios';
import { MAIN_URL } from '../../../globals';
import {
    FETCH_CONTAINER_INVOICES_REQUEST,
    FETCH_CONTAINER_INVOICES_SUCCESS,
    FETCH_CONTAINER_INVOICES_FAILURE
} from './types';

export const fetchInvoices = (containerId: string) => {
    return dispatch => {
        dispatch({ type: FETCH_CONTAINER_INVOICES_REQUEST });
        return axios.get(`${MAIN_URL}/api/container/${containerId}/invoice/all`, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            if (res.data.invoices) {
                dispatch({
                    type: FETCH_CONTAINER_INVOICES_SUCCESS,
                    value: res.data.invoices
                });
            } else {
                dispatch({
                    type: FETCH_CONTAINER_INVOICES_FAILURE,
                    errors: ['No invoices.']
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CONTAINER_INVOICES_FAILURE,
                errors: err.response ? [err.response.data.message] : [err.message]
            });
        })
    }
}