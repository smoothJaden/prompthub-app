let taskText = document.getElementById("todo-text");
let taskButton = document.querySelector(".task-btn");
let taskContainer = document.querySelector(".task");
let taskCount = document.getElementById("task-count")
let taskArray = [];

function deleteTask(liElement, itemContent){
    liElement.style.display = "none"
    for(let i = 0; i< taskArray.length; i++){
        if(itemContent == taskArray[i]){
            taskArray.splice(i, 1)
            taskCount.textContent = taskArray.length
        }
        else{
            return
        }
    }

}
function taskFunction() {
  if (!taskText.value) {
    alert("please insert a task");
  } else {
    taskArray.push(taskText.value.trim());
    if (!taskArray.length) {
      taskContainer.innerHTML = `Task list is currently empty`;
    } else {
      let liElement = document.createElement("li");
      let itemContent;
      taskArray.forEach( (item) => {
        itemContent = item
        liElement.classList.add("task-item");
        liElement.innerHTML = `
                <p>${item}</p>
                <button class="task-delete"><i class="fa-solid fa-trash"></i></button>`;
      }
    );
      taskContainer.append(liElement);
      taskText.value = "";
      taskCount.textContent = taskArray.length
      let taskDelete = liElement.querySelector(".task-delete")
      taskDelete.addEventListener("click", () => deleteTask(liElement, itemContent))
    }
  }
}

taskButton.addEventListener("click", taskFunction);
