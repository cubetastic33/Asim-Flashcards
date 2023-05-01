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


  // dark mode for the setting page
  const darkmode = document.getElementById("darkmode-icon");
  const lightmodepanel = document.getElementById("lightmode-pannel");
  const darkmodepanel = document.getElementById("darkmode-pannel");
  darkmode.addEventListener("click", switchToDarkMode);
  lightmodepanel.addEventListener("click", switchToDarkMode);
  darkmodepanel.addEventListener("click", switchToDarkMode);
  var mode = false;
  var icons = false;
  
  function switchToDarkMode() {
     darkmode.innerText = darkmode.innerText === "dark_mode" ? "light_mode" : "dark_mode";
     document.querySelector(".navbar").classList.toggle("switchToDarkMode-header");
     document.querySelector(".modal").classList.toggle("switchToDarkMode-header");
     document.querySelector(".nav-title").classList.toggle("switchToDarkMode-header");
     document.querySelector("#ham").classList.toggle("switchToDarkMode-hamburger");
     document.querySelector("#bur").classList.toggle("switchToDarkMode-hamburger");
     document.querySelector("#ger").classList.toggle("switchToDarkMode-hamburger");
     document.querySelector(".timer").classList.toggle("switchToDarkMode-timer");
     document.body.classList.toggle("switchToDarkMode-body");

     if(mode){
         mode = false;
         document.querySelector("#darkmode-icon").style.backgroundColor = "#ffffff";
         document.querySelector("#timer-icon").style.backgroundColor = "#ffffff";
         document.querySelector(".navbar-hamburger").style.backgroundColor = "#ffffff";
     } else {
         mode = true;
         document.querySelector("#darkmode-icon").style.backgroundColor = "#232222";
         document.querySelector("#timer-icon").style.backgroundColor = "#232222";
         document.querySelector(".navbar-hamburger").style.backgroundColor = "#232222";
     }
     if(icons) {
        icons = false;
        document.querySelector("#settings-scheme-icon").src="../images/light_color.png";
        document.querySelector("#settings-darkmode-icon").src="../images/light_darkmode.png";
        document.querySelector("#settings-timer-icon").src="../images/light_timer.png";
    } else {
        icons = true;
        document.querySelector("#settings-scheme-icon").src="../images/dark_color.png";
        document.querySelector("#settings-darkmode-icon").src="../images/dark_darkmode.png";
        document.querySelector("#settings-timer-icon").src="../images/dark_timer.png";
    }
  
     var linkTexts = document.querySelectorAll(".link-text");
     linkTexts.forEach((element) => {
         element.classList.toggle("switchToDarkMode-links");
     })
 
  }

