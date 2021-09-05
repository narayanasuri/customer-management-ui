import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import CustomerBio from '../../components/CustomerBio/CustomerBio';
import CustomersData from '../../components/CustomersData/CustomerData';

const Customers = () => {
  // Extracting the request parameter
  // and getting the ID if present
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('_id');

  return (
    <Fragment>
      {id ? <CustomerBio customerID={id} /> : <CustomersData />}
    </Fragment>
  );
};

export default Customers;
