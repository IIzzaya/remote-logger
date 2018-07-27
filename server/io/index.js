module.exports = function () {
  const server = require("http").createServer(this.nuxt.renderer.app);
  const io = require("socket.io")(server);

  // overwrite nuxt.listen()
  this.nuxt.listen = (port, host) => new Promise((resolve) => server.listen(port || 3000, host || "localhost", resolve));
  // close this server on "close" event
  this.nuxt.hook("close", () => new Promise((resolve) => server.close(resolve)));

  // Add `socket.io-client` in vendor
  this.addVendor("socket.io-client");

  // Add socket.io events
  let messages = [];
  io.on("connection", (socket) => {
    console.log("  [socket.io]: A client connected");
    // console.log(socket);
    socket.on("set-channel", function (message) {
      console.log("  [socket.io]: on(set-channel)");
      console.log(message);
      socket.broadcast.emit("new-message", message);
    });
    socket.on("last-messages", function (fn) {
      console.log("  [socket.io]: on(last-messages)");
      console.log(messages);
      fn(messages.slice(-50));
    });
    socket.on("send-message", function (message) {
      console.log("  [socket.io]: on(send-message)");
      console.log(message);
      messages.push(message);
      socket.broadcast.emit("new-message", message);
    });
  });
};
