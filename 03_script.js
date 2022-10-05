let show = function(data) {
    let arr = JSON.parse(data)
    arr = arr[0]

    document.getElementById("gambar").src = arr.download_url
    document.getElementById("author").innerHTML = arr.author
}

let load = function() {
    let link = "https://picsum.photos/v2/list?page=2&limit=1"

    try {
        let xhr = new  XMLHttpRequest()
        if (!xhr) return -1

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                show(xhr.responseText)
            }
        }
        xhr.open('GET', link)
        xhr.send()
    }
    catch(e) {
        console.log(e);
    }
}

load()