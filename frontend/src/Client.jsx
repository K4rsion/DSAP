const url = 'http://192.168.1.1';

export const Client = {
  changeVolumeValue: (newValue) => {
    const urlToSend = `${url}/volume`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ volumeValue: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changePitchValue: (newValue) => {
    const urlToSend = `${url}/pitch`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pitchShift: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionMIValue: (newValue) => {
    const urlToSend = `${url}/distortion`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ maxInput: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeDistortionCTValue: (newValue) => {
    const urlToSend = `${url}/distortion`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clipThreshold: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeTremoloDurationValue: (newValue) => {
    const urlToSend = `${url}/tremolo`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ duration: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changeTremoloDPValue: (newValue) => {
    const urlToSend = `${url}/tremolo`;
    if (!newValue && newValue !== 0) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ depthPercent: newValue })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  pitchState: (newState) => {
    const urlToSend = `${url}/pitch`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enabled: newState ? 1 : 0 })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  distortionState: (newState) => {
    const urlToSend = `${url}/distortion`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enabled: newState ? 1 : 0 })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  tremoloState: (newState) => {
    const urlToSend = `${url}/tremolo`;
    return fetch(urlToSend, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enabled: newState ? 1 : 0 })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
};
