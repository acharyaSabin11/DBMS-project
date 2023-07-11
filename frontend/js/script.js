'use strict';

//Elements Selection:
const expandableButtons = document.querySelectorAll('.expandable-button-container');
const homeButton = document.querySelector('#home-button');
const dataEntryButton = document.querySelector('#data-entry-button');
const viewTableButton = document.querySelector('#view-table-button');
const aboutButton = document.querySelector('#about-button');
const getStartedButton = document.querySelector('#get-started-button');
const servicesButton = document.querySelector('#services-button');

const homePageContent = document.querySelector('.home-page-content');
const dataEntryPageContent = document.querySelector('.data-entry-page-content');
const viewTablePageContent = document.querySelector('.view-table-page-content');
const aboutPageContent = document.querySelector('.about-page-content');


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
    dataEntryPageContent.classList.remove('hidden');
    viewTablePageContent.classList.add('hidden');
    aboutPageContent.classList.add('hidden');
    homeButton.classList.remove('active');
    dataEntryButton.classList.remove('active');
    viewTableButton.classList.remove('active');
    aboutButton.classList.add('active');
});