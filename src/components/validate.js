import { setEventListeners } from "./utils.js";

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__container-form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement);

    });
};

export { enableValidation };