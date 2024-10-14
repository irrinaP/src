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

let numberTask = 0;
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
    taskCard.setAttribute("id", numberTask);

    taskInfo.classList.add("task-info");
    taskInfo.setAttribute("onclick", "viewAction(" + numberTask + ")");
    taskText.classList.add("task-text");
    taskTextH1.innerText = inputTitle;
    taskTextP.innerText = inputAbout;
    taskButton.classList.add("task-button");
    taskButton.setAttribute("onclick", "deleteTask(" + numberTask + ")");
    taskButtonAdd.innerHTML = "<span class='material-symbols-outlined'>add</span>";

    taskAction.classList.add("task-action");
    taskActionShare.setAttribute("onclick", "share()");
    taskActionShareImg.setAttribute("src", "icons/share.png");
    taskActionInfoImg.setAttribute("src", "icons/i.png");
    taskActionEdit.setAttribute("onclick", "editView(" + ++numberTask + ")");
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

function deleteTask(numberTask) {
    let task = document.getElementById(numberTask);
    
    task.remove();
    localStorage.removeItem(numberTask++);
}

function viewAction(numberTask) {
    let task = document.getElementById(numberTask);
    
    task.getElementsByClassName("task-info")[0].onclick = () => {
        let el = task.getElementsByClassName("task-action")[0];
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

let isShare = false;
let isEdit = false;
function share() {
    modal("share");
    isShare = true;
}

function editView(numberTask) {
    modal("edit");

    let titleText = JSON.parse(localStorage.getItem(numberTask)).title;
    let aboutText = JSON.parse(localStorage.getItem(numberTask)).about;
    let btnEdit = document.getElementsByClassName("modal-edit")[0].getElementsByClassName("modal-buttons")[0].getElementsByTagName("button")[1];

    document.getElementsByClassName("modal-edit")[0].getElementsByTagName("input")[0].setAttribute("placeholder", titleText);
    document.getElementsByClassName("modal-edit")[0].getElementsByTagName("textarea")[0].setAttribute("placeholder", aboutText);
    btnEdit.setAttribute("id", numberTask);
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
    let modal = document.getElementsByClassName("modal")[0];
    let modalShare = modal.getElementsByClassName("modal-share")[0];
    let modalEdit = modal.getElementsByClassName("modal-edit")[0];
    let btnEdit = modalEdit.getElementsByClassName("modal-buttons")[0].getElementsByTagName("button")[1];

    btnAdd.onclick = () => {
        let header = document.getElementsByClassName("header")[0];
        let inputTitle = header.getElementsByTagName("input")[0];
        let inputAbout = header.getElementsByTagName("input")[1];

        if (inputTitle.value != "" && inputAbout.value != "") {
            let tasks = document.getElementsByClassName("tasks")[0];
            let tasksInfo = tasks.getElementsByClassName("tasks-info")[0];
            let tasksCards = tasks.getElementsByClassName("tasks-cards")[0];

            numberTask += 1;

            localStorage.setItem(numberTask, JSON.stringify({"title":inputTitle.value, "about":inputAbout.value}));

            tasksInfo.style.display = "none";
            tasksCards.style.display = "flex";

            newTask(JSON.parse(localStorage.getItem(numberTask)).title, JSON.parse(localStorage.getItem(numberTask)).about);

            inputTitle.value = "";
            inputAbout.value = "";
        }
    }
    
    btnEdit.onclick = () => {
        let numberTask = btnEdit.getAttribute("id");
        let inputTitle = modalEdit.getElementsByTagName("input")[0];
        let inputAbout = modalEdit.getElementsByTagName("textarea")[0];

        let task = document.getElementsByClassName("task-card")[--numberTask];
        let taskTitle = task.getElementsByTagName("h1")[0];
        let taskP = task.getElementsByTagName("p")[0];

        taskTitle.innerText = inputTitle.value;
        taskP.innerText = inputAbout.value;

        localStorage.setItem(++numberTask, JSON.stringify({"title":inputTitle, "about":inputAbout}));

        inputTitle.value = "";
        inputAbout.value = "";

        isEdit = true;
        cancel();
    }

    modal.onclick = (e) => {
        if (isShare) {
            if (e.target.getAttribute("class") != "modal-share" && e.target.getAttribute("class") != "share-section") {
                console.log(e.target.getAttribute("class"));
                
                isShare = false;
                modalShare.style.display = "none";
                modal.style.display = "none";
            }
        }

        if (isEdit) {
            if (e.target.getAttribute("class") != "modal-edit" && e.target.getAttribute("class") != "modal-buttons" && e.target.getAttribute("class") != null) {
                console.log(e.target.getAttribute("class"));
                
                isEdit = false;
                modalEdit.style.display = "none";
                modal.style.display = "none";
            }
        }
    }
}