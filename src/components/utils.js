import { editPopup, placePopup, profileJob, profileName, inputProfileJob, inputProfileName, cardsSection } from '../index.js';
import { createCard } from './card.js';
import { closePopup } from './modal.js';
import { toggleButtonState } from './validate.js';

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value;
    profileJob.textContent = inputProfileJob.value;

    return closePopup(editPopup)
}

const savePlaceHandler = (event, settings) => {
    event.preventDefault();
    const form = event.target;
    const placeLink = form.elements['imgLink'].value;
    const placeName = form.elements['placeName'].value;
    const item = {
        name: placeName,
        link: placeLink
    }
    const card = createCard(item);
    cardsSection.prepend(card);

    resetFormsInput(form, settings);
    return closePopup(placePopup);
}

const resetFormsInput = (formElement, settings) => {
    if (formElement.id === 'popup__photo') {
        return;
    }
    const inputList = Array.from(formElement.querySelectorAll(settings.input));
    const buttonElement = formElement.querySelector(settings.button);
    toggleButtonState(inputList, buttonElement, settings)
}


export { savePlaceHandler, saveEditProfileHandler, resetFormsInput }