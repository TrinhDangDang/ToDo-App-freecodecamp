const taskForm = document.getElementById("task-form"); //selecting the form where you fill out your task title, date and description
const confirmCloseDialog = document.getElementById("confirm-close-dialog"); //Dialog with discard and cancel button that pop up when trying to close task form
const openTaskFormBtn = document.getElementById("open-task-form-btn");// Add New Task button
const closeTaskFormBtn = document.getElementById("close-task-form-btn"); // red x close task form button 
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn"); // Add Task button inside the task form
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");

