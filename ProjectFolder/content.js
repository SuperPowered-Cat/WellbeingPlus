// Listen for toggle messages from the extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'toggleReminder') {
        if (message.enabled) {
            start202020Reminder();
        } else {
            stop202020Reminder();
        }
    }

    if (message.type === 'toggleBlinkDetection') {
        if (message.enabled) {
            console.log("Blink detection enabled");
            startBlinkDetection();
        } else {
            console.log("Blink detection disabled");
            stopBlinkDetection();
        }
    }

    if (message.type === 'customReminder') {
        if (message.reminderName && message.reminderTime) {
            startCustomReminder(message.reminderName, message.reminderTime);
        } else {
            stopCustomReminder();
        }
    }
});

// 20/20/20 Rule reminder functionality
let reminderInterval;
function start202020Reminder() {
    reminderInterval = setInterval(() => {
        alert("20/20/20 Reminder: Take a 20-second break and look 20 feet away.");
    }, 20 * 60 * 1000); // every 20 minutes
}

function stop202020Reminder() {
    if (reminderInterval) {
        clearInterval(reminderInterval);
        console.log("20/20/20 reminder stopped");
    }
}

// Custom reminder functionality
let customReminderInterval;
function startCustomReminder(reminderName, reminderTime) {
    customReminderInterval = setInterval(() => {
        alert(`Reminder: ${reminderName}`);
    }, reminderTime * 60 * 1000); // reminderTime in minutes
}

function stopCustomReminder() {
    if (customReminderInterval) {
        clearInterval(customReminderInterval);
        console.log("Custom reminder stopped");
    }
}

// Blink detection functionality
let blinkDetectionInterval;
function startBlinkDetection() {
    blinkDetectionInterval = setInterval(async () => {
        const imageData = await captureImageFromCamera();
        if (imageData) {
            performBlinkDetection(imageData);
        }
    }, 60 * 1000); // run every 1 minute (adjust as needed)
}

function stopBlinkDetection() {
    if (blinkDetectionInterval) {
        clearInterval(blinkDetectionInterval);
        console.log("Blink detection stopped");
    }
}

// Capture image from camera (dummy function)
async function captureImageFromCamera() {
    // Placeholder for actual image capture logic
    // Here you'd use a method to get a frame from the camera and convert to base64
    return "base64EncodedImageString"; // replace with actual image capture code
}

// Function to call the Flask server's blink detection API
async function performBlinkDetection(imageData) {
    try {
        const response = await fetch('http://localhost:5000/blink-detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageData }),
        });
        const result = await response.json();
        console.log("Blink detection result:", result); // Log result for testing
    } catch (error) {
        console.error("Error in blink detection request:", error);
    }
}
