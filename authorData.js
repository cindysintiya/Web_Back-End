class AuthorData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.data = "https://picsum.photos/v2/list?page=1&limit=1"
    }
    async getProfile() {
        let response = await fetch(this.data)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj) {
        let author = document.getElementById("author")
        let foto = document.getElementById("gambar")
        author.innerHTML = obj[0].author
        foto.src = obj[0].download_url
    }
}

export default AuthorData;
