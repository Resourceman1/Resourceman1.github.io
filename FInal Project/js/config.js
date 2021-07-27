const CONFIG = {
    appId: '01e8eb86dbe39f0ce0b7736e0918e96b',
    url: 'https://api.openweathermap.org/data/2.5/',
    townData: 'https://byui-cit230.github.io/weather/data/towndata.json',
    cityId: 5431740,
    directorys: "https://resourceman1.github.io/Lesson11/js/directory.json"
};

function fetchJson(url) {
    return fetch(url).then(r => r.json());
}

function getDirectories() {
    return fetchJson(CONFIG.directorys);
}