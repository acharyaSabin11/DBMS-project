'use strict';

//Buttons Selection:
const expandableButtons = document.querySelectorAll('.expandable-button-container');
const homeButton = document.querySelector('#home-button');
const dataEntryButton = document.querySelector('#data-entry-button');
const viewTableButton = document.querySelector('#view-table-button');
const aboutButton = document.querySelector('#about-button');
const getStartedButton = document.querySelector('#get-started-button');
const servicesButton = document.querySelector('#services-button');
const formSubmitButton = document.querySelector('#form-submit-button');
const getDataButton = document.querySelector('#get-data-button');
const clearTableButton = document.querySelector('#clear-table-button');
const menuButton = document.querySelector('#menu-button');
const closeSideNavBar = document.querySelector('#close-side-nav');

//side nav bar selection
const sideNavBar = document.querySelector('.side-nav-bar');

//Page content selection
const homePageContent = document.querySelector('.home-page-content');
const dataEntryPageContent = document.querySelector('.data-entry-page-content');
const viewTablePageContent = document.querySelector('.view-table-page-content');
const aboutPageContent = document.querySelector('.about-page-content');

//textFields selection
const fullNameTextField = document.querySelector('#full-name');
const rollNumberTextField = document.querySelector('#roll-number');
const dobTextField = document.querySelector('#dob');
const heightTextField = document.querySelector('#height');

//Textfields error selection
const fullNameError = document.querySelector('#name-error');
const rollError = document.querySelector('#roll-error');
const genderError = document.querySelector('#gender-error');
const dobError = document.querySelector('#dob-error');
const heightError = document.querySelector('#height-error');


//Radio buttons selection
const genderRadios = document.getElementsByName('Gender');

//Table selection
const tableBody = document.getElementById('table-body');

//spans
const dateSpan = document.getElementById('date-span');
dateSpan.textContent = new Date().toDateString();

//Constants
const rollRegex = /^[A-Za-z]{3}\d{3}[A-Za-z]{3}\d{3}$/;

//Function Declaration
//Get radios function
function getGenderRadioInput() {
    for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            return genderRadios[i].value;
        }
    }
    return null;
}

function formValidation() {
    var hasError = false;
    if (fullNameTextField.value.trim().length === 0) {
        hasError = true;
        fullNameError.textContent = 'Name field cannot be empty';
        fullNameError.classList.remove('hidden');
    } else if (fullNameTextField.value.trim().split(' ').length < 2) {
        hasError = true;
        fullNameError.textContent = 'Please enter the full name';
        fullNameError.classList.remove('hidden');
    } else {
        fullNameError.classList.add('hidden');
    }

    if (rollNumberTextField.value.trim() === '') {
        hasError = true;
        rollError.textContent = 'Roll number cannot be empty';
        rollError.classList.remove('hidden');
    } else if (!rollRegex.test(rollNumberTextField.value.trim())) {
        hasError = true;
        rollError.textContent = 'Roll number syntax is invalid';
        rollError.classList.remove('hidden');
    } else {
        rollError.classList.add('hidden');
    }

    if (dobTextField.value.trim() === '') {
        hasError = true;
        dobError.textContent = 'Please enter a date of birth';
        dobError.classList.remove('hidden');
    } else {
        dobError.classList.add('hidden');
    }

    if (!getGenderRadioInput()) {
        hasError = true;
        genderError.textContent = 'Please Select the gender';
        genderError.classList.remove('hidden');
    }
    else {
        genderError.classList.add('hidden');
    }

    if (heightTextField.value.trim() === '') {
        hasError = true;
        heightError.textContent = 'Please enter the height';
        heightError.classList.remove('hidden');
    } else {
        heightError.classList.add('hidden');
    }
    return hasError;
}

function clearTextFields() {
    fullNameTextField.value = '';
    rollNumberTextField.value = '';
    dobTextField.value = '';
    heightTextField.value = '';
    genderRadios.forEach(element => element.checked = false);
}

menuButton.addEventListener('click', () => {
    sideNavBar.classList.add('makeVisible');
});

