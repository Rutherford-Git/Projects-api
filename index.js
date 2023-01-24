const server = require("./api/server.js");

const port = process.env.PORT || 9000;

// SERVER STARTS HERE
server.listen(port, () => {
    console.log(`sever started on`, port);
});
