let numberTask = 0;

export default function newTask(inputTitle, inputAbout) {
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
    taskButton.setAttribute("onclick", "viewDeleteTask(" + numberTask + ")");
    taskButtonAdd.innerHTML = "<span class='material-symbols-outlined'>add</span>";

    taskAction.classList.add("task-action");
    taskActionShare.setAttribute("onclick", "share(" + ++numberTask + ")");
    taskActionShareImg.setAttribute("src", "icons/share.png");
    taskActionInfoImg.setAttribute("src", "icons/info.png");
    taskActionEdit.setAttribute("onclick", "editView(" + numberTask + ")");
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