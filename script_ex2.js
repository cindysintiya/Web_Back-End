let show = function(data) {
    let arr = JSON.parse(data)
    arr.forEach(result => {
        let tabel = document.getElementById("tabel")
        tabel.innerHTML = tabel.innerHTML + `
            <tr class="border-bottom border-secondary">
                <td><b><a href="https://hildegard.org" target="_blank" title="${result.company.name}">${result.id}</a></b></td>
                <td> ${result.name} </td>
                <td> ${result.username} </td>
                <td> ${result.email} </td>
                <td> ${result.address.city} </td>
            </tr>
        `
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
