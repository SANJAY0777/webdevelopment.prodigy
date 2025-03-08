let timer;
let seconds = 0, minutes = 0, hours = 0;
let isRunning = false;

// Start / Stop Function
document.getElementById("startStop").addEventListener("click", function() {
    if (isRunning) {
        clearInterval(timer);
        this.textContent = "Start";
    } else {
        timer = setInterval(updateTime, 1000);
        this.textContent = "Pause";
    }
    isRunning = !isRunning;
});

// Reset Function
document.getElementById("reset").addEventListener("click", function() {
    clearInterval(timer);
    seconds = minutes = hours = 0;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
    document.getElementById("laps").innerHTML = "";
});

// Lap Function
document.getElementById("lap").addEventListener("click", function() {
    if (isRunning) {
        let lapTime = document.getElementById("display").textContent;
        let lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        document.getElementById("laps").appendChild(lapItem);
    }
});

// Update Time Function
function updateTime() {
    seconds++;
    if (seconds === 60) { seconds = 0; minutes++; }
    if (minutes === 60) { minutes = 0; hours++; }

    let formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);

    document.getElementById("display").textContent = formattedTime;
}
