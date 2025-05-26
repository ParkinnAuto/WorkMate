document.addEventListener("DOMContentLoaded", function() {
    // This line sets up an event listener that waits for the HTML document to be fully loaded and parsed before executing the function inside.

    // Element References
    const addTaskButton = document.getElementById('addTaskButton');
    const taskModal = document.getElementById('taskModal');
    const closeButton = document.querySelector('.closeButton'); // Changed to class selector
    const confirmButton = document.getElementById('confirmAddButton'); // Corrected ID
    const taskInput = document.getElementById('taskInput');
    const detailInput = document.getElementById('detailInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const taskList = document.getElementById('taskListItem'); // Ensure this exists in your HTML
    const activitiesLeft = document.getElementById('bottomContentsActivitiesLeft').querySelector('span');
    const checkAll = document.getElementById('bottomContentsCheckAll');
    const sortButton = document.getElementById('sortButton');
    const sortModal = document.getElementById('sortModal');
    const sortCloseButton = document.querySelector('.sortCloseButton');
    const ascending = document.getElementById('ascending');
    const decending = document.getElementById('decending');


    
    // Show the modal when the "Add" button is clicked
    addTaskButton.addEventListener('click', function() {
        taskModal.style.display = 'block'; // Show the modal
    });
    /*This adds a click event listener to the "Add Task" button. When the button is clicked, it changes the display style of the modal to block, making it visible.*/
    




    // Close the modal when the close button is clicked
    closeButton.addEventListener('click',function() {
        taskModal.style.display = 'none'; // Close the modal
        taskInput.value = ''; /*clear input field*/
    });
    /* This adds a click event listener to the close button. When it is clicked, the modal is hidden (display set to none), and the input field is cleared.*/





    // Open the sort modal when the sort button is clicked
    sortButton.addEventListener('click', function() {
        sortModal.style.display = 'block'; // Show the sort modal
    });





    // Close the sort modal button
    sortCloseButton.addEventListener('click', function() {
        sortModal.style.display = 'none'; // Hide the sort modal
    });





    // sort by ascending
    ascending.addEventListener('click', function(){
    sortTasks(true); // Sort in ascending order
    sortModal.style.display = 'none'; // Close the sort modal
    });




    // sort by decending
    decending.addEventListener('click', function(){
    sortTasks(false); // Sort in descending order
    sortModal.style.display = 'none'; // Close the sort modal

    });

    function sortTasks(ascending) {
        const tasks = Array.from(taskList.querySelectorAll('li')); // Get all task list items
        tasks.sort((a, b) => {
            const textA = a.textContent.toLowerCase();
            const textB = b.textContent.toLowerCase();
            if (ascending) {
                return textB.localeCompare(textA); // Ascending order
            } else {
                return textA.localeCompare(textB); // Descending order
            }
        });

        // Clear the list and append sorted items
        taskList.innerHTML = ''; // Clear the existing list
        tasks.forEach(task => taskList.appendChild(task)); // Re-append sorted tasks

    }




    // Add the task when the confirm button is clicked
    confirmButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        const detailText = detailInput.value.trim();
        const deadlineText = deadlineInput.value.trim();

        if (taskText && detailText && deadlineText) {
            const listItem = document.createElement('li');

            // Create the task header
            const taskHeader = document.createElement('h1');
            listItem.textContent = taskText; 

            // Create task details
            const taskDetails = document.createElement('p');
            taskDetails.textContent = 'Details: ' + detailText;
            listItem.appendChild(taskDetails);

            // Create task deadline
            const taskDeadline = document.createElement('p');
            taskDeadline.textContent = 'Deadline: ' + deadlineText;
            listItem.appendChild(taskDeadline);


            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function(){
                if (checkbox.checked) {
                    listItem.classList.add('completed');
                }

                else {
                    listItem.classList.remove('completed');
                }
                updateActivitiesLeft();
            });
            /*This adds a click event listener to the confirm button.

    It retrieves the text from the input field and trims any whitespace.
    
    If the input is not empty, it creates a new list item (<li>).
    
    A checkbox is also created and added to the list item.
    
    An event listener is added to the checkbox to handle changes in its state (checked or unchecked). It adds or removes a completed class from the list item, which can be styled differently in CSS.
    
    The list item (with the checkbox) is then appended to the task list.
    
    The input field is cleared, the modal is closed, and the updateActivitiesLeft() function is called to update the task count.*/

            listItem.prepend(checkbox);
            //taskList.appendChild(listItem); Append the new list item to the end of the list
            taskList.insertBefore(listItem, taskList.firstChild) // Insert the new list item at the top
            taskInput.value = '' // Clear the input field
            detailInput.value = '' // Clear the detail field
            deadlineInput.value = '' // Clear the deadline field
            taskModal.style.display = 'none' // Close the modal
            updateActivitiesLeft();
        }

    });
    



    
    // Update Activities Left: 
    function updateActivitiesLeft() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        activitiesLeft.textContent = totalTasks - completedTasks;
    }

    /*This function calculates the total number of tasks and the number of completed tasks.
    
    It updates the text content of the activitiesLeft span to show how many tasks are still pending (total tasks minus completed tasks). */




    // Check all tasks (delete all tasks)
    checkAll.addEventListener('click', () => {
        // Clear the task list
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        // Update activities left
        updateActivitiesLeft();
    });

    // Function to edit the task
    listItem.addEventListener('click', function() {
        editTask(listItem); // Call the edit function with the clicked list item
        taskInput.value = listItem.textContent; // Set the task text
        detailInput.value = listItem.querySelector('p').textContent.replace('Details: ', ''); // Set the details
        deadlineInput.value = listItem.querySelectorAll('p')[1].textContent.replace('Deadline: ', ''); // Set the deadline
        taskModal.style.display = 'block'; // Show the modal
        currentEditTask = listItem; // Keep track of the task being edited  
    });
});