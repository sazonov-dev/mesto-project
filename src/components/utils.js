import { showInputError, hideInputError } from "./error.js";
import { editPopup, placePopup, profileJob, profileName, inputProfileJob, inputProfileName, cardsSection} from '../index.js';
import { createCard } from './card.js';
import { closePopup } from './modal.js';

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value;
    profileJob.textContent = inputProfileJob.value;

    return closePopup(editPopup)
}

const savePlaceHandler = (event) => {
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

    return closePopup(placePopup);
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__container-btn_disabled');
    } else {
        buttonElement.classList.remove('popup__container-btn_disabled')
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__container-input'));
    const buttonElement = formElement.querySelector('.popup__container-btn');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.profileError);
    } else {
        inputElement.setCustomValidity('');
        hideInputError(formElement, inputElement);
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}


export { toggleButtonState, setEventListeners, hasInvalidInput, checkInputValidity, savePlaceHandler, saveEditProfileHandler }