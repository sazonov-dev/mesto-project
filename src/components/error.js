const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add('popup__container-form-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__container-form-error_active');
    inputElement.classList.add('popup__container-input_disabled');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('popup__container-form-error');
    errorElement.classList.remove('popup__container-form-error_active');
    inputElement.classList.remove('popup__container-input_disabled');
    errorElement.textContent = '';
};

export { showInputError, hideInputError };