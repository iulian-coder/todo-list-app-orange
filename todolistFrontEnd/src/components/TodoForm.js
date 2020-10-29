import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";

function TodoForm() {
  const { register, handleSubmit, errors } = useForm();
  const [expiryDate, setExpiryDate] = useState(
    new Date().getTime() + 60 * 60 * 1000
  );
  const [errorDate, setErrorDate] = useState(false);

  const onSubmit = (data) => {
    const todoData = {
      todolistType: data.inputType,
      name: data.inputTodo,
      expiryDate: expiryDate,
      estimatedTime: data.inputEstimatedTime,
    };
    addTodo(todoData);
    window.location.reload();
  };

  function checkDate(selectedDate) {
    let dateForm = new Date(selectedDate);
    let dateForm1Hour = new Date().getTime() + 60 * 60 * 1000;
    if (dateForm < dateForm1Hour) {
      setErrorDate(true);
    } else {
      setErrorDate(false);
      setExpiryDate(selectedDate);
    }
  }

  return (
    <div className="row">
    <div className="col-sd-8 mx-auto">
      <h3 className="text-center">Add to do list</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Task:</label>
            <input
              type="text"
              name="inputTodo"
              id="inputTodo"
              className="form-control"
              ref={register({
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
            ></input>
            {errors.inputTodo && (
              <p>Task name is required, atleast 3 characters</p>
            )}
          </div>
          <div className="form-group col-md-4">
            <label>Type:</label>
            <select name="inputType" className="form-control" ref={register}>
              <option value="WORK">Work</option>
              <option value="HOME">Home</option>
              <option value="HOBBY">Hobby</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiry date: </label>
            <DatePicker
              selected={expiryDate}
              onChange={(date) => checkDate(date)}
              minDate={new Date()}
              showTimeSelect
              timeIntervals={60}
              required
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          {errorDate && (
            <p>
              <small style={{ color: "red" }}>Minium expiry date 1 h</small>
            </p>
          )}
        </div>
        <div className="form-row">
          <div className="form-group w-25">
            <label>Estimate Time (hours):</label>
            <input
              type="number"
              name="inputEstimatedTime"
              className="form-control"
              ref={register({ required: true, min: 1, max: 876000 })}
              // 876000 - 100 years limit
            ></input>
            {errors.inputEstimatedTime && (
              <p>Estimate time is required, minimum 1 hour</p>
            )}
          </div>
        </div>
        {!errorDate && <button className="btn btn-primary">Add</button>}
      </form>
      <hr></hr>
    </div>
    </div>
  );
}

export default TodoForm;

async function addTodo(todoData) {
  await axios.post(apiRoute.todolist, todoData);
}
