const input_todo = document.querySelector("#task-title-input");
const form = document.querySelector("#form");
const todoListUl = document.querySelector("#todo-list")

let task = [];

form.addEventListener("submit", (event) => {
    event.preventDefault() // evita o comportamento padrão de recarregar a página ao submeter o fomulário.

    const titleTask = input_todo.value;

    if (titleTask.length < 3){
        alert("Sua tarefa precisa ter, pelo menos, 3 caracteres");
        return; // o return serve para sair da função, ou seja, se o titleTask for menor doq tres caracteres, vai mostrar o alerta, e assim que mostrar o alerta ele nao vai executar mais nada, pq o return vai sair da função, encerra toda a função
    }

    task.push(titleTask);

    const li = document.createElement("li")
    const span = document.createElement("span");
    const checkbox = document.createElement("input");
    const button = document.createElement("button");
    
    checkbox.setAttribute('type', 'checkbox')

    checkbox 
    span.textContent = titleTask;
    todoListUl.appendChild(span)

    input_todo.value = "";
});
