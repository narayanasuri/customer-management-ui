import React from 'react';
import { useLocation } from "react-router-dom";
import CustomerTable from './CustomerTable';
import CustomerBio from './CustomerBio';

const CustomersList = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const id = searchParams.get("_id");

    return (
        <div>
            { !id && <CustomerTable /> }
            { id && <CustomerBio customerID={id} /> }
        </div>
    );
};

export default CustomersList;