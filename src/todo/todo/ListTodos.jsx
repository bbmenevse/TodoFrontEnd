import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { retrieveAllTodosForUserNameApi, deleteTodoApi } from "../api/TodoApiService";
import {TodoUpdateModal} from "./UpdateTodo"
import {TodoCreateModal} from "./CreateTodo"

import "../commons/css/listTodos.css"

const ListTodos = () => {
  const params = useParams();
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [chosenTodo, setChosenTodo] = useState(null);

  const refreshTodos = async () => {
    try {
      const data = await retrieveAllTodosForUserNameApi(params.userName);
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Remove the message after 
  const removeMessage= () =>
  {
    setTimeout(() => {
      setShowWarning(false)
    }, 50);
  }

  useEffect(() => {
    refreshTodos()
  }, [params.userName]);

  const deleteTodo = (id) => {
    deleteTodoApi(params.userName, id)
      .then(() => {
        setMessage(`Deleting of todo with id = ${id} is successful`)
        refreshTodos()
        setShowWarning(true)

      })
      .catch((error) => {
        setMessage(`There has been a problem, Could not delete todo with id = ${id}`)
      console.log(error)});
  }

  const updateTodo = (todo) => {
    setChosenTodo(todo)
    setShowUpdateModal(true)
  }

  const closeUpdateModal = (modalAnswer) =>
  {
    setMessage(modalAnswer)
    setShowWarning(true)
    setChosenTodo(null)
    setShowUpdateModal(false)
    setTimeout(() => {
      refreshTodos()
    }, 150);
  } 

  const createTodo = () => {
    setShowCreateModal(true)
  }

  const closeCreateModal = (modalAnswer) =>
  {
    setMessage(modalAnswer)
    setShowWarning(true)
    setShowCreateModal(false)
    console.log("was here just now!!!")
    setTimeout(() => {
      refreshTodos()
    },150)
  } 

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);



  return (
    <div className="list-container">
      {showUpdateModal && <TodoUpdateModal todo={chosenTodo} onClose={closeUpdateModal}></TodoUpdateModal>}
      {showCreateModal && <TodoCreateModal onClose={closeCreateModal}/>}
      <div className="container">
      <h1>Things we want to do</h1>
      {showWarning && <div className={"alert alert-warning alert-dismissible fade show"} > {message} <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={removeMessage} aria-label="Close"></button></div>}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Completed?</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td style={{ maxWidth: '60vh', wordWrap: 'break-word' }}>{todo.description}</td>
                <td>{todo.done.toString()}</td>

                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => deleteTodo (todo.id)}>
                    Delete
                  </button>
                  <button className="btn btn-warning" style={{marginTop:'2px',marginLeft: '3px'}} onClick={() => updateTodo(todo)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      
      <button className="btn btn-primary btn-create-todo" onClick={() => createTodo()}>
                    Create
                  </button>
    </div>
    </div>
  );
};

export default ListTodos;