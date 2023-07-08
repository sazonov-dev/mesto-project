import { imgContent, imgText } from '../index.js'


function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
      document.removeEventListener('keydown', closeByEscape);
    }
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeByEscape);
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');

    document.addEventListener("keydown", closeByEscape);
}

const photoPopupInit = (photoInfo) => {
    imgContent.src = photoInfo.src
    imgContent.alt = photoInfo.name
    imgText.textContent = photoInfo.name
}

export { closePopup, openPopup, photoPopupInit }