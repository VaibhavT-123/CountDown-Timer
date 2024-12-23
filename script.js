// Variables to hold the start and end date from the inputs
let startDate;
let endDate;
let x; // Reference to the interval


// Save the initial structure of the countdown element
const originalCountdownHTML = document.getElementById("countdown").innerHTML;

// Get the start button element
const startButton = document.querySelector(".Start-button");

// Get the reset button element
const resetButton = document.querySelector(".reset-button");

// sound added directly using js
const tickSound = new Audio('tick-tock.mp3');



// Reset button event listener
resetButton.addEventListener("click", () => {
    tickSound.pause(); 
    tickSound.currentTime = 0;   
    clearInterval(x);
    //give the original value of cuntdown to countdown
    document.getElementById("countdown").innerHTML = 
    originalCountdownHTML;

    //reset date to null
    document.getElementById('startDate').value = "";
    document.getElementById('endDate').value = "";

    //reset days,hrs,min, to null
    document.getElementById("days").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    // reset the progress bar;
    document.getElementById("progress-bar").style.width = "0%";

     // Re-enable the Start button again once the countdown has expired
     startButton.disabled = false;

});
// Start button event listener
startButton.addEventListener('click', () => {
   
    // Get the start and end date from the input fields
    const startInput = document.getElementById('startDate').value;
    const endInput = document.getElementById('endDate').value;

    // Check if both dates are provided
    if (!startInput || !endInput) {
        alert("Please provide both start and end dates.");
        return;
    }

    // Convert input values to Date objects
    startDate = new Date(startInput).getTime();
    endDate = new Date(endInput).getTime();

    // Make sure startDate is before endDate
    if (startDate >= endDate) {
        alert("Start date must be before end date.");
        return;
    }

    // Start the countdown and set the interval
    x = setInterval(updateTimer, 1000);

    // Disable the Start button to prevent multiple clicks
    startButton.disabled = true;
});

// Function to update the timer every second
function updateTimer() {
    tickSound.play();
    const now = new Date().getTime();

    const distanceCovered = now - startDate; // Time elapsed since start
    const distancePending = endDate - now;   // Time remaining until end

    // Calculate days, hours, minutes, and seconds
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const oneHourInMillis = 60 * 60 * 1000;
    const oneMinInMillis = 60 * 1000;
    const oneSecondInMillis = 1000;

    const days = Math.floor(distancePending / oneDayInMillis);
    const hrs = Math.floor((distancePending % oneDayInMillis) / oneHourInMillis);
    const mins = Math.floor((distancePending % oneHourInMillis) / oneMinInMillis);
    const secs = Math.floor((distancePending % oneMinInMillis) / oneSecondInMillis);

    // Display the updated values on the UI
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("seconds").innerHTML = secs;

    // Calculate the progress bar percentage
    const totalDistance = endDate - startDate;
    const percentageDistance = (distanceCovered / totalDistance) * 100;

    // Set the width of the progress bar
    document.getElementById("progress-bar").style.width = percentageDistance + "%";

    // If the countdown is over, stop the interval and update the UI
    if (distancePending < 0) { 
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        document.getElementById("progress-bar").style.width = "100%";

        tickSound.pause();          // Pause the tick sound
        tickSound.currentTime = 0; // start time from zero 
    }
}
