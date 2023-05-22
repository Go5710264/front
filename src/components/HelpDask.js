import sendingRequest from "../js/http";

export default class HelpDask{
    constructor(task){
        this.task = task;
        this.newTask;
        this.boardTask = document.querySelector('.board-task');

    }

    addShortTask() {
        this.newTask = this.boardTask.querySelector('.task').cloneNode(true);

        this.newTask.setAttribute('id', this.task.id);

        this.newTask.querySelector('.task-title').textContent = this.task.name;

        if(this.task.status === true) {
            let checkbox = this.newTask.querySelector('.checkbox');
            checkbox.checked = true;
        }

        this.boardTask.appendChild(this.newTask) 
    }

    deleteTask(){
        const iconRemove = this.newTask.querySelector('.task-remove');
        
        iconRemove.addEventListener('click', () => {

            let id = iconRemove.closest('.task');
            id = id.getAttribute('id');

            sendingRequest(id, 'DELETE');

            this.newTask.parentElement.removeChild(this.newTask)

        })
    }
}