// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const blinkTrackingToggle = document.getElementById('blinkTrackingToggle');
    const eyeStrainToggle = document.getElementById('eyeStrainToggle');
    const customReminderToggle = document.getElementById('customReminderToggle');
    const reminderTimeInput = document.getElementById('reminderTime');

    blinkTrackingToggle.addEventListener('change', () => {
        chrome.runtime.sendMessage({
            type: 'toggleBlinkDetection',
            enabled: blinkTrackingToggle.checked
        });
    });

    eyeStrainToggle.addEventListener('change', () => {
        chrome.runtime.sendMessage({
            type: eyeStrainToggle.checked ? 'start_20_20_20' : 'stop_20_20_20'
        });
    });

    customReminderToggle.addEventListener('change', () => {
        const minutes = parseInt(reminderTimeInput.value);
        chrome.runtime.sendMessage({
            type: customReminderToggle.checked ? 'start_custom_reminder' : 'stop_custom_reminder',
            minutes: minutes
        });
    });
});
