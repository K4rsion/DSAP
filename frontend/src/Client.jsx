const url = 'http://192.168.1.1';

export const Client = {
  changeSliderValue: (newValue) => {
    const urlToSend = `${url}/changeVolume?volumeValue=${newValue}`;
    return fetch(urlToSend).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
  },
};
