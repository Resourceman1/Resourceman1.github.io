const CONFIG = {
    appId: '01e8eb86dbe39f0ce0b7736e0918e96b',
    url: 'https://api.openweathermap.org/data/2.5/',
    townData: 'https://byui-cit230.github.io/weather/data/towndata.json'
}

function fetchJson(url) {
    return fetch(url).then(r => r.json());
}

function getWeather(cityId) {
    return fetchJson(CONFIG.url + `weather?id=${cityId}&appId=${CONFIG.appId}&units=imperial`);
}

function getForecast(cityId) {
    return fetchJson(CONFIG.url + `forecast?id=${cityId}&appId=${CONFIG.appId}&units=imperial`);
}

async function getTowns() {
    return (await fetchJson(CONFIG.townData)).towns;
}

async function getTown(name) {
    const towns = await getTowns();

    return towns.find(t => t.name == name);
}

function convertFromKv(temp, f) {
    let c = (temp - 273.15)
    
    if (f) {
        c = c * (9/5) + 32;
    }

    return c.toFixed(2) + ` &#176;${f ? 'F' : 'C'}`;
}

function calcWindChill(speed, temp) {
    return 35.74 + 0.6215 - (35.75 * Math.pow(speed, 0.16)) + 0.4275 * temp * Math.pow(speed, 0.16);
}

function setValue(id, value) {
    const el = document.getElementById(id);
    el.innerHTML = value;
}

function setImageSrc(id, value) {
    const el = document.getElementById(id);
    el.src = value;
}

function lazyLoad(entries) {

    for(const entry of entries) {
        if(entry.isIntersecting) {
            const img = entry.target;
            // img.onload = () => {
            //     img.classList.add('loaded');
            // };
            img.src = img.dataset.src;
        }
    }
}

function initLazyLoad(className) {
    if (!className) {
        className = ".lazy-load";
    }

    const obs = new IntersectionObserver(lazyLoad);

    document.querySelectorAll(className)
        .forEach(imageEl => {
            obs.observe(imageEl);
        });
}

function toggleMenu() {
    const body = document.body;

    if (body.classList.contains('expanded')) {
        body.classList.remove('expanded');
    } else {
        body.classList.add('expanded');
    }
}

function clock() {
    const clock = document.getElementById('clock');
    const setTime = () => {
        let d = new Date();
        const dow = [
            'Sunday',
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday'
        ];
        const moy = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'november',
            'December'
        ]
        const day = dow[d.getDay()];
        const month = moy[d.getMonth()];
        const hours = d.getHours().toString().padStart(2, '0');
        const mins = d.getMinutes().toString().padStart(2, '0');
        const sec = d.getSeconds().toString().padStart(2, '0');
        clock.innerHTML = `${hours}:${mins}:${sec} - ${day}, ${d.getDate()} ${month} ${d.getFullYear()}`;
    }

    setInterval(setTime, 1000);
    setTime();
}

(function() {
    clock();
})();