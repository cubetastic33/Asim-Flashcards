document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.querySelector('.calendar');
  const prevBtn = calendar.querySelector('.prev');
  const nextBtn = calendar.querySelector('.next');
  const monthYear = calendar.querySelector('.month-year');
  const tbody = calendar.querySelector('tbody');
  const modal = document.querySelector('.modal-tasks');
  const taskMonthElement = modal.querySelector('#month-select');
  const taskDayDropdown = modal.querySelector('#days-select');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const monthSelect = document.getElementById('month-select');
  const daysSelect = document.getElementById('days-select');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function populateDays(selectedDay = new Date().getDate()) {
    const selectedMonth = monthSelect.value;
    const daysSelect = document.getElementById('days-select');

    let daysInSelectedMonth;
    if (selectedMonth == 1) {
      const selectedYear = new Date().getFullYear();
      const isLeapYear = selectedYear % 4 === 0 && selectedYear % 100 !== 0 || selectedYear % 400 === 0;
      daysInSelectedMonth = isLeapYear ? 29 : 28;
    } else {
      daysInSelectedMonth = daysInMonth[selectedMonth];
    }

    daysSelect.innerHTML = '';

    const placeholderOption = document.createElement('option');
    placeholderOption.text = '-';
    placeholderOption.value = '';
    daysSelect.add(placeholderOption);

    for (let i = 1; i <= daysInSelectedMonth; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      daysSelect.add(option);
      if (i === selectedDay) {
        option.selected = true;
      }
    }
  }
  monthSelect.addEventListener('change', populateDays);

  function loadTasks(date) {
    const tasks = JSON.parse(localStorage.getItem(date)) || [];
    return tasks;
  }

  function displayTasks(date, cell) {
    const taskCount = cell.querySelector('.task-count');
    const taskList = cell.querySelector('.task-list');
    const tasks = loadTasks(date);

   
    taskList.innerHTML = '';

    tasks.forEach(task => {
      let taskItem = document.createElement('li');
      taskItem.textContent = task;
      taskItem.classList.add('task-item');
      taskList.appendChild(taskItem);
    });
  }

  function generateCalendar() {
    tbody.innerHTML = '';

    monthYear.textContent = `${months[currentMonth]} ${currentYear}`;

    const days = daysInMonth[currentMonth];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDay = firstDay.getDay();

    let row = document.createElement('tr');

    for (let i = 0; i < startDay; i++) {
      let cell = document.createElement('td');
      cell.classList.add('blank');
      row.appendChild(cell);
    }

    for (let i = 1; i <= days; i++) {
      let cell = document.createElement('td');
      cell.setAttribute('data-date', `${currentYear}-${String(currentMonth + 1).padStart(2,'0')}-${String(i).padStart(2, '0')}`);
      cell.classList.add('date');
      if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      cell.classList.add('today');
      }
      row.appendChild(cell);
      if (row.children.length === 7) {
      tbody.appendChild(row);
      row = document.createElement('tr');
      }
      }
      if (row.children.length > 0) {
        for (let i = row.children.length; i < 7; i++) {
          let cell = document.createElement('td');
          cell.classList.add('blank');
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
      
      let dateCells = calendar.querySelectorAll('.date');
      for (let i = 0; i < dateCells.length; i++) {
        const dayNumberContainer = document.createElement('div');
        dayNumberContainer.classList.add('day-number-container');
        const dayNumber = document.createElement('span');
        dayNumber.textContent = i + 1;
        dayNumber.classList.add('day-number');
        dayNumberContainer.appendChild(dayNumber);
      
        const cell = dateCells[i];
        if (cell && !cell.classList.contains('blank')) {
          cell.appendChild(dayNumberContainer);
          
          
      
          const taskList = document.createElement('ul');
          taskList.classList.add('task-list');
          cell.appendChild(taskList);
      
          displayTasks(cell.dataset.date, cell);
        }
      }
    }

    window.onload = function() {
    generateCalendar();
    };
    
    const openModalBtn = document.querySelector('.open-modal-btn');
    openModalBtn.addEventListener('click', () => {
    populateDays();
    modal.style.display = 'block';
    const taskInput = modal.querySelector('.task-input');
    taskInput.focus();
    });
    
    const addBtn = modal.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
    const taskInput = modal.querySelector('.task-input');
    const errorMessage = modal.querySelector('.error-message');
    if (taskInput.value.trim()) {
      const cell = document.querySelector(`[data-date="${currentYear}-${String(parseInt(taskMonthElement.value) + 1).padStart(2, '0')}-${taskDayDropdown.value}"]`);
      console.log(cell);
      if (cell) {
      const tasks = loadTasks(cell.dataset.date);
      tasks.push(taskInput.value.trim());
      localStorage.setItem(cell.dataset.date, JSON.stringify(tasks));
      
      displayTasks(cell.dataset.date, cell);
      taskInput.value = '';
      taskInput.focus();
      errorMessage.hidden = true;
      modal.style.display = 'none';
    } else {
      console.log('Cell not found');
    }
  } else {
    errorMessage.hidden = false;
  }
});

  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    const taskInput = modal.querySelector('.task-input');
    taskInput.classList.remove('error');
    taskInput.placeholder = 'Enter task...';
  });


  prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
    }
    generateCalendar();
  });

  nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
    }
    generateCalendar();
  });
});


const darkmode = document.getElementById("darkmode-icon");
darkmode.addEventListener("click", switchToDarkMode);
var mode = false;

function switchToDarkMode() {
   darkmode.innerText = darkmode.innerText === "dark_mode" ? "light_mode" : "dark_mode";
   document.querySelector(".navbar").classList.toggle("switchToDarkMode-header");
   document.querySelector(".modal").classList.toggle("switchToDarkMode-header");
   document.querySelector(".nav-title").classList.toggle("switchToDarkMode-header");
   document.querySelector("#ham").classList.toggle("switchToDarkMode-hamburger");
   document.querySelector("#bur").classList.toggle("switchToDarkMode-hamburger");
   document.querySelector("#ger").classList.toggle("switchToDarkMode-hamburger");
   document.querySelector(".timer").classList.toggle("switchToDarkMode-timer");
   document.querySelector("#sun").classList.toggle("switchToDarkMode-body");
   document.querySelector("#mon").classList.toggle("switchToDarkMode-body");
   document.querySelector("#tue").classList.toggle("switchToDarkMode-body");
   document.querySelector("#wed").classList.toggle("switchToDarkMode-body");
   document.querySelector("#thu").classList.toggle("switchToDarkMode-body");
   document.querySelector("#fri").classList.toggle("switchToDarkMode-body");
   document.querySelector("#sat").classList.toggle("switchToDarkMode-body");
   document.querySelector(".today").classList.toggle("switchToDarkMode-today");
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

   var linkTexts = document.querySelectorAll(".link-text");
   linkTexts.forEach((element) => {
       element.classList.toggle("switchToDarkMode-links");
   })

}