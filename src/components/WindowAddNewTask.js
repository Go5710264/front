import sendingRequest from '../js/http';
import HelpDask from './HelpDask';

export default class WindowAddNewTask {
  constructor(formAddTicket, inputField) {
    this.formAddTicket = formAddTicket;
    this.inputField = inputField;
    this.shortDesctiption = this.formAddTicket.querySelector('.short-description');
    this.shortDesctiption.value = this.inputField.value;
  }

  clickButtonArea() {
    console.log(this.formAddTicket);

    this.formAddTicket.addEventListener('submit', (event) => {
      event.preventDefault();

      const body = new FormData(this.formAddTicket);
      body.append('status', 'false');

      const serverResponse = sendingRequest('createTicket', 'POST', body);

      serverResponse.then(
        (resolve) => {
          const taskCard = new HelpDask(resolve);
          taskCard.addShortTask();
          taskCard.deleteTask();
          taskCard.openDescription();
          taskCard.checked();

          const editWindow = document.querySelector('.wrapper-form-editing-ticket');
          const main = document.querySelector('.content-wrapper');

          taskCard.openingEditWindow(editWindow, main);

          return false;
        },
        (reject) => console.log(reject),
      );

      const wrapperAddTicket = this.formAddTicket.closest('.wrapper-form-add-ticket');
      wrapperAddTicket.classList.add('display-hide');

      this.inputField.value = '';

      const main = this.formAddTicket.closest('body').firstElementChild;
      main.style.opacity = '1';

      return false;
    }, { once: true });
  }
}
