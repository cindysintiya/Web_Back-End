import AuthorData from './authorData.js';

let authorData = new AuthorData()

let show = function() {
    console.log(authorData);
    authorData.getProfile().then(data => {
        authorData.showProfile(data)
    }).catch(e => console.log(e))
}
show()

let btnNext = document.getElementById("next")
let btnPrev = document.getElementById("prev")
let page = parseInt(authorData.data[35])  // page sekarang
btnNext.onclick = function() {
    console.log("Cindy Sintiya : Tombol next >> ditekan");
    page++
    btnPrev.disabled = false
    if (page >= 993) {  // length list = 30, length url page =  933
        page = 993
        btnNext.disabled = true
    } 
    authorData.data = `https://picsum.photos/v2/list?page=${page}&limit=1`
    show()
}
btnPrev.onclick = function() {
    console.log("Cindy Sintiya : Tombol << previous ditekan");
    page--
    btnNext.disabled = false
    if (page <= 1) {
        page = 1
        btnPrev.disabled = true
    }
    authorData.data = `https://picsum.photos/v2/list?page=${page}&limit=1`
    show()
}
