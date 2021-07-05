const data = {
    preston: {
        title: "Preston, Idaho",
        id: '5604473',
        name: 'Preston',
        image: 'assets/preston.jpg',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23682.873542937818!2d-111.89783454129316!3d42.09977746153174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8754f78c7cda6c31%3A0xf1b3b4fc465a4a3f!2sPreston%2C%20ID%2083263!5e0!3m2!1sen!2sus!4v1625463711049!5m2!1sen!2sus',
        article: {
            title: 'Some stupid cunt',
            author: 'Jand Bomes',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat condimentum justo id ornare. Fusce vitae porta magna. Phasellus ac nisl vel est ornare scelerisque. Proin est ligula, dapibus ut felis ac, scelerisque rutrum erat. Donec non tempor sem, ac viverra sapien. Etiam at felis nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam libero sapien, feugiat eu dolor quis, iaculis lacinia urna. Quisque vel malesuada enim, nec vulputate risus. Sed porttitor hendrerit venenatis. Aliquam sed tincidunt purus.',
            image: 'assets/logo.png'
        }, 
        alert: {
            text: 'Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.',
            day: 6
        }
    },
    soda: {
        title: 'Soda Springs, Idaho',
        id: '5607916',
        name: 'Soda Springs',
        image: 'assets/sodasprings.jpg',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46943.91300997791!2d-111.62387712677365!3d42.66147060863288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8755968bb0047ae5%3A0x9d3970a1a6df8e12!2sSoda%20Springs%2C%20ID%2083276!5e0!3m2!1sen!2sus!4v1625463880638!5m2!1sen!2sus',
        article: {
            title: 'Some stupid cunt',
            author: 'Jand Bomes',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat condimentum justo id ornare. Fusce vitae porta magna. Phasellus ac nisl vel est ornare scelerisque. Proin est ligula, dapibus ut felis ac, scelerisque rutrum erat. Donec non tempor sem, ac viverra sapien. Etiam at felis nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam libero sapien, feugiat eu dolor quis, iaculis lacinia urna. Quisque vel malesuada enim, nec vulputate risus. Sed porttitor hendrerit venenatis. Aliquam sed tincidunt purus.',
            image: 'assets/logo.png'
        }
    },
    fish: {
        title: 'Fish Haven, Idaho',
        name: 'Fish Haven',
        id: '5585010',
        image: 'assets/fishhaven.jpg',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5926.478648905351!2d-111.4005013990794!3d42.03804813475029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875415e9bdab006f%3A0xc1864ed86dd2b0e4!2sFish%20Haven%2C%20ID%2083287!5e0!3m2!1sen!2sus!4v1625463911891!5m2!1sen!2sus',
        article: {
            title: 'Some stupid cunt',
            author: 'Jand Bomes',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat condimentum justo id ornare. Fusce vitae porta magna. Phasellus ac nisl vel est ornare scelerisque. Proin est ligula, dapibus ut felis ac, scelerisque rutrum erat. Donec non tempor sem, ac viverra sapien. Etiam at felis nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam libero sapien, feugiat eu dolor quis, iaculis lacinia urna. Quisque vel malesuada enim, nec vulputate risus. Sed porttitor hendrerit venenatis. Aliquam sed tincidunt purus.',
            image: 'assets/logo.png'
        }
    }
}

async function main() {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city') || 'preston';
    const cityData = data[city];

    if (!cityData) {
        console.error('INVALID CITY', {
            city
        });
        return;
    }

    if (cityData.alert && new Date().getDay() === cityData.alert.day) {
        const at = document.getElementById('alert');
        at.classList.add('show');
        at.innerHTML = `<p>${cityData.alert.text}</p>`;
    }

    setValue('town-title', cityData.title);
    setImageSrc('bg-image', cityData.image);

    const [
        weather,
        forecast,
        town
    ] = await Promise.all([
        getWeather(cityData.id),
        getForecast(cityData.id),
        getTown(cityData.name)
    ]);

    setEvents(town);
    setWeather(weather, town);
    setForecast(forecast);
    setArticle(cityData);
    setMap(cityData);
    setAnchor(city);
}

function setMap(cityData) {
    const target = document.getElementById('map');
    target.src = cityData.map;
}

function setAnchor(city) {
    const target = document.getElementById('nav');

    for(const el of target.children) {
        if (el.href.indexOf('city=' + city) !== -1) {
            el.classList.add('active');
        }
    }
}

function setEvents(town) {
    const target = document.getElementById('events');

    for(const evt of town.events) {
        const p = document.createElement('p');
        p.innerHTML = evt;

        target.appendChild(p);
    }
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

function setWeather(weather, town) {
    setValue('weather-condition', weather.weather[0].main);
    setValue('weather-currently', weather.main.temp + " &#176;F");
    setValue('weather-high', weather.main.temp_max + " &#176;F");
    setValue('weather-chill', calcWindChill(weather.wind.speed, weather.main.temp).toFixed(2) + " &#176;F");
    setValue('weather-humidity', weather.main.humidity + '%');
    setValue('weather-speed', weather.wind.speed + ' mph');
    setValue('details-population', town.currentPopulation);
}

function setArticle(cityData) {
    setValue('article-title', cityData.article.title);
    setValue('article-author', cityData.article.author);
    setValue('article-text', cityData.article.text);
    setImageSrc('article-image', cityData.article.image);
}

(function() {
    main();
})();