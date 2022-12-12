class AllData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.movies = '/tmdbMovies.json/tmdbMovies.json'
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
            data_div.innerHTML = data_div.innerHTML + 
            `<tr>
                <td class="border-0">
                    <a href="movie.html?id=${item.id}">
                        <img src="https://image.tmdb.org/t/p/w1280${item.poster_path}" alt="Poster" title="${item.title}" class="imgPoster">
                    </a>
                </td>
                <td class="border-bottom" id="title">
                    <div class="overflow fw-bold fs-5" title="${item.title}">${item.title}</div>
                    <div class="text-muted overflow">${item.tagline}</div>
                </td>
                <td class="border-bottom">
                    <a href="movie.html?id=${item.id}"><i class="fa fa-chevron-right fa-lg iconfa text-pink" title="See Detail"></i></a>
                </td>
            </tr>`
        })
    }
}

class OneData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.movies = '/tmdbMovies.json/tmdbMovies.json'
    }
    async getProfile() {
        let response = await fetch(this.movies)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj) {
        let lokasi = new URLSearchParams(location.search)
        let idIndex = lokasi.get('id')
        let objId = obj.find(item => item.id == idIndex)
        obj = objId

        let directors = ""
        obj.directors.forEach((item => {
            directors += `<div class="py-1 flex-240 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Director</span></div>`
        }))
        let writers = ""
        obj.writers.forEach((item => {
            writers += `<div class="py-1 flex-240 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Writer</span></div>`
        }))
        let casts = ""
        obj.cast.forEach((item => {
            casts += `<div class="py-1 flex-240 bd-highlight"><span class="fw-bolder">${item.name}<br></span><span class="text-black-50">Cast</span></div>`
        }))

        let data_detail = document.getElementById("detail")
        data_detail.innerHTML += `
            <div class="d-flex justify-content-between bg-light px-3 py-2">
                <div class="mt-1"><a href="index.html" class="text-decoration-none fs-5"><i class="fa fa-chevron-left"></i> Back</a></div>
                <div class="fs-4 fw-bold mx-2">${obj.title}</div>
                <div class="text-muted mt-2 ms-5"></div>
            </div>
            <div class="bg-white border p-2">
                <div class="col">
                    <img src="https://image.tmdb.org/t/p/w1280${obj.poster_path}" alt="Poster" width="250px">
                    <h4 class="p-2">${obj.title} (${obj.release_date.split("-")[0]})</h4>
                    <h5 class="text-muted">${obj.certification} | ${obj.release_date} | ${obj.original_language}</h5>
                </div>
            </div>
            <div class="bg-pink ps-4 p-1 fs-5 fw-bold text-start">Overview</div>
            <div class="px-4 pt-3 text-start">${obj.overview}<br><br></div>
            <div class="d-flex flex-row flex-wrap text-start ps-4 pb-3">
                ${directors}
            </div>
            <div class="d-flex flex-row flex-wrap text-start ps-4 pb-3">
                ${writers}
            </div>
            <div class="d-flex flex-row flex-wrap text-start ps-4 pb-3">
                ${casts}
            </div>
        `
    }
}

export {AllData, OneData};