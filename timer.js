timer = document.getElementById('timer');
toggleBtn = document.getElementById('toggle');
resetBtn = document.getElementById('reset');

watch = new Stopwatch(timer);

timerMilliseconds;
timerSeconds;
timerMinutes;

function start() {
  watch.start();
}

function stop() {
  watch.stop();
}

function Stopwatch(elem) {
  var time = 0;
  var offset;
  var interval;

  function update() {
    if (this.isOn) {
      time += delta();
    }
    
    timeFormatter(time);
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;
    return timePassed;
  }

  function timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    timerMilliseconds = milliseconds;
    timerSeconds = seconds;
    timerMinutes = minutes;
    flightMinutes = minutes;
    flightSeconds = seconds;
    flightMilliseconds = milliseconds;
  }

  this.start = function() {
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
    this.isOn = true;
  };

  this.stop = function() {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };

  this.reset = function() {
    time = 0;
    update();
  };

  this.isOn = false;
}