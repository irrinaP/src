let isShare = false;
let isEdit = false;
let modalWindow = document.getElementsByClassName("modal")[0];
let modalShare = modalWindow.getElementsByClassName("modal-share")[0];
let modalEdit = modalWindow.getElementsByClassName("modal-edit")[0];
let modalDelete = modalWindow.getElementsByClassName("modal-delete")[0];

function modal(action) {
    modalWindow.style.display = "block";
    modalWindow.style.animation = "modalView 1s 1";

    switch (action) {
        case "share":
            modalShare.style.display = "grid";
            break;
    
        case "edit":
            modalEdit.style.display = "flex";
            break;

        case "delete":
            modalDelete.style.display = "flex";
            break;
    }
}

function share(numberTask) {
    modal("share");

    let modalShare = document.getElementsByClassName("modal-share")[0];
    let btnShareCopy = modalShare.getElementsByClassName("share-section")[0].getElementsByTagName("button")[0];

    btnShareCopy.setAttribute("id", numberTask);
    modalShare.style.animation = "modalShareView 1s 1";
    isShare = true;
    
}

function editView(numberTask) {
    modal("edit");

    let titleText = JSON.parse(localStorage.getItem(numberTask)).title;
    let aboutText = JSON.parse(localStorage.getItem(numberTask)).about;
    let btnEdit = modalEdit.getElementsByClassName("modal-buttons")[0].getElementsByTagName("button")[1];


    modalEdit.style.animation = "modalEditView 1s 1";
    modalEdit.getElementsByTagName("input")[0].setAttribute("placeholder", titleText);
    modalEdit.getElementsByTagName("textarea")[0].setAttribute("placeholder", aboutText);
    btnEdit.setAttribute("id", numberTask);
    isEdit = true;
}

function cancelDelete() {
    modalWindow.style.animation = "modalClose 1s 1";
    setTimeout(() => {
        modalWindow.style.display = "none";
        modalDelete.style.display = "none";
    }, 900);
}

function cancelShare() {
    modalWindow.style.animation = "modalClose 1s 1";
    modalShare.style.animation = "modalEditClose 1s 1";
    setTimeout(() => {
        modalWindow.style.display = "none";
        modalShare.style.display = "none";
    }, 900);
    isShare = false;
}

function cancelEdit() {
    modalWindow.style.animation = "modalClose 1s 1";
    modalEdit.style.animation = "modalEditClose 1s 1";
    setTimeout(() => {
        modalWindow.style.display = "none";
        modalEdit.style.display = "none";
    }, 900);
    isEdit = false;
}

modalWindow.onclick = (e) => {
    if (isShare) {
        if (e.target.getAttribute("class") == "modal" || e.target.getAttribute("class") == "modal-body") {
            isShare = false;
            modalWindow.style.animation = "modalClose 1s 1";
            modalShare.style.animation = "modalShareClose 1s 1";
            setTimeout(() => {
                modalShare.style.display = "none";
                modalWindow.style.display = "none";
            }, 900);
        }
    }

    if (isEdit) {
        if (e.target.getAttribute("class") == "modal" || e.target.getAttribute("class") == "modal-body") {
            isEdit = false;
            modalWindow.style.animation = "modalClose 1s 1";
            modalEdit.style.animation = "modalShareClose 1s 1";
            setTimeout(() => {
                modalEdit.style.display = "none";
                modalWindow.style.display = "none";
            }, 900);
        }
    }
}