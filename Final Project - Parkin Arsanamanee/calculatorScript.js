function appendToDisplay(value){
    document.getElementById('display').value += value;
}

function calculate (){
    const dispaly = document.getElementById('display');
    try {
        dispaly.value = eval(display.value);
    }
    catch {
        dispaly.value = 'Error';
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}