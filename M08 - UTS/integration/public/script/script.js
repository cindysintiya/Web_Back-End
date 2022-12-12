import {AllData, OneData} from './fetchData.js';

let allData = new AllData()
let oneData = new OneData()

let show = function(obj) {
    obj.getProfile().then(data => {
        obj.showProfile(data)
    }).catch(e => console.log(e))
}

show(allData)
show(oneData)