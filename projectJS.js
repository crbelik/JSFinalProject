// Meal Plan Days
const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

document.addEventListener("DOMContentLoaded", () => {
    
    const daysContainer = document.getElementById("daysContainer");

    // Generate Each day
    daysOfWeek.forEach((day) => {
        // Create a section
        const daySection = document.createElement("section");
        daySection.classList.add("dayCard");

        // Generate each day of the weeks inputs
        daySection.innerHTML = `
        <h3>${day}</h3>
        <form id="${day.toLowerCase()}Form">
            <label for="${day.toLowerCase()}Breakfast">Breakfast:</label><br>
            <input type="text" name="${day.toLowerCase()}Breakfast" id="${day.toLowerCase()}Breakfast"><br>

            <label for="${day.toLowerCase()}Snack1">Snack 1:</label><br>
            <input type="text" name="${day.toLowerCase()}Snack1" id="${day.toLowerCase()}Snack1"><br>

            <label for="${day.toLowerCase()}Lunch">Lunch:</label><br>
            <input type="text" name="${day.toLowerCase()}Lunch" id="${day.toLowerCase()}Lunch"><br>

            <label for="${day.toLowerCase()}Snack2">Snack 2:</label><br>
            <input type="text" name="${day.toLowerCase()}Snack2" id="${day.toLowerCase()}Snack2"><br>

            <label for="${day.toLowerCase()}Dinner">Dinner:</label><br>
            <input type="text" name="${day.toLowerCase()}Dinner" id="${day.toLowerCase()}Dinner"><br>
        </form><br>
        `;

        daysContainer.appendChild(daySection);
    });

    // moving personal info to last column
    const personalInfoSection = document.getElementById("personalInfoSection");
    daysContainer.appendChild(personalInfoSection);

    // Buttons
    document.getElementById("generateMealPlanButton").addEventListener("click", generateMealPage);
    document.getElementById("clearFormButton").addEventListener("click", clearForm);
    document.getElementById("printFormButton").addEventListener("click", function() {
        window.print()
    });
});

function generateMealPage() {

    // Inputs
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const weeklyGoal = document.getElementById("goal").value;

    // Validate Email
    if (!email || !validateEmail(email)) {
        alert("You must enter a valid email address to generate the Meal Plan.")
        return;
    }

    // Open flyWindow
    flyWindow = window.open("about:blank", "", "width=1200, height=950");

    const weeklyMealPlan = getFormInputs();

    // Generate HTML
    let htmlContent = `
        <html>
        <head>
            <title>Weekly Meal Plan</title>
            <link rel="stylesheet" href="style.css">
            <header id="headerBar">
                <div class="headerLeft">${fname} ${lname}</div>
                <div class="headerCenter">Weekly Meal Plan</div>
                <div class="headerRight">${email}</div>
            </header>
        </head>
        <body>
            <div class="genMealPlan">
                <div class="weeklyGoal">
                    <h3>Weekly Goal:</h3>
                    <p class="goalText">${weeklyGoal}</p>
                </div>
    `;
    // Loop to build the html
    for (const day in weeklyMealPlan) {
        htmlContent += `
            <div class="daySection">
                <div class="dayHeader"><h3>${day}</h3></div>
                <div class="meal">Breakfast: ${weeklyMealPlan[day].breakfast}</div>
                <div class="meal">Snack 1: ${weeklyMealPlan[day].snack1}</div>
                <div class="meal">Lunch: ${weeklyMealPlan[day].lunch}</div>
                <div class="meal">Snack 2: ${weeklyMealPlan[day].snack2}</div>
                <div class="meal">Dinner: ${weeklyMealPlan[day].dinner}</div>
            </div>
        `;
    }

    // End HTML
    htmlContent += `
        </div>
        </body>
        </html>
    `;

    //write content to new window
    flyWindow.document.write(htmlContent);

    // Close and finalize the page
    flyWindow.document.close();
};

// Button for clearing all boxes in Form
function clearForm() {
    document.querySelectorAll("form").forEach(form => {
        form.reset();
    });
};

// Generate an array from inputs
function getFormInputs() {

    // Meal Plan array
    const mealPlan = {};

    // Get Each Day and put into mealPlan
    daysOfWeek.forEach(day => {
        mealPlan[day] = {
            breakfast: document.getElementById(`${day.toLowerCase()}Breakfast`).value,
            snack1: document.getElementById(`${day.toLowerCase()}Snack1`).value,
            lunch: document.getElementById(`${day.toLowerCase()}Lunch`).value,
            snack2: document.getElementById(`${day.toLowerCase()}Snack2`).value,
            dinner: document.getElementById(`${day.toLowerCase()}Dinner`).value,
        };
    });
    return mealPlan;
}

// Make sure email is valid
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}