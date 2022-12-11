class AuthorData {
    constructor() {
        this.getDataList()
        this.show()
        this.clickPrev = this.clickPrev.bind(this)
        this.clickNext = this.clickNext.bind(this)
        this.page = 1
    }
    getDataList(){
        this.data = `https://picsum.photos/v2/list?page=${this.page}&limit=1`
    }
    async getProfile(){
        this.getDataList()
        let response = await fetch(this.data)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj){
        let foto = document.getElementById("gambar")
        let author = document.getElementById("author")
        author.innerHTML = obj[0].author
        foto.src = obj[0].download_url
    }
    show() {
        this.getProfile().then(data => {
            this.showProfile(data)
        }).catch(e => console.log(e))
        console.log(this.data);
    }
    clickPrev() {
        this.page--
        console.log("Cindy Sintiya : Tombol << previous ditekan");
        this.show()
    }
    clickNext() {
        this.page++
        console.log("Cindy Sintiya : Tombol next >> ditekan");
        this.show()
    }
}
export default AuthorData;