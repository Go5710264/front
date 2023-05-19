export default class HelpDask{
    constructor(task){
        // this.arrayTasks = [];
        this.task = task;
        this.newTask;
    }

    addShortTask() {
        const boardTask = document.querySelector('.board-task');

        this.newTask = document.querySelector('.task').cloneNode(true);
        console.log(this.newTask)

        this.newTask.querySelector('.task-title').textContent = this.task.name;

        if(this.task.status === true) {
            let checkbox = this.newTask.querySelector('.checkbox');
            checkbox.checked = true;
        }

        boardTask.appendChild(this.newTask) 

    }

    deleteTask(){
        console.log(this.newTask)
        const iconRemove = this.newTask.querySelector('.task-remove');
        
        iconRemove.addEventListener('click', () => {
            console.log('hi')
        })
    }
}