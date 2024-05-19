const url = 'http://192.168.1.1';

export const Client = {
  changeVolumeValue: (newValue) => {
    const urlToSend = `${url}/volume?volumeValue=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changePitchValue: (newValue) => {
    const urlToSend = `${url}/pitch?pitchShift=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionMIValue: (newValue) => {
    const urlToSend = `${url}/distortion?maxInput=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionCTValue: (newValue) => {
    const urlToSend = `${url}/distortion?clipThreshold=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeTremoloDurationValue: (newValue) => {
    const urlToSend = `${url}/tremolo?duration=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeTremoloDPValue: (newValue) => {
    const urlToSend = `${url}/tremolo?depthPercent=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
  

  pitchState: (newState) => {
    var urlToSend = `${url}/pitch?enabled=${newState}`;
    if (!newState) {
      urlToSend = `${url}/pitch?enabled=${0}`;
    } else {
      urlToSend = `${url}/pitch?enabled=${1}`;
    }
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  distortionState: (newState) => {
    var urlToSend = `${url}/distortion?enabled=${newState}`;
    if (!newState) {
      urlToSend = `${url}/distortion?enabled=${0}`;
    } else {
      urlToSend = `${url}/distortion?enabled=${1}`;
    }
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  tremoloState: (newState) => {
    var urlToSend = `${url}/tremolo?enabled=${newState}`;
    if (!newState) {
      urlToSend = `${url}/tremolo?enabled=${0}`;
    } else {
      urlToSend = `${url}/tremolo?enabled=${1}`;
    }
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
};
