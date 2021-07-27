function toggleMenu() {
    const body = document.body;

    if (body.classList.contains('expanded')) {
        body.classList.remove('expanded');
    } else {
        body.classList.add('expanded');
    }
}