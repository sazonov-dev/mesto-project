import { editPopup, placePopup, profileJob, profileName, inputProfileJob, inputProfileName, page } from '../index.js';
import { fetchAddCard, fetchUpdateContent,config } from './api.js';
import { closePopup } from './modal.js';
import { toggleButtonState } from './validate.js';

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    fetchUpdateContent(event.target, {name: inputProfileName.value, about: inputProfileJob.value, profileSelector: profileName, jobSelector: profileJob, popup: editPopup})
}

const setAvatar = (url) => {
    return page.querySelector('.profile__logo').src = url;
}

const savePlaceHandler = (event, settings) => {
    event.preventDefault();
    const form = event.target;
    const placeLink = form.elements['imgLink'].value;
    const placeName = form.elements['placeName'].value;
    const item = {
        name: placeName,
        link: placeLink,
        owner: {
            _id: config.myId
        },
        likes: []
    }

    fetchAddCard(form, item)
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

const toggleButtonText = (button, state) => {
    if (state) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохранить'
    }
}


export { savePlaceHandler, saveEditProfileHandler, resetFormsInput, setAvatar, toggleButtonText }