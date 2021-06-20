const menu = document.getElementById('menu');

function toggleMenu() {
    if (menu.classList.contains('open'))
        menu.classList.remove('open');
    else
        menu.classList.add('open')
}

(function() {
    const clock = document.getElementById('clock');
    const setTime = () => {
        let d = new Date();
        const dow = [
            'Monday', 
            'Tuesday', 
            'Wednesday', 
            'Thursday', 
            'Friday', 
            'Saturday', 
            'Sunday'
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
        const day = dow[d.getDay() - 1];
        const month = moy[d.getMonth()];

        clock.innerHTML = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} - ${day}, ${d.getDate()} ${month} ${d.getFullYear()}`;
    }
    if (day == 4) {
        window.alert("Saturday = Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion.");
    }

    setInterval(setTime, 1000);
    setTime();
})();