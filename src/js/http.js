export default async function sendingRequest(url, meth, data) {
  const website = `http://localhost:7070/?method=${url}`;

  let websiteRequest;

  if (meth === 'POST') {
    websiteRequest = fetch(website, {
      method: meth,
      body: data,
    }).then((successResponse) => {
      if (successResponse.status >= 200 && successResponse.status < 300) {
        try {
          return successResponse.json();
        } catch (e) {
          console.error(e);
        }
      }
      return false;
    });
  }

  if (meth === 'GET') {
    websiteRequest = fetch(website, {
      method: meth,
    }).then((successResponse) => {
      if (successResponse.status >= 200 && successResponse.status < 300) {
        try {
          return successResponse.json();
        } catch (e) {
          console.error(e);
        }
      }
      return false;
    });
  }

  if (meth === 'DELETE') {
    websiteRequest = fetch(website, {
      method: meth,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }).then((successResponse) => {
      if (successResponse.status >= 200 && successResponse.status < 300) {
        try {
          return successResponse.text();
        } catch (e) {
          console.error(e);
        }
      }
      return false;
    });
  }

  return Promise.resolve(websiteRequest);
}
