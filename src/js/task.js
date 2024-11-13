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

function viewDeleteTask(numberTask) {
    modal("delete");

    let modalDelete = document.getElementsByClassName("modal-delete")[0];
    let btnDelete = modalDelete.getElementsByClassName("modal-buttons")[0].getElementsByTagName("button")[0];

    btnDelete.setAttribute("onclick", "deleteTask(" + numberTask + ")");
}

function deleteTask(numberTask) {
    let task = document.getElementById(numberTask);
    
    localStorage.removeItem(++numberTask);
    task.remove();
    cancelDelete();
}