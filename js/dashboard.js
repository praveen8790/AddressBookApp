let addressbook;

window.addEventListener('DOMContentLoaded', (event) =>{
    // addressbook = getEmployeePayrollDataFromStorage(); 
    // document.querySelector(".emp-count").textContent = addressbook.length; 
    // createInnerHtml();
    // localStorage.removeItem('editPerson');
    if(site_properties.use_local_storage.match("true")){
        getAddressbookDataFromStorage();
    }else
    {
        getAddressbookDataFromServer();
    }

});

const processAddressBookDataResponse = () => {
    document.querySelector('.emp-count').textContent = addressbook.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getAddressbookDataFromStorage = () => {
    addressbook = localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processAddressBookDataResponse();
}

const getAddressbookDataFromServer = () => {
    makeServiceCall("GET",site_properties.server_url,true)
    .then(responseText => {
        addressbook = JSON.parse(responseText);
        processAddressBookDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status "+JSON.stringify(error));
        addressbook = [];
        processAddressBookDataResponse();
    });
}

const createInnerHtml = () => {
    const headerHtml = "<th>Full Name</th><th>Address</th><th>City</th>"+
    "<th>State</th><th>PIN Code</th><th>Mobile Number</th><th>Actions</th>";
    if (addressbook.length == 0) return; 
    let innerHtml = `${headerHtml}`;
    for (let person of addressbook) { 
        innerHtml = `${innerHtml}
            <tr id="${person._id}" >
                <td>${person._name}</td> 
                <td>${person._address}</td>
                <td>${person._city}</td> 
                <td>${person._state}</td>  
                <td>${person._pin}</td> 
                <td>${person._mobile}</td> 
                <td>
                    <img id="${person._id}" onclick="remove(this)"
                        src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${person._id}" onclick="update(this)"
                        src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
            `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const remove =(node) => {
    // let personData = addressbook.find(empData => empData._id == node.id);
    // if(!personData) alert(node);
    // const index = addressbook.map(empData => empData._id).indexOf(personData._id);
    // addressbook.splice(index,1);
    // localStorage.setItem("addressbook",JSON.stringify(addressbook));
    // document.querySelector(".emp-count").textContent = addressbook.length;
    // createInnerHtml();
    let personData = addressbook.find(empData => empData._id == node.id);
    if(!personData)return;
    const index = addressbook.map(empData => empData.id)
                                .indexOf(personData.id);
    addressbook.splice(index,1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("addressbook",JSON.stringify(addressbook));
        createInnerHtml();
    }else{
        const deleteURL = site_properties.server_url+"/"+personData._id.toString();
        makeServiceCall("DELETE",deleteURL,false)
         .then(responseText => {
             createInnerHtml();
         })
         .catch(error => {
             console.log("DELETE Error Status :"+JSON.stringify(error));
         });
    }
}

const update = (node) => {
    let personData = addressbook.find(perData => perData._id == node.id);
    if(!personData) return;
    localStorage.setItem('editPerson',JSON.stringify(personData));
    window.location.replace(site_properties.add_emp_payroll_page);
}

