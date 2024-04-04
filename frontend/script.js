document.getElementById('submitButton1').addEventListener('click', function () {
    var getValue = document.getElementById('slider1').value;
    const volumeValues = [0, 1, 5, 10, 15, 22, 25, 33, 44, 55, 100];
    var sliderValue = volumeValues[getValue];

    var url = 'http://192.168.1.1/changeVolume?volumeValue=' + sliderValue;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка:', error));
});


document.getElementById('submitButton2').addEventListener('click', function () {
    var getValue = document.getElementById('slider2').value;
    const pitchValues = [1, 100, 125, 150, 175];
    var sliderValue = pitchValues[getValue];

    var url = 'http://192.168.1.1/changePitch?pitchFactor=' + sliderValue;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка:', error));
});




function outputUpdate1(vol) {
    var output = document.querySelector('#sliderValue1');
    output.innerHTML = vol;
}

function outputUpdate2(vol) {
    var output = document.querySelector('#sliderValue2');
    output.innerHTML = vol;
}

function toggleSwitch() {
    var knob = document.getElementById('knob');
    var currentLeft = parseFloat(getComputedStyle(knob).left);

    // Переключаем положение тумблера
    if (currentLeft === 0) {
        knob.style.left = '40px';
    } else {
        knob.style.left = '0';
    }

    // Формируем URL для GET запроса
    var url = 'http://192.168.1.1/changeEcho';

    // Отправляем GET запрос
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка:', error));
}

