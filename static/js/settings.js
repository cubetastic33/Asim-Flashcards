var currentUserName = document.getElementById('user-name-text');
var currentUserEmail = document.getElementById('user-email-text');
var isdarkmodeOn;
var isTimerRunning;

document.addEventListener('DOMContentLoaded', function(){
    if(!localStorage.getItem('currentUserName')){
        localStorage.setItem('currentUserName', 'Bob Smith')
    }else{
        currentUserName.innerHTML = localStorage.getItem('currentUserName');
    }

    if(!localStorage.getItem('currentUserEmail')){
        localStorage.setItem('currentUserEmail', 'bobsmith@gmail.com')
    }else{
        currentUserEmail.innerHTML   = localStorage.getItem('currentUserEmail');
    }

    if(!localStorage.getItem('darkmode')){
        localStorage.setItem('darkmode', 'false');
    }else{
        isdarkmodeOn = localStorage.getItem('darkmode');
        if(isdarkmodeOn == 'false'){
            changeToLightmode();
        } else {
            changeToDarkmode();
        }
    }
});
function isEmpty() {
    if(document.getElementById("user-name").value==="") { 
           document.getElementById('edit-button').disabled = true; 
       } else { 
           document.getElementById('edit-button').disabled = false;
       }
}
function editUserInfo(){
    var userinfoContainer = document.getElementsByClassName("name-email-container")[0];
    var editUserinfo = document.getElementsByClassName("user-info-form")[0];
    var editButton = document.getElementById("edit-button");
    var newUserName = document.getElementById("user-name").value;
    var newUserEmail = document.getElementById("user-email").value;

    if (editUserinfo.style.display === "none") {
        userinfoContainer.style.display = "none";
        editUserinfo.style.display = "block";
        editButton.value = "Save";
    } else {
        currentUserName.innerHTML = newUserName;
        currentUserEmail.innerHTML = newUserEmail;
        localStorage.setItem('currentUserName', newUserName);
        localStorage.setItem('currentUserEmail', newUserEmail);
        userinfoContainer.style.display = "block";
        editUserinfo.style.display = "none";
        editButton.value = "Edit";
    }
}

function resetPassword(){
    var passwordText = document.getElementById('user-possword-text');
    var resetPassword = document.getElementsByClassName("reset-password-form")[0];
    var resetButton = document.getElementById("reset-button");
    var passworderror = document.getElementById("password-error");
    var currentpassword = document.getElementById("current-password").value;
    var newpassword = document.getElementById("new-password").value;
    var confirmpassword = document.getElementById("confirm-password").value;

    if (resetPassword.style.display === "none") {
        passwordText.style.display = "none";
        resetPassword.style.display = "block";
        resetButton.value = "Save";
    } else {
        if(confirmpassword === newpassword){
            passwordText.style.display = "block";
            resetPassword.style.display = "none";
            passworderror.style.display = "none";
            resetButton.value = "Reset";
        } else {
            passworderror.style.display = "block";
        }
    }
}

var shcemeText = document.getElementById('sheme-text');

function defaultScheme(){
    var degaultScheme = document.getElementById("scheme-default");
    shcemeText.innerText = "This is default"
}
function blueScheme(){
    var blueScheme = document.getElementById("scheme-blue");
    shcemeText.innerText = "This is blue"
}
function redScheme(){
    var redScheme = document.getElementById("scheme-red");
    shcemeText.innerText = "This is red"

}
function yellowScheme(){
    var yellowScheme = document.getElementById("scheme-yellow");
    shcemeText.innerText = "This is yellow"

}
function greenScheme(){
    var greenScheme = document.getElementById("scheme-green");
    shcemeText.innerText = "This is green"
}

