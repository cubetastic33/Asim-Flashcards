const timerModal = document.getElementById("timer-modal");
const timerIcon = document.getElementById("timer-icon");

// Open and Close the timer modal
timerIcon.addEventListener("click", function() {
  timerModal.classList.toggle("active");
});

const timerTime = document.getElementById("timer-time");
const startPauseTimerButton = document.getElementById("start-pause-timer");
const restartTimerButton = document.getElementById("restart-timer");
const timerMode = document.getElementById("timer-mode");

let studyTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let timerInterval;
let isRunning = false;
let isBreak = false;

const audio = new Audio('/get_sound');
audio.volume = 0.25;

// Format the seconds into mm:ss
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
  const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Update the timer display
function updateTimerDisplay() {
  if (isBreak) {
    timerTime.textContent = formatTime(breakTime);
    timerMode.textContent = "Break";
  } else {
    timerTime.textContent = formatTime(studyTime);
    timerMode.textContent = "Study";
  }
}

// Start the timer
function startTimer() {
  isRunning = true;
  timerInterval = setInterval(() => {
    if (isBreak) {
      breakTime--;
      if (breakTime === 0) {
        clearInterval(timerInterval);
        isBreak = false;
        startPauseTimerButton.textContent = "Start";
        updateTimerDisplay();
        // open the modal
        timerModal.classList.toggle("active");
        return;
      }
    } else {
      studyTime--;
      if (studyTime === 0) {
        clearInterval(timerInterval);
        isBreak = true;
        breakTime = 5 * 60;
        startPauseTimerButton.textContent = "Start";
        updateTimerDisplay();
        audio.play();
        // open the modal
        timerModal.classList.toggle("active");
        return;
      }
    }
    updateTimerDisplay();
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Restart the timer
function restartTimer() {
  isBreak = false;
  studyTime = 25 * 60;
  breakTime = 5 * 60;
  updateTimerDisplay();
}

// Attach event listeners to timer controls
startPauseTimerButton.addEventListener("click", function() {
  if (isRunning) {
    pauseTimer();
    startPauseTimerButton.textContent = "Start";
  } else {
    startTimer();
    startPauseTimerButton.textContent = "Pause";
  }
});

restartTimerButton.addEventListener("click", restartTimer);

// Initialize the timer display
updateTimerDisplay();
