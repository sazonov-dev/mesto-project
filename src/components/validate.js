const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.input));
    const buttonElement = formElement.querySelector(settings.button);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.profileError);
    } else {
        inputElement.setCustomValidity('');
        hideInputError(formElement, inputElement, settings);
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.buttonDisabled);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(settings.buttonDisabled)
        buttonElement.removeAttribute('disabled');
    }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(settings.error);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorActive);
    inputElement.classList.add(settings.inputDisabled);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.error);
    errorElement.classList.remove(settings.errorActive);
    inputElement.classList.remove(settings.inputDisabled);
    errorElement.textContent = '';
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.form));
    formList.forEach((formElement) => {
        formElement.reset();
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, settings);
    });
};

export { enableValidation, showInputError, hideInputError, toggleButtonState};