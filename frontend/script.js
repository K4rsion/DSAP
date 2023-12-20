const numericInput = document.getElementById('pitch');
const submitButton = document.getElementById('submitButton');
const toggleButton = document.getElementsById('toggleButton');

submitButton.addEventListener('click', () => {
    const numericValue = parseFloat(numericInput.value);
    fetch('changePitchLvl', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: numericValue })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Request failed(frontend)');
                return null;
            }
        })
        .then(data => {
            if (data !== null) {
                console.log(data);
            }
        })
});

function outputUpdate(vol) {
    var output = document.querySelector('#volume');
    output.value = vol;
    output.style.left = vol - 20 + 'px';
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