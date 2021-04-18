const http = require("http");
const fs = require("fs");

function doOnRequest(request, response) {
    // Send back a message saying "Welcome to Twitter"
    // code here...
    // response.end("Welcome to Twitter");
    if (request.method === "GET" && request.url === "/") {
        // read the index.html file and send it back to the client
        // code here...
        var page = fs.readFileSync("index.html", "utf8");
        response.end(page);

    } else if (request.method === "GET" && request.url == "/style.css") {
        var styling = fs.readFileSync("style.css", "utf8");
        response.end(styling);

    } else if (request.method === "POST" && request.url === "/sayHi") {
        // code here...
        fs.appendFileSync("hi_log.txt", "Somebody said hi.\n");
        response.end("hi back to you!");

    } else if (request.method === "POST" && request.url === "/greeting") {
        // accumulate the request body in a series of chunks
        // code here...
        let body = [];
        request
            .on("data", chunk => {
                body.push(chunk);
            })
            .on("end", () => {
                body = Buffer.concat(body).toString() + "\n";
                fs.appendFileSync("hi_log.txt", body);
                response.end(body);
            });

    } else if (request.method == "PUT" && request.url == "/update-greeting") {
        let body = [];
        request
            .on("data", chunk => {
                body.push(chunk);
            })
            .on("end", () => {
                body = Buffer.concat(body).toString() + "\n";
                fs.writeFileSync('hi_log.txt', body);
                response.end(body);
            });
        response.end("updated greeting");

    } else if (request.method == "DELETE" && request.url == "/delete-greeting") {
        fs.unlinkSync("hi_log.txt");
        response.end("deleted greeting");

    } else {
        // Handle 404 error: page not found
        // code here...
        response.statusCode = 404;
        response.statusMessage = "Error: Not Found.";
        response.end();

    }
}

const server = http.createServer(doOnRequest);

server.listen(3000);