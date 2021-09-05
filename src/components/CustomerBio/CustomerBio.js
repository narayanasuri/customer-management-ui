import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DotFillIcon,
  EyeIcon,
  MailIcon,
  DeviceMobileIcon,
  OrganizationIcon,
  PinIcon,
  PersonAddIcon,
} from '@primer/octicons-react';
import Loading from '../Loader/Loading';
import './Bio.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const CustomerBio = ({ customerID }) => {
  const { loading, customers } = useSelector((state) => state);
  const [status, setStatus] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const [customer] = customers.filter((item) => item._id === customerID);
    if (customer) {
      setSelectedCustomer(customer);
      setStatus(customer.isActive);
    }
  }, [customerID, customers]);

  const renderBioItem = (icon, key, value) => {
    return (
      <div className="bio-elements">
        <span>
          {icon} {key ? key + ':' : ''} {value}
        </span>
      </div>
    );
  };

  const renderTextSection = (key, value) => {
    return (
      <div className="customer-details section-container row">
        <h5 className="fw-bold col-md-2">{key}</h5>
        <p className="col-md-10">{value}</p>
      </div>
    );
  };

  const renderPillsSection = (key, pills) => {
    return (
      <div className="customer-details section-container row">
        <h5 className="fw-bold col-md-2">{key}</h5>
        <div className="col-md-10 tags-container">
          {pills.map((pill) => {
            return (
              <span key={pill} className="badge rounded-pill bg-secondary">
                {pill}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const breadcrumbItems = [
    { link: '/', title: 'Home' },
    { link: '/customers', title: 'Customers' },
    {
      link: '#',
      title: selectedCustomer
        ? selectedCustomer.name?.first + ' ' + selectedCustomer.name?.last
        : '',
    },
  ];

  return (
    <div className="bio-container container-fluid">
      <Breadcrumb items={breadcrumbItems} />

      {loading && <Loading />}

      {selectedCustomer && (
        <div className="username-section col d-flex align-items-center mb-3">
          <img
            className="customer-logo img-thumbnail"
            src={selectedCustomer.picture}
            alt=""
          />
          <div className="section-primary">
            <div className="username d-flex align-items-center mb-2">
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
                checked={status}
                onChange={() => setStatus(!status)}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                {status ? 'Active' : 'Inactive'}
              </label>
            </div>
          </div>
        </div>
      )}

      {selectedCustomer && (
        <Fragment>
          {renderBioItem(<EyeIcon />, 'Eye Color', selectedCustomer.eyeColor)}
          {renderBioItem(null, 'Age', selectedCustomer.age)}
          {renderBioItem(<PersonAddIcon />, null, selectedCustomer.registered)}
          {renderBioItem(<MailIcon />, null, selectedCustomer.email)}
          {renderBioItem(<DeviceMobileIcon />, null, selectedCustomer.phone)}
          {renderBioItem(<OrganizationIcon />, null, selectedCustomer.company)}
          {renderBioItem(<PinIcon />, null, selectedCustomer.address)}
        </Fragment>
      )}

      <hr className="my-4 mx-5" />

      {selectedCustomer && (
        <Fragment>
          {renderTextSection('About', selectedCustomer.about)}
          {renderTextSection('Balance', selectedCustomer.balance)}
          {renderPillsSection('Tags', selectedCustomer.tags)}
        </Fragment>
      )}
    </div>
  );
};

export default CustomerBio;
