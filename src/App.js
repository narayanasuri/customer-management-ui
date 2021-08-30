import React, { useEffect, useCallback } from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from './components/Main';
import CustomersList from './components/Customer';
import { fetchCustomers } from './redux/customer/customerActions';

function App() {
  const dispatch = useDispatch();

  // Redux subscription to customers list
  // Fitered to serve only the active customers
  const { loading, customers } = useSelector(state => state);
  let active = [];
  let title = 'Customer Manager';

  const getCustomers = useCallback(() => {
    dispatch(fetchCustomers());
  }, [dispatch])

  // On mount, fetch customers
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // Creating the title based on active customers
  if (!loading) {
    active = customers.filter(customer => customer.isActive);
    document.title = `Customer Manager [${active.length}]`;
    title = `Customer Manager [${active.length}]`;
  }

  return (
    <Router>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to='/'>
            <span className="navbar-brand mb-0 h1">{title}</span>
          </Link>
        </div>
      </nav>
      <Route path="/" exact component={Main} />
      <Route path="/customers" component={CustomersList} />
    </Router>
  );
}

export default App;