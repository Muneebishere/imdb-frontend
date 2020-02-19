import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/Auth/Login';

export default (props) => {
  return (
    <Router>
      <div>
        <Route path="/login" component={Login} />
      </div>
    </Router>
  )
}