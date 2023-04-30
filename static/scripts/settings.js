document.querySelector('#settings-logout a').addEventListener('click', e => {
    e.preventDefault();
    // Log the user out first
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'password_hash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect
    location.href = '/login';
  });



//User info
const nameEmailContainer = document.getElementById("name-email-text-container");
const editButton = document.getElementById("settings-name-email-edit-button");
const resetButton = document.getElementById("settings-password-reset-button");
const savePassButton = document.getElementById('form-password-save-button');
const nameEmailForm = document.getElementById("name-email-form");
const passwprdForm = document.getElementById("password-form");

editButton.addEventListener("click", () => {
    nameEmailContainer.style.display = "none";
    editButton.style.display = "none";
    nameEmailForm.style.display = "block";
})

document.querySelector('#name-email-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(document.querySelector('#name-email-form')));
    fetch('/update_user', {
        method: 'POST',
        body: data,
    }).then(response => response.json()).then(data => {
        if (data === 'Success') {
            nameEmailContainer.style.display = "block";
            editButton.style.display = "block";
            nameEmailForm.style.display = "none";
            // Update the values shown in the settings page
            document.querySelector('#user-name').innerText = document.querySelector('#name').value;
            document.querySelector('#user-email').innerText = document.querySelector('#email').value;
        } else {
            alert(data);
        }
    });
});

resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  passwprdForm.style.display = "block";
})

passwprdForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(passwprdForm));
    fetch('/update_password', {
        method: 'POST',
        body: data,
    }).then(response => response.json()).then(data => {
        if (data === 'Success') {
            resetButton.style.display = "block";
            passwprdForm.style.display = "none";
        } else {
            alert(data);
        }
    });
});

//color scheme change
var schemeText = document.getElementById("scheme-text");
const defaultScheme = document.getElementById("scheme-default");
const blueScheme = document.getElementById("scheme-blue");
const redScheme = document.getElementById("scheme-red");
const yellowScheme = document.getElementById("scheme-yellow");
const greenScheme = document.getElementById("scheme-green");

defaultScheme.addEventListener("click", () => {
    schemeText.innerText = "This is the default scheme";
});
blueScheme.addEventListener("click", () => {
    schemeText.innerText = "This is the blue scheme";
});
redScheme.addEventListener("click", () => {
    schemeText.innerText = "This is the red scheme";
});
yellowScheme.addEventListener("click", () => {
    schemeText.innerText = "This is the yellow scheme";
});
greenScheme.addEventListener("click", () => {
    schemeText.innerText = "This is the green scheme";
});



// light/dark mode
const lightMode = document.getElementById("lightmode-pannel");
const darkMode = document.getElementById("darkmode-pannel");
var wrapper = document.querySelector(".settings-wapper");
var body = document.body;
var colorIcon = document.querySelector("#settings-scheme-icon");
var darkmodeIcon = document.querySelector("#settings-darkmode-icon");
var timerIcon = document.querySelector("#settings-timer-icon");
var logoutText = document.querySelector(".logoutText");

lightMode.addEventListener('click', () => {
    body.style.color = "black";
    body.style.backgroundColor = "white";
    wrapper.style.color = "black";
    wrapper.style.backgroundColor = "white";
    colorIcon.src = "../images/light_color.png";
    darkmodeIcon.src = "../images/light_darkmode.png";
    timerIcon.src = "../images/light_timer.png";
    logoutText.style.color = "black";
})

darkMode.addEventListener('click', () => {
    body.style.color = "whitesmoke";
    body.style.backgroundColor = "#1a1919";
    wrapper.style.color = "whitesmoke";
    wrapper.style.backgroundColor = "#1a1919";
    colorIcon.src = "../images/dark_color.png";
    darkmodeIcon.src = "../images/dark_darkmode.png";
    timerIcon.src = "../images/dark_timer.png";
    logoutText.style.color = "whitesmoke";
})



//Timer
const pomodoro = {
    workMinutes: 25,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0,

    completed : document.querySelector("#completed"),
    total : document.querySelector("#total"),
    iterations: 1,

    activeDisplay: document.querySelector("#settings-active-display"),
    setDisplay: document.querySelector("#settings-set-display"),

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
      this.workMinutes = 25;
      this.workSeconds = 0;
      this.breakMinutes = 5;
      this.breakSeconds = 0;
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
      this.breakMinutes = 5;
      this.breakSeconds = 0;
      this.isWorking = false;
      this.updateTime();
    },

    switchToWork() {
      this.workMinutes = 25;
      this.workSeconds = 0;
      this.isWorking = true;
      this.updateTime();
    },

    countSet(){
      this.activeDisplay.style.display = 'block';
      this.setDisplay.style.display = 'none';
    },

    setCounter(){
        this.activeDisplay.style.display = 'none';
        this.setDisplay.style.display = 'block';
    },

    updateCounter(){
      if(this.iterations < document.querySelector("#set").value){
          this.iterations++;
          this.completed.textContent = this.iterations;
      }else{
          this.stop();
          pomodoro.reset();
      }
    }
  };

  const startButton = document.querySelector('#settings-timer-start');
  const stopButton = document.querySelector('#settings-timer-stop');
  const clearButton = document.querySelector('#settings-timer-clear');

  startButton.addEventListener('click', () => {
      pomodoro.countSet();
      pomodoro.start();
  });

  stopButton.addEventListener('click', () => {
      pomodoro.stop();
  });

  clearButton.addEventListener('click', () => {
      pomodoro.setCounter();
      pomodoro.stop();
      pomodoro.reset();
  });
