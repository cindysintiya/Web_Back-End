let show = function(data) {
    let arr = JSON.parse(data)
    arr.forEach(result => {
        let tabel = document.getElementById("tabel")
        let tabelrow = document.createElement("tr")

        let tabeldataid = document.createElement("td")
        let tabeldataname = document.createElement("td")
        let tabeldatausername = document.createElement("td")
        let tabeldataemail = document.createElement("td")
        let tabeldatacity = document.createElement("td")

        tabeldataid.innerHTML = result.id
        tabeldataname.innerHTML = result.name
        tabeldatausername.innerHTML = result.username
        tabeldataemail.innerHTML = result.email
        tabeldatacity.innerHTML = result.address.city

        tabelrow.appendChild(tabeldataid)
        tabelrow.appendChild(tabeldataname)
        tabelrow.appendChild(tabeldatausername)
        tabelrow.appendChild(tabeldataemail)
        tabelrow.appendChild(tabeldatacity)

        tabel.appendChild(tabelrow)
    })
}

let load = function() {
    let link = "https://jsonplaceholder.typicode.com/users"

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