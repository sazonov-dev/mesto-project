import { cardsSection, cardTemplate, popupPhoto } from "../index.js";
import { photoPopupInit, openPopup } from "./modal.js";

const initialCards = [{
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

export {addCard, prepareCard, createCard, cardsHandler, initialCards}