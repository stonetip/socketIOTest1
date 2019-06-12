const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Allow access to static assets, e.g. html pages
app.use(express.static(__dirname));

// Enable JSON processing in routes
app.use(express.json());


// util
function getTimeStamp() {

	return new Date().toISOString();
}


// Set up connection and message types
io.on("connection", function (socket) {

	console.log("a user connected");

	/*** Message types that the client socket will listen for and action(s) that will ensue. ***/

	// one-to-one message client-to-server
	socket.on("single client to server", function (msg) {

		console.log(`single client to server: ${msg}`);

		const timestamp = getTimeStamp();

		// response back to client
		socket.emit("reply from server", { replyFromServer: `reply from server: You sent: ${msg}`, time: timestamp });
	});

	// one-to-many message that will cause the server to broadcast a message to all clients, including the sender
	socket.on("universal", function (msg) {

		console.log(`universal: ${msg}`);

		const timestamp = getTimeStamp();

		io.emit("broadcast", { broadcastMessage: msg, time: timestamp });
	});


	// one-to-many message that will cause the server to broadcast a message to all clients, but not the sender
	socket.on("everybody else", function (msg) {

		console.log(`everybody else: ${msg}`);

		const timestamp = getTimeStamp();

		socket.broadcast.emit("broadcast", { messageToEverybodyElse: msg, time: timestamp });
	});

});



// Demonstrating sending a ping or daemon-style message on a regular basis
setInterval(function () {

	const msg = "interval message";

	console.log(`universal: ${msg}`);

	const timestamp = getTimeStamp();

	io.emit("broadcast", { autoBroadcastMessage: msg, time: timestamp });

}, 10000);



// Let 'er rip!
let appInstance = server.listen(process.env.PORT || 9001, function () {
	console.log(`socket.io test is running on port ${appInstance.address().port}`);
});

