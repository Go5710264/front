export default async function sendingRequest(url, meth, data) {
  const website = `http://localhost:7070/?method=${url}`;

  let websiteRequest;

  if (meth === 'POST') {
    websiteRequest = fetch(website, {
      method: meth,
      body: data,
    }).then((successResponse) => {
      console.log(successResponse);
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

  const result = await Promise.resolve(websiteRequest);
  console.log(result);
}
