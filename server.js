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

    // get request : 
    const url = new URL(req.url , `http://${req.headers.host}`);

    if(req.method === "GET" && url.pathname === "/tasks"){

        res.writeHead(200 , {
            "content-type" : "application/json"
        });

        return res.end(JSON.stringify({
            message : "tasks fetched successfully" , 
            data : tasks
        }));
    }

    // route not found : 

    res.writeHead(404 , {
        "content-type" : "application/json"
    });

    res.end(JSON.stringify({
        message : "route not found"
    }));
})




server.listen(3000 , () => {
    console.log("Server running on http://localhost:3000");
})

