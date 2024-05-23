## **DSAP**

---

### Overview
This project aims to implement voice transformation using the ESP32 microcontroller. The ESP32 is utilized along with external ADCs and DACs to process audio input and output. The system supports volume control and three audio effects: _pitch_, _delay_, and _distortion_. It provides flexibility in terms of input and output devices, allowing the connection of microphones, speakers, or other audio devices via auxiliary (aux) ports. Additionally, a web server is hosted on the ESP32 to facilitate the configuration of effect parameters.

![Scheme](https://github.com/K4rsion/DSAP/assets/91548763/b9fe02f9-0df5-492d-94fc-c692bff07cd4)


### Features
- Voice transformation using ESP32 microcontroller.
- Utilization of external ADCs and DACs for audio processing.
- Support for volume control.
- Implementation of three audio effects:
  - Pitch shifting.
  - Delay effect.
  - Distortion effect.
- Flexibility in input and output device connection:
  - Microphone input via aux.
  - Output to speakers or other devices via aux.
- Web server hosted on ESP32 for configuring effect parameters.

### Hardware:

#### ADC:
| PCM1808 | ESP32
|-------|---------------
| DATA  | GPIO32
| BCKL  | GPIO27
| LRCK  | GPIO14
| MCLK  | GPIO0

#### DAC:
| PCM5102A | ESP32
|----------|---------------
| SCK      | GND
| BCK      | GPIO26
| DIN      | GPIO25
| LCK      | GPIO33


### Library
This project utilizes the [arduino-audio-tools](https://github.com/pschatzmann/arduino-audio-tools) library for audio processing tasks. The library provides essential tools and functionalities for implementing audio effects on microcontrollers.

### Usage
1. Adjust volume using the provided controls.
2. Enable/disable audio effects (pitch, delay, distortion) as needed.
3. Connect input devices (microphone) and output devices (speakers) via aux ports.
4. Access the web server hosted on the ESP32 to configure effect parameters.
5. Begin voice transformation by interacting with the system.

### Contributions
Contributions to this project are welcome! If you have suggestions for improvements or new features, feel free to submit a pull request.

### Credits
- Developed by [K4rsion](https://github.com/K4rsion), [buljad](https://github.com/buljad), [SSKaZZDom](https://github.com/SSKaZZDom)
- Inspired by [mordv](https://github.com/mordv)
---
