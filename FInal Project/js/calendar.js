const events = [
    {
        date: new Date(2021, 06, 21),
        items: [
            'Scheduled finish for class Final',
        ]
    }
]

function getDateRanges(dateToUse) {
    let now = dayjs(dateToUse || new Date());
    const eom = now.endOf('month')
    const bom = now.startOf('month')

    const startDate = bom.startOf('week');
    const endDate = eom.endOf('week');

    const days = endDate.diff(startDate, 'day') + 1;

    return {
        startDate,
        endDate,
        days,
        weeks: days / 7,
    }
}

function createEl(name, properties, ...children) {
    const el = document.createElement(name);

    for(const key in properties) {
        el.setAttribute(key, properties[key]);
    }

    for(const child of children) {
        if (!child) continue;

        if (!child.nodeType) {
            const text = document.createTextNode(child.toString());
            el.appendChild(text);
            continue;
        }

        el.appendChild(child);
    }

    return el;
}

function formatEvents(cur) {
    let output = [];

    for(const eventList of events) {
        if (!dayjs(eventList.date).isSame(cur, 'date'))
            continue;
        
        for(const evt of eventList.items) {

            const evtEl = createEl('div', {
                class: 'event',
                style: 'color: red'
            }, evt);
            output.push(evtEl);                            
        }
    }

    return output;
}

function getDay(offset, config){
    const date = config.startDate.add(offset, 'day');

    const isToday = dayjs().isSame(date, 'date');

    const header = createEl('header', { }, date.date());

    const eventsEl = createEl('div', { class: 'events' }, ...formatEvents(date));

    const dayClass = isToday ? 'day today': 'day';
    return createEl('div', { class: dayClass }, header, eventsEl);
} 

function main() {
    const config = getDateRanges();

    const tartget = document.getElementById('calendar');

    for(let w = 0; w < config.weeks; w++) {
        let dayOffset = w * 7;

        const week = document.createElement('section');
        week.classList.add('week');

        for(let d = 0; d < 7; d++) {
            week.appendChild(getDay(dayOffset + d, config));                            
        }

        tartget.appendChild(week);
    }
}

(function() {
    main();
})();