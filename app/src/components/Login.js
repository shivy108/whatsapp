import React, { useRef } from "react";
import { Button, Container,Form } from "react-bootstrap";
import {v4 as uuIDv4} from 'uuid'

const Login = ({onIdSubmit}) => {
    const idRef= useRef()

    const submitHandler=(e)=>{
        e.preventDefault();

        onIdSubmit(idRef.current.value)
    }

    const createNewID=()=>{
        onIdSubmit(uuIDv4())

    }


  return (
      <Container className='align-items-center d-flex' style={{height:'100vh'}} >
          <Form onSubmit={submitHandler} className='w-100'>
              <Form.Group>
                  <Form.Label>Enter Your ID</Form.Label>
                  <Form.Control required type='text' ref={idRef}></Form.Control>
              </Form.Group>
              <Button type='submit' className='mr-2 '>Login</Button>
              <Button onClick={createNewID} variant='secondary'>New ID</Button>
          </Form>
      </Container>
  );
};

export default Login;
