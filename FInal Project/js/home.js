function getWeather(cityId) {
    return fetchJson(CONFIG.url + `weather?id=${cityId}&appId=${CONFIG.appId}&units=imperial`);
}

function getForecast(cityId) {
    return fetchJson(CONFIG.url + `forecast?id=${cityId}&appId=${CONFIG.appId}&units=imperial`);
}

function setValue(id, value) {
    const el = document.getElementById(id);
    el.innerHTML = value;
}

function setImageSrc(id, value) {
    const el = document.getElementById(id);
    el.src = value;
}

function setForecast(forecast) {
    const iconTemp = 'http://openweathermap.org/img/wn/{}@2x.png';
    const forecastElement = document.getElementById('forecast');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    for(const day of forecast.list) {
        if (day.dt_txt.indexOf('18:00:00') === -1) continue;

        const w = day.weather[0];
        const date = days[new Date(day.dt_txt).getDay()];
        const icon = iconTemp.replace("{}", w.icon);

        const html = `
        <label class="day">${date}</label>
        <img src="${icon}" class="icon" />
        <label class="weather">${day.main.temp}&#176;F</label>
        `;

        const el = document.createElement('div');
        el.innerHTML = html.trim();
        el.classList.add('forecast');

        forecastElement.append(el);
    }
}

function setWeather(weather) {
    setValue('weather-condition', weather.weather[0].main);
    setValue('weather-currently', weather.main.temp + " &#176;F");
    setValue('weather-high', weather.main.temp_max + " &#176;F");
    setValue('weather-chill', calcWindChill(weather.wind.speed, weather.main.temp).toFixed(2) + " &#176;F");
    setValue('weather-humidity', weather.main.humidity + '%');
    setValue('weather-speed', weather.wind.speed + ' mph');
}


function calcWindChill(speed, temp) {
    return 35.74 + 0.6215 - (35.75 * Math.pow(speed, 0.16)) + 0.4275 * temp * Math.pow(speed, 0.16);
}

function setAds(busis) {

    const randomBusinesses = busis
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

   
    const target = document.getElementById('ad');

    for(const res of randomBusinesses) {
        const article = document.createElement('article');

        article.innerHTML = `<h2>${res.name}</h2>
        <img src="assets/${res.image}" alt="${res.name} Logo"/>
        <h1>${res.owner}</h1>          
        <p>${res.address.line1}</p>
        <p>${res.address.city}, ${res.address.state} ${res.address.zip}</p>
        <p>Primary Phone: ${res.phone.primary}</p>
        <p>Phone: ${res.phone.alt}</p>
    
        <p>Website: <a href="${res.website}">${res.name}</a></p>
        <p>Email: ${res.email}</p>`;

        target.appendChild(article);
    }
}

async function main() {
    const [
        weather,
        forecast,
        directories
    ] = await Promise.all([
        getWeather(CONFIG.cityId),
        getForecast(CONFIG.cityId),
        getDirectories()
    ]);

    setWeather(weather);
    setForecast(forecast);
    setAds(directories);
}


(function() {
    main();
})();