const EventEmitter = require("events");

const customEmitter = new EventEmitter();

//Subscribe to 'response' event
customEmitter.on("response", (name, id) => {
  console.log(`data received user ${name} with id: ${id}`);
});
//Emit 'response' event
customEmitter.emit("response", "john", 34);
