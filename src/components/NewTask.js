import WindowAddNewTask from './WindowAddNewTask';

export default class NewTask {
  constructor(wrapperFormAddTicket, inputField) {
    this.inputField = inputField;
    this.wrapperFormAddTicket = wrapperFormAddTicket;
    this.formAddTicket = this.wrapperFormAddTicket.querySelector('.form-add-ticket');
  }

  clickAddTaskButton() {
    this.wrapperFormAddTicket.classList.remove('display-hide');
    this.WindowAddNewTask = new WindowAddNewTask(this.formAddTicket, this.inputField);
    this.WindowAddNewTask.clickButtonArea();
    return false;
  }
}
