import sendingRequest from '../js/http';
import EditingWindow from './EditingWindow';

export default class HelpDask {
  constructor(task) {
    this.task = task;
    this.boardTask = document.querySelector('.board-task');
    this.popUpWindow = document.querySelector('.modal');
    this.confirmDeletion = this.confirmDeletion.bind(this);
  }

  addShortTask() {
    this.newTask = this.boardTask.querySelector('.task').cloneNode(true);
    this.newTask.classList.remove('display-hide');

    this.newTask.querySelector('.task-title').textContent = this.task.name;
    this.newTask.setAttribute('id', this.task.id);
    this.id = this.newTask.getAttribute('id');

    this.checkbox = this.newTask.querySelector('.checkbox');
    if (this.task.status === true) {
      this.checkbox.checked = true;
    }

    this.boardTask.appendChild(this.newTask);
  }

  openingEditWindow(editWindow, main) {
    this.editIcon = this.newTask.querySelector('.task-editing');
    this.editIcon.addEventListener('click', () => {
      const classEditWindow = new EditingWindow(this.newTask, editWindow, main);
      classEditWindow.showEditWindow();
      classEditWindow.clickButtonArea();
    });
  }

  deleteTask() {
    this.iconRemove = this.newTask.querySelector('.task-remove');

    this.iconRemove.addEventListener('click', () => {
      this.main = this.iconRemove.closest('.content-wrapper');
      this.main.style.opacity = 0.1;
      this.showPopUpWindow();
    });
    return false;
  }

  confirmDeletion() {
    sendingRequest(this.id, 'DELETE');

    this.newTask.parentElement.removeChild(this.newTask);

    this.popUpWindow.classList.add('display-hide');
    this.main.style.opacity = 1;
  }

  showPopUpWindow() {
    this.popUpWindow.classList.remove('display-hide');
    const buttonDelete = this.popUpWindow.querySelector('.modal-button-delete');
    buttonDelete.addEventListener('click', this.confirmDeletion, { once: true });

    const closeItem = this.popUpWindow.querySelector('.modal-icon-close');
    closeItem.addEventListener('click', () => {
      this.popUpWindow.classList.add('display-hide');
      this.main.style.opacity = 1;
      buttonDelete.removeEventListener('click', this.confirmDeletion);
    }, { once: true });

    return false;
  }

  openDescription() {
    this.newTask.addEventListener('click', (event) => {
      if (!event.target.classList.contains('checkbox' || 'task-icon') && this.newTask.classList.contains('open-description')) {
        this.newTask.removeChild(this.newTask.lastElementChild);
        this.newTask.classList.remove('open-description');
        return false;
      }

      if (!event.target.classList.contains('checkbox' || 'task-icon')) {
        const serverResponse = sendingRequest(`ticketById&id=${this.id}`, 'GET');
        serverResponse.then(
          (resolve) => {
            this.newTask.appendChild(this.createElement(resolve.description));
          },
          (reject) => console.log(reject),
        );

        this.newTask.classList.add('open-description');

        return false;
      }

      return false;
    });
  }

  createElement(text) {
    this.div = document.createElement('div');
    this.div.classList.add('expended-task');

    const p = document.createElement('p');
    p.classList.add('task-condition');
    p.textContent = text;

    this.div.appendChild(p);

    return this.div;
  }

  checked() {
    this.checkbox.addEventListener('click', () => {
      this.task.status = this.checkbox.checked;
      console.log(this.task);

      const body = JSON.stringify(this.task);

      sendingRequest('editedTicket', 'POST', body);
    });
  }
}
