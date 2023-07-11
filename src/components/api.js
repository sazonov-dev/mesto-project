import { closePopup } from './modal.js';
import { setAvatar, toggleButtonText} from './utils.js'
import { prepareCard, createCard } from './card.js';
import { cardsSection } from '../index.js'

const authorizationSettings = {
    token: 'b28805f4-ab65-4da3-9863-f9f73313226d',
    cohortId: 'plus-cohort-26'
}

let config = {
    baseUrl: `https://nomoreparties.co/v1/${authorizationSettings.cohortId}`,
    headers: {
        authorization: authorizationSettings.token,
        'Content-Type': 'application/json'
    },
    myId: null
}

const fetchContent = (handler) => {
    return fetch(config.baseUrl + handler, {
        headers: config.headers
    })
}

const fetchCards = () => {
    fetchContent('/cards')
        .then((res) => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(res)
        })
        .then((res) => {
            prepareCard(res);
        })
        .catch((err) => {
            console.error(`Произошла ошибка, статус - ${err}`)
        })
}

const setProfileContent = (profileSelectors) => {
    fetchContent('/users/me')
        .then((res) => {
            if (res.ok) {
                return res.json()
            }

            return Promise.reject(res.status)
        })
        .then((res) => {
            profileSelectors.profileLogo.src = res.avatar;
            profileSelectors.profileName.textContent = res.name;
            profileSelectors.profileJob.textContent = res.about;
            config.myId = res._id;
        })
        .catch((err) => {
            console.log(`Произошла ошибка, статус - ${err}`)
        })
}

const fetchSaveAvatar = (event, form) => {
    event.preventDefault();
    const avatarUrl = event.target.querySelector('.popup__container-input').value;
    const button = event.target.querySelector('.popup__container-btn');
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then((res) => {
            toggleButtonText(button, true)
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(res.status);
        })
        .then((res) => {
            setAvatar(res.avatar)
            closePopup(form)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            toggleButtonText(button, false)
        })
}

const fetchUpdateContent = (form, data) => {
    const button = form.querySelector('.popup__container-btn');
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
    })
    .then((res) => {
        toggleButtonText(button, true)
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .then((res) => {
        console.log(res)
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
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
    })
    .then((res) => {
        toggleButtonText(button, true)
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .then((res) => {
        const card = createCard(res)
        cardsSection.prepend(card);
    })
    .catch((err) => {
        console.log(`Произошла ошибка, статус - ${err}`)
    })
    .finally(() => {
        toggleButtonText(button, false)
    })
}

const fetchLikeCard = (cardId, target) => {
    let likeCount = target.parentNode.querySelector('.cards__item-info-like-count').textContent;
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .then((res) => {
        target.parentNode.querySelector('.cards__item-info-like-count').textContent = String(Number(likeCount) + 1);
        console.log(res)
    })
    .catch((err) => {
        console.log(`Произошла ошибка, статус - ${err}`)
    })
}

const fetchDeleteLikeCard = (cardId, target) => {
    let likeCount = target.parentNode.querySelector('.cards__item-info-like-count').textContent;
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .then((res) => {
        target.parentNode.querySelector('.cards__item-info-like-count').textContent = String(Number(likeCount) - 1);
        console.log(res)
    })
    .catch((err) => {
        console.log(`Произошла ошибка, статус - ${err}`)
    })
}

const fetchDeleteCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(res.status)
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(`Произошла ошибка, статус - ${err}`)
    })
}

export { fetchSaveAvatar, fetchCards, setProfileContent, fetchUpdateContent, fetchAddCard, fetchLikeCard, fetchDeleteLikeCard, fetchDeleteCard, config}