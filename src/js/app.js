// TODO: write your code here
import sum from './basic';

document.addEventListener('DOMContentLoaded', () => {
  const arrResult = [];

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const result = xhr.response;
    arrResult.push(result);
    console.log(arrResult)
  }

  xhr.open('GET', 'http://localhost:7070/?method=allTickets');

  xhr.send();

  xhr.open('GET', 'http://localhost:7070/?method=ticketById&id=2');

  xhr.send();

  xhr.open('POST', 'http://localhost:7070/?method=createTicket');

  xhr.send()

  
});
