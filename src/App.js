import React, { useEffect, useCallback } from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from './Pages/Main/Main';
import Customers from './Pages/Customers/Customer';
import { fetchCustomers } from './redux/customer/customerActions';
import { useTitle } from './hooks/index';

function App() {
  const dispatch = useDispatch();

  // Redux subscription to customers list
  // Fitered to serve only the active customers
  const { loading, customers } = useSelector((state) => state);
  let active = [];
  let title = 'Customer Manager';

  // Function to get the list of customers from the Redux Store
  const getCustomers = useCallback(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // On mount, fetch customers
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // Creating the title based on active customers
  if (!loading) {
    active = customers.filter((customer) => customer.isActive);
    title = `Customer Manager [${active.length}]`;
  }
  // Using a custom hook to update document title
  useTitle(title);

  return (
    <Router>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">{title}</span>
          </Link>
        </div>
      </nav>
      <Route path="/" exact component={Main} />
      <Route path="/customers" component={Customers} />
    </Router>
  );
}

export default App;
