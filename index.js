const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

if (window.localStorage.getItem("todos") == undefined) {
    let todos = [];
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

let todosEX = window.localStorage.getItem("todos");
let todos = JSON.parse(todosEX);


class item {

    constructor(itemName) {
        this.createDiv(itemName);
    }

    createDiv(itemName) {

        let input = document.createElement("input");
        input.type = "text";
        input.classList.add('item_input');
        input.disabled = true;
        input.value = itemName;


        let itemBox = document.createElement('div');
        itemBox.classList.add('item');


        let editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.innerHTML = "EDIT"


        let removeButton = document.createElement('button');
        removeButton.classList.add('removeButton');
        removeButton.innerHTML = "REMOVE";



        container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        editButton.addEventListener('click', () => this.edit(input, name));

        removeButton.addEventListener('click', () => this.remove(itemBox, name));


    }

    edit(input, name) {
        if (input.disabled == true) {
            input.disabled = !input.disabled;
        } else {
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem('todos', JSON.stringify(todos));
        }

    }

    remove(itemBox, name) {
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function check() {
    if (input.value !== "") {
        new item(input.value);
        todos.push(input.value);
        window.localStorage.setItem('todos', JSON.stringify(todos));
        input.value = "";
    }
}

addButton.addEventListener('click', check);

window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
})

for (let i = 0; i < todos.length; i++) {
    new item(todos[i]);

}