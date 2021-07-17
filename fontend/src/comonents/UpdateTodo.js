import {Button, Form} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";

function UpdateTodo ({onUpdateTodo, onDeleteTodo, todo}) {
  const [name, setName] = useState(todo.name);
  const [status, setStatus] = useState(todo.status);

  useEffect(() => {
    setName(todo.name)
  }, [todo.name])

  useEffect(() => {
    setStatus(todo.status)
  }, [todo.status])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/todos', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({name, status, id: todo.id})
    });
    const todoUpdate = await response.json();
    onUpdateTodo(todoUpdate)
  }, [name, status, onUpdateTodo, todo.id])

  const handleDelete = useCallback(async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/todos', {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({id: todo.id})
    });
    await response.json();
    onDeleteTodo(todo.id)
  }, [onDeleteTodo, todo.id])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group controlId="formBasicStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" custom value={status} onChange={(e) => setStatus(e.target.value)}>
          <option />
          <option value="pending">Pending</option>
          <option value="done">Done</option>
          <option value="reject">Reject</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
      <Button variant="danger" type="button" onClick={handleDelete}>
        Delete
      </Button>
    </Form>
  )
}

export default UpdateTodo;
