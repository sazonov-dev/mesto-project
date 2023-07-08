import { editPopup, placePopup, profileJob, profileName, inputProfileJob, inputProfileName, cardsSection, enableValidationSettings} from '../index.js';
import { createCard } from './card.js';
import { closePopup } from './modal.js';
import { enableValidation } from './validate.js';

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value;
    profileJob.textContent = inputProfileJob.value;

    enableValidation(enableValidationSettings);

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

    enableValidation(enableValidationSettings);

    return closePopup(placePopup);
}


export { savePlaceHandler, saveEditProfileHandler }