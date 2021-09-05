import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FETCH_DIGEST_URL } from '../../constants';
import Loading from '../Loader/Loading';
import Table from '../CustomersTable/Table';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './TableData.css';

const CustomerData = () => {
  // Fetching data from Redux store
  const { loading, customers } = useSelector((state) => state);

  const [page, setPage] = useState(1); // State property to maintain pagination
  const [rows, setRows] = useState([]); // State property to maintain rows
  // State property to maintain sort field and order
  const [sort, setSort] = useState({ field: null, order: null });
  const start = (page - 1) * 10; // Calc first record
  const end = page * 10; // Calc last record

  const history = useHistory(); // hook to push window URL

  // API call to get digest value
  const getDigestValue = (text) => {
    return axios.get(`${FETCH_DIGEST_URL}${text}`);
  };

  // useEffect call to update rows
  useEffect(() => {
    var promises = [...customers].slice(start, end).map((customer) => {
      return getDigestValue(customer.company).then((res) => {
        const obj = { ...customer };
        obj.status = customer.isActive;
        obj.firstName = customer.name.first;
        obj.lastName = customer.name.last;
        obj.digest = res.data.Digest;
        const address = customer.address.split(', ');
        obj.state = address[address.length - 2];
        obj.city = address[address.length - 3];
        return obj;
      });
    });
    Promise.all(promises).then(function (results) {
      setSort({ field: null, order: null });
      setRows(results);
    });
  }, [customers, page, start, end]);

  // Header object for custom names
  const headers = {
    status: 'Status',
    firstName: 'First Name',
    lastName: 'Last Name',
    company: 'Company',
    city: 'City',
    state: 'State',
    digest: 'Digest',
  };

  // Function to handle row select
  const viewCustomer = useCallback(
    (id) => {
      history.push(`/customers?_id=${id}`);
    },
    [history]
  );

  // Callback to toggle the status of the customer
  const toggleState = (id) => {
    const copy = [...rows].map((row) => {
      if (row._id === id) {
        row.status = !row.status;
      }
      return row;
    });
    setRows(copy);
  };

  // Callback to navigate between pages
  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  // Callback to sort the table
  const sortOnField = (key) => {
    let order = 'ASC';
    if (sort.field === key) {
      order = sort.order === 'ASC' ? 'DESC' : 'ASC';
    }
    const copy = [...rows];
    copy.sort((a, b) => {
      if (order === 'ASC')
        return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
      else return a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0;
    });
    setSort({ field: key, order });
    setRows(copy);
  };

  const breadcrumbItems = [
    { link: '/', title: 'Home' },
    { link: '#', title: 'Customers' },
  ];

  return (
    <div className="table-container container-fluid">
      <Breadcrumb items={breadcrumbItems} />
      {loading ? (
        <Loading />
      ) : (
        <Table
          headers={headers}
          rows={rows}
          page={page}
          total={customers.length}
          toggleState={toggleState}
          viewCustomer={viewCustomer}
          goToPage={goToPage}
          sortProps={sort}
          sort={sortOnField}
        />
      )}
    </div>
  );
};

export default CustomerData;
