import React from 'react';
import Loading from '../../components/Loader/Loading';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  // Redux sub to get customers
  const { loading, customers } = useSelector((state) => state);

  // Function to render the content
  const showContent = () => {
    // Filtering out the inactive customers
    const active = customers.filter((customer) => customer.isActive);

    return (
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Active Customers - {active.length}</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
            <Link to="/customers">View All</Link>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold mb-3">Customer Management</h1>
        {loading ? <Loading /> : showContent()}
      </div>
    </div>
  );
};

export default Main;
