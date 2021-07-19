let isUpdate= false;
let personObj = {};
let count=0;
// var unirest = require('unirest');
window.addEventListener('DOMContentLoaded',(event)=>{
    if(!checkForUpdate()){
    createinnerstate();
    const state = document.querySelector('#state');
    state.addEventListener('input',function() {
        createinnercity(state.value);
    });
    }
    document.querySelector('#state').addEventListener('mouseenter',function(){
        createinnerstate();
        const state = document.querySelector('#state');
        state.addEventListener('input',function() {
        createinnercity(state.value);
    });
    });
    document.querySelector('#city').addEventListener('mouseenter',function(){
        const state = document.querySelector('#state');
        state.addEventListener('input',function() {
        createinnercity(state.value);
        });
    });
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input',function(){
        try{
            checkName(name.value);
            textError.textContent = '';

        }catch(e){
            textError.textContent = e;
        }
    });

    const phnNumber = document.querySelector('#mobile');
    const numberError = document.querySelector('#number-error');
    phnNumber.addEventListener('input',function(){
        try{
            checkMobile(phnNumber.value);
            numberError.textContent = '';

        }catch(e){
            numberError.textContent = e;
        }
    })

});
// const createinnerstate=() =>{
//     var json=unirest
//     .get('https://www.universal-tutorial.com/api/states/India')
//     .headers({'Accept': 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuODc5MDY3Nzc4NHJvY2tAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiZElURHRDVXdRTUVPMFF0dlFaZGd0OGVFb2JvbjhfNlQwQ3hmbk9RRVhDb2dqUTVkYUROS3BNVWI3T1gydGdiY29SMCJ9LCJleHAiOjE2MjYzODQ1ODV9.6l5Lbc1efvCPZ1AO4dPFYsYs17_FBxfsFXk7AC5S-sM"})
//     .send();
//     json.then((response)=>{
//         let innerhtml=`<option selected>select state</option>`;;
//         response.body.forEach(element => {
//             innerhtml = innerhtml+`<option value="${element.state_name}">${element.state_name}</option>`;
//         });
//         document.querySelector('#state').innerHTML=innerhtml;
//     });
// }
const createinnerstate=()=>{
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        // console.log(JSON.parse(xhr.responseText)[1].state_name);
        let innerhtml=`<option value="" selected>select state</option>`;
        JSON.parse(xhr.responseText).forEach(element => {
            innerhtml = innerhtml+`<option value="${element.state_name}">${element.state_name}</option>`;
        });
        document.querySelector('#state').innerHTML=innerhtml;
    }
    }
    xhr.open('GET', 'https://www.universal-tutorial.com/api/states/India', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuYXN1cmFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiRUlWdmZqSlFlaGJKMHFNanFaNWtDNVBxV0lINUNxOVJtamFTWjdHOHREM1pBLTBFLTdmaEE2Z21GZEpDNmR3VzZKVSJ9LCJleHAiOjE2MjY2OTEyOTR9.UQViXwoIQsNxvhh6Lkd0sMVweJCaBB_7YzgjY6gmuno");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
}

// const createinnercity=(state)=>{
//     var json=unirest
//     .get('https://www.universal-tutorial.com/api/cities/'+state)
//     .headers({'Accept': 'application/json', "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuODc5MDY3Nzc4NHJvY2tAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiZElURHRDVXdRTUVPMFF0dlFaZGd0OGVFb2JvbjhfNlQwQ3hmbk9RRVhDb2dqUTVkYUROS3BNVWI3T1gydGdiY29SMCJ9LCJleHAiOjE2MjYzODQ1ODV9.6l5Lbc1efvCPZ1AO4dPFYsYs17_FBxfsFXk7AC5S-sM"})
//     .send();
//     json.then((response)=>{
//         let innerhtml;
//         response.body.forEach(element => {
//             innerhtml = innerhtml+`<option value="${element.city_name}">${element.city_name}</option>`;
//         });
//         document.querySelector('#city').innerHTML=innerhtml;
//     });
// }
const createinnercity=(state)=>{
    if(state=="")
    document.querySelector('#city').innerHTML=`<option value="" selected>select state first</option>`;
    else{
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        let innerhtml;
        JSON.parse(xhr.responseText).forEach(element => {
            innerhtml = innerhtml+`<option value="${element.city_name}">${element.city_name}</option>`;
        });
        document.querySelector('#city').innerHTML=innerhtml;
    }
    }
    xhr.open('GET', 'https://www.universal-tutorial.com/api/cities/'+state, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJwcmF2ZWVuYXN1cmFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiRUlWdmZqSlFlaGJKMHFNanFaNWtDNVBxV0lINUNxOVJtamFTWjdHOHREM1pBLTBFLTdmaEE2Z21GZEpDNmR3VzZKVSJ9LCJleHAiOjE2MjY2OTEyOTR9.UQViXwoIQsNxvhh6Lkd0sMVweJCaBB_7YzgjY6gmuno");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(null);
}
}

