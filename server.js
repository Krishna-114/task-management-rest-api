// task - managemant project : 

// fake database  : 
const tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        status: "pending"
    },
    {
        id: 2,
        title: "Build REST API",
        status: "completed"
    },
    {
        id: 3,
        title: "Learn Express.js",
        status: "pending"
    }
];

// creating server : 

const http = require("node:http");

const server = http.createServer((req , res) => {

    console.log("url : " , req.url);
    console.log("method : " , req.method);
    
    res.writeHead(200 , {
        "content-type" : "application/json"
    });

    res.end(JSON.stringify({
        message : "Task api is running"
    }));
})

server.listen(3000 , () => {
    console.log("Server running on http://localhost:3000");
})

