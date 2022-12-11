import AuthorData from './authorData.js';

let authorData = new AuthorData()
console.log(authorData);

let btnPrev = document.getElementById("prev")
let btnNext = document.getElementById("next")
btnPrev.onclick = function() {
    authorData.clickPrev()
    btnNext.disabled = false
    if (authorData.page <= 1) {
        authorData.page = 1
        btnPrev.disabled = true
    }
}
btnNext.onclick = function() {
    authorData.clickNext()
    btnPrev.disabled = false
    if (authorData.page >= 993) {  // length list = 30, length url page =  993
        authorData.page = 993
        btnNext.disabled = true
    }
}