const getMoviesContainer = () => {
    return document.getElementById('movies-container');
}

const searchInput = () => {
    return document.getElementById('search-input');
}

const fetchData = (url, callback) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error:', error));
}

const createCardGroup = (parentComponent, data) => {
    const div = document.createElement('div');
    div.classList.add('row', 'row-cols-2', 'row-cols-sm-3', 'g-4');

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card">
                <img src="${item.Poster !== 'N/A' ? item.Poster : 'placeholder.jpg'}" class="card-img-top" alt="${item.Title}">
                <div class="card-body p-2">
                    <h6 class="card-title m-0">${item.Title}</h6>
                    <small class="card-text text-muted mb-2 d-block">Tahun: ${item.Year}</small>
                    <button class="btn btn-primary d-block w-100" data-imdbid=${item.imdbID}>Selengkapnya</button>
                </div>
            </div>
        `;
        div.appendChild(card);

        const cardButtons = card.querySelectorAll('button');
        cardButtons.forEach(button => {
            button.addEventListener('click', () => {
                const getModalFade = document.getElementById('modalFade');
                if (getModalFade) {
                    getModalFade.remove();
                }

                fetchData(`https://www.omdbapi.com/?apikey=3bbc8b76&i=${button.getAttribute('data-imdbid')}`, (data) => {
                    if (data) {
                        const parentComponent = document.getElementById('movies-detail-container');
                        createModalFade(parentComponent, data);

                        const newModalFade = document.getElementById('modalFade');
                        if (newModalFade) {
                            const modalInstance = new bootstrap.Modal(newModalFade);
                            modalInstance.show();
                        }
                    }
                });
            });
        });
    });

    parentComponent.appendChild(div);
}

const createModalFade = (parentComponent, data) => {
    const div = document.createElement('div');
    div.classList.add('modal', 'fade');
    div.setAttribute('id', 'modalFade');
    div.setAttribute('tabindex', '-1');
    div.innerHTML = `
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Informasi lebih lengkap</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Judul :&emsp;</strong>${data.Title}</li>
                    <li class="list-group-item"><strong>Tahun :&emsp;</strong>${data.Year}</li>
                    <li class="list-group-item"><strong>Genre :&emsp;</strong>${data.Genre}</li>
                    <li class="list-group-item"><strong>Sutradara :&emsp;</strong>${data.Director}</li>
                    <li class="list-group-item"><strong>Penulis :&emsp;</strong>${data.Writer}</li>
                    <li class="list-group-item"><strong>Pemeran :&emsp;</strong>${data.Actors}</li>
                    <li class="list-group-item"><strong>Durasi :&emsp;</strong>${data.Runtime}</li>
                    <li class="list-group-item"><strong>IMDb Rating :&emsp;</strong>${data.imdbRating}</li>
                    <li class="list-group-item"><strong>IMDb Votes :&emsp;</strong>(${data.imdbVotes})</li>
                    <li class="list-group-item"><strong>Metascore :&emsp;</strong>${data.Metascore}</li>
                    <li class="list-group-item"><strong>Penghargaan :&emsp;</strong>${data.Awards}</li>
                    <li class="list-group-item"><strong>Box Office :&emsp;</strong>${data.BoxOffice}</li>
                    <li class="list-group-item"><strong>Tanggal Rilis :&emsp;</strong>${data.Released}</li>
                    <li class="list-group-item"><strong>Negara :&emsp;</strong>${data.Country}</li>
                    <li class="list-group-item"><strong>Bahasa :&emsp;</strong>${data.Language}</li>
                    <li class="list-group-item"><strong>Rating Usia :&emsp;</strong>${data.Rated}</li>
                    <li class="list-group-item"><strong>IMDb ID :&emsp;</strong>${data.imdbID}</li>
                    <li class="list-group-item"><strong>Jenis :&emsp;</strong>${data.Type}</li>
                    <li class="list-group-item"><strong>Sinopsis :&emsp;</strong>${data.Plot}</li>
                </ul>
            </div>
        </div>
    </div>`;

    parentComponent.appendChild(div);
};

searchInput().addEventListener('click', () => {
    getMoviesContainer().innerHTML = ``;
    const inputValue = searchInput().nextElementSibling.value;
    fetchData(`https://www.omdbapi.com/?apikey=3bbc8b76&s=${inputValue}`, (data) => {
        if (data && data.Search) {
            const parentComponent = getMoviesContainer();
            createCardGroup(parentComponent, data.Search);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetchData('https://www.omdbapi.com/?apikey=3bbc8b76&s=One', (data) => {
        if (data && data.Search) {
            const parentComponent = getMoviesContainer();
            createCardGroup(parentComponent, data.Search);
        }
    });
});
