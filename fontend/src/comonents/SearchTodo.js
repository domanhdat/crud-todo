import {Button, Col, Form} from "react-bootstrap";
import {useCallback, useState} from "react";

function SearchTodo ({onAddTodos}) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/todos?keyword=${keyword}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const todos = await response.json();
    onAddTodos(todos)
  }, [keyword, onAddTodos])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row className="align-items-center">
        <Col>
          <Form.Label htmlFor="inlineFormInput" srOnly>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            placeholder="Enter keyword"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="submit" className="mb-2">
            Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default SearchTodo;
