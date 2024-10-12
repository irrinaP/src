function modal(action) {
    let modalWindow = document.getElementsByClassName("modal")[0];
    let modalShare = modalWindow.getElementsByClassName("modal-share")[0];
    let modalEdit = modalWindow.getElementsByClassName("modal-edit")[0];

    modalWindow.style.display = "block";
    modalWindow.style.animation = "modalView 1s 1";

    switch (action) {
        case "share":
            modalShare.style.display = "grid";
            break;
    
        case "edit":
            modalEdit.style.display = "flex";
            break;
    }
}

function newTask(inputTitle, inputAbout) {
    let tasksCards = document.getElementsByClassName("tasks-cards")[0];
    let taskCard = document.createElement("div");

    let taskInfo = document.createElement("div");
    let taskText = document.createElement("div");
    let taskTextH1 = document.createElement("h1");
    let taskTextP = document.createElement("p");
    let taskButton = document.createElement("div");
    let taskButtonAdd = document.createElement("button");

    let taskAction = document.createElement("div");
    let taskActionShare = document.createElement("button");
    let taskActionShareImg = document.createElement("img");
    let taskActionInfo = document.createElement("button");
    let taskActionInfoImg = document.createElement("img");
    let taskActionEdit = document.createElement("button");
    let taskActionEditImg = document.createElement("img");

    taskCard.classList.add("task-card");

    taskInfo.classList.add("task-info");
    taskInfo.setAttribute("onclick", "viewAction()");
    taskText.classList.add("task-text");
    taskTextH1.innerText = inputTitle;
    taskTextP.innerText = inputAbout;
    taskButton.classList.add("task-button");
    taskButtonAdd.innerHTML = "<span class='material-symbols-outlined'>add</span>";

    taskAction.classList.add("task-action");
    taskActionShare.setAttribute("onclick", "share()");
    taskActionShareImg.setAttribute("src", "icons/share.png");
    taskActionInfoImg.setAttribute("src", "icons/i.png");
    taskActionEdit.setAttribute("onclick", "edit()");
    taskActionEditImg.setAttribute("src", "icons/edit.png");

    taskText.append(taskTextH1);
    taskText.append(taskTextP);
    taskButton.append(taskButtonAdd);
    taskInfo.append(taskText);
    taskInfo.append(taskButton);
    taskCard.append(taskInfo);
    taskActionShare.append(taskActionShareImg);
    taskActionInfo.append(taskActionInfoImg);
    taskActionEdit.append(taskActionEditImg);
    taskAction.append(taskActionShare);
    taskAction.append(taskActionInfo);
    taskAction.append(taskActionEdit);
    taskCard.append(taskAction);
    tasksCards.append(taskCard);
}

function viewAction() {
    let task = document.getElementsByClassName("task-card");
    for (let i = 0; i < task.length; i++) {
        task[i].getElementsByClassName("task-info")[0].onclick = () => {
            let el = task[i].getElementsByClassName("task-action")[0];
            let status = window.getComputedStyle(el).display;
    
            if (status == "none") {
                el.style.display = "flex";
                el.style.animation = "taskActionView 1s 1";
            } else {
                el.style.animation = "taskActionClose 1s 1";
                setTimeout(() => {
                    el.style.display = "none";
                }, 900);
            }
        }
    }
}

function share() {
    modal("share");
}

function edit() {
    modal("edit");
}

function cancel() {
    let modalWindow = document.getElementsByClassName("modal")[0];
    let modalEdit = modalWindow.getElementsByClassName("modal-edit")[0];

    modalWindow.style.display = "none";
    modalEdit.style.display = "none";

}

window.onload = () => {
    localStorage.clear();

    let numberTask = 0
    let btnAdd = document.getElementById("add");

    btnAdd.onclick = () => {
        let header = document.getElementsByClassName("header")[0];
        let inputTitle = header.getElementsByTagName("input")[0].value;
        let inputAbout = header.getElementsByTagName("input")[1].value;

        let tasks = document.getElementsByClassName("tasks")[0];
        let tasksInfo = tasks.getElementsByClassName("tasks-info")[0];
        let tasksCards = tasks.getElementsByClassName("tasks-cards")[0];

        numberTask += 1;

        localStorage.setItem(numberTask, JSON.stringify({"title":inputTitle, "about":inputAbout}));

        tasksInfo.style.display = "none";
        tasksCards.style.display = "flex";

        newTask(JSON.parse(localStorage.getItem(numberTask)).title, JSON.parse(localStorage.getItem(numberTask)).about);
    }
}