const componentMoviesContainer = () => {
    return document.getElementById('movies-container');
}

const componentMoviesContainerColl = (parentComponent) => {
    const div = document.createElement('div');
    div.classList.add('col-sm-4', 'col-6');
    parentComponent.appendChild(div);
    return div;
}

const componentCard = (parentComponent, poster, title, year, imdbID) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${poster}" class="card-img-top" alt="${title}">
        <div class="card-body p-2">
            <h6 class="card-title m-0 p-0">Judul : ${title}</h6>
            <p class="card-text text-secondary mb-2">Tahun : ${year}</p>
            <button class="btn btn-primary d-block w-100" data-imdbid=${imdbID}>Show detail</button>
        </div>`;
    parentComponent.appendChild(div);
}

const displayComponentCard = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                data.Search.forEach(item => {
                    const colDiv = componentMoviesContainerColl(componentMoviesContainer());
                    return componentCard(colDiv, item.Poster, item.Title, item.Year, item.imdbID);
                });
            } else {
                console.error("No results found.");
            }
        })
        .catch(error => console.error('Error:', error));
}

const inputGroupSizingLg = () => {
    return document.getElementById('inputGroup-sizing-lg');
}

inputGroupSizingLg().addEventListener('click', () => {
    componentMoviesContainer().innerHTML = ``;
    let inputValue = inputGroupSizingLg().nextElementSibling.value.trim();
    let words = inputValue.split(/\s+/).slice(0, 2);
    words.forEach(word => {
        if (word) {
            displayComponentCard(`https://www.omdbapi.com/?apikey=3bbc8b76&s=${word}`);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    displayComponentCard(`https://www.omdbapi.com/?apikey=3bbc8b76&s=One`);
    displayComponentCard(`https://www.omdbapi.com/?apikey=3bbc8b76&s=Piece`);
});
