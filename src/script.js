const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__info-content-btn');
const profileButton = page.querySelector('.profile__btn');
const editPopup = page.querySelector('#popup__profile');
const placePopup = page.querySelector('#popup__place');
const closeProfilePopup = page.querySelector('#close__edit-icon');
const closePlacePopup = page.querySelector('#close__place-icon');
const cardsSection = page.querySelector('.cards');
const popupPhoto = page.querySelector('#popup__photo');
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

const addCard = (cards) => {
    cards.forEach((card) => {
        cardsSection.append(card);
    })
}

const prepareCard = (cards) => {
    const preparedCards = cards.map((card) => {
        return createCard(card)
    })

    return preparedCards;
}

const createCard = (item) => {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    cardElement.querySelector('.cards__item-img').src = item.link;
    cardElement.querySelector('.cards__item-img').alt = item.name;
    cardElement.querySelector('.cards__item-info-title').textContent = item.name;
    return cardElement
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    const form = event.target;

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

const cardsHandler = (event) => {
    const target = event.target;
    if (target.id === 'cards__like') {
        event.target.classList.toggle('cards__item-info-btn_active');
    } else if (target.id === 'cards__trash') {
        return cardsSection.removeChild(event.target.parentNode)
    } else if (target.classList.contains('cards__item-img')) {
        const photoInfo = {
            src: target.src,
            name: target.alt
        }

        photoPopupInit(photoInfo)

        return openPopup(popupPhoto)
    }

    return false;
}

const photoPopupInit = (photoInfo) => {
    imgContent.src = photoInfo.src
    imgContent.alt = photoInfo.name
    imgText.textContent = photoInfo.name
}

const cards = prepareCard(initialCards);
addCard(cards)

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