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
};
