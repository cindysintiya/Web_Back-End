class AuthorData {
    constructor() {
        this.getDataList()
        this.nextORprev()
        this.page = 1
    }
    getDataList(){
        this.data = `https://picsum.photos/v2/list?page=${this.page}&limit=1`
        console.log(this.data);
    }
    async getProfile(){
        this.getDataList()     // if i delete this, value of this.data is null. why??
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
    nextORprev() {
        let btnPrev = document.getElementById('prev')
        let btnNext = document.getElementById('next')
        btnPrev.addEventListener('click', () => {    // btnNext.onclick = function() {   // --> not working, harus pake bind()?
            this.page--
            console.log("Cindy Sintiya : Tombol << previous ditekan");
            this.getProfile().then(data => {
                this.showProfile(data)
                btnNext.disabled = false
                if (this.page <= 1) {
                    this.page = 1
                    btnPrev.disabled = true
                }
            }).catch(e => console.log(e))
        })
        btnNext.addEventListener('click', () => {    // btnPrev.onclick = function() {   //  --> not working, harus pake bind()?
            this.page++
            console.log("Cindy Sintiya : Tombol next >> ditekan");
            this.getProfile().then(data => {
                this.showProfile(data)
                btnPrev.disabled = false
                if (this.page >= 993) {  // length list = 30, length url page =  933
                    this.page = 993
                    btnNext.disabled = true
                }
            }).catch(e => console.log(e))
        })
    }
}
export default AuthorData;
