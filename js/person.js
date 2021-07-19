let isUpdate= false;
let personObj = {};
var unirest = require('unirest');
window.addEventListener('DOMContentLoaded',(event)=>{
    createinnerstate();
    const state = document.querySelector('#state');
    state.addEventListener('input',function() {
        createinnercity(state.value);
    });
    document.querySelector('#submitButton').addEventListener('click',function(){
        onsave();
    });
    checkForUpdate();
});
const createinnerstate=() =>{
    var json=unirest
    .get('https://www.universal-tutorial.com/api/states/India')
    .headers({'Accept': 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuODc5MDY3Nzc4NHJvY2tAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiZElURHRDVXdRTUVPMFF0dlFaZGd0OGVFb2JvbjhfNlQwQ3hmbk9RRVhDb2dqUTVkYUROS3BNVWI3T1gydGdiY29SMCJ9LCJleHAiOjE2MjYzODQ1ODV9.6l5Lbc1efvCPZ1AO4dPFYsYs17_FBxfsFXk7AC5S-sM"})
    .send();
    json.then((response)=>{
        let innerhtml;
        response.body.forEach(element => {
            innerhtml = innerhtml+`<option value="${element.state_name}">${element.state_name}</option>`;
        });
        document.querySelector('#state').innerHTML=innerhtml;
    });
}

const createinnercity=(state)=>{
    var json=unirest
    .get('https://www.universal-tutorial.com/api/cities/'+state)
    .headers({'Accept': 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuODc5MDY3Nzc4NHJvY2tAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiZElURHRDVXdRTUVPMFF0dlFaZGd0OGVFb2JvbjhfNlQwQ3hmbk9RRVhDb2dqUTVkYUROS3BNVWI3T1gydGdiY29SMCJ9LCJleHAiOjE2MjYzODQ1ODV9.6l5Lbc1efvCPZ1AO4dPFYsYs17_FBxfsFXk7AC5S-sM"})
    .send();
    json.then((response)=>{
        let innerhtml;
        response.body.forEach(element => {
            innerhtml = innerhtml+`<option value="${element.city_name}">${element.city_name}</option>`;
        });
        document.querySelector('#city').innerHTML=innerhtml;
    });
}

function onsave(){
    try{
        alert("save start");
        var persondata = createPersonData();
        createAndUpdateStorage(persondata);
        alert("end");
    }
    catch(e){
        return;
    }
}
const getInputById=(id) =>{
    return document.querySelector(id).value;
}
const createPersonData =()=>{
    let person = new PersonData();
    person.name = getInputById('#name');
    person.mobile= getInputById('#mobile');
    person.address = getInputById('#address');
    person.state = getInputById('#state');
    person.city = getInputById('#city');
    person.pin = getInputById('#pin');
    alert(person.toString());
    return person;
}
const createAndUpdateStorage = (persondata) =>{
    let addressbook = JSON.parse(localStorage.getItem("addressbook"));
    if(addressbook != undefined){
        addressbook.push(persondata);
    }
    else{
        addressbook = [persondata];
    }
    localStorage.setItem("addressbook",JSON.stringify(addressbook));
}

const checkForUpdate = () => {
    const personJson = localStorage.getItem('editPerson'); 
    isUpdate = personJson ? true : false;
    if (!isUpdate) return;
    personObj = JSON.parse(personJson); 
    setForm();
    }
const setValue = (id, value) =>{
    document.querySelector(id).value = value;
    }
const setForm=()=>{
    setValue('#name', personObj._name);
    setValue('#mobile',personObj._mobile);
    setValue('#address',personObj._address);
    setValue('#pin',personObj._pin);
    let allstates = document.querySelectorAll('#state'); 
    allstates.forEach(item => {
        if (item.value == personObj._state)
            item.checked = true;
    });
    createinnercity(personObj._state);
    let allcity = document.querySelectorAll('#city'); 
    allcity.forEach(item => {
        if (item.value == personObj._city)
            item.checked = true;
    });
}