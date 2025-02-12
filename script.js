const fetchOmdbApi = () => {
    return fetch(`https://www.omdbapi.com/?apikey=3bbc8b76&s=${document.querySelector('.search-input').value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            document.querySelector('.movies-container').innerHTML = data.Search.map((movie) => {
                return `<div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 my-4">
                            <div class="card">
                                <img src="${movie.Poster}" class="card-img-top">
                                <div class="card-body">
                                    <h3 class="card-title">${movie.Title}</h3>
                                    <h5 class="card-subtitle mb-2 text-muted">${movie.Year}</h5>
                                    <button class="fs-4 w-100 btn btn-lg btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#showMovieDetailModal" data-imdbid=${movie.imdbID}>Show Detail</button>
                                </div>
                            </div>
                        </div>`;
            }).join('');
            document.querySelectorAll('.modal-detail-button').forEach((modalDetalButton) => {
                modalDetalButton.addEventListener('click', (e) => {
                    fetch(`https://www.omdbapi.com/?apikey=3bbc8b76&i=${e.target.getAttribute('data-imdbid')}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            document.querySelector('.modal-container').innerHTML =
                                `<div class="modal fade" id="showMovieDetailModal" tabindex="-1"
                                    aria-labelledby="showMovieDetailModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <ul class="list-group list-group-flush">
                                                                <li class="list-group-item"><strong>Title</strong> : ${data.Title}</li>
                                                                <li class="list-group-item"><strong>Year</strong> : ${data.Year}</li>
                                                                <li class="list-group-item"><strong>Type</strong> : ${data.Type}</li>
                                                                <li class="list-group-item"><strong>Released</strong> : ${data.Released}</li>
                                                                <li class="list-group-item"><strong>Runtime</strong> : ${data.Runtime}</li>
                                                                <li class="list-group-item"><strong>Genre</strong> : ${data.Genre}</li>
                                                                <li class="list-group-item"><strong>Language</strong> : ${data.Language}</li>
                                                                <li class="list-group-item"><strong>Country</strong> : ${data.Country}</li>
                                                                <li class="list-group-item"><strong>Actors</strong> : ${data.Actors}</li>
                                                                <li class="list-group-item"><strong>Awards</strong> : ${data.Awards}</li>
                                                                <li class="list-group-item"><strong>Plot</strong> : ${data.Plot}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer"></div>
                                        </div >
                                    </div >
                                </div >`;
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.querySelector('.search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (document.querySelector('.search-input').value) {
            fetchOmdbApi();
        } else {
            alert("Tolong masukkan kata kunci pencarian.");
        }
    }
});

document.querySelector('.bi-search').addEventListener('click', () => {
    if (document.querySelector('.search-input').value) {
        fetchOmdbApi();
    } else {
        alert("Tolong masukkan kata kunci pencarian.");
    }
});
