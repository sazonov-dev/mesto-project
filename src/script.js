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
let profileName = page.querySelector('.profile__info-content-title');
let profileJob = page.querySelector('.profile__info-content-job');
const inputProfileName = editPopup.querySelector('#profileName');
const inputProfileJob = editPopup.querySelector('#profileJob');
const cardTemplate = cardsSection.querySelector('.cards__item');
const closePhotoPopup = page.querySelector('#close__photo-icon');
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

const addCards = (cards) => {

    cards.forEach((card) => {
        let elem = document.createElement('div');
        elem.classList.add('cards__item')
        elem.append(cardTemplate.content.cloneNode(true));
        let img = elem.querySelector('img')
        let title = elem.querySelector('.cards__item-info-title')
        img.src = card.link
        img.alt = card.name
        title.textContent = card.name;
        cardsSection.append(elem);
    })
}

const closePopup = (popup) => {
    // let popupParent = popup.parentNode.parentNode;
    popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const saveEditProfileHandler = (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value;
    profileJob.textContent = inputProfileJob.value;

    return closePopup(editPopup)
}

const savePlaceHandler = (event) => {
    event.preventDefault();
    const form = event.target
    const placeLink = form.elements['imgLink'].value
    const placeName = form.elements['placeName'].value
    let elem = document.createElement('div');
    elem.classList.add('cards__item')
    elem.append(cardTemplate.content.cloneNode(true));
    let img = elem.querySelector('img')
    let title = elem.querySelector('.cards__item-info-title')
    img.src = placeLink
    img.alt = placeName
    title.textContent = placeName;
    cardsSection.prepend(elem);

    return closePopup(placePopup);
}

const clearPopupValues = (inputData) => {
    inputData.forEach((el) => {
        el.value = '';
    });
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
        console.log(target)

        photoPopupInit(photoInfo)

        return openPopup(popupPhoto)
    }

    return false;
}

const photoPopupInit = (photoInfo) => {
    let img = popupPhoto.querySelector('.popup__content-img')
    let name = popupPhoto.querySelector('.popup__content-text')
    img.src = photoInfo.src
    img.alt = photoInfo.name
    name.textContent = photoInfo.name
}

addCards(initialCards)

editButton.addEventListener('click', (() => openPopup(editPopup)));
profileButton.addEventListener('click', (() => openPopup(placePopup)));
closeProfilePopup.addEventListener('click', (() => closePopup(editPopup)));
closePlacePopup.addEventListener('click', (() => closePopup(placePopup)));
closePhotoPopup.addEventListener('click', (() => closePopup(popupPhoto)));
profileForm.addEventListener('submit', ((event) => saveEditProfileHandler(event)))
placeForm.addEventListener('submit', ((event) => savePlaceHandler(event)));
cardsSection.addEventListener('click', (event) => cardsHandler(event));