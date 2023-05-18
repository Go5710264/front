import NewTask from '../components/NewTask';

document.addEventListener('DOMContentLoaded', () => {
  const wrapperFormAddTicket = document.querySelector('.wrapper-form-add-ticket');
  const main = document.querySelector('.content-wrapper');
  const inputField = document.querySelector('.input-name-task');
  const buttonAddTask = document.querySelector('.button-add-task');

  buttonAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    main.style.opacity = '0.4';
    const preliminaryTaskCreation = new NewTask(wrapperFormAddTicket, inputField);
    preliminaryTaskCreation.clickAddTaskButton();
  });

  // sendingRequest('allTickets', 'GET');
  // sendingRequest('ticketById&id=1', 'GET');
  // sendingRequest('createTicket', 'POST', newTicket);
});
