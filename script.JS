function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []} ; 
    return todos;
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todoText) {
    if(todoText == '') {
        return;
    }
    const todoList = document.getElementById("ToDoList");

    const todo = document.createElement("li");
    todo.textContent = todoText;
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    const div = document.createElement("div");

    const button = document.createElement("button");
    button.textContent = "Delete";

    div.appendChild(checkBox);
    div.appendChild(todo);
    div.appendChild(button);
    todoList.appendChild(div);

    checkBoxListener(button,checkBox,todoText,div);
    deleteFromTodoList(button,div,todoList,todoText);
}

function deleteFromTodoList(button, div, todoList, todoText) {
    button.addEventListener("click", () => {
        
        // Update localStorage
        const todos = loadTodos();
        
        const index = todos.todoList.indexOf(todoText);
        
        todos.todoList[index] = '';
        
        localStorage.setItem("todos", JSON.stringify(todos));

        
        //Delete the div from List
        todoList.removeChild(div);
    });
}


function checkBoxListener(button,checkBox, todoText, div) {
    checkBox.addEventListener("change", () => {
        
        // Handle checked state
        if (checkBox.checked) {
            // Add strikethrough for completed task
            const strike = document.createElement("s");
            const li = document.createElement("li");
            li.textContent = todoText;
            strike.appendChild(li);

            // Replace existing content in div
            div.innerHTML = ""; // Clear current children
            div.appendChild(checkBox); // Reuse the same checkbox
            div.appendChild(strike);
            div.appendChild(button);


        } else {
            // Remove strikethrough for incomplete task
            const li = document.createElement("li");
            li.textContent = todoText;

            // Replace existing content in div
            div.innerHTML = ""; // Clear current children
            div.appendChild(checkBox); // Reuse the same checkbox
            div.appendChild(li);
            div.appendChild(button);
           
        }
    });
}


document.addEventListener("DOMContentLoaded",() => {

    const inputTodo = document.getElementById("inputTodos");

    const summitBtn = document.getElementById("ToDo-btn");

    const todoList = document.getElementById("ToDoList");

    summitBtn.addEventListener('click', (event) => {
        const todoText = inputTodo.value;

        if(todoText == ''){
            alert("Please enter something for Todo");
        } else {
            addTodoToLocalStorage(todoText);
            appendTodoInHtml(todoText);
            inputTodo.value = '';
        }
    });

    inputTodo.addEventListener("change", (event) => { //the even parameter here, has many properties and is given to us by default
        const inputText = event.target.value;

        event.target.value = inputText.trim();
    })
    const todos = loadTodos();

    todos.todoList.forEach(todo => appendTodoInHtml(todo));
});

