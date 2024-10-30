# Usage Instructions for WellbeingPlus

## Project Structure
After cloning the repository, the structure should look like this:

```
ProjectFolder/
├── images/
│   └── icon.jpeg
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── style.css
├── server/
│   ├── server.py
│   └── shape_predictor_68_face_landmarks.dat
├── background.js
├── content.js
└── manifest.json
```

## Running the Flask Server
1. **Navigate to the server directory**:
   ```bash
   cd server
2. **Start the flask server**:
   ```bash
   python server.py
3. **Access the server**: 
   Open your browser and go to `http://127.0.0.1:5000/` to interact with the server.

## Installing the Chrome Extension
1. Open Chrome and go to the extensions page by navigating to `chrome://extensions/`.
2. Enable Developer Mode by toggling the switch in the top right corner.
3. **Load Unpacked Extension**:
   Click on the "Load unpacked" button.
   Select the project directory where your manifest.json is located.
4. **Using the Extension**:
   Click on the extension icon in the toolbar to open the popup.
   Toggle the features as needed for blink detection, 20/20/20 reminders, and custom reminders.
