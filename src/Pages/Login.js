import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../Assets/Login.css'
import * as http from '../services/index';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleLogin(event) {
    event.preventDefault();
    var data = {
      "email": email,
      "password": password
    }

    http.loginUser(data)
    .then(res => {
      props.loginHandle();
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" disabled={!validateForm()} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}