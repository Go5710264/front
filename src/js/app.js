document.addEventListener('DOMContentLoaded', () => {
  
  const newTicket = {
    name: null,
    description: null,
    status: false
  }

  async function sendingRequest(url, meth, data) {
    const website = `http://localhost:7070/?method=${url}`;

    let websiteRequest;
    
    if(meth === 'POST'){
      websiteRequest = fetch(website,{
        method: meth,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(successResponse => {
        console.log(successResponse)
        if(successResponse.status >= 200 && successResponse.status < 300){
          try{
            return successResponse.json();
          }catch(e){
            console.error(e)
          }
        }
      })
    };

    if(meth === 'GET') {
      websiteRequest = fetch(website,{
        method: meth
      }).then(successResponse => {
        if(successResponse.status >= 200 && successResponse.status < 300){
          try{
            return successResponse.json();
          }catch(e){
            console.error(e)
          }
        }
      })
    }

    let result = await Promise.resolve(websiteRequest);
    console.log(result)
  }

  sendingRequest('allTickets', 'GET');
  sendingRequest('ticketById&id=1', 'GET');
  sendingRequest('createTicket', 'POST', newTicket);

});
