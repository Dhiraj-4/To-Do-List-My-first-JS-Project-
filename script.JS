function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []} ; 
    return todos;
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todo) {
    
    const todoList = document.getElementById("ToDoList");

    const task = document.createElement("li");
    console.log(todo.text,"The content that will be added in li");
    task.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    const checkBox = document.createElement("input");
    checkBox.type = 'checkbox';

    const checkBoxTaskWapper = document.createElement("div");

    const btnWapper = document.createElement("div");

    checkBoxTaskWapper.appendChild(checkBox);

    if(todo.isComplete == true) {
        checkBox.checked = true;
        const strike = document.createElement('s');
        strike.appendChild(task);
        checkBoxTaskWapper.appendChild(strike);
    } else {
        checkBoxTaskWapper.appendChild(task);
    }

    btnWapper.appendChild(editBtn);
    btnWapper.appendChild(delBtn);

    todoList.appendChild(checkBoxTaskWapper);
    todoList.appendChild(btnWapper);

    checkBoxListener(checkBox, delBtn, todo);
    deleteFromTodoList(delBtn, checkBoxTaskWapper, btnWapper, todo );

}

function deleteFromTodoList(delBtn, checkBoxTaskWapper, btnWapper, todo ) {
    delBtn.addEventListener("click", () => {
        
        // Update localStorage
        const todos = loadTodos();
        
        const index = todos.todoList.findIndex(x => x.text === todo.text);

        todos.todoList[index] = '';

        let a1 = todos.todoList.filter(function (e) {
            return e; // Returns only the truthy values
        });

        todos.todoList = a1;
        
        localStorage.setItem("todos", JSON.stringify(todos));

        //Delete the div from List
        const todoList = document.getElementById("ToDoList");
        todoList.removeChild(checkBoxTaskWapper);
        todoList.removeChild(btnWapper);
    });
}

function checkBoxListener(checkBox,delBtn, todo) {
    checkBox.addEventListener("change", () => {
        // Handle checked state
        if (checkBox.checked) {
            todo.isComplete = true;
            
            appendTodoInHtml(todo);
            addTodoToLocalStorage(todo);
            delBtn.click();
        } else {
            todo.isComplete = false;
            appendTodoInHtml(todo);
            addTodoToLocalStorage(todo);
            delBtn.click();
        }
    });
}

function executeFilterAction(event) {
    const todos = loadTodos();
    const element = event.target;
    const value = element.getAttribute("data-filter");
    const todoList = document.getElementById("ToDoList");
    todoList.innerHTML = '';

    if(value == 'complete') {
        todos.todoList.forEach(todo => {
            if(todo.isComplete == true) {
                appendTodoInHtml(todo);
            }
        });
    } else if(value == 'pending') {
        todos.todoList.forEach(todo => {
            if(todo.isComplete == false) {
                appendTodoInHtml(todo);
            }
        });
    } else {
        todos.todoList.forEach(todo => appendTodoInHtml(todo));
    }
}

document.addEventListener("DOMContentLoaded",() => {

    const inputTodo = document.getElementById("inputTodos");

    const summitBtn = document.getElementById("ToDo-btn");

    const filterBtns = document.getElementsByClassName("filterBtn");

    for(const btn of filterBtns) {
        btn.addEventListener("click", executeFilterAction);
    }

    summitBtn.addEventListener('click', () => {
        const todoText = inputTodo.value;
        console.log(todoText);  
        if(todoText == ''){
            alert("Please enter something for Todo");
        } else {
            addTodoToLocalStorage({text: todoText, isComplete: false});
            appendTodoInHtml({text: todoText, isComplete: false});
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