function onsave(event){
    event.preventDefault();
    event.stopPropagation();
    try{
        // alert("save started");
        // setEmployeePayrollObject();
        // createAndUpdateStorage();
        // // let employeePayrollData = submitted();
        // // createAndUpdateStorage(employeePayrollData);
        // resetForm();
        // window.location.replace(site_properties.home_page);
        setPersonAddressbookObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
    
        }else{
            createOrUpdateEmployeePayroll();
        }
        
    }
    catch(e){
        return;
    }
}
const cancel=()=>{
    localStorage.removeItem("editPerson");
    window.location.replace(site_properties.home_page);

}
const createOrUpdateEmployeePayroll = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT";
        postURL = postURL+"/"+personObj._id.toString();
    }
    makeServiceCall(methodCall, postURL, true, personObj)
     .then(responseText => {
         resetForm();
         window.location.replace(site_properties.home_page);
     })
     .catch(error => {
         throw error;
     })
}

const resetForm=()=>{
    setValue('#name','');
    setValue('#mobile','');
    setValue('#address','');
    setValue('#pin','');
    // localStorage.removeItem("editPerson");
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
const createAndUpdateStorage = () =>{

    let employeePayrollList = JSON.parse(localStorage.getItem("addressbook"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id==personObj._id);
        if(!empPayrollData){
            employeePayrollList.push(personObj);
        }
        else{
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,personObj);
        }
    }
    else{
        // alert(employeePayrollData.toString());
        employeePayrollList = [personObj];
    }
    // alert(employeePayrollList.toString());
    // alert("last");
    localStorage.setItem("addressbook",JSON.stringify(employeePayrollList));
}
// const createEmployeePayrollData = (id) =>{
//     let personData = new PersonData();
//     if(!id) personData.id = createNewPersonId();
//     else {personData.id = id;
//         }
//     setPersonData(personData);
//     return personData;
// }
const createNewPersonId = () =>{
    let item = localStorage.getItem("PersonID");
    item = !item? 1 :(parseInt(item)+1).toString();
    localStorage.setItem("PersonID",item);
    return item;
}

const checkForUpdate = () => {
    const personJson = localStorage.getItem('editPerson'); 
    isUpdate = personJson ? true : false;
    if (!isUpdate) return false;
    personObj = JSON.parse(personJson); 
    setForm();
    return true;
    }
const setValue = (id, value) =>{
    document.querySelector(id).value = value;
    }
const setForm=()=>{
    setValue('#name', personObj._name);
    setValue('#mobile',personObj._mobile);
    setValue('#address',personObj._address);
    setValue('#pin',personObj._pin);
    // let allstates = document.querySelectorAll('#state'); 
    // allstates.forEach(item => {
    //     alert(item);
    //     if (item.value == personObj._state)
    //         item.checked = true;
    // });
    // createinnerstate();
    // createinnercity(personObj._state);
    // let allcity = document.querySelectorAll('#city'); 
    // allcity.forEach(item => {
    //     if (item.value == personObj._city)
    //         item.checked = true;
    // });
    setStateAndCity();

}
const setStateAndCity=()=>{
    document.querySelector('#state').innerHTML=`<option value="${personObj._state}">${personObj._state}</option>`;
    document.querySelector('#city').innerHTML=`<option value="${personObj._city}">${personObj._city}</option>`;
}

const setPersonAddressbookObject = ()=>{
    if(!isUpdate) personObj._id = createNewPersonId();
    personObj._name = getInputById('#name');
    personObj._mobile= getInputById('#mobile');
    personObj._address = getInputById('#address');
    personObj._state = getInputById('#state');
    personObj._city = getInputById('#city');
    personObj._pin = getInputById('#pin');
}
const setPersonData = (persondata_obj) => {
    persondata_obj.name = personObj._name;
    persondata_obj.mobile = personObj._mobile;
    persondata_obj.address = personObj._address;
    persondata_obj.state = personObj._state;
    persondata_obj.city = personObj._city;
    persondata_obj.pin = personObj._pin;
    // alert(persondata_obj.startDate);

}

const checkName = (fullName) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(fullName)) throw 'Name is Incorrect';
}

const checkMobile = (phoneNumber) => {
    let phnRegex = RegExp('\\d{2}\\d{10}');
    if(!phnRegex.test(phoneNumber)) throw 'Invalid Phone Number'
      
}