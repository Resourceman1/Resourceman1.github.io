function xhrRequest(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = (e) => {
            if (req.readyState !== 4) return;

            if (req.status === 200) {
                const data = req.responseText;
                resolve(JSON.parse(data));
                return;
            }

            reject(req.statusText);
        };
        req.onerror = (e) => {
            reject(req.statusText);
        }
        req.send(null);
    });
}

function getWeatherData(cityId, appId) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${appId}`;
    return xhrRequest(url);
}

function getForecast(cityId, appId) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${appId}`;
    return xhrRequest(url);
}

async function getWeather() {
    const appId = '01e8eb86dbe39f0ce0b7736e0918e96b';
    const cityId = '5604473';

    const [ weather, forecast ] = await Promise.all([
        getWeatherData(cityId, appId),
        getForecast(cityId, appId)
    ]);

    return {
        weather,
        forecast
    }
}

function fakeWeather() {

    const icon = 'http://openweathermap.org/img/wn/01d@2x.png';
    const date = 'Fri';
    const temp = 69;
    const html = `
        <img src="${icon}" class="icon" />
        <label class="day">${date}</label>
        <label class="weather">${temp}&#176;C</label>
        `;

    const ts = document.getElementById('forecast');

    for(var i = 0; i < 5; i++){
        const el = document.createElement('div');
        el.innerHTML = html.trim();
        el.classList.add('forecast');

        ts.append(el);
    }
}

async function imprintWeather() {

    const { weather, forecast } = await getWeather();
    const iconTemp = 'http://openweathermap.org/img/wn/{}@2x.png';
    const forecastElement = document.getElementById('forecast');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    for(const day of forecast.list) {
        if (day.dt_txt.indexOf('18:00:00') === -1) continue;

        const w = day.weather[0];
        const date = days[new Date(day.dt_txt).getDay()];
        const icon = iconTemp.replace("{}", w.icon);
        const temp = (day.main.temp - 273.15).toFixed(2);

        const html = `
        <img src="${icon}" class="icon" />
        <label class="day">${date}</label>
        <label class="weather">${temp}&#176;C</label>
        `;

        const el = document.createElement('div');
        el.innerHTML = html.trim();
        el.classList.add('forecast');

        forecastElement.append(el);
    }
}


(function() {
    imprintWeather();
    //fakeWeather();
})();