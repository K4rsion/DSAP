const numericInput = document.getElementById('pitch');
const submitButton1 = document.getElementById('submitButton1');
const toggleButton = document.getElementsById('toggleButton');

// submitButton.addEventListener('click', () => {
//     const numericValue = parseFloat(numericInput.value);
//     fetch('changePitchLvl', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ value: numericValue })
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 console.error('Request failed(frontend)');
//                 return null;
//             }
//         })
//         .then(data => {
//             if (data !== null) {
//                 console.log(data);
//             }
//         })
// });



document.getElementById('submitButton1').addEventListener('click', function () {
    // Получаем значение со слайдера
    var sliderValue = document.getElementById('slider').value;

    // Формируем URL с параметром значения слайдера
    var url = 'http://192.168.1.1/changeVolume?volumeValue=' + sliderValue;

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
});

function outputUpdate(vol) {
    var output = document.querySelector('#sliderValue');
    output.innerHTML = vol;
}

toggleButton.addEventListener('click', () => {
    fetch();
});

function toggleSwitch() {
    var knob = document.getElementById('knob');
    var currentLeft = parseFloat(getComputedStyle(knob).left);

    // Переключаем положение тумблера
    if (currentLeft === 0) {
        knob.style.left = '40px';
    } else {
        knob.style.left = '0';
    }
}
