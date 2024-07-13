const taskForm = document.getElementById("task-form"); //selecting the form where you fill out your task title, date and description
const confirmCloseDialog = document.getElementById("confirm-close-dialog"); //Dialog with discard and cancel button that pop up when trying to close task form
const openTaskFormBtn = document.getElementById("open-task-form-btn");// Add New Task button
const closeTaskFormBtn = document.getElementById("close-task-form-btn"); // red x close task form button 
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn"); // Add Task button inside the task form
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container"); // container that display the tasks
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");




const taskData = JSON.parse(localStorage.getItem("data")) || []; //store all the tasks along with their associated data, including title, due-date and description
let currentTask = {}; //tracking the state when editing and discarding tasks

const addOrUpdateTask = () => {
    const dataArrIndex = taskData.findIndex((item) => {item.id === currentTask.id});

    const taskObj = {
        id : `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    }; //adding input values from the form to an object, to add to the taskData array later

    if (dataArrIndex === -1){
        taskData.unshift(taskObj); //if the task is new, unshift will add the taskObj to the beginning of the taskData
    } else {
        taskData[dataArrIndex] = taskObj
    };

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();


}; //add the data, values of input to taskData array

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
    taskData.forEach(({id, title, date, description}) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
            <p><strong>Title:</strong>${title}</p>
            <p><strong>Date:</strong>${date}</p>
            <p><strong>Description:</strong>${description}</p>
            <button type="button" class="btn" onclick="editTask(this)">Edit</button>
            <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
        </div>`)
    });
};

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove(); //remove the task from the task container
    taskData.splice(dataArrIndex, 1) //when the delete button is clicked, splice() remove the task from the taskData array
    localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => { //when the edit button in task container is clicked
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);
    currentTask = taskData[dataArrIndex];
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden");

};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
    addOrUpdateTaskBtn.innerText = "Add Task";
};

if (taskData.length) {
    updateTaskContainer();
};

openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden"); // when the Add New Task button is clicked, the task form will appear
}); //decides what will happen when the openTaskFormBtn (Add New Task) button is clicked, the task form appear when the yellow Add New Task is clicked

closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !==currentTask.description;
    if(formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
    
});//when the red x (closeTaskFormBtn is clicked, a dialog appear

cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
});  //when the cancel button inside the popup dialog is clicked, the dialog closes

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
}); //discard button closes the dialog and the task form

taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); //stop the browser from refreshing the page after submitting the form
    addOrUpdateTask();
});



