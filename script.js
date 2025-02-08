let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = [];
const modal = document.getElementById("event-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");

// Render calendar
function renderCalendar() {
  const monthYear = document.getElementById("month-year");
  monthYear.innerText = `${new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} ${currentYear}`;

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();
  const startingDay = firstDay.getDay();

  for (let i = 0; i < startingDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.innerText = i;
    dayDiv.classList.add("day");

    if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      dayDiv.classList.add("today");
    }

    if (events.some(event => event.date === `${currentYear}-${currentMonth + 1}-${i}`)) {
      dayDiv.style.backgroundColor = "#FF6347";
    }

    dayDiv.onclick = () => selectDateForEvent(i);
    calendar.appendChild(dayDiv);
  }
}

// Select date for event
function selectDateForEvent(day) {
  const clickedDate = new Date(currentYear, currentMonth, day);
  const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const dateString = clickedDate.toLocaleDateString();
  const dayName = clickedDate.toLocaleString("default", { weekday: "long" });

  document.getElementById("event-date").value = formattedDate;
  document.getElementById("event-day").value = dayName;
}

// Add event function
function addEvent() {
  const title = document.getElementById("event-title").value;
  const description = document.getElementById("event-description").value;
  const date = document.getElementById("event-date").value;

  if (title && description && date) {
    // Add event
    events.push({ title, description, date });

    // Sort events by date (ascending)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    alert("Event added!");
    renderCalendar(); // Re-render calendar
    displayEventList(); // Re-render event list
    resetForm(); // Reset form fields
  } else {
    alert("Please fill in all fields.");
  }
}

// Reset the event form fields
function resetForm() {
  document.getElementById("event-title").value = "";
  document.getElementById("event-description").value = "";
  document.getElementById("event-date").value = "";
  document.getElementById("event-day").value = "";
}

// Display event list
function displayEventList() {
  const eventListUl = document.getElementById("event-list-ul");
  eventListUl.innerHTML = "";

  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="event-title">${event.title}</div>
      <div class="event-date">${event.date}</div>
      <div class="event-description">${event.description}</div>
    `;
    eventListUl.appendChild(listItem);
  });
}

// Switch to Grid View
function switchToGridView() {
  const eventListUl = document.getElementById("event-list-ul");
  const gridButton = document.getElementById("grid-view-btn");
  const listButton = document.getElementById("list-view-btn");

  // Switch to grid layout
  eventListUl.style.gridTemplateColumns = "repeat(3, 1fr)";
  eventListUl.classList.remove("list-view");
  gridButton.style.backgroundColor = "#4CAF50";
  listButton.style.backgroundColor = "#ccc";
}

// Switch to List View
function switchToListView() {
  const eventListUl = document.getElementById("event-list-ul");
  const gridButton = document.getElementById("grid-view-btn");
  const listButton = document.getElementById("list-view-btn");

  // Switch to list layout
  eventListUl.style.gridTemplateColumns = "1fr";
  eventListUl.classList.add("list-view");
  gridButton.style.backgroundColor = "#ccc";
  listButton.style.backgroundColor = "#4CAF50";
}

// Open Modal
function openModal(event) {
  modal.style.display = "block";
  modalTitle.innerText = event.title;
  modalDescription.innerText = event.description;
}

// Close Modal
function closeModal() {
  modal.style.display = "none";
}

// Initialize Calendar
renderCalendar();
