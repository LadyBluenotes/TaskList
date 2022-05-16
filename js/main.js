
const inputBox = document.querySelector('.inputField input');
const  addTask = document.querySelector('.inputField button');
const thingsToDo = document.querySelector('.toDoList');
const deleteEverything = document.querySelector('.footer button');


//Button Transparency

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.length > 0) {
        addTask.classList.add('active');
    } else {
        addTask.classList.remove('active');
    }
}

// When Button is clicked

addTask.onclick = () => {
    let getLocalStorage = localStorage.getItem('New Task');
    if (getLocalStorage == null) {
        listArray = [];
    } else{
        listArray = JSON.parse(getLocalStorage);
    }
    listArray.push(inputBox.value);
    localStorage.setItem('New Task', JSON.stringify(listArray));
    showTask();
    addTask.classList.remove('active');
}

// On click, add tasks written in input to the list in the dom

function showTask(){
    let getLocalStorage = localStorage.getItem('New Task');
    if (getLocalStorage == null) {
        listArray = [];
    } else{
        listArray = JSON.parse(getLocalStorage);
    }

    const taskNumber = document.querySelector('.taskNumber');
    taskNumber.innerHTML = listArray.length;

    if (listArray.length > 0) {
        deleteEverything.classList.add('active');
    } else {
        deleteEverything.classList.remove('active');
        addTask.classList.remove('active')
    }


    let newInput = '';
    listArray.forEach((element, index) => {
        newInput += `<li> ${element} <span onclick=deleteTask(${index}); class="material-icons">delete_outline</span></li>`;
    });
    thingsToDo.innerHTML = newInput;
    inputBox.value = '';
}

// With pressing the trash can, delete remove tasks from list

function deleteTask(index){
    let getLocalStorage = localStorage.getItem('New Task');
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);

    localStorage.setItem('New Task', JSON.stringify(listArray));
    showTask();
}


// Remove tasks from list when clicked

deleteEverything.onclick = () => {
    listArray = [];
    localStorage.clear();
    showTask();
}



