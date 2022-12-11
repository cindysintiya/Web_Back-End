class AuthorData {
    constructor() {
        this.getDataList()
    }
    getDataList() {
        this.data = "https://picsum.photos/v2/list"
    }
    async getProfile() {
        let response = await fetch(this.data)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    }
    showProfile(obj) {
        let data_div = document.getElementById("data")
        obj.forEach((result) => {
            data_div.innerHTML = data_div.innerHTML + 
            `<tr class="border-bottom border-secondary">
                <td>
                    <img src="${result.download_url}" width=100 height=75>
                </td>
                <td>${result.author}</td>
            </tr>`
        })
    }
}

export default AuthorData;