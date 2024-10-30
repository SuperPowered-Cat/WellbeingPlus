// background.js

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'start_20_20_20') {
        start202020Reminder();
    } else if (message.type === 'stop_20_20_20') {
        chrome.alarms.clear('202020');
    } else if (message.type === 'start_custom_reminder') {
        startCustomReminder(message.minutes);
    } else if (message.type === 'stop_custom_reminder') {
        chrome.alarms.clear('customReminder');
    }
});

function start202020Reminder() {
    chrome.alarms.create('202020', { periodInMinutes: 20 });
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === '202020') {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon.png',
                title: '20/20/20 Rule',
                message: 'Take a 20-second break and look 20 feet away!'
            });
        }
    });
}

function startCustomReminder(minutes) {
    chrome.alarms.create('customReminder', { periodInMinutes: minutes });
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name === 'customReminder') {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon.png',
                title: 'Custom Reminder',
                message: "It's time for your custom reminder!"
            });
        }
    });
}
