import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FETCH_DIGEST_URL } from '../constants';
import Loading from './Loading';
import {
    TriangleLeftIcon,
    TriangleRightIcon,
    KebabHorizontalIcon,
    SortAscIcon,
    SortDescIcon
} from '@primer/octicons-react';
import './Table.css';

const CustomerTable = () => {
    // Fetching data from Redux store
    const { loading, customers } = useSelector(state => state);
    const history = useHistory(); // hook to push window URL

    // Function to handle row select
    const handleRowClick = useCallback((event, customer) => {
        event.preventDefault();
        if (!customer.isActive) {
            return;
        }
        history.push(`/customers?_id=${customer._id}`);
    }, [history]);

    const [page, setPage] = useState(1); // State property to maintain pagination
    const [rows, setRows] = useState([]); // State property to maintain rows
    // State property to maintain sort field and order
    const [sort, setSort] = useState({ field: null, order: null });
    const start = (page - 1) * 10; // Calc first record
    const end = page * 10; // Calc last record

    // Headers to be displayed in the page
    const headers = {
        status: 'Status',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        city: 'City',
        state: 'State',
        digest: 'Digest'
    };

    // API call to get digest value
    const getDigestValue = (text) => {
        return axios.get(`${FETCH_DIGEST_URL}${text}`);
    }

    // Function to handle sort
    const onSort = (key) => {
        let order = 'ASC';
        if (sort.field === key) {
            order = sort.order === 'ASC' ? 'DESC' : 'ASC';
        }
        const copy = [...rows];
        copy.sort((a, b) => {
            if (order === 'ASC')
                return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
            else
                return (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0);
        });
        setSort({ field: key, order });
        setRows(copy);
    }

    // Function to render headers
    const makeHeaders = () => {
        const header = (name, sortable) => {
            return (
                <th rowSpan="2" className={sortable ? 'sortable' : ''}
                    onClick={() => { if (sortable) { onSort(name) } }}>
                    {headers[name]}
                    {
                        sort.field !== name
                            ?
                            null
                            :
                            sort.order === 'ASC' ?
                                <SortAscIcon />
                                :
                                <SortDescIcon />
                    }
                </th>
            );
        };
        return (
            <thead>
                <tr>
                    {header('status', false)}
                    {header('firstName', true)}
                    {header('lastName', true)}
                    {header('company', true)}
                    {header('city', true)}
                    {header('state', true)}
                    {header('digest', true)}
                    <th rowSpan="2" className='mobile-only'>Action</th>
                </tr>
            </thead>
        );
    }

    // Function to return rows
    const makeRows = () => {
        return [...rows].map(customer => {
            return (
                <tr
                    key={customer._id}
                    onDoubleClick={(e) => handleRowClick(e, customer)}
                    className={customer.isActive ? 'enabled' : 'disabled'}
                >
                    {
                        Object.keys(headers).map((header, idx) => {
                            return <td key={idx}>{customer[header]}</td>;
                        })
                    }
                    <td
                        className='mobile-only'
                        onClick={(e) => handleRowClick(e, customer)}
                    >
                        <KebabHorizontalIcon />
                    </td>
                </tr>
            )
        });
    }

    // Function to return status switch
    const statusSwitch = (checked) => {
        return (
            <div className='form-check form-switch'>
                <input className='form-check-input' type='checkbox'
                    defaultChecked={checked} />
            </div>
        );
    }

    // Function to create table
    const makeTable = () => {
        const firstPage = 1;
        const lastPage = Math.floor(customers.length / 10) +
            (customers.length % 10 > 0 ? 1 : 0); // Calc final page
        return (
            <Fragment>
                <h4 className="fw-bold">
                    Customers
                </h4>
                <div className='table-wrapper'>
                    <table className='table table-responsive table-bordered'>
                        {makeHeaders()}
                        <tbody>
                            {makeRows()}
                        </tbody>
                    </table>
                </div>
                <div className='table-footer'>
                    Viewing {start + 1} - {end} of {customers.length} rows
                    <button
                        className='btn btn-link'
                        onClick={() => setPage(1)}
                        disabled={page === firstPage}
                    >
                        First
                    </button>
                    <button
                        className='btn btn-primary page-btn'
                        onClick={() => setPage(page - 1)}
                        disabled={page === firstPage}
                    >
                        <TriangleLeftIcon />
                    </button>
                    <button
                        className='btn btn-primary page-btn'
                        onClick={() => setPage(page + 1)}
                        disabled={page === lastPage}
                    >
                        <TriangleRightIcon />
                    </button>
                    <button
                        className='btn btn-link'
                        onClick={() => setPage(lastPage)}
                        disabled={page === lastPage}
                    >
                        Last
                    </button>
                </div>
            </Fragment>
        );
    }

    // useEffect call to update rows
    useEffect(() => {
        var promises = [...customers].slice(start, end).map(customer => {
            return getDigestValue(customer.company).then(res => {
                const obj = { ...customer };
                obj.status = statusSwitch(customer.isActive);
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

    return (
        <div className='table-container container-fluid'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Customers</li>
                </ol>
            </nav>
            {loading && <Loading />}
            {!loading && makeTable()}
        </div>
    );
};

export default CustomerTable;