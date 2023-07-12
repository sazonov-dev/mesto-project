import { closePopup } from './modal.js';
import { setAvatar, toggleButtonText} from './utils.js'
import { createCard } from './card.js';
import { cardsSection } from '../index.js'
import { checkResponse } from '../utils/utils.js'
 
const authorizationSettings = {
    token: 'b28805f4-ab65-4da3-9863-f9f73313226d',
    cohortId: 'plus-cohort-26'
}

const config = {
    baseUrl: `https://nomoreparties.co/v1/${authorizationSettings.cohortId}`,
    headers: {
        authorization: authorizationSettings.token,
        'Content-Type': 'application/json'
    },
    myId: null
}

const fetchCards = (handler) => {
    return fetch(config.baseUrl + handler, {
        headers: config.headers
    })
        .then(checkResponse)
}

const setProfileContent = (handler) => {
    return fetch(config.baseUrl + handler, {
        headers: config.headers
    })
        .then(checkResponse)
}

const fetchSaveAvatar = (event) => {
    event.preventDefault();
    const avatarUrl = event.target.querySelector('.popup__container-input').value;
    const button = event.target.querySelector('.popup__container-btn');
    toggleButtonText(button, true)
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(checkResponse)
}

const fetchUpdateContent = (form, data) => {
    const button = form.querySelector('.popup__container-btn');
    toggleButtonText(button, true)
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
    })
    .then(checkResponse)
    .then((res) => {
        data.profileSelector.textContent = data.name;
        data.jobSelector.textContent = data.about;
        closePopup(data.popup)
    })
    .catch((err) => {
        console.log(`Произошла ошибка, статус - ${err}`)
    })
    .finally(() => {
        toggleButtonText(button, false)
    })
}

const fetchAddCard = (form, card) => {
    const button = form.querySelector('.popup__container-btn');
    toggleButtonText(button, true)
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
    })
    .then(checkResponse)
}

const fetchLikeCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(checkResponse)
}

const fetchDeleteLikeCard = (cardId, target) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
}

const fetchDeleteCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
}

export { fetchSaveAvatar, fetchCards, setProfileContent, fetchUpdateContent, fetchAddCard, fetchLikeCard, fetchDeleteLikeCard, fetchDeleteCard, config}