function changeToLightmode(){
    var lightmode = document.body;
    var logout = document.querySelector(".logout");
    var inputBox = document.querySelector(".set-count");
    var coloricon = document.querySelector(".color-scheme-icon");
    var darkmodeicon = document.querySelector(".darkmode-icon");
    var timericon = document.querySelector(".pomodoro-timer-icon");

    coloricon.src = "../images/light_color.png";
    darkmodeicon.src = "../images/light_darkmode.png";
    timericon.src = "../images/light_timer.png";

    lightmode.style.color = "black";
    lightmode.style.backgroundColor = "whitesmoke";

    inputBox.style.color = "black";
    inputBox.style.backgroundColor = "whitesmoke";
    inputBox.style.borderColor = "black";

    logout.style.color = "black";

    localStorage.setItem("darkmode", 'false');
}
function changeToDarkmode(){
    var darkmode = document.body;
    var logout = document.querySelector(".logout");
    var inputBox = document.querySelector(".set-count");
    var coloricon = document.querySelector(".color-scheme-icon");
    var darkmodeicon = document.querySelector(".darkmode-icon");
    var timericon = document.querySelector(".pomodoro-timer-icon");

    coloricon.src = "../images/dark_color.png";
    darkmodeicon.src = "../images/dark_darkmode.png";
    timericon.src = "../images/dark_timer.png";

    darkmode.style.color = "whitesmoke";
    darkmode.style.backgroundColor = "black";

    inputBox.style.color = "whitesmoke";
    inputBox.style.backgroundColor = "black";
    inputBox.style.borderColor = "grey";

    logout.style.color = "whitesmoke";

    localStorage.setItem("darkmode", 'true');
}

const pomodoro = {
  workMinutes: 0,
  workSeconds: 5,
  breakMinutes: 0,
  breakSeconds: 5,

  completed : document.querySelector("#completed"),
  total : document.querySelector("#total"),
  iterations: 1,

  setDisplay: document.querySelector("#set-display"),
  countDisplay: document.querySelector("#count-display"),
  timer: document.querySelector("#timer"),

  intervalId: null,
  isRunning: false,
  isWorking: true,

  start() {
    const setCount = document.querySelector("#set").value; 
    if (!this.isRunning) {
        this.isRunning = true;
        this.completed.textContent = this.iterations;
        this.total.textContent = setCount;  
        this.intervalId = setInterval(() => {
            if (this.isWorking) {
                if (this.workSeconds === 0) {
                    if (this.workMinutes === 0) {
                        this.switchToBreak();
                    } else {
                        this.workMinutes--;
                        this.workSeconds = 59;
                    }
                } else {
                    this.workSeconds--;
                }
                this.updateTime();
            } else {
                if (this.breakSeconds === 0) {
                    if (this.breakMinutes === 0) {
                        this.updateCounter();
                        this.switchToWork();
                    } else {
                        this.breakMinutes--;
                        this.breakSeconds = 59;
                    }
                } else {
                    this.breakSeconds--;
                }
                this.updateTime();
            }
        }, 1000);
    }
  },

  stop() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  },

  reset() {
    this.workMinutes = 0;
    this.workSeconds = 5;
    this.breakMinutes = 0;
    this.breakSeconds = 5;
    this.iterations = 1;
    this.isWorking = true;
    this.updateTime();
  },

  updateTime() {
    const minutesSpan = document.querySelector('#minutes');
    const secondsSpan = document.querySelector('#seconds');
    const modeSpan = document.querySelector('#mode');
    if (this.isWorking) {
      modeSpan.textContent = 'Study';
      minutesSpan.textContent = this.workMinutes.toString().padStart(2, '0');
      secondsSpan.textContent = this.workSeconds.toString().padStart(2, '0');
    } else {
      modeSpan.textContent = 'BREAK';
      minutesSpan.textContent = this.breakMinutes.toString().padStart(2, '0');
      secondsSpan.textContent = this.breakSeconds.toString().padStart(2, '0');
    }
  },

  switchToBreak() {
    this.breakMinutes = 0;
    this.breakSeconds = 5;
    this.isWorking = false;
    this.updateTime();
  },

  switchToWork() {
    this.workMinutes = 0;
    this.workSeconds = 5;
    this.isWorking = true;
    this.updateTime();
  },

  countSet(){
    this.setDisplay.style.display = 'block';
    this.countDisplay.style.display = 'none';
    this.timer.style.display = 'block';
  },

  setCounter(){
    this.setDisplay.style.display = 'none';
    this.countDisplay.style.display = 'block';
    this.timer.style.display = 'none';
  },

  updateCounter(){
    if(this.iterations < document.querySelector("#set").value){
        this.iterations++;
        this.completed.textContent = this.iterations;
        //localStorage.setItem('completed', this.completed.textContent);
    }else{
        this.stop();
        pomodoro.reset();
    }
  }
};

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

startButton.addEventListener('click', () => {
    pomodoro.countSet();
    pomodoro.start();
});

stopButton.addEventListener('click', () => {
    pomodoro.stop();
});

resetButton.addEventListener('click', () => {
    pomodoro.setCounter();
    pomodoro.stop();
    pomodoro.reset();
});