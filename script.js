const timerDisplay = document.getElementById('timer-container');
const toggleButton = document.getElementById('toggle-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps');

let timerInterval;
let timerRunning = false;
let minutes = 0, seconds = 0, milliseconds = 0;
let lapCount = 1;


function updateTimer() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
}


function toggleTimer() {
    if (!timerRunning) {
        startTimer();
        toggleButton.querySelector('#play-icon').style.display = 'none';
        toggleButton.querySelector('#pause-icon').style.display = 'inline-block';
    } else {
        stopTimer();
        toggleButton.querySelector('#play-icon').style.display = 'inline-block';
        toggleButton.querySelector('#pause-icon').style.display = 'none';
    }
}


function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 10); 
        timerRunning = true;
    }
}


function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}


function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    timerDisplay.textContent = `00:00:00`;
    lapsList.innerHTML = ''; 
    lapCount = 1;
    toggleButton.querySelector('#play-icon').style.display = 'inline-block'; 
    toggleButton.querySelector('#pause-icon').style.display = 'none'; 
}


function recordLap() {
    if (timerRunning) {
        const lapTime = timerDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `${lapTime}`;
        lapsList.prepend(lapItem);
        lapCount++;
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


function formatMilliseconds(ms) {
    if (ms < 10) {
        return `0${ms}`;
    } else if (ms < 100) {
        return `${ms}`;
    } else {
        return `${ms}`;
    }
}


toggleButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
