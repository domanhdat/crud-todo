import {useCallback, useEffect, useState} from "react";
import Datatable from 'react-bs-datatable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import CreateTodo from "./comonents/CreateTodo";
import {Container, Modal} from "react-bootstrap";
import UpdateTodo from "./comonents/UpdateTodo";
import SearchTodo from "./comonents/SearchTodo";

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
    setShow(false);
    if (index === -1) {
      return;
    }
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }, [data])

  return (
    <Container className="py-5">
      <SearchTodo onAddTodos={todos => setData(todos)}/>
      <CreateTodo onAddTodo={handleAddTodo}/>
      <Datatable
        tableHeaders={header}
        tableBody={data}
        onRowClick={handleShowUpdateTodo}
        rowsPerPage={5}
        initialSort={{ prop: 'name', isAscending: true }}
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
  { title: 'ID', prop: 'id', sortable: true },
  { title: 'Name', prop: 'name', sortable: true },
  { title: 'Status', prop: 'status' },
];

export default App;
