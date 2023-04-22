const calendar = document.querySelector('.calendar');
const prevBtn = calendar.querySelector('.prev');
const nextBtn = calendar.querySelector('.next');
const monthYear = calendar.querySelector('.month-year');
const tbody = calendar.querySelector('tbody');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();



function generateCalendar() {
  // Clear any existing cells
  tbody.innerHTML = '';

  // Set the month and year in the header
  monthYear.textContent = `${months[currentMonth]}`;

  // Calculate the number of days in the current month
  const days = daysInMonth[currentMonth];

  // Create a new Date object for the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1);

  // Calculate the day of the week for the first day of the month
  const startDay = firstDay.getDay();

  // Create a new row for the first week
  let row = document.createElement('tr');

  // Add blank cells for any days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    let cell = document.createElement('td');
    cell.classList.add('blank');
    row.appendChild(cell);
  }

  // Add cells for each day of the month
  for (let i = 1; i <= days; i++) {
    let cell = document.createElement('td');
    cell.setAttribute('data-date', `${currentYear}-${currentMonth + 1}-${i}`);
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

  // Add blank cells for any remaining days in the last week
  if (row.children.length > 0) {
    for (let i = row.children.length; i < 7; i++) {
      let cell = document.createElement('td');
      cell.classList.add('blank');
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

generateCalendar();

// Wrap day numbers in a span with the class "day-number"
// Wrap day numbers in a div with the class "day-number-container"
for (let i = 1; i <= daysInMonth[currentMonth]; i++) {
  const dayNumberContainer = document.createElement('div');
  dayNumberContainer.classList.add('day-number-container');
  const dayNumber = document.createElement('span');
  dayNumber.textContent = i;
  dayNumber.classList.add('day-number');
  dayNumberContainer.appendChild(dayNumber);

  const cell = calendar.querySelector(`[data-date="${currentYear}-${currentMonth + 1}-${i}"]`);
  if (cell) {
    cell.appendChild(dayNumberContainer);
  }
}

// Add event listener for the "Add Task" button
const openModalBtn = document.querySelector('.open-modal-btn');
openModalBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal-tasks');
    modal.style.display = 'block';
    const taskInput = modal.querySelector('.task-input');
    taskInput.focus();
});

// Add the close button event listener
const modal = document.querySelector('.modal-tasks');
const closeBtn = modal.querySelector('.close');
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  const taskInput = modal.querySelector('.task-input');
  taskInput.classList.remove('error');
  taskInput.placeholder = 'Enter task...';
});

// Add event listeners for navigation buttons
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

// Add event listener for clicking on a date cell
tbody.addEventListener('click', (e) => {
    const cell = e.target.closest('.date');
    if (cell) {
      const modal = document.querySelector('.modal-tasks'); // Update this line
      const modalContent = modal.querySelector('.modal-tasks-content');
      const taskInput = modal.querySelector('.task-input');
      const addBtn = modal.querySelector('.add-btn');
      const closeBtn = modal.querySelector('.close');
        // Set the task count and task list for the selected date
        const taskCount = cell.querySelector('.task-count');
        const taskList = cell.querySelector('.task-list');
        const tasks = JSON.parse(localStorage.getItem(cell.dataset.date)) || [];
        taskCount.textContent = tasks.length;
        taskList.innerHTML = '';
        tasks.forEach(task => {
          let taskItem = document.createElement('li');
          taskItem.textContent = task;
          taskItem.classList.add('task-item');
          taskList.appendChild(taskItem);
        });

       // Add task when user clicks Add button
        addBtn.addEventListener('click', () => {
            const errorMessage = modal.querySelector('.error-message');
            if (taskInput.value.trim()) {
            tasks.push(taskInput.value.trim());
            localStorage.setItem(cell.dataset.date, JSON.stringify(tasks));
            taskCount.textContent = tasks.length;
            let taskItem = document.createElement('li');
            taskItem.textContent = taskInput.value.trim();
            taskItem.classList.add('task-item');
            taskList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.focus();
        
            // Hide the error message if the input is not empty
            errorMessage.hidden = true;
            } else {
            // Show the error message if the input is empty
            errorMessage.hidden = false;
            }
        });
  

        // Hide the modal when user clicks outside it
        window.addEventListener('click', (e) => {
          if (e.target == modal) {
            modal.style.display = 'none';
            taskInput.classList.remove('error');
            taskInput.placeholder = 'Enter task...';
          }
        });
      }
    });
    
