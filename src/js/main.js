import newTask from "./newTask.js";

window.onload = () => {
    localStorage.clear();

    let numberTask = 0;
    let btnAdd = document.getElementById("add");
    let modal = document.getElementsByClassName("modal")[0];
    let modalShare = modal.getElementsByClassName("modal-share")[0];
    let modalEdit = modal.getElementsByClassName("modal-edit")[0];
    let btnEdit = modalEdit.getElementsByClassName("modal-buttons")[0].getElementsByTagName("button")[1];
    let btnShareCopy = modalShare.getElementsByClassName("share-section")[0].getElementsByTagName("button")[0];

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

        cancelEdit();
    }

    btnShareCopy.onclick = () => {
        let numberTask = btnShareCopy.getAttribute("id");
        let copyText = JSON.parse(localStorage.getItem(numberTask))['title'] + "\n" + JSON.parse(localStorage.getItem(numberTask))['about'];

        cancelShare();
        navigator.clipboard.writeText(copyText);
    }
}