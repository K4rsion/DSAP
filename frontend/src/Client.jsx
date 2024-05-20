const url = 'http://192.168.1.1';

export const Client = {
  changeVolumeValue: (newValue) => {
    const urlToSend = `${url}/volume?volumeValue=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changePitchValue: (newValue) => {
    const urlToSend = `${url}/pitch?shiftValue=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionMIValue: (newValue) => {
    const urlToSend = `${url}/distortion?maxInput=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionCTValue: (newValue) => {
    const urlToSend = `${url}/distortion?clipThreshold=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDelayDurationValue: (newValue) => {
    const urlToSend = `${url}/delay?duration=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDelayDepthValue: (newValue) => {
    const urlToSend = `${url}/delay?depth=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDelayFAValue: (newValue) => {
    const urlToSend = `${url}/delay?feedbackAmount=${newValue}`;
    if (newValue === undefined || newValue === null) return;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  pitchState: (newState) => {
    const urlToSend = `${url}/pitch?enabled=${newState ? 1 : 0}`;
    return fetch(urlToSend, {
      method: 'PUT',
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  distortionState: (newState) => {
    const urlToSend = `${url}/distortion?enabled=${newState ? 1 : 0}`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  delayState: (newState) => {
    const urlToSend = `${url}/delay?enabled=${newState ? 1 : 0}`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  resetEffects: () => {
    const urlToSend = `${url}/clear`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // исправление для возврата ответа
    });
  },

  getState: () => {
    const urlToSend = `${url}/state`;
    return fetch(urlToSend, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
};
