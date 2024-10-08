window.onload = () => {
    let btnAdd = document.getElementById("add");
    let task = document.getElementsByClassName("task-card");
    let modalWindow = document.getElementsByClassName("modal")[0];


    for (let i = 0; i < task.length; i++) {
        task[i].getElementsByTagName("button")[0].onclick = () => {
            console.log(task[i]);
            task[i].remove();
            
        }

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