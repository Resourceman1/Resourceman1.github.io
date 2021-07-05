(function(){
    const imageCount = 9;
    const target = document.getElementById('images');
    const imageDescs = [
        'Picture of a cloudy skyline',
        'Lighting striking over night scape city lake',
        'Snow coated tree line',
        'Mist coated Fjord from a dock',
        'Golden weather clashing over water with storm',
        'Rolling hills at golden hour',
        'Sun setting over maroon sea',
        'Fallen leaves on a fall road',
        'Raindrops crashing into water'
    ];

    for(let i = 0; i < imageCount; i++) {
        const imagePath = `assets/gallery/image-${i}.jpg`;
        const desc = imageDescs[i];
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery-image');

        const html = `
        <img class="lazy-load" src="assets/placeholder.jpg" data-src="${imagePath}" />
        <div class="description">
            <p>${desc}</p>
        </div>`;
        wrapper.innerHTML = html;
        target.appendChild(wrapper);
    }

    initLazyLoad();

})();