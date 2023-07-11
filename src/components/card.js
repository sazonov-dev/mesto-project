import {
    cardsSection,
    cardTemplate,
    popupPhoto,
} from "../index.js";
import {
    photoPopupInit,
    openPopup
} from "./modal.js";
import {
    fetchLikeCard,
    fetchDeleteLikeCard,
    fetchDeleteCard,
    config
} from "./api.js"

const addCard = (cards) => {
    cards.forEach((card) => {
        cardsSection.append(card);
    })
}

const prepareCard = (cards) => {
    const preparedCards = cards.map((card) => {
        return createCard(card)
    })

    addCard(preparedCards);
}

const hasOwnerLike = (likes) => {
    return likes.some((el) => el._id === config.myId)
}

const createCard = (item) => {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
    if (item.owner._id !== config.myId) {
        cardElement.removeChild(cardElement.querySelector('#cards__trash'))
    }
    if (hasOwnerLike(item.likes)) {
        cardElement.querySelector('.cards__item-info-btn').classList.add('cards__item-info-btn_active');
    }
    cardElement.dataset.id = item._id
    cardElement.querySelector('.cards__item-img').src = item.link;
    cardElement.querySelector('.cards__item-img').alt = item.name;
    cardElement.querySelector('.cards__item-info-title').textContent = item.name;
    cardElement.querySelector('.cards__item-info-like-count').textContent = item.likes.length;

    return cardElement;
}

const hasLike = (card) => {
    if (card.classList.contains('cards__item-info-btn_active')) {
        return true;
    }

    return false;
}

const selectCardEvent = (event, settings) => {
    const target = event.target;
    if (target.id === 'cards__like') {
        const cardId = target.parentNode.parentNode.parentNode.dataset.id;
        if (hasLike(target)) {
            fetchDeleteLikeCard(cardId, target);
        } else {
            fetchLikeCard(cardId, target);
        }

        target.classList.toggle('cards__item-info-btn_active');
    } else if (target.id === 'cards__trash') {
        const cardId = target.parentNode.dataset.id
        fetchDeleteCard(cardId)
        return cardsSection.removeChild(event.target.parentNode)
    } else if (target.classList.contains('cards__item-img')) {
        const photoInfo = {
            src: target.src,
            name: target.alt
        }

        photoPopupInit(photoInfo)

        return openPopup(popupPhoto, settings)
    }

    return false;
}

export {
    addCard,
    prepareCard,
    createCard,
    selectCardEvent
}