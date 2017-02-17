Connection = function(messageHandler) {
  this.connected = false;
  var wsImpl = window.WebSocket || window.MozWebSocket;
  console.log("Connecting to server...");
  // create a new websocket and connect
  this.ws = new wsImpl('ws://localhost:8181/');

  // when data is comming from the server, this metod is called
  this.ws.onmessage = function (evt) {
      console.log("Received: " + evt.data);
      messageHandler.handleMessage(evt.data);
  };
  // when the connection is established, this method is called
  this.ws.onopen = function () {
    console.log("Connected to server! ");
    this.connected = true;
    messageHandler.handleOpenConnection();
  };
  // when the connection is closed, this method is called
  this.ws.onclose = function () {
    console.log("Conection closed");
    this.connected = false;
    messageHandler.handleClosedConnection();
  }
  //when Error
  this.ws.onerror = function () {
    console.log("Error!");
    messageHandler.handleConnectionError();
  }
}

Connection.prototype.sendMessage = function(message)
{
  if (this.isConnected())
  {
    this.ws.send(message);
  }
}

Connection.prototype.isConnected = function()
{
  return this.connected;
}
/*
function onButtonPressed()
{
  var test = new Connection();
  console.log("IsConnected?: " + test.isConnected())

}
*/
