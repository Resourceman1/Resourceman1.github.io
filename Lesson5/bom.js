const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const unorderedList = document.querySelector('.listcontainer');

button.addEventListener('click', () => {
    let li = document.createElement('li');
    let del = document.createElement('button');

    li.textContent = input.value;
    del.textContent = '❌';

    li.append(del);
    del.addEventListener('click', () => {
        unorderedList.removeChild(li);
    });

    unorderedList.append(li);
});