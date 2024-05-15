const url = 'http://192.168.1.1';

export const Client = {
  changeVolumeValue: (newValue) => {
    const urlToSend = `${url}/changeVolume?volumeValue=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  changePitchValue: (newValue) => {
    const urlToSend = `${url}/changePitch?pitchValue=${newValue}`;
    if (!newValue) return; // Не отправляем запрос, если фильтр выключен
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },

  setEcho: (newState) => {
    const urlToSend = `${url}/setEcho?echoValue=${newState}`;
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
};
