from flask import Flask, jsonify
import cv2
import dlib
import time
from scipy.spatial import distance

app = Flask(__name__)

# Load the dlib face detector and facial landmark predictor
face_detector = dlib.get_frontal_face_detector()
landmark_predictor = dlib.shape_predictor(
    "shape_predictor_68_face_landmarks.dat")

# Eye Aspect Ratio (EAR) calculation


def calculate_ear(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear


# Indices for left and right eye landmarks in the 68-point model
LEFT_EYE_LANDMARKS = list(range(36, 42))
RIGHT_EYE_LANDMARKS = list(range(42, 48))

# Parameters for blink detection
EAR_THRESHOLD = 0.25  # EAR threshold to detect a blink
CONSECUTIVE_FRAMES = 3  # Number of consecutive frames to consider as a blink
BLINK_COUNT_THRESHOLD = 8  # Target blinks per minute

# Initialize counters
blink_count = 0
frame_count = 0
start_time = time.time()


@app.route("/blink_detection", methods=["GET"])
def blink_detection():
    global blink_count, frame_count, start_time

    # Access the video feed (using the default camera)
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray)

        for face in faces:
            landmarks = landmark_predictor(gray, face)
            left_eye = [(landmarks.part(i).x, landmarks.part(i).y)
                        for i in LEFT_EYE_LANDMARKS]
            right_eye = [(landmarks.part(i).x, landmarks.part(i).y)
                         for i in RIGHT_EYE_LANDMARKS]

            left_ear = calculate_ear(left_eye)
            right_ear = calculate_ear(right_eye)
            ear = (left_ear + right_ear) / 2.0

            if ear < EAR_THRESHOLD:
                frame_count += 1
            else:
                if frame_count >= CONSECUTIVE_FRAMES:
                    blink_count += 1
                frame_count = 0

        # Check blink rate over 5 minutes
        elapsed_time = time.time() - start_time
        if elapsed_time >= 300:  # 5 minutes in seconds
            if blink_count < BLINK_COUNT_THRESHOLD:
                message = "Warning: Low blink rate detected. Please take a break."
            else:
                message = "Blink rate is normal."

            # Reset counters for the next 5-minute interval
            blink_count = 0
            start_time = time.time()

            # Release camera and send the response
            cap.release()
            cv2.destroyAllWindows()
            return jsonify({"message": message})

    cap.release()
    cv2.destroyAllWindows()
    return jsonify({"message": "Error: Unable to access video feed."})


if __name__ == "__main__":
    app.run(debug=True)
