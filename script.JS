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
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = "Delete";

    div.appendChild(checkBox);

    if(todoText.slice(todoText.length-1, todoText.length) == "_") {
        console.log("This one is marked: ", todoText);
        
        todo.textContent = todoText.slice(0, -1);
        checkBox.checked = true;

        const strike = document.createElement("s");
        strike.appendChild(todo);
        div.appendChild(strike);
        
    } else {
        console.log("This one is Unmarked: ", todoText);
        // console.log("Why the fuck");
        todo.textContent = todoText;
        div.appendChild(todo);
    }
    
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

        let a1 = todos.todoList.filter(function (e) {
            return e; // Returns only the truthy values
        });

        todos.todoList = a1;
        
        localStorage.setItem("todos", JSON.stringify(todos));

        //Delete the div from List
        todoList.removeChild(div);
    });
}

function markStrikedInLocalStorage(todoText){
    const todos = loadTodos();
    const index = todos.todoList.indexOf(todoText);
    todos.todoList[index] = todoText + "_";
    
    console.log("I markStriked has been called and adding value: ", todos.todoList[index]);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function unmarkStrikedInLocalStorage(todoText) {
    const todos = loadTodos();
    const index = todos.todoList.indexOf(todoText);
    todos.todoList[index] = todoText.slice(0, -1);

    console.log("I unmarkStriked has been called and adding value: ", todos.todoList[index]);
    localStorage.setItem("todos", JSON.stringify(todos));
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
            console.log("I am calling markStriked");
            markStrikedInLocalStorage(todoText);

        } else {
            // Remove strikethrough for incomplete task
            const li = document.createElement("li");
            li.textContent = todoText;

            // Replace existing content in div
            div.innerHTML = ""; // Clear current children
            div.appendChild(checkBox); // Reuse the same checkbox
            div.appendChild(li);
            div.appendChild(button);
            console.log("I am calling unmarkStriked");
            unmarkStrikedInLocalStorage(todoText);
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
// const x = "Hello";
// console.log(x.slice(0, -1));
