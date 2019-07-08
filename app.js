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




let users = [];



// Set up connection and message types
io.on("connection", (socket) => {

	console.log("a user connected");

	/*** Message types that the client socket will listen for and action(s) that will ensue. ***/

	// one-to-one message client-to-server
	socket.on("single client to server", (msg) => {

		console.log(`single client to server: ${msg}`);

		const timestamp = getTimeStamp();

		// response back to client
		socket.emit("reply from server", { replyFromServer: `reply from server: You sent: ${msg}`, time: timestamp });
	});

	// one-to-many message that will cause the server to broadcast a message to all clients, including the sender
	socket.on("universal", (msg) => {

		console.log(`universal: ${msg}`);

		const timestamp = getTimeStamp();

		io.emit("broadcast", { broadcastMessage: msg, time: timestamp });
	});


	// one-to-many message that will cause the server to broadcast a message to all clients, but not the sender
	socket.on("everybody else", (msg) => {

		console.log(`everybody else: ${msg}`);

		const timestamp = getTimeStamp();

		socket.broadcast.emit("broadcast", { messageToEverybodyElse: msg, time: timestamp });
	});


	// user code
	// one-to-one message client-to-server
	socket.on("user name", (msg) => {

		console.log(`A user called ${msg} joined`);

		const timestamp = getTimeStamp();

		// response back to client
		socket.emit("join confirmation", { joinConfirmation: `confirmation: You joined as: ${msg}`, time: timestamp });

		socket.broadcast.emit("broadcast", {
			messageToEverybodyElse: `${msg} joined`, time: timestamp });

		//socket.users.
	});

});



// Demonstrating sending a ping or daemon-style message on a regular basis
setInterval( () => {

	const msg = "interval message";

	console.log(`universal: ${msg}`);

	const timestamp = getTimeStamp();

	io.emit("broadcast", { autoBroadcastMessage: msg, time: timestamp });

}, 30000);



// Let 'er rip!
let appInstance = server.listen(process.env.PORT || 9001,  () => {
	console.log(`socket.io test is running on port ${appInstance.address().port}`);
});

