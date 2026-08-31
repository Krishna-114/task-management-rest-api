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

    // GET /tasks → fetch all tasks
    const url = new URL(req.url , `http://${req.headers.host}`);

    const parts = url.pathname.split("/");

    if(req.method === "GET" && url.pathname === "/tasks"){
        
        res.writeHead(200 , {
            "content-type" : "application/json"
        });

        return res.end(JSON.stringify({
            message : "tasks fetched successfully" , 
            data : tasks
        }));
    }

    // GET /tasks/:id → fetch a specific task
    if(req.method === "GET" && parts[1] === "tasks" && parts[2]){

        const id = Number(parts[2]);

        const task = tasks.find((task) => task.id === id);

        if (!task) {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify({
            error: "Task not found"
        }));
    }

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
        message: "Task fetched successfully",
        task: task
    }));
    
    }

    if(req.method === "POST" && url.pathname === "/tasks"){

        let body = "";

        req.on("data" , (chunk) => {
            body += chunk;
        });

        req.on("end" , () => {

            try {

                const data = JSON.parse(body);
                console.log("data : " , data);

                if(!data.title || (data.status !== "completed" && data.status !== "pending")){

                    res.writeHead(400 , {
                        "content-type" : "application/json"
                    });

                    return res.end(JSON.stringify({
                        error : "invalid data"
                    }));
                }

                const newTask = {
                    id : tasks.length + 1 ,
                    title : data.title , 
                    status : data.status
                }

                tasks.push(newTask);

                res.writeHead(201 , {
                    "content-type" : "application/json"
                });

               return res.end(JSON.stringify({
                    message : "task added successfully" ,
                    task : newTask
                }));
            }
            catch(error){

                res.writeHead(400 , {
                    "content-type" : "application/json"
                });

                return res.end(JSON.stringify({
                    error : "invalid json"
                }));
            }
        })

        return;
    }

    res.writeHead(404 , {
        "content-type" : "application/json"
    });

    return res.end(JSON.stringify({
        error : "route not found"
    }));
});




server.listen(3000 , () => {
    console.log("Server running on http://localhost:3000");
})

