const http = require('http');
const fs = require('fs');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("Welcome to Twitter");
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
    const page = fs.readFileSync('./index.html', 'utf8');
    // fs.createReadStream();
    response.end(page);
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    fs.appendFileSync('hi_log.txt', "Somebody said hi.\n");
    response.end("hi back to you!");
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = [];

    request
      .on('data', chunk => {
        // console.log(chunk.toString()); // Buffer object and hence toString
        // if (chunk.toString() === 'hello') {
        //   response.end('hello there!');
        // } else if (chunk.toString() === 'what\'s up') {
        //   response.end('the sky!');
        // } else {
        //   response.end('good morning!');
        // }
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString() + '\n';
        fs.appendFileSync('hi_log.txt', body);
        response.end(body);
      })
      .on('error', (error) => {
        console.log(error);
      });
  }
  else if (request.method === 'GET' && request.url === '/style.css') {
    let styling = fs.readFileSync('./style.css', 'utf-8');

    response.end(styling);
  }
  else {
    // Handle 404 error: page not found
    // code here...
    response.statusCode = 404;
    response.statusMessage = 'Error: Not Found.';
    response.end();

  }
}

function doOnError(infoOnError){
  console.error(infoOnError);
}

const server = http.createServer();
server.on('request', doOnRequest);
server.on('clientError', doOnError);

server.listen(3000);
