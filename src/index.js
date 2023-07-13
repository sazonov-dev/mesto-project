import {
    enableValidation
} from './components/validate.js';
import {
    selectCardEvent
} from './components/card.js'
import {
    openPopup,
    closePopup
} from './components/modal.js'
import {
    saveEditProfileHandler,
    savePlaceHandler,
    setAvatar,
    toggleButtonText,
    resetFormsInput
} from './components/utils.js';
import {
    fetchSaveAvatar,
    fetchCards,
    setProfileContent,
    config
} from './components/api.js'
import {
    prepareCard
} from './components/card.js';
import './pages/index.css';

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__info-content-btn');
const profileButton = page.querySelector('.profile__btn');
const editPopup = page.querySelector('#popup__profile');
const placePopup = page.querySelector('#popup__place');
const popupPhoto = page.querySelector('#popup__photo');
const cardsSection = page.querySelector('.cards');
const profileForm = page.querySelector('#profileForm');
const placeForm = page.querySelector('#placeFrom');
const profileName = page.querySelector('.profile__info-content-title');
const profileJob = page.querySelector('.profile__info-content-job');
const inputProfileName = editPopup.querySelector('#profileName');
const inputProfileJob = editPopup.querySelector('#profileJob');
const cardTemplate = cardsSection.querySelector('#card').content;
const imgContent = popupPhoto.querySelector('.popup__content-img');
const imgText = popupPhoto.querySelector('.popup__content-text');
const profileLogo = page.querySelector('.profile__logo');
inputProfileName.value = profileName.textContent;
inputProfileJob.value = profileJob.textContent;
const popups = document.querySelectorAll('.popup')
const avatarButton = page.querySelector('.profile__info-mirror');
const avatarForm = page.querySelector('#avatarForm')
const avatarPopup = page.querySelector('#popup__avatar')

const enableValidationSettings = {
    form: '.popup__container-form',
    input: '.popup__container-input',
    inputDisabled: 'popup__container-input_disabled',
    button: '.popup__container-btn',
    buttonDisabled: 'popup__container-btn_disabled',
    error: 'popup__container-form-error',
    errorActive: 'popup__container-form-error_active'
}

Promise.all([fetchCards('/cards'), setProfileContent('/users/me')])
    .then(([cards, userData]) => {
        profileLogo.src = userData.avatar;
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        config.myId = userData._id;
        prepareCard(cards)
    })
    .catch(err => {
        console.log(`Произошла ошибка, статус - ${err}`)
    });

enableValidation(enableValidationSettings);

editButton.addEventListener('click', (() => {
    inputProfileName.value = profileName.textContent;
    inputProfileJob.value = profileJob.textContent;
    openPopup(editPopup, enableValidationSettings)
}));
profileButton.addEventListener('click', (() => {
    placeForm.reset();
    resetFormsInput(placePopup, enableValidationSettings);
    openPopup(placePopup, enableValidationSettings)
}));
avatarButton.addEventListener('click', () => {
    avatarForm.reset();
    resetFormsInput(avatarPopup, enableValidationSettings);
    openPopup(avatarPopup, enableValidationSettings)
})
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }

        if (evt.target.classList.contains('popup__close-icon')) {
            closePopup(popup)
        }
    })
})
profileForm.addEventListener('submit', ((event) => saveEditProfileHandler(event)))
placeForm.addEventListener('submit', ((event) => savePlaceHandler(event, enableValidationSettings)));
avatarForm.addEventListener('submit', (event) => {
    const button = event.target.querySelector('.popup__container-btn');
    const avatarUrl = event.target.querySelector('.popup__container-input').value;
    toggleButtonText(button, true);
    fetchSaveAvatar(event, avatarUrl)
        .then((res) => {
            setAvatar(res.avatar)
            closePopup(avatarPopup)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            toggleButtonText(button, false)
        })
})
cardsSection.addEventListener('click', (event) => selectCardEvent(event, enableValidationSettings));

export {
    cardsSection,
    cardTemplate,
    page,
    imgContent,
    editPopup,
    placePopup,
    profileName,
    profileJob,
    inputProfileName,
    inputProfileJob,
    imgText,
    popupPhoto,
    enableValidationSettings
}