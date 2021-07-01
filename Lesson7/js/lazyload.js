function lazyLoad(entries) {

    for(const entry of entries) {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.onload = () => {
                img.classList.add('loaded');
            };
            img.src = img.dataset.src;
        }
    }
}

(function() {
    const obs = new IntersectionObserver(lazyLoad);

    document.querySelectorAll('.lazy-load')
            .forEach(imageEl => {
                obs.observe(imageEl);
            });
})();