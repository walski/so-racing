window.onload = function() {
  var setupTrack = function() {
    console.log("Setting up track")
    var socket = window.io.connect('http://localhost:12346/track');

    var updateTrackInfo = function() {
      document.getElementById('track-status').innerText = "Controlling track " + (socket.controllingTrack ? socket.controllingTrack : 'none');
    }

    var sendProposal = function() {
      console.log("Sent controller proposal")
      socket.emit('controller-proposal');
    }

    var updateControllerStatus = function(options) {
      console.log("Accepted as controller", options)
      socket.controllingTrack = options.track;
    }

    socket.on('controller-auction', sendProposal);
    socket.on('accepted-as-controller', updateControllerStatus);

    return socket;
  }

  var track = setupTrack();
  var car = new Car(track);

  document.getElementById('run').addEventListener('click', function(e) {
    car.stop();
    car = new Car(track);
    code = document.getElementById('track-code').value;
    window.eval.call(window,'(function (car) {' + code + '})')(car);
    e.preventDefault();
  });

  document.getElementById('stop').addEventListener('click', function(e) {
    e.preventDefault();
    car.stop();
  });
}

/* Sample:

var getTime = function() {return new Date().getTime() / 1000;}

var startTime = getTime();

setInterval(function() {
  var currentTime = getTime();
  var passedTime = currentTime - startTime;
  var thrust =Math.sin(passedTime) * 0.5 + 0.5;
  car.thrust(thrust)
}, 500);

*/