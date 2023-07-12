import { editPopup, placePopup, profileJob, profileName, inputProfileJob, inputProfileName, page, cardsSection } from '../index.js';
import { fetchAddCard, fetchUpdateContent,config } from './api.js';
import { closePopup } from './modal.js';
import { toggleButtonState } from './validate.js';
import { createCard } from './card.js';

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
    const button = form.querySelector('.popup__container-btn');
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
        .then((res) => {
            const card = createCard(res)
            cardsSection.prepend(card);
            closePopup(placePopup);
        })
        .catch((err) => {
            console.log(`Произошла ошибка, статус - ${err}`)
        })
        .finally(() => {
            toggleButtonText(button, false)
        })
    resetFormsInput(form, settings);
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