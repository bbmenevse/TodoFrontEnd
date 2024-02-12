import { useState} from "react";
import '../commons/css/updateTodo.css'
import { updateTodoApi } from "../api/TodoApiService";

//TODO
//Need to add blur to background
  export const TodoUpdateModal = ({ todo, onClose }) => {

    const {id,userName,description,targetDate,done } = todo

    const [time,setTime] = useState(targetDate ? new Date(targetDate).toISOString().split('T')[0] : '')

    const [check, setCheck] = useState(done)

    const [errorMessage,setErrorMessage]= useState(null)

    const [showError, setShowError] = useState(false)

    const[todoDescription,setTodoDescription] = useState(description)

    const handleDateChange = (newDate) => {
      const timeAsDate = new Date(newDate);
      // Same day for currentDate and TimeAsDate had been returning true since new picked date had time in it I guess?
      timeAsDate.setHours(0, 0, 0, 0);

      /*
      if (currentDate.getTime() < timeAsDate.getTime()) {
        console.log(currentDate.getTime() + "@@@@@" + timeAsDate.getTime());
        console.log(currentDate.getTime() > timeAsDate.getTime());
      }*/
    
      setTime(newDate);
    }
    const handleCheckBoxChange= (x) =>
    {
      setCheck(!check)
    }

    const handleDescriptionChange = (event) =>
    {
      setTodoDescription(event.target.value)
    }

    const saveChanges = () =>
    {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const tempDate = new Date(time)

      if(tempDate.getTime < currentDate.getTime()){
        setErrorMessage("Todo time cannot be in the past!")
        setShowError(true)
      }
      else if(todoDescription.length<5)
      {
        setErrorMessage("Description length can't be shorter then 5!")
        setShowError(true)
      }
      else if(todoDescription.length>155)
      {
        setErrorMessage("Description length can't be longer then 155!")
        setShowError(true)
      }
      else{
        const tempTodo = { ...todo }; // Create a shallow copy of todo
        tempTodo.targetDate = time
        tempTodo.description = todoDescription
        tempTodo.done = check
        console.log(tempTodo)
        updateTodoApi(userName,id,tempTodo)
        .then(() => {onClose("Update of the todo with id = "+id+" is successful ")})
        .catch(()=> {onClose("There has been a problem updating todo with the id = "+id)})
      }


    }
 
    return (
      <div className="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" >
        <div className="modal-dialog">
          <div className="modal-content important-border">
              <div className="modal-header">
              <h5 className="modal-title ">Update Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => onClose("Update Cancelled")}></button>
            </div>
            <div className="modal-body ">
              <form>
              {showError && <div className="error-div modal-content" >{errorMessage} </div>}
                <div className='mb-3 '>
                  <label className='col-form-label'>Description</label>
                  <input className='form-control' defaultValue={description} onChange={handleDescriptionChange} ></input>
                  <label className='col-form-label'>Date</label>
                  <input className='form-control' type="Date"   defaultValue={time} onChange={(e) => handleDateChange(e.target.value)} ></input>
                  <div className="form-check " style={{marginTop: '10px'}}>
                    <label className='form-check-label'>Finish State <input className='form-check-input' type="checkbox" checked={check} onChange={(event) => handleCheckBoxChange(event.target.checked)}></input> </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() =>onClose("Update Cancelled")}>
                Cancel
              </button>
              <button type="button" onClick={saveChanges} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

