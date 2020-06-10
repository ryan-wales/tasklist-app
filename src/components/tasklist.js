import React, { Component } from "react";
import axios from "axios";

//import FontAwesome

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";

const TasklistTable = (props) => {
  return (
    <li className="tasklist-item" key={props.task._id}>
      <div className="columns">
        <div className="column is-1">
          <input
            type="checkbox"
            defaultChecked={props.task.taskStatus}
            onClick={props.statusAction}
          />
        </div>
        <div className="column is-10">
          <input
            className={`tasklist-text${
              props.task.taskStatus ? " tasklist-is-complete" : ""
            }`}
            type="text"
            value={props.task.taskName}
            id={props.task._id}
            onChange={props.changeEvent}
          />
        </div>
        <div className="column">
          <button
            className="button is-danger"
            onClick={props.requestDelete}
            title="Delete Task"
          >
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
          </button>
        </div>
      </div>
    </li>
  );
};

const DeleteConfirmModal = (props) => {
  return (
    <div className={`modal${props.task.showDeleteModal ? " is-active" : ""}`}>
      <div className="modal-background" onClick={props.requestDelete}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm Delete</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.requestDelete}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="columns">
            <div className="column is-2">
              <FontAwesomeIcon icon={faTrashAlt} size="4x" />
            </div>
            <div className="column">
              <p>
                Are you sure that you want to delete the task '
                {props.task.taskName}
                '.
              </p>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={props.deleteAction}>
            Confirm Delete
          </button>
          <button className="button is-success" onClick={props.requestDelete}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default class Tasklist extends Component {
  constructor(props) {
    super(props);

    this.onChangeNewTaskName = this.onChangeNewTaskName.bind(this);
    this.createNewTask = this.createNewTask.bind(this);

    this.state = {
      tasks: [],
      modal: [],
      activeTaskId: "",
      activeTaskName: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/tasklist")
      .then((res) => {
        this.setState({ tasks: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  tasklist() {
    return this.state.tasks.map((task) => {
      const requestDelete = this.requestDelete.bind(this, task._id);

      return (
        <>
          <TasklistTable
            task={task}
            key={task._id}
            changeEvent={this.onChangeTaskName.bind(this, task._id)}
            statusAction={this.onChangeTaskStatus.bind(this, task._id)}
            requestDelete={requestDelete}
          />
          <DeleteConfirmModal
            task={task}
            deleteAction={this.deleteTask.bind(this, task._id)}
            requestDelete={requestDelete}
          />
        </>
      );
    });
  }

  createNewTask = (e) => {
    e.preventDefault();

    const newTask = { taskName: this.state.activeTaskName, taskStatus: false };
    let id = "";

    axios.post("http://localhost:8000/tasklist/add", newTask).then((res) => {
      console.log(res);
      id = res.data.id;

      this.setState((state) => {
        const tasks = state.tasks.concat({
          _id: id,
          taskName: this.state.activeTaskName,
        });
        const activeTaskName = "";
        return { tasks, activeTaskName };
      });
    });
  };

  onChangeNewTaskName = (e) => {
    this.setState({
      activeTaskName: e.target.value,
    });
  };

  onChangeTaskName = (id, e) => {
    const index = this.state.tasks.findIndex((task) => {
      return task._id === id;
    });

    const task = { ...this.state.tasks[index], taskName: e.target.value };

    const tasks = [...this.state.tasks];

    tasks[index] = task;

    this.setState({ tasks: tasks });

    axios
      .post(`http://localhost:8000/tasklist/update/${id}`, task)
      .then((res) => console.log(res.data));
  };

  onChangeTaskStatus = (id, e) => {
    const index = this.state.tasks.findIndex((task) => {
      return task._id === id;
    });

    const task = { ...this.state.tasks[index], taskStatus: e.target.checked };

    const tasks = [...this.state.tasks];

    tasks[index] = task;

    this.setState({ tasks: tasks });

    axios
      .post(`http://localhost:8000/tasklist/update/${id}`, task)
      .then((res) => console.log(res.data));
  };

  deleteTask = (id, e) => {
    const index = this.state.tasks.findIndex((task) => {
      return task._id === id;
    });

    const tasks = [...this.state.tasks];

    tasks.splice(index, 1);

    this.setState({ tasks: tasks });

    axios.delete(`http://localhost:8000/tasklist/delete/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  requestDelete = (id, e) => {
    const index = this.state.tasks.findIndex((task) => {
      return task._id === id;
    });

    const task = { ...this.state.tasks[index] };

    let test = undefined;

    if (task.showDeleteModal) {
      test = false;
    } else {
      test = true;
    }

    task.showDeleteModal = test;

    const tasks = [...this.state.tasks];

    tasks[index] = task;

    this.setState({ tasks: tasks });
  };

  render() {
    return (
      <div>
        <h1 className="title">Tasklist</h1>
        <ul>{this.tasklist()}</ul>

        <li className="tasklist-item">
          <div className="columns">
            <div className="column is-1"></div>
            <div className="column is-10">
              <form onSubmit={this.createNewTask}>
                <input
                  className="tasklist-text"
                  placeholder="Add new task..."
                  type="text"
                  onChange={this.onChangeNewTaskName}
                  value={this.state.activeTaskName}
                ></input>

                <button type="submit" className="button is-success">
                  <FontAwesomeIcon icon={faCheck} size="lg" />
                </button>
              </form>
            </div>
          </div>
        </li>
      </div>
    );
  }
}
