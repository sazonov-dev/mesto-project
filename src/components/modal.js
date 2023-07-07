import { page, imgContent, imgText } from '../index.js'

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');

    const popupOpened = page.querySelector('.popup_opened');
    popupOpened.addEventListener('click', (event) => {
        closePopup(event.target)
    })
}

const photoPopupInit = (photoInfo) => {
    imgContent.src = photoInfo.src
    imgContent.alt = photoInfo.name
    imgText.textContent = photoInfo.name
}

export { closePopup, openPopup, photoPopupInit}