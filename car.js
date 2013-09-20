var Car = function(socket) {
  var done = false;
  this.stop = function() {
    socket.emit('thrust', {thrust: 0})
    done = true;
  }

  this.thrust = function(level) {
    if (done) {
      return;
    }
    console.log("Thrust to", level)
    socket.emit('thrust', {thrust: level})
  }
}