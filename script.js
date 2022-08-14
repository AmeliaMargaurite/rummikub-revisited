// WebSocket variables
const url = "wss://rummikub-server.herokuapp.com/server";
const myWSServer = new WebSocket(url);

const myMessages = document.getElementById("messages");
const myInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

const sendMsg = () => {
	const text = myInput.value;
	msgGeneration(text, "Client");
	myWSServer.send(text);
};

const msgGeneration = (msg, from) => {
	const newMessage = document.createElement("h4");
	newMessage.innerHTML = `${from} says: ${msg}`;
	myMessages.appendChild(newMessage);
};

const ping = () => {
	myWSServer.send("__ping__");
	tm = setTimeout(() => {
		console.log("Pong not received, connection closed");
		myWSServer.close();
	}, 5000);
};

const pong = () => clearTimeout(tm);

myWSServer.onopen = () => {
	sendBtn.disabled = false;
	setInterval(ping, 30000);
};

myWSServer.onmessage = (event) => {
	const { msg } = event;
	if (msg === "__ping__") {
		pong();
		return;
	}
	msgGeneration(msg, "Server");
};

sendBtn.disabled = true;
sendBtn.addEventListener("click", sendMsg, false);
