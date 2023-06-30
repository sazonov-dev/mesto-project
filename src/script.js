const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__info-content-btn');
const profileButton = page.querySelector('.profile__btn');
const editPopup = page.querySelector('#popup__profile');
const placePopup = page.querySelector('#popup__place');
const closeProfilePopup = page.querySelector('#close__edit-icon');
const closePlacePopup = page.querySelector('#close__place-icon');
const cardsSection = page.querySelector('.cards');
const popupPhotoContent = page.querySelector('.popup__content');
const popupPhoto = page.querySelector('#popup__photo');
const profileForm = page.querySelector('#profileForm');
const placeForm = page.querySelector('#placeFrom');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addCards = (cards) => {
    cards.forEach((card) => {
        cardsSection.innerHTML += `<div class="cards__item">
        <img src="${card.link}" alt="${card.name}"
            class="cards__item-img">
        <button class="cards__item-trash" id="cards__trash" type="button"></button>
        <div class="cards__item-info">
            <h2 class="cards__item-info-title">${card.name}</h2>
            <button class="cards__item-info-btn" id="cards__like" type="button"></button>
        </div>
    </div>`
    })
}

const editPopupHandler = (type) => {
    const profileName = page.querySelector('.profile__info-content-title').innerText;
    const profileJob = page.querySelector('.profile__info-content-job').innerText;
    const inputProfileName = editPopup.querySelector('#profileName');
    const inputProfileJob = editPopup.querySelector('#profileJob');

    if (type === true) {
        inputProfileName.placeholder = profileName;
        inputProfileJob.placeholder = profileJob;
        return editPopup.classList.add('popup_opened');
    }

    return editPopup.classList.remove('popup_opened');
}

const placePopupHandler = (type) => {
    if (type === true) {
        return placePopup.classList.add('popup_opened');
    }

    return placePopup.classList.remove('popup_opened');
}

const photoPopupHandler = (type) => {
    if (type === true) {
        return popupPhoto.classList.add('popup_opened');
    }

    return popupPhoto.classList.remove('popup_opened');
}

const saveEditProfileHandler = (event) => {
    event.preventDefault();
    const inputProfileName = editPopup.querySelector('#profileName').value;
    const inputProfileJob = editPopup.querySelector('#profileJob').value;
    let profileName = page.querySelector('.profile__info-content-title');
    let profileJob = page.querySelector('.profile__info-content-job');

    profileName.textContent = inputProfileName;
    profileJob.textContent = inputProfileJob;

    return closePopupHandler('close__edit-icon');
}

const savePlaceHandler = (event) => {
    event.preventDefault();

    const inputPlaceName = placePopup.querySelector('#placeName').value;
    const inputPlaceLink = placePopup.querySelector('#imgLink').value;

    cardsSection.insertAdjacentHTML('afterbegin', `<div class="cards__item">
    <img src="${inputPlaceLink}" alt="${inputPlaceName}"
        class="cards__item-img">
        <button class="cards__item-trash" id="cards__trash" type="button"></button>
    <div class="cards__item-info">
        <h2 class="cards__item-info-title">${inputPlaceName}</h2>
        <button class="cards__item-info-btn" id="cards__like" type="button"></button>
    </div>
</div>`)

    return closePopupHandler('close__place-icon');
}

const clearPopupValues = (inputData) => {
    inputData.forEach((el) => {
        el.value = '';
    });
}

const closePopupHandler = (targetId) => {
    if (targetId === 'close__edit-icon') {
        let inputData = editPopup.querySelectorAll('.popup__container-input');
        clearPopupValues(inputData);
        return editPopupHandler(false);
    } else if (targetId === 'close__place-icon'){
        let inputData = placePopup.querySelectorAll('.popup__container-input');
        clearPopupValues(inputData);
        return placePopupHandler(false);
    } else {
        return photoPopupHandler(false);
    }
}

const cardsHandler = (event) => {
    const target = event.target;
    if (target.id === 'cards__like') {
        event.target.classList.toggle('cards__item-info-btn_active');
    } else if (target.id === 'cards__trash') {
        return cardsSection.removeChild(event.target.parentNode)
    } else if (target.classList.contains('cards__item-img')) {
        let photoInfo = {
            src: target.src,
            name: target.alt
        }

        return photoPopupInit(photoInfo)
    }

    return false;
}

const photoPopupInit = (photoInfo) => {
    popupPhotoContent.innerHTML = `<img class="popup__content-img" src="${photoInfo.src}" alt="${photoInfo.name}">
    <p class="popup__content-text">${photoInfo.name}</p>
    <button class="popup__close-icon page__button" id="close__photo-icon" type="button"></button>`

    const closePhotoPopup = page.querySelector('#close__photo-icon')
    
    closePhotoPopup.addEventListener('click', (() => closePopupHandler('close__photo-icon')));

    popupPhoto.classList.add('popup_opened')
}


addCards(initialCards)

editButton.addEventListener('click', (() => editPopupHandler(true)));
profileButton.addEventListener('click', (() => placePopupHandler(true)));
closeProfilePopup.addEventListener('click', (() => closePopupHandler('close__edit-icon')));
closePlacePopup.addEventListener('click', (() => closePopupHandler('close__place-icon')));
profileForm.addEventListener('submit', ((event) => saveEditProfileHandler(event)))
placeForm.addEventListener('submit', ((event) => savePlaceHandler(event)));
cardsSection.addEventListener('click', (event) => cardsHandler(event));