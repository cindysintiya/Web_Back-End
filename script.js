import AuthorData from './authorData.js';

let authordata = new AuthorData()

let show = function() {
    console.log(authordata);
    authordata.getProfile().then(data => {
        authordata.showProfile(data)
    }).catch(e => console.log(e))
}
show()

// Sorry, we're unable to show the rest of the code cause an error occur while commiting this file.
// We will send a notification to this repository owner and feel free to comment below about the error.
