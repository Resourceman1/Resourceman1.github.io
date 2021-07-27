const DIRECTORY_JSON_URL = "";
//Replace ^ this with the final project URL upon submission. aka: ./js/directory.json

async function main() {
    const results = await getDirectories();

    const target = document.getElementById('directory');

    for(const res of results) {

        const article = document.createElement('article');

        article.innerHTML = `<h2>${res.name}</h2>
        <img src="assets/${res.image}" alt="${res.name} Logo"/>
        <h1>${res.owner}</h1>          
        <p>${res.address.line1}</p>
        <p>${res.address.city}, ${res.address.state} ${res.address.zip}</p>
        <p>Primary Phone: ${res.phone.primary}</p>
        <p>Phone: ${res.phone.alt}</p>
    
        <p>Website: <a href="${res.website}">${res.name}</a></p>
        <p>Email: ${res.email}</p>`;

        target.appendChild(article);
    }
}


(function() {
    main();
})();