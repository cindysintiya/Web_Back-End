class AllData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.movies = '../assets/tmdbMovies.json/tmdbMovies.json'
    }
    async getProfile() {
        let response = await fetch(this.movies)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj) {
        let data_div = document.getElementById("data")
        obj.forEach((item) => {
            data_div.innerHTML = data_div.innerHTML + `
                <div class="p-2 mb-4 bg-white rounded glow-img">
                    <a href="movie/${item.id}">
                        <img src="https://image.tmdb.org/t/p/w1280${item.poster_path}" alt="Poster" title="${item.title}" class="imgposter rounded">
                    </a>
                    <div class="row">
                        <div class="col">
                            <h5 class="overflow fw-bold ps-1 pt-1" title="${item.title}">${item.title}</h5>
                            <p class="text-muted overflow ps-1 mb-1 m-minus" title="${item.tagline}">${item.tagline}</p>
                        </div>
                        <div class="col-auto py-3 me-1">
                            <a href="movie/${item.id}"><i class="fa fa-chevron-right fa-lg iconfa" title="See Detail"></i></a>
                        </div>
                    </div>
                </div>
            `
        })
    }
}


class OneData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.movies = '/assets/tmdbMovies.json/tmdbMovies.json'
    }
    async getProfile() {
        let response = await fetch(this.movies)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj) {
        let lokasi = location.pathname.split('/')
        let idIndex = lokasi[2]
        let objId = obj.find(item => item.id == idIndex)
        obj = objId

        let directors = ""
        obj.directors.forEach((item => {
            directors += `<div class="ps-4 py-1 flex-175 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Director</span></div>`
        }))
        let writers = ""
        obj.writers.forEach((item => {
            writers += `<div class="ps-4 py-1 flex-175 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Writer</span></div>`
        }))
        let casts = ""
        obj.cast.forEach((item => {
            casts += `<div class="ps-4 py-1 flex-175 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Cast</span></div>`
        }))

        let data_detail = document.getElementById("detail")
        data_detail.innerHTML += `
            <div class="d-flex justify-content-between border bg-light px-3 py-2">
                <div class="mt-1"><a href="/movies" class="text-decoration-none fs-5"><i class="fa fa-chevron-left"></i> Back</a></div>
                <div class="fs-4 fw-bold">${obj.title}</div>
                <div class="text-muted mt-2 ms-5"></div>
            </div>
            <div class="bg-white border px-4 py-2 container">
                <div class="row">
                    <div class="col-auto ps-4 py-4 text-center">
                        <img src="https://image.tmdb.org/t/p/w1280/${obj.poster_path}" alt="Poster" class="img-fluid poster">
                    </div>
                    <div class="col text-start ps-2 pe-2 pt-4 pb-1">
                        <h4 class="fw-bold">${obj.title} (${obj.release_date.split("-")[0]})</h4>
                        <h5 class="text-muted">${obj.tagline}</h5>
                        <p class="text-muted pb-1">${obj.certification} | ${obj.release_date} | ${obj.original_language}</p>
                        <div class="bg-pink pt-3 px-3 pb-0">
                            <h5 class="fw-bold">Overview</h5>
                            <p class="lh-sm pb-3">${obj.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container border pt-3">
                <div class="d-flex flex-row flex-wrap text-start pb-3">
                    ${directors}
                </div>
                <div class="d-flex flex-row flex-wrap text-start pb-3">
                    ${writers}
                </div>
                <div class="d-flex flex-row flex-wrap text-start pb-3">
                    ${casts}
                </div>
            </div>
        `
    }
}


export {AllData, OneData};