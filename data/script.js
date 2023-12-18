const numericInput = document.getElementById('pitch');
const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', () => {
    const numericValue = parseFloat(numericInput.value);
    fetch('changePitchLvl', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: numericValue})
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