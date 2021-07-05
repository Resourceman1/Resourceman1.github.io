const data = {
    preston: {
        title: "Preston, Idaho",
        id: '5604473',
        name: 'Preston',
        image: 'assets/preston.jpg',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23682.873542937818!2d-111.89783454129316!3d42.09977746153174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8754f78c7cda6c31%3A0xf1b3b4fc465a4a3f!2sPreston%2C%20ID%2083263!5e0!3m2!1sen!2sus!4v1625463711049!5m2!1sen!2sus',
        article: {
            title: 'Who is Gregory Alan Isakov',
            author: 'Passionate Perry',
            text: 'Born in Johannesburg, South Africa, and now calling Colorado home, horticulturist-turned-musician Gregory Alan Isakov has cast an impressive presence on the indie-rock and folk worlds with his five full-length studio albums: That Sea, The Gambler; This Empty Northern Hemisphere; The Weatherman; Gregory Alan Isakov with the Colorado Symphony; and Evening Machines (nominated for a Grammy award for Best Folk Album). Isakov tours internationally with his band, and has performed with several national symphony orchestras across the United States. In addition to owning his independent record label, Suitcase Town Music, he also manages a small farm in Boulder County, which provides produce to the farm’s CSA members and to local restaurants.',
            image: 'assets/studio.jpg'
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
            title: 'The Music of Idaho',
            author: 'Bronson Bombastic',
            text: 'Idaho has produced a number of musicians and bands, including Paul Revere & the Raiders, Built to Spill, Treepeople, and Caustic Resin. Rosalie Sorrels is a renowned folk singer born in Boise. Minimalist composer La Monte young was born in Bem. Jazz double bassist Gary Peacock was born in Burley. Nikki Sixx (bassist of glam metal band Motley Crue) grew up in Jerome. Moscow, Idaho is the home town of modern folk/country/indie songwriter Josh Ritter.',
            image: 'assets/Guitar.jpg'
        }
    },
    fish: {
        title: 'Fish Haven, Idaho',
        name: 'Fish Haven',
        id: '5585010',
        image: 'assets/fishhaven.jpg',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5926.478648905351!2d-111.4005013990794!3d42.03804813475029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875415e9bdab006f%3A0xc1864ed86dd2b0e4!2sFish%20Haven%2C%20ID%2083287!5e0!3m2!1sen!2sus!4v1625463911891!5m2!1sen!2sus',
        article: {
            title: 'The Origins of Folk Music',
            author: 'Jonson Jnko Jeans',
            text: 'The typical 21st-century conception of folk music comes from beliefs about the nature of music and musical life in the village cultures of Europe from the 18th into the 19th century; but this traditional folk music culture was affected greatly by the rise of industrial society and of cities, as well as by nationalist movements beginning in the 19th century. Both the threat to folk culture and the rise of nationalism spurred revival and preservation movements in which learned musicians, poets, and scholars provided leadership. In the 20th century, further revivals associated folk music with political and social movements and blurred the musical distinctions among folk, art, and popular musics. Nevertheless, vigorous remnants of the traditional culture of folk music were retained in 19th-century western Europe and in eastern Europe into the 20th century; these are the bases for the following characterization.',
            image: 'assets/FolkMusic.jpg'
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