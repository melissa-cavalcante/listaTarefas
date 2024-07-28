const input_todo = document.querySelector("#task-title-input");
const form = document.querySelector("#form");
const todoListUl = document.querySelector("#todo-list")

let task = [];

function renderTaskOnHTML(titleTask, done = false){
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute('type', 'checkbox');

    checkbox.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;

        const spanToToggle = liToToggle.querySelector('span');

        const done = event.target.checked;

        if(done){
            spanToToggle.style.textDecoration = "line-through";
        } else {
            spanToToggle.style.textDecoration = "none";
        }

        task = task.map(t => {
            if (t.title === spanToToggle.textContent) {
                return {
                    title: t.title,
                    done: !t.done,
                }
            }

            return t;
        })

        localStorage.setItem("task", JSON.stringify(task))

    });

    checkbox.checked = done;

    const span = document.createElement("span");
    span.textContent = titleTask;

    if(done){
        span.style.textDecoration = "line-through"
    }

    const button = document.createElement("button");
    button.textContent = "Remover";
    button.addEventListener("click", (event) => {
        const liToRemove = event.target.parentElement; 

        const titleToRemove = liToRemove.querySelector("span").textContent;

        task = task.filter(t => t.title !== titleToRemove);

        todoListUl.removeChild(liToRemove); 

    })

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);

    todoListUl.appendChild(li)
}

window.onload = () => {
    const taskOnLocalStorage = localStorage.getItem("task")

        if(!taskOnLocalStorage) return

        task = JSON.parse(taskOnLocalStorage)

        task.forEach(t => {
            renderTaskOnHTML(t.title, t.done)
        })
}

form.addEventListener("submit", (event) => {
    event.preventDefault() // evita o comportamento padrão de recarregar a página ao submeter o fomulário.

    const titleTask = input_todo.value;

    if (titleTask.length < 3){
        alert("Sua tarefa precisa ter, pelo menos, 3 caracteres");
        return; // o return serve para sair da função, ou seja, se o titleTask for menor doq tres caracteres, vai mostrar o alerta, e assim que mostrar o alerta ele nao vai executar mais nada, pq o return vai sair da função, encerra toda a função
    }

    task.push({
        title: titleTask,
        done: false,
    });

    localStorage.setItem("task", JSON.stringify(task))

    renderTaskOnHTML(titleTask)


    input_todo.value = "";

});