closeSideNavBar.addEventListener('click', () => {
    sideNavBar.classList.remove('makeVisible');
});

clearTableButton.addEventListener('click', async () => {
    const result = await fetch('/clear-table', {
        method: 'GET',
    }).then(resp => {
        if (resp.status == 200) {
            tableBody.innerHTML = '';
            alert('Cleared Table Successfully');
        }
    }).catch(e => {
        console.log(e);
        alert('Some Error occured in clearing table');
    });

})

// Adding the event listener for get data button
getDataButton.addEventListener('click', async () => {
    const data = await fetch('/get-data', {
        method: 'GET',
    }).then(resp => resp.json()).catch(e => console.log(e));

    var innerHtml = '';
    data.forEach(element => {
        innerHtml += `<tr>
                  <td>${element.roll}</td>
                  <td>${element.name}</td>
                  <td>${element.dob}</td>
                  <td>${element.gender}</td>
                  <td>${element.height}</td>
                </tr>`;
    });

    tableBody.innerHTML = innerHtml;
});

// Adding the event listener for submit button
formSubmitButton.addEventListener('click', async () => {
    let hasError = formValidation();
    if (!hasError) {
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify({
                'name': fullNameTextField.value.trim(),
                'roll': rollNumberTextField.value.trim(),
                'gender': getGenderRadioInput(),
                'dob': dobTextField.value.trim(),
                'height': heightTextField.value.trim()
            })

        }).then(resp => {
            if (resp.status == 200) {
                clearTextFields();
            }
            return resp.json();
        }).then(data =>
            alert(data.message)

        ).catch(e => alert(e));


    }
});

//adding collapsing logic for expandable buttons
expandableButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.parentElement.querySelector('.sub-buttons-list').classList.toggle('hidden');
    })
});

//assigning event listener for each naviation button
homeButton.addEventListener('click', () => {
    homePageContent.classList.remove('hidden');
    dataEntryPageContent.classList.add('hidden');
    viewTablePageContent.classList.add('hidden');
    aboutPageContent.classList.add('hidden');
    viewTableButton.classList.remove('active');
    aboutButton.classList.remove('active');
    dataEntryButton.classList.remove('active');
    homeButton.classList.add('active');
});
dataEntryButton.addEventListener('click', () => {
    homePageContent.classList.add('hidden');
    dataEntryPageContent.classList.remove('hidden');
    viewTablePageContent.classList.add('hidden');
    aboutPageContent.classList.add('hidden');
    homeButton.classList.remove('active');
    viewTableButton.classList.remove('active');
    aboutButton.classList.remove('active');
    dataEntryButton.classList.add('active');
});
getStartedButton.addEventListener('click', () => {
    homePageContent.classList.add('hidden');
    dataEntryPageContent.classList.remove('hidden');
    viewTablePageContent.classList.add('hidden');
    aboutPageContent.classList.add('hidden');
    homeButton.classList.remove('active');
    viewTableButton.classList.remove('active');
    aboutButton.classList.remove('active');
    dataEntryButton.classList.add('active');
    servicesButton.parentElement.querySelector('.sub-buttons-list').classList.remove('hidden');
});
viewTableButton.addEventListener('click', () => {
    homePageContent.classList.add('hidden');
    dataEntryPageContent.classList.add('hidden');
    viewTablePageContent.classList.remove('hidden');
    aboutPageContent.classList.add('hidden');
    homeButton.classList.remove('active');
    aboutButton.classList.remove('active');
    dataEntryButton.classList.remove('active');
    viewTableButton.classList.add('active');
});
aboutButton.addEventListener('click', () => {
    homePageContent.classList.add('hidden');
    dataEntryPageContent.classList.add('hidden');
    viewTablePageContent.classList.add('hidden');
    aboutPageContent.classList.remove('hidden');
    homeButton.classList.remove('active');
    dataEntryButton.classList.remove('active');
    viewTableButton.classList.remove('active');
    aboutButton.classList.add('active');
});