// Add the express module
const app = require("express")();


// Allow access to static assets, e.g. html pages
app.use(express.static(__dirname));

// Enable JSON processing in routes
app.use(express.json());

//// Enable socket.io
//var http = require('http').Server(app);
//var io = require('socket.io')(http);



//function getTimeStamp() {

//	return new Date().toISOString();
//}


//// Set up connection and message types
//io.on('connection', function (socket) {

//	console.log('a user connected');

//	socket.on("test msg", function (msg) {

//		console.log(`message: ${msg}`);

//		const timestamp = getTimeStamp();

//		socket.emit("personal message", { message: `You sent: ${msg}`, time: timestamp} );
//	});

//	socket.on("everyone", function (msg) {

//		console.log(`everyone: ${msg}`);

//		const timestamp = getTimeStamp();

//		io.emit("broadcast", { broadcastMessage: msg, time: timestamp });
//	});
//});





// Start the server up
let appInstance = http.listen(process.env.PORT || 9001, function () {
	console.log(`socket.io test is running on port ${appInstance.address().port}`);
});


