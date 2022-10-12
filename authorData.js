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
        
// Sorry, we're unable to show the rest of the code cause an error occur while commiting this file.
// We will send a notification to this repository owner and feel free to comment below about the error.
