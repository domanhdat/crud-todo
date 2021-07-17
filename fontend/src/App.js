import {useCallback, useEffect, useState} from "react";
import Datatable from 'react-bs-datatable';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from "./comonents/CreateTodo";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import UpdateTodo from "./comonents/UpdateTodo";

function App() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    (async() => {
      const response = await fetch('http://localhost:3001/todos');
      const body = await response.json();
      setData(body);
    })()
  }, [])

  const handleAddTodo = useCallback((todo) => {
    setData(prevState => [...prevState, todo]);
  }, [])

  const handleShowUpdateTodo = useCallback((todo) => {
    setTodo(todo)
    setShow(true);
  }, [])

  const handleUpdateTodo = useCallback((todo) => {
    const index = data.findIndex(val => val.id === todo.id);
    setShow(false);
    if (index === -1) {
      return;
    }
    const newData = [...data];
    newData[index] = todo;
    setData(newData);
  }, [data])

  const handleDeleteTodo = useCallback((id) => {
    const index = data.findIndex(val => val.id === id);
    console.log('index', index);
    setShow(false);
    if (index === -1) {
      return;
    }
    const newData = [...data];
    newData.splice(index, 1);
    console.log(newData);
    setData(newData);
  }, [data])

  return (
    <Container>
      <Row className="justify-content-center py-4">
        <Col md={4}>
          <CreateTodo onAddTodo={handleAddTodo}/>
        </Col>
      </Row>
      <Datatable
        tableHeaders={header}
        tableBody={data}
        onRowClick={handleShowUpdateTodo}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateTodo todo={todo} onUpdateTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo}/>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

const header = [
  { title: 'ID', prop: 'id' },
  { title: 'Name', prop: 'name' },
  { title: 'Status', prop: 'status' },
];

export default App;
