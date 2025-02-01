fetch('http://www.omdbapi.com/?apikey=3bbc8b76&s=One Piece')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let cards = '';
        data.Search.forEach((movie) => {
            cards += `<div class="col-md-3 my-4">
                        <div class="card">
                            <img src="${movie.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                                <p>${movie.Type}</p>
                                <button class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#showMovieDetailModal" data-imdbid=${movie.imdbID}>Show Movie Detail</button>
                            </div>
                        </div>
                    </div>`});
        document.querySelector('.movies-container').innerHTML = cards;
        document.querySelectorAll('.modal-detail-button').forEach((modalDetalButton) => {
            modalDetalButton.addEventListener('click', (e) => {
                fetch(`http://www.omdbapi.com/?apikey=3bbc8b76&i=${e.target.getAttribute('data-imdbid')}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        let modals = `
                        <div class="modal fade" id="showMovieDetailModal" tabindex="-1"
                        aria-labelledby="showMovieDetailModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="showMovieDetailModalLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <img src=${data.Poster} class="img-fluid mb-4 w-100">
                                        </div>
                                        <div class="col-lg-8">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item"><strong>Title</strong> : ${data.Title}</li>
                                                <li class="list-group-item"><strong>Year</strong> : ${data.Year}</li>
                                                <li class="list-group-item"><strong>Type</strong> : ${data.Type}</li>
                                                <li class="list-group-item"><strong>Released</strong> : ${data.Released}</li>
                                                <li class="list-group-item"><strong>Runtime</strong> : ${data.Rintime}</li>
                                                <li class="list-group-item"><strong>Genre</strong> : ${data.Genre}</li>
                                                <li class="list-group-item"><strong>Language</strong> : ${data.Language}</li>
                                                <li class="list-group-item"><strong>Country</strong> : ${data.Country}</li>
                                                <li class="list-group-item"><strong>Actors</strong> : ${data.Actors}</li>
                                                <li class="list-group-item"><strong>Awards</strong> : ${data.Awards}</li>
                                                <li class="list-group-item"><strong>Plot</strong> : ${data.Plot}</li>
                                            </ul >
                                        </div >
                                    </div >
                                </div >
                            <div class="modal-footer"></div>
                            </div >
                        </div >
                    </div > `;
                        document.querySelector('.modal-container').innerHTML = modals;
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
