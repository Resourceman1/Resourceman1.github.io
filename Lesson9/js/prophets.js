
async function getData(url) {
    const resp = await fetch(url);
    return resp.json();
}

(async function () {
    const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

    const jsonObject = await getData(requestURL);

    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const prophets = jsonObject['prophets'];
    for(const { name, lastname, imageurl, birthplace, birthdate } of prophets) {
        
        const prophetContent = `<h2>${name} ${lastname}</h2>
        <p>Date of Birth: ${birthdate}</p>
        <p>Place of Birth: ${birthplace}</p>
        <img src="${imageurl}" />`;

        let card = document.createElement('section');
        card.classList.add('prophet')
        card.innerHTML = prophetContent;
        document.querySelector('div.cards').appendChild(card);
    }
})();