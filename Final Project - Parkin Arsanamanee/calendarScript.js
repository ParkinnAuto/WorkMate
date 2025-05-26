const titleName = document.getElementById('titleName');
const onTopDate = document.querySelector('.onTopDate');
const prevButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const datesContainer = document.querySelector('.dates');

let currentDate = new Date();
const today = new Date(); // Store today's date for comparison

// Function to update calendar
function updateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    titleName.textContent = "Calendar"; // Keep this title static
    onTopDate.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    datesContainer.innerHTML = ''; // Clear previous dates

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Fill in previous month's days
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('date', 'prev-date');
        datesContainer.appendChild(emptyDiv);
    }

    // Fill in current month's days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('date');
        dayDiv.textContent = day;

        // Highlight the current date
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('current-date'); // Add a special class for today
        }

        datesContainer.appendChild(dayDiv);
    }

    // Fill in next month's empty days
    const remainingDays = 42 - (firstDay.getDay() + lastDay.getDate());
    for (let i = 0; i < remainingDays; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('date', 'prev-date');
        datesContainer.appendChild(emptyDiv);
    }
}

prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Initialize calendar on load
updateCalendar();