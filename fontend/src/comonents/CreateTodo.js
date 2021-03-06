import {Button, Col, Form, Row} from "react-bootstrap";
import {useCallback, useState} from "react";

function CreateTodo ({onAddTodo}) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({name, status})
    });
    const todo = await response.json();
    onAddTodo(todo);
    setName('');
    setStatus('');
  }, [name, status, onAddTodo])

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="flex-row align-items-center">
        <Col md={2}>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" custom value={status} onChange={(e) => setStatus(e.target.value)}>
              <option />
              <option value="pending">Pending</option>
              <option value="done">Done</option>
              <option value="reject">Reject</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateTodo;
