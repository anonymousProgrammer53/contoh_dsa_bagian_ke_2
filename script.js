const componentMoviesContainer = () => {
    return document.getElementById('movies-container');
}

const componentInputGroupSizingLg = () => {
    return document.getElementById('inputGroup-sizing-lg');
}

const componentDetailMoviesContainer = () => {
    return document.getElementById('movies-detail-container');
}

const buttonsShowDetail = () => {
    return document.querySelectorAll('button[data-imdbid]');
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
            <button class="btn btn-primary d-block w-100" data-imdbid=${imdbID} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Selengkapnya</button>
        </div>`;
    parentComponent.appendChild(div);
    return div;
}

const componentModal = (parentComponent, { title, year, writer, genre, actors, runtime, language, country, released }) => {
    const div = document.createElement('div');
    div.classList.add('modal', 'fade');
    div.setAttribute('id', 'staticBackdrop');
    div.setAttribute('data-bs-keyboard', 'false');
    div.setAttribute('data-bs-keyboard', 'false');
    div.setAttribute('tabindex', '-1');
    div.setAttribute('aria-labelledby', 'staticBackdropLabel');
    div.setAttribute('aria-hidden', 'true"');
    div.innerHTML = `
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Informasi Lengkap</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Judul :&emsp;</strong>${title}</li>
                    <li class="list-group-item"><strong>Tahun :&emsp;</strong> ${year}</li>
                    <li class="list-group-item"><strong>Penulis :&emsp;</strong> ${writer}</li>
                    <li class="list-group-item"><strong>Genre :&emsp;</strong> ${genre}</li>
                    <li class="list-group-item"><strong>Pemeran :&emsp;</strong> ${actors}</li>
                    <li class="list-group-item"><strong>Durasi :&emsp;</strong> ${runtime}</li>
                    <li class="list-group-item"><strong>Bahasa :&emsp;</strong> ${language}</li>
                    <li class="list-group-item"><strong>Negara :&emsp;</strong> ${country}</li>
                    <li class="list-group-item"><strong>Tanggal Rilis :&emsp;</strong> ${released}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
    parentComponent.appendChild(div);
    return div;
}

const displayComponentCard = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Search) {
                data.Search.forEach(item => {
                    const colDiv = componentMoviesContainerColl(componentMoviesContainer());
                    const card = componentCard(colDiv, item.Poster, item.Title, item.Year, item.imdbID);

                    card.querySelector('button').addEventListener('click', (event) => {
                        const imdbID = event.target.getAttribute('data-imdbid');
                        displayComponentModal(`https://www.omdbapi.com/?apikey=3bbc8b76&i=${imdbID}`);
                    });
                });
            } else {
                console.error("No results found.");
            }
        })
        .catch(error => console.error('Error:', error));
};

const displayComponentModal = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data);
                const detailContainer = componentDetailMoviesContainer();
                detailContainer.innerHTML = '';
                componentModal(detailContainer, {
                    title: data.Title,
                    year: data.Year,
                    writer: data.Writer,
                    genre: data.Genre,
                    actors: data.Actors,
                    runtime: data.Runtime,
                    language: data.Language,
                    country: data.Country,
                    released: data.Released,
                });

            } else {
                console.error("No results found.");
            }
        })
        .catch(error => console.error('Error:', error));
};

componentInputGroupSizingLg().addEventListener('click', () => {
    componentMoviesContainer().innerHTML = ``;
    let inputValue = componentInputGroupSizingLg().nextElementSibling.value.trim();
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
