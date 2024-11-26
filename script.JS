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

    const strike = document.createElement('s');
    if(todo.isComplete == true) {
        checkBox.checked = true;
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
    editTask(editBtn,checkBoxTaskWapper,todo,task,strike);
}

//Method One status: works completly fine

// function editTask(editBtn, todo, task) {
//     editBtn.addEventListener('click', () => {
//         todo.text = prompt("Enter the edited task: ");
//         task.textContent = todo.text;
//     })
// }

//Method two : Works wonderfully!
function editTask(editBtn,checkBoxTaskWapper,todo,task,strike) {
    let count = 0;
    editBtn.addEventListener('click', () => {
        count = 1;
        const newtask = document.createElement('input');
        newtask.value = todo.text;

        if(todo.isComplete == true) {
            strike.replaceChild(newtask,task);
        } else {
            checkBoxTaskWapper.replaceChild(newtask,task);
        }
        if(count % 2 != 0) {
            const newAddBtn = document.createElement('button');
            newAddBtn.textContent = "UpdateTodo";

            checkBoxTaskWapper.appendChild(newAddBtn); 
            UpdateTodoText(todo, newAddBtn, newtask, checkBoxTaskWapper, task, strike);
            count = 2;
        } else {
            checkBoxTaskWapper.removeChild(newAddBtn);
        }
        
    })
}

function UpdateTodoText(todo, newAddBtn, newtask, checkBoxTaskWapper, task, strike) {

    newAddBtn.addEventListener('click', () => {

        if(newtask.value == ''){
            alert("Please enter something for Todo");
        } else {
            
            task.textContent = replaceTodoText(todo, newtask);;
            if(todo.isComplete == true) {
                strike.replaceChild(task, newtask);
            } else {
                checkBoxTaskWapper.replaceChild(task, newtask);
            }
            checkBoxTaskWapper.removeChild(newAddBtn);
        }
    });

    function replaceTodoText(todo, newtask) {
        const todos = loadTodos();

        const index = todos.todoList.findIndex(x => x.text === todo.text);

        console.log("todo.text: ", todo.text," new todo.text: ", newtask.value);
        console.log(todos.todoList[index]);

        todo.text = newtask.value;

        console.log(todo);
        todos.todoList[index] = todo;

        localStorage.setItem("todos",JSON.stringify(todos));

        return todo.text;
    }

    newtask.addEventListener("change", (event) => {
        const inputText = event.target.value;

        event.target.value = inputText.trim();
    })
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