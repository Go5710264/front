import NewTask from '../components/NewTask';
import sendingRequest from './http';
import HelpDask from '../components/HelpDask';

document.addEventListener('DOMContentLoaded', () => {
  const wrapperFormAddTicket = document.querySelector('.wrapper-form-add-ticket');
  const main = document.querySelector('.content-wrapper');
  const inputField = document.querySelector('.input-name-task');
  const buttonAddTask = document.querySelector('.button-add-task');
  const editWindow = document.querySelector('.wrapper-form-editing-ticket');

  const serverResponse = sendingRequest('allTickets', 'GET');
  serverResponse.then(
    (resolve) => {
      resolve.forEach((ticket) => {
        const taskCard = new HelpDask(ticket);
        taskCard.addShortTask();
        taskCard.openingEditWindow(editWindow, main);
        taskCard.deleteTask();
        taskCard.openDescription();
        taskCard.checked();
      });
      return false;
    },
    (reject) => console.log(reject),
  );

  buttonAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    main.style.opacity = '0.4';
    const preliminaryTaskCreation = new NewTask(wrapperFormAddTicket, inputField);
    preliminaryTaskCreation.clickAddTaskButton();
  });
});
