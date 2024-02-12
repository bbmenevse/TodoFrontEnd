import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

//Todo :: Will add error message for the case where the date is before today's date.
// The modal doesn't close on 

// CSS
import "../commons/css/updateTodo.css";
import { createTodoApi } from "../api/TodoApiService";

//Need to add blur to background
export const TodoCreateModal = ({ onClose }) => {

  const params = useParams();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 1);

  const formRef = useRef()

  function validate(values) {
    let errors = {
      // description: 'Enter a valid description',
      // targetDate: 'Enter a valid target date'
    }

    if (values.done == null) {
      values.done = false;
    }

    if (values.description.length < 5) {
      errors.description = "A minimum of 5 characters are needed!"
    }

    if (values.description.length > 600) {
      errors.description = "The maximum allowed length of description is 155!"
    }

    if (values.targetDate == null) {
      errors.targetDate = "Enter a target date"
    }


    return errors;
  }

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog">
        <div className="modal-content important-border">
          <div className="modal-header">
            <h5 className="modal-title ">Create New Todo</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose("Creating Todo is cancelled")}
            ></button>
          </div>
          <div className="modal-body ">
            <Formik
              initialValues={{
                description: "",
                targetDate: currentDate,
              }}
              innerRef={formRef}
              enableReinitialize={true}
              onSubmit={(values) => {


                const todo = {
                  id: null,
                  username: params.userName,
                  description: values.description,
                  targetDate: values.targetDate,
                  done: values.done,
                }

                //console.log(todo)

                createTodoApi(params.userName, todo)
                onClose("Created Todo Succesfully!")
              }}
              validate={validate}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {() => (
                <Form>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="alert alert-warning"
                  />

                  <ErrorMessage
                    name="targetDate"
                    component="div"
                    className="alert alert-warning"
                  />
                  <fieldset className="form-group">
                    <label>Description</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Enter description..."
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Target Date</label>
                    <Field
                      type="date"
                      className="form-control"
                      name="targetDate"
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <Field
                      type="checkbox"
                      className="form-check-input"
                      name="done"
                    />
                    <label style={{ marginLeft: "5px" }}>
                      Is it already done?
                    </label>
                  </fieldset>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => onClose("Creating Todo is cancelled")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
