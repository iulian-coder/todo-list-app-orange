import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import formatDate, { timeRemainingBetweenTwoDates } from "../util/utilDate";
Modal.setAppElement("#root");

function Todolist() {
  const [todosOnGoing, setTodosOnGoing] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState([]);
  const [sortType, setSortType] = useState("createdAt");
  const [sortTodosOnGoing, setSortTodosOnGoing] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [dataModal, setDataModal] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const requestTodos = await axios.get(apiRoute.todolist);

      setTodosOnGoing(
        requestTodos.data.filter((items) => items.completed === false)
      );
      setTodosCompleted(
        requestTodos.data.filter((items) => items.completed === true)
      );

      return requestTodos;
    }
    fetchData();
  }, [sortType]);

  const handleSort = (type) => {
    if (type === "descExpiryDate") {
      let sortedDesc = todosOnGoing.sort(
        (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate)
      );
      setSortType(type);
      setSortTodosOnGoing(sortedDesc);
    } else if (type === "ascExpiryDate") {
      let sortedAsc = todosOnGoing.sort(
        (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
      );
      setSortType(type);
      setSortTodosOnGoing(sortedAsc);
    } else {
      setSortType("createdAt");
    }
  };

  const handleDone = (data) => {
    setModalIsOpen(false);
    completedTask(data);
    window.location.reload();
  };

  const handleDelete = (e) => {
    let taskId = e.target.value;
    deleteTask(taskId);
    window.location.reload();
  };

  const sortedType = () => {
    if (sortType === "createdAt") {
      return todosOnGoing;
    } else {
      return sortTodosOnGoing;
    }
  };
  const handleModal = (data) => {
    setModalIsOpen(true);
    setDataModal(data);
  };

  return (
    <div className="row">
      <div className="col-sd-8 mx-auto">
        <h3 className="text-center">On going tasks</h3>
        {todosOnGoing.length ? (
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="browser-default custom-select"
          >
            <option value="createdAt">Sort by Creation Date</option>
            <option value="descExpiryDate">Sort by Desc Expiry Date</option>
            <option value="ascExpiryDate">Sort by Asc Expiry Date</option>
          </select>
        ) : (
          <p>You don't have any on going tasks </p>
        )}

        {sortedType().map((item) => (
          <div key={item.id}>
            <i className={sortFaIcon(item.todolistType)}></i>
            <p className="h6">
              {item.todolistType}: {item.name}
            </p>
            <button
              className="btn btn-outline-info btn-sm"
              onClick={() => handleModal(item)}
            >
              Done
            </button>
            {/* ------ START MODAL ------ */}
            <Modal
              className="modalStyle"
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
            >
              <div key={dataModal.id}>
                <form onSubmit={handleSubmit(handleDone)}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>
                        How many hours do you spend on the {dataModal.name}:
                      </label>
                      <input
                        type="number"
                        name="inputRealTime"
                        className="form-control mb-2"
                        ref={register({ required: true, min: 1, max: 876000 })}
                        // 876000 = 100 years
                      ></input>
                      {errors.inputRealTime && <p>Time is required</p>}

                      <input
                        type="hidden"
                        name="taskId"
                        value={dataModal.id}
                        ref={register}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-md"
                  >
                    Submit
                  </button>
                </form>
                <div className="text-center">
                  <button
                    className="btn btn-outline-danger btn-md"
                    onClick={() => setModalIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
            {/* ----- END MODAL ----- */}
            <button
              type="button"
              value={item.id}
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm"
            >
              Delete
            </button>
            <p>
              <small>
                Created {formatDate(item.createdAt)} {" | "} Expiry{" "}
                {formatDate(item.expiryDate)} {" | "}
              </small>
              <small>
                Estimated time {item.estimatedTime} h {" | "}
              </small>
              <small
                style={{
                  color:
                    timeRemainingBetweenTwoDates(item.expiryDate) < 1 && "red",
                }}
              >
                Time remaining {timeRemainingBetweenTwoDates(item.expiryDate)}{" "}
                Days
              </small>
            </p>
          </div>
        ))}
        {/* ----- COMPLETED TASK ----- */}
        <h3 className="text-center">Completed tasks</h3>
        {todosCompleted.map((filteredCompleted) => (
          <div key={filteredCompleted.id}>
            <p>
              <del>
                {filteredCompleted.todolistType}: {filteredCompleted.name}
              </del>
            </p>
            <p>
              <small>Finish {formatDate(filteredCompleted.completedAt)}</small>
            </p>
            <p>
              <small>
                Estimated working time {filteredCompleted.estimatedTime} hours |
                Actual working {filteredCompleted.actualTime} hours
              </small>
            </p>
          </div>
        ))}
        {todosCompleted.length ? null : (
          <p>You don't have any completed tasks</p>
        )}
      </div>
    </div>
  );
}

export default Todolist;

function sortFaIcon(todolistType) {
  if (todolistType === "WORK") {
    return "fa fa-briefcase fa-lg";
  } else if (todolistType === "HOME") {
    return "fa fa-home fa-lg";
  } else {
    return "fa fa-linode fa-lg";
  }
}

async function completedTask(data) {
  await axios.put(apiRoute.todolist, {
    id: data.taskId,
    actualTime: data.inputRealTime,
  });
}

async function deleteTask(taskId) {
  await axios.delete(apiRoute.todolist, { data: { id: taskId } });
}
