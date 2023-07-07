import { enableValidation } from './components/validate.js';
import { addCard, prepareCard, initialCards, cardsHandler} from './components/card.js'
import { openPopup, closePopup } from './components/modal.js'
import { saveEditProfileHandler, savePlaceHandler } from './components/utils.js';
import './pages/index.css';

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__info-content-btn');
const profileButton = page.querySelector('.profile__btn');
const editPopup = page.querySelector('#popup__profile');
const placePopup = page.querySelector('#popup__place');
const closeProfilePopup = page.querySelector('#close__edit-icon');
const closePlacePopup = page.querySelector('#close__place-icon');
const popupPhoto = page.querySelector('#popup__photo');
const cardsSection = page.querySelector('.cards');
const profileForm = page.querySelector('#profileForm');
const placeForm = page.querySelector('#placeFrom');
const profileName = page.querySelector('.profile__info-content-title');
const profileJob = page.querySelector('.profile__info-content-job');
const inputProfileName = editPopup.querySelector('#profileName');
const inputProfileJob = editPopup.querySelector('#profileJob');
const cardTemplate = cardsSection.querySelector('#card').content;
const closePhotoPopup = page.querySelector('#close__photo-icon');
const imgContent = popupPhoto.querySelector('.popup__content-img');
const imgText = popupPhoto.querySelector('.popup__content-text');
inputProfileName.value = profileName.textContent;
inputProfileJob.value = profileJob.textContent;
 

const cards = prepareCard(initialCards);
addCard(cards)
enableValidation();

editButton.addEventListener('click', (() => {
    inputProfileName.value = profileName.textContent;
    inputProfileJob.value = profileJob.textContent;
    openPopup(editPopup)
}));
profileButton.addEventListener('click', (() => {
    placePopup.querySelector('form').reset();
    openPopup(placePopup)
}));
closeProfilePopup.addEventListener('click', (() => closePopup(editPopup)));
closePlacePopup.addEventListener('click', (() => closePopup(placePopup)));
closePhotoPopup.addEventListener('click', (() => closePopup(popupPhoto)));
profileForm.addEventListener('submit', ((event) => saveEditProfileHandler(event)))
placeForm.addEventListener('submit', ((event) => savePlaceHandler(event)));
cardsSection.addEventListener('click', (event) => cardsHandler(event));
document.addEventListener("keydown", (event) => {
    const popup = page.querySelector('.popup_opened')
    if (event.key === 'Escape' && popup) {
        closePopup(popup)
    }
});


export { cardsSection, cardTemplate, page, imgContent, editPopup, placePopup, profileName, profileJob, inputProfileName, inputProfileJob, imgText, popupPhoto}