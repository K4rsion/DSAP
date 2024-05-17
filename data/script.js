const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    var val = document.getElementById('fader').value;
    fetch('pitch', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: val })
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
    output.style.left = vol;
}

function toggleSwitch() {
    fetch('robot', {
        method: 'GET',
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
        });
    var knob = document.getElementById('knob');
    var currentLeft = parseFloat(getComputedStyle(knob).left);

    // Переключаем положение тумблера
    if (currentLeft === 0) {
        knob.style.left = '40px';
    } else {
        knob.style.left = '0';
    }
}