// ==============================
// TO-DO LIST APP
// ==============================


// ==============================
// DOM ELEMENTS
// ==============================

let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");

let searchInput = document.getElementById("searchInput");

let priorityInput = document.getElementById("priorityInput");
let dueDateInput = document.getElementById("dueDateInput");

let clearCompleted = document.getElementById("clearCompleted");
let clearAll = document.getElementById("clearAll");

let taskCount = document.getElementById("taskCount");


// ==============================
// TASK COUNTER
// ==============================

function updateTaskCount() {

    let allTasks = taskList.querySelectorAll(".task-item");

    let totalTasks = allTasks.length;

    let completedTasks =
        taskList.querySelectorAll(".completed").length;

    let activeTasks = totalTasks - completedTasks;

    taskCount.textContent =
        `Total: ${totalTasks} | Completed: ${completedTasks} | Active: ${activeTasks}`;

}


// ==============================
// PRIORITY STYLE
// ==============================

function applyPriorityStyle(listItem) {

    listItem.classList.remove(
        "priority-high",
        "priority-medium",
        "priority-low"
    );

    if (listItem.dataset.priority === "High") {

        listItem.classList.add("priority-high");

    }

    else if (listItem.dataset.priority === "Medium") {

        listItem.classList.add("priority-medium");

    }

    else {

        listItem.classList.add("priority-low");

    }

}


// ==============================
// SAVE TASKS
// ==============================

function saveTasks() {

    let tasks = [];

    let allTasks = taskList.querySelectorAll(".task-item");

    allTasks.forEach(function(task) {

        tasks.push({

            text: task.dataset.text,

            priority: task.dataset.priority,

            dueDate: task.dataset.dueDate,

            completed: task.classList.contains("completed")

        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// ==============================
// CREATE TASK
// ==============================

function createTask(task, priority, dueDate, completed = false) {

    let listItem = document.createElement("li");

    listItem.classList.add("task-item");

    listItem.dataset.text = task;
    listItem.dataset.priority = priority;
    listItem.dataset.dueDate = dueDate;

    if (completed) {

        listItem.classList.add("completed");

    }


    // Task text

    let taskText = document.createElement("span");

    taskText.classList.add("task-text");


    if (dueDate === "") {

        taskText.textContent =
            `${task} - ${priority} Priority`;

    }

    else {

        taskText.textContent =
            `${task} - ${priority} Priority - Due: ${dueDate}`;

    }


    // ==============================
    // BUTTON CONTAINER
    // ==============================

    let buttonContainer = document.createElement("div");

    buttonContainer.classList.add("task-buttons");


    // ==============================
    // COMPLETE BUTTON
    // ==============================

    let completeButton =
        document.createElement("button");

    completeButton.textContent = "Complete";

    completeButton.addEventListener("click", function() {

        listItem.classList.toggle("completed");

        saveTasks();

        updateTaskCount();

    });


    // ==============================
    // DELETE BUTTON
    // ==============================

    let deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {

        listItem.remove();

        saveTasks();

        updateTaskCount();

    });


    // ==============================
    // EDIT BUTTON
    // ==============================

    let editButton =
        document.createElement("button");

    editButton.textContent = "Edit";

    editButton.addEventListener("click", function() {

        let newTask =
            prompt(
                "Edit your task:",
                listItem.dataset.text
            );


        if (newTask === null) {

            return;

        }


        newTask = newTask.trim();


        if (newTask === "") {

            return;

        }


        let newPriority =
            prompt(
                "Enter priority: Low, Medium, or High",
                listItem.dataset.priority
            );


        if (newPriority === null) {

            return;

        }


        newPriority = newPriority.trim();


        if (
            newPriority !== "Low" &&
            newPriority !== "Medium" &&
            newPriority !== "High"
        ) {

            alert(
                "Please enter Low, Medium, or High."
            );

            return;

        }


        let newDueDate =
            prompt(
                "Enter due date (YYYY-MM-DD). Leave empty for no due date:",
                listItem.dataset.dueDate
            );


        if (newDueDate === null) {

            return;

        }


        newDueDate = newDueDate.trim();


        // Update task data

        listItem.dataset.text = newTask;

        listItem.dataset.priority = newPriority;

        listItem.dataset.dueDate = newDueDate;


        // Update displayed task

        if (newDueDate === "") {

            taskText.textContent =
                `${newTask} - ${newPriority} Priority`;

        }

        else {

            taskText.textContent =
                `${newTask} - ${newPriority} Priority - Due: ${newDueDate}`;

        }


        applyPriorityStyle(listItem);

        saveTasks();

    });


    // Add buttons

    buttonContainer.appendChild(completeButton);

    buttonContainer.appendChild(deleteButton);

    buttonContainer.appendChild(editButton);


    // Add everything to list item

    listItem.appendChild(taskText);

    listItem.appendChild(buttonContainer);


    // Apply priority style

    applyPriorityStyle(listItem);


    // Add task to page

    taskList.appendChild(listItem);

}


// ==============================
// ADD TASK
// ==============================

addButton.addEventListener("click", function() {

    let task = taskInput.value.trim();

    if (task === "") {

        return;

    }


    let priority = priorityInput.value;

    let dueDate = dueDateInput.value;


    createTask(
        task,
        priority,
        dueDate
    );


    // Clear inputs

    taskInput.value = "";

    dueDateInput.value = "";


    saveTasks();

    updateTaskCount();

});


// ==============================
// ENTER KEY
// ==============================

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addButton.click();

    }

});


// ==============================
// SEARCH TASKS
// ==============================

searchInput.addEventListener("input", function() {

    let searchText =
        searchInput.value.toLowerCase();


    let allTasks =
        taskList.querySelectorAll(".task-item");


    allTasks.forEach(function(task) {

        let taskText =
            task.dataset.text.toLowerCase();


        if (taskText.includes(searchText)) {

            task.style.display = "";

        }

        else {

            task.style.display = "none";

        }

    });

});


// ==============================
// CLEAR COMPLETED
// ==============================

clearCompleted.addEventListener("click", function() {

    let completedTasks =
        taskList.querySelectorAll(".completed");


    completedTasks.forEach(function(task) {

        task.remove();

    });


    saveTasks();

    updateTaskCount();

});


// ==============================
// CLEAR ALL
// ==============================

clearAll.addEventListener("click", function() {

    let answer =
        confirm(
            "Are you sure you want to clear all tasks?"
        );


    if (answer) {

        taskList.innerHTML = "";

        saveTasks();

        updateTaskCount();

    }

});


// ==============================
// LOAD SAVED TASKS
// ==============================

let savedTasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


savedTasks.forEach(function(task) {

    createTask(
        task.text,
        task.priority,
        task.dueDate || "",
        task.completed
    );

});


// ==============================
// INITIAL TASK COUNT
// ==============================

updateTaskCount();