const router = require("express").Router();
let Task = require("../models/task.model");

router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const taskName = req.body.taskName;
  const taskStatus = req.body.taskStatus;
  const newTask = new Task({ taskName, taskStatus });

  newTask
    .save()
    .then((task) => res.json({ message: "Task Added", id: task._id }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.taskName = req.body.taskName;
      task.taskStatus = req.body.taskStatus;

      task
        .save()
        .then(() => res.json("Task updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
