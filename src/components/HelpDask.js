import sendingRequest from "../js/http";

export default class HelpDask{
    constructor(task){
        this.task = task;
        this.newTask;
        this.boardTask = document.querySelector('.board-task');
        this.popUpWindow = document.querySelector('.modal');
        this.main;
        this.iconRemove;
    }

    addShortTask() {
        this.newTask = this.boardTask.querySelector('.task').cloneNode(true);

        this.newTask.querySelector('.task-title').textContent = this.task.name;
        this.newTask.setAttribute('id', this.task.id)

        if(this.task.status === true) {
            let checkbox = this.newTask.querySelector('.checkbox');
            checkbox.checked = true;
        }

        this.boardTask.appendChild(this.newTask) 
        console.log(this.newTask)

    }

    deleteTask(){
        this.iconRemove = this.newTask.querySelector('.task-remove');
        
        this.iconRemove.addEventListener('click', () => {
            this.main = this.iconRemove.closest('.content-wrapper')
            this.main.style.opacity = 0.1;
            this.showPopUpWindow();

            // Данное событие отправляет нижележащие события и вызывает обработчик столько раз, сколько нажал на красный крестик
        
        })
        return false;
    }

    confirmDeletion() {
        
        // Потеря контента!!!!


        console.log(this.newTask)
        let id = this.newTask.getAttribute('id');

        sendingRequest(id, 'DELETE');

        this.newTask.parentElement.removeChild(this.newTask);

        this.popUpWindow.classList.add('display-hide');
        this.main.style.opacity = 1;
    }

    showPopUpWindow(){
        this.popUpWindow.classList.remove('display-hide');
        const buttonDelete = this.popUpWindow.querySelector('.modal-button-delete');
        buttonDelete.addEventListener('click', this.confirmDeletion, {once: true})
        
        const closeItem = this.popUpWindow.querySelector('.modal-icon-close');
        closeItem.addEventListener('click', () => {
            this.popUpWindow.classList.add('display-hide');
            this.main.style.opacity = 1;
            buttonDelete.removeEventListener('click',this.confirmDeletion)
        }, {once: true});

        return false;
    }
}