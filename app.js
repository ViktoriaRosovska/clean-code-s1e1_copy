//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.querySelector(".tasks-list__incompleted");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".tasks-list__completed");//completed-tasks

//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");
  listItem.className = "task";

  //input (checkbox)
  const checkBox = document.createElement("input");//checkbx
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button

  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.className = "task__description";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task__status";
  editInput.type = "text";
  editInput.className = "task__input";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "task__button task__button_edit";
  editButton.setAttribute("title", "edit")

  deleteButton.className = "task__button task__button_delete";
  deleteButton.setAttribute("title", "delete")
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.setAttribute("alt", "remove task icon");
  deleteButtonImg.className = "task__button_image";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__description");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task_edit-mode");
  
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    label.className = "task__description";
    editBtn.innerText = "Edit";
    editBtn.setAttribute("title", "edit");
    editInput.className = "task__input";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    editBtn.setAttribute("title", "save");
    label.className = "task__description task__description_edit-mode";
    editInput.className = "task__input task__input_edit";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("task_edit-mode");
};

//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const  taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  listItem.classList.remove("task_edit-mode");
  const label = listItem.querySelector(".task__description");
  label.className = "task__description task__description_completed";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  const label = listItem.querySelector(".task__description");
  label.className = "task__description";
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  //select ListItems children
  const checkBox = taskListItem.querySelector(".task__status");
  const editButton = taskListItem.querySelector(".task__button_edit");
  const deleteButton = taskListItem.querySelector(".task__button_delete");

  //Bind editTask to edit button.
  
  editButton.addEventListener("click", editTask);
  //Bind deleteTask to delete button.

  deleteButton.addEventListener("click", deleteTask);
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
  
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.