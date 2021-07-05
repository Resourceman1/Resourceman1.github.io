async function main() {
    const towns = await getTowns();
    const target = document.getElementById('towns');

    console.log('DATA', towns);

    for(const town of towns) {

        console.log('TOWN', town);

        const wrapper = document.createElement('div');
        wrapper.classList.add('town');
        wrapper.classList.add(town.name.replace(' ', '-').toLowerCase());

        const html = `<div class="details">
            <h2>${town.name}</h2>
            <p class="motto">${town.motto}</p>
            <p class="data">
                Year Founded: ${town.yearFounded}
            </p>
            <p class="data">
                Population: ${town.currentPopulation}
            </p>
            <p class="data">
                Annual Rain Fall: ${town.averageRainfall}
            </p>
        </div>
        <img class="lazy" src="assets/placeholder.jpg" data-src="assets/cities/${town.photo}" />`;

        wrapper.innerHTML = html;

        target.appendChild(wrapper);
    }

    initLazyLoad('.lazy');
}

(function() {
    main();
})();