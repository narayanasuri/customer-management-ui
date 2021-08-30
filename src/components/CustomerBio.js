import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    DotFillIcon,
    MailIcon,
    DeviceMobileIcon,
    OrganizationIcon,
    PinIcon,
    PersonAddIcon
} from '@primer/octicons-react';
import Loading from './Loading';
import './Bio.css';

const CustomerBio = ({ customerID }) => {
    const { loading, customers } = useSelector(state => state);
    const [status, setStatus] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        const [customer] = customers.filter(item => item._id === customerID);
        if (customer) {
            setSelectedCustomer(customer);
            setStatus(customer.isActive);
        }
    }, [customerID, customers]);

    return (
        <div className='bio-container container-fluid'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to='/customers'>Customers</Link>
                    </li>
                    {selectedCustomer && (<li className="breadcrumb-item active" aria-current="page">
                        {selectedCustomer.name.first} {selectedCustomer.name.last}
                    </li>)}
                </ol>
            </nav>

            {loading && <Loading /> }

            {selectedCustomer && (
                <div className="username-section col d-flex align-items-center mb-3">
                    <img className='customer-logo img-thumbnail' src={selectedCustomer.picture} alt='' />
                    <div className='section-primary'>
                        <div className='username d-flex align-items-center mb-2'>
                            <h4 className="fw-bold">
                                {selectedCustomer.name.first} {selectedCustomer.name.last}
                            </h4>
                            <span className={status ? 'active' : 'inactive'}>
                                <DotFillIcon size={24} />
                            </span>
                        </div>
                        <div className="status-switch form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                defaultChecked={status}
                                onChange={() => setStatus(!status)}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                {selectedCustomer.isActive ? 'Active' : 'Inactive'}
                            </label>
                        </div>
                    </div>
                </div>
            )}
            
            {selectedCustomer && (
                <div className='bio-elements'>
                    <span>Eye Color: {selectedCustomer.eyeColor}</span>
                    <span>Age: {selectedCustomer.age}</span>
                </div>
            )}

            {selectedCustomer && (
                <div className='bio-elements'>
                    <span><PersonAddIcon /> Joined: {selectedCustomer.registered}</span>
                </div>
            )}

            {selectedCustomer && (
                <div className='bio-elements'>
                    <span><MailIcon /> {selectedCustomer.email}</span>
                    <span><DeviceMobileIcon /> {selectedCustomer.phone}</span>
                </div>
            )}

            {selectedCustomer && (
                <div className='bio-elements'>
                    <span><OrganizationIcon /> {selectedCustomer.company}</span>
                    <span><PinIcon /> {selectedCustomer.address}</span>
                </div>
            )}

            <hr className='my-4 mx-5' />

            {selectedCustomer && (
                <div className="customer-details section-container row">
                    <h5 className="fw-bold col-md-2">About</h5>
                    <p className="col-md-10">{selectedCustomer.about}</p>
                </div>
            )}

            {selectedCustomer && (
                <div className="customer-details section-container row">
                    <h5 className="fw-bold col-md-2">Balance</h5>
                    <p className="col-md-10">{selectedCustomer.balance}</p>
                </div>
            )}

            {selectedCustomer && (
                <div className="customer-details section-container row">
                    <h5 className="fw-bold col-md-2">Tags</h5>
                    <div className="col-md-10 tags-container">
                        {
                            selectedCustomer.tags.map(tag => {
                                return <span key={tag} className="badge rounded-pill bg-secondary">
                                    {tag}
                                </span>
                            })
                        }
                    </div>
                </div>
            )}

        </div>
    );
};

export default CustomerBio;