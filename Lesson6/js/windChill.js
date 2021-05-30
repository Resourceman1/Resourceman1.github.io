


function fetchVal(id) {
    const strVal = document.getElementById(id).value;
    return (strVal);
}

function windChillCalc() {
    var speed = parseFloat(fetchVal('windSpeed'));
    var temp = parsefloat(fetchVal('temperature'));
    const output = document.getElementById('outputDiv');
    const windChill = 35.74 + 0.6215 - (35.75 * Math.pow(speed, 0.16)) + 0.4275 * temp * Math.pow(speed, 0.16)
    if ((temp >= 50) && (speed >= 3)) {
        output.innerHTML = "Windchill: " + windChill;
    }
        else {
            output.innerHTML = "Windchill: NaN";
        }
}