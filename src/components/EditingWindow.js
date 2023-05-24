import sendingRequest from '../js/http';

export default class EditingWindow {
  constructor(ticket, editWindow, main) {
    this.ticket = ticket;
    this.wrapperEditWindow = editWindow;
    this.main = main;
    this.submitForm = this.submitForm.bind(this);
  }

  showEditWindow() {
    this.main.style.opacity = '0.4';

    this.wrapperEditWindow.classList.remove('display-hide');

    this.inputShortDescription = this.wrapperEditWindow.querySelector('.short-description');
    this.inputShortDescription.value = this.ticket.querySelector('.task-title').textContent;

    this.inputDescription = this.wrapperEditWindow.querySelector('.ditailes-description');

    const id = this.ticket.getAttribute('id');

    const serverResponse = sendingRequest(`ticketById&id=${id}`, 'GET');
    serverResponse.then(
      (resolve) => {
        this.fullDescriptionTicket = resolve;
        this.inputDescription.value = resolve.description;
      },
      (reject) => console.log(reject),
    );
  }

  clickButtonArea() {
    this.formEditingTicket = this.wrapperEditWindow.querySelector('.form-editing-ticket');
    this.wrapperEdetingTicket = this.formEditingTicket.closest('.wrapper-form-editing-ticket');

    this.formEditingTicket.addEventListener('submit', this.submitForm, { once: true });

    this.undoСhanges = this.wrapperEditWindow.querySelector('.button-canceling-task');

    this.undoСhanges.addEventListener('click', () => {
      this.formEditingTicket.removeEventListener('submit', this.submitForm);

      this.wrapperEdetingTicket.classList.add('display-hide');
      this.main.style.opacity = '1';
    }, { once: true });
  }

  submitForm(event) {
    event.preventDefault();

    this.fullDescriptionTicket.name = this.inputShortDescription.value;
    this.fullDescriptionTicket.description = this.inputDescription.value;

    const body = JSON.stringify(this.fullDescriptionTicket);
    sendingRequest('editedTicket', 'POST', body);

    this.wrapperEdetingTicket.classList.add('display-hide');
    this.main.style.opacity = '1';

    return false;
  }
